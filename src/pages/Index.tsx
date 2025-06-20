import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LocationSelector from '@/components/LocationSelector';
import DateSelector from '@/components/DateSelector';
import TimeSelector from '@/components/TimeSelector';
import WeatherResult from '@/components/WeatherResult';
import { Location, ClimbingSpot, WeatherRecommendation, WeatherData } from '@/types/weather';
import { toast } from '@/hooks/use-toast';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Clock, Share } from 'lucide-react';
import { getWeatherInfo } from '@/lib/weather';
import { StorySticker } from '@/components/StorySticker';

const Index = () => {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const infoRef = useRef<HTMLParagraphElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ClimbingSpot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [weatherResult, setWeatherResult] = useState<WeatherRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStoryPreview, setShowStoryPreview] = useState(false);

  // 위치 선택 시 날씨 정보 조회 제거
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSelectedSpot(null);
    setWeatherResult(null);
  };

  const handleSpotSelect = (spot: ClimbingSpot) => {
    setSelectedSpot(spot);
    setWeatherResult(null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setWeatherResult(null);
  };

  const resetForm = () => {
    setSelectedLocation(null);
    setSelectedSpot(null);
    setSelectedDate(null);
    setStartTime('09:00');
    setEndTime('18:00');
    setWeatherResult(null);
  };

  // 시간별 바위 상태 평가 함수 (가중치 조정 및 추천 시간대 추출)
  function getOptimalClimbingTimes(hourlyData, date) {
    const month = (date.getMonth() + 1);
    let maxScore = -Infinity;
    const scored = hourlyData.map((h) => {
      let score = 0;
      // 온도 (1점)
      if (h.temperature !== null && h.temperature >= 2 && h.temperature <= 13) score += 1;
      // 습도 (2점)
      if (h.humidity !== null && h.humidity >= 20 && h.humidity <= 40) score += 2;
      else if (h.humidity !== null && h.humidity > 40 && h.humidity < 50) score += 1;
      // 풍속 (2점)
      if (h.windSpeed !== null && h.windSpeed >= 1.4 && h.windSpeed <= 4.2) score += 2;
      else if (h.windSpeed !== null && h.windSpeed > 4.2) score += 1;
      // 바위 마름(풍속 2m/s 이상 추가 1점)
      if (h.windSpeed !== null && h.windSpeed >= 2) score += 1;
      // 강수 (2점)
      if (h.precipitation !== undefined && h.precipitation === 0) score += 2;
      // 계절별 가중치(간단화)
      if (month >= 6 && month <= 9 && h.temperature !== null && h.temperature < 25) score += 1;
      if (month >= 9 && month <= 12 && h.humidity !== null && h.humidity < 50) score += 1;
      if (score > maxScore) maxScore = score;
      return { ...h, score };
    });
    // 최고점 시간대
    const bestIdx = scored.findIndex(h => h.score === maxScore);
    // 최고점과 1점 이내의 시간대 2~3개 추천
    const recommendedIdxs = scored
      .map((h, i) => ({ i, diff: maxScore - h.score }))
      .filter(obj => obj.i !== bestIdx && obj.diff <= 1)
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 3)
      .map(obj => obj.i);
    return { scored, bestIdx, recommendedIdxs, maxScore };
  }

  const handleCheckWeather = async () => {
    if (!selectedLocation || !selectedSpot || !selectedDate || !startTime || !endTime) {
      toast({
        title: "모든 항목을 선택해주세요",
        description: "지역, 장소, 날짜, 시간을 모두 선택하신 후 다시 시도해주세요.",
        variant: "destructive",
      });
      return;
    }

    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);

    if (startHour >= endHour) {
      toast({
        title: "시간 설정을 확인해주세요",
        description: "종료 시간이 시작 시간보다 늦어야 합니다.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // 실제 기상청 API 호출
      const weather = await getWeatherInfo(selectedLocation);
      // forecast 배열에서 시간별 데이터 추출
      const hourlyMap = {};
      for (let h = startHour; h < endHour; h++) {
        hourlyMap[h] = { temp: [], hum: [], wind: [], pcp: [] };
      }
      weather.forecast.forEach((item) => {
        const hour = parseInt(item.time.slice(0, 2));
        if (hour >= startHour && hour < endHour) {
          if (item.category === 'TMP') hourlyMap[hour].temp.push(Number(item.value));
          if (item.category === 'REH') hourlyMap[hour].hum.push(Number(item.value));
          if (item.category === 'WSD') hourlyMap[hour].wind.push(Number(item.value));
          if (item.category === 'PCP') hourlyMap[hour].pcp.push(item.value === '강수없음' ? 0 : 1);
        }
      });
      // 시간별 평균값 계산
      let hourlyData = Object.entries(hourlyMap).map(([hour, vals]) => {
        const v = vals as { temp: number[]; hum: number[]; wind: number[]; pcp: number[] };
        return {
          hour: Number(hour),
          temperature: v.temp.length ? Math.round(v.temp.reduce((a, b) => a + b, 0) / v.temp.length) : null,
          humidity: v.hum.length ? Math.round(v.hum.reduce((a, b) => a + b, 0) / v.hum.length) : null,
          windSpeed: v.wind.length ? Number((v.wind.reduce((a, b) => a + b, 0) / v.wind.length).toFixed(1)) : null,
          precipitation: v.pcp.length ? v.pcp.reduce((a, b) => a + b, 0) : 0,
        };
      });
      // 최적 시간대 평가
      const { scored, bestIdx, recommendedIdxs, maxScore } = getOptimalClimbingTimes(hourlyData, selectedDate);
      setWeatherResult({
        optimalTime: `${scored[bestIdx].hour}:00 ~ ${scored[bestIdx].hour + 1}:00`,
        weatherSummary: `최적 시간대: ${scored[bestIdx].hour}:00 ~ ${scored[bestIdx].hour + 1}:00 (점수: ${maxScore})`,
        advice: scored[bestIdx].reasons,
        hourlyData: scored,
        detailedAnalysis: null
      });
    } catch (e) {
      toast({
        title: '날씨 정보를 가져오지 못했습니다.',
        description: 'API 오류 또는 데이터가 없습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const WeatherIcon = ({ condition }: { condition: string }) => {
    switch (condition) {
      case '맑음':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case '구름 조금':
        return <Cloud className="w-8 h-8 text-blue-300" />;
      case '흐림':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case '소나기':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  // 등반 조언 하이라이트 메시지 생성 함수
  function getAdviceHighlight(optimal) {
    const ideal = {
      tempMin: 2, tempMax: 13,
      humMin: 20, humMax: 40,
      windMin: 1.4, windMax: 4.2,
      precipitation: 0
    };
    let highlights = [];
    if (optimal.temperature !== null) {
      if (optimal.temperature < ideal.tempMin) highlights.push('온도가 낮아 손이 시릴 수 있습니다.');
      else if (optimal.temperature > ideal.tempMax) highlights.push('온도가 높아 그립감이 떨어질 수 있습니다.');
    }
    if (optimal.humidity !== null) {
      if (optimal.humidity > 50) highlights.push('습도가 높아 바위가 미끄러울 수 있습니다.');
      else if (optimal.humidity > ideal.humMax) highlights.push('조금 미끄러울 수 있습니다.');
      else if (optimal.humidity < ideal.humMin) highlights.push('습도가 낮아 건조합니다.');
    }
    if (optimal.windSpeed !== null) {
      if (optimal.windSpeed < ideal.windMin) highlights.push('바람이 약해 바위가 덜 마를 수 있습니다.');
      else if (optimal.windSpeed > ideal.windMax) highlights.push('바람이 강해 체온 유지에 주의하세요.');
    }
    if (optimal.precipitation && optimal.precipitation > 0) highlights.push('비/눈이 있어 등반이 어렵습니다.');
    if (highlights.length === 0) return '최적에 가까운 완벽한 조건입니다!';
    return highlights.join(' ');
  }

  // 결과 화면이 렌더링될 때 정보 텍스트로 포커스
  useEffect(() => {
    if (weatherResult && infoRef.current) {
      infoRef.current.focus();
    }
  }, [weatherResult]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="py-6">
        <div className="container mx-auto px-4">
        </div>
      </header>
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* 헤더 */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block w-full">
            <img 
              src="/logo.png" 
              alt="바위 어때 로고"
              className="mx-auto mb-4 w-24 h-24 rounded-full shadow-sm object-cover sm:w-28 sm:h-28"
              style={{ background: '#f5f5e6' }}
            />
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
              바위 어때?
            </h1>
            <div className="h-0.5 w-24 bg-gray-900 mx-auto mt-4" />
          </div>
          <p 
            ref={infoRef}
            tabIndex={0}
            className={`text-base font-light focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md inline-block ${
              weatherResult 
                ? "text-lg text-blue-600 font-medium tracking-wide bg-blue-50 px-6 py-3 rounded-full shadow-sm"
                : "text-gray-600"
            }`}
          >
            {weatherResult 
              ? "스크롤을 내려 최적의 시간과 추천 시간을 확인하세요"
              : "완등을 위한 맞춤형 정보"
            }
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <Thermometer className="w-4 h-4" /> 온도
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <Droplets className="w-4 h-4" /> 습도
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <Wind className="w-4 h-4" /> 바람
            </span>
          </div>
        </div>

        {!weatherResult ? (
          <div className="space-y-12">
            {/* 설정 폼 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <LocationSelector
                selectedLocation={selectedLocation}
                selectedSpot={selectedSpot}
                onLocationSelect={handleLocationSelect}
                onSpotSelect={handleSpotSelect}
              />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <DateSelector
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
                </div>
                <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <TimeSelector
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
              />
            </div>
              </div>
            </div>
            {/* 액션 버튼 */}
            <div className="text-center">
              <Button
                onClick={handleCheckWeather}
                disabled={isLoading}
                size="lg"
                className="w-full md:w-auto px-16 py-6 text-base font-light tracking-wide bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 shadow-sm hover:shadow rounded-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    날씨 정보 가져오는 중...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Cloud className="w-5 h-5" />
                    바위 확인하기
                  </div>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* 결과 화면 */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <div className="border-b border-gray-100 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-light tracking-tight text-gray-900">
                      {selectedLocation?.name} - {selectedSpot?.description ? `${selectedSpot.description.split(' ')[0]} - ` : ''}{selectedSpot?.name}
                    </h2>
                    <div className="text-gray-500 mt-2 font-light">
                      {selectedDate?.toLocaleDateString('ko-KR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </div>
                  </div>
                  <div className="p-2">
                    <WeatherIcon condition={weatherResult.weatherSummary.split(',')[0]} />
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4">
                    <div className="text-3xl font-light text-gray-900">
                      {weatherResult.hourlyData[0].temperature}°C
                    </div>
                    <div className="text-sm text-gray-500 mt-2 font-light">온도</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-light text-gray-900">
                      {weatherResult.hourlyData[0].humidity}%
                    </div>
                    <div className="text-sm text-gray-500 mt-2 font-light">습도</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-light text-gray-900">
                      {weatherResult.hourlyData[0].windSpeed}m/s
                    </div>
                    <div className="text-sm text-gray-500 mt-2 font-light">풍속</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-light text-gray-900 whitespace-nowrap">
                      {weatherResult.optimalTime}
                    </div>
                    <div className="text-sm text-gray-500 mt-2 font-light">최적 시간</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {weatherResult.detailedAnalysis?.temperature.status === 'warning' && (
                    <div className="border border-gray-100 p-6">
                      <div className="flex items-start gap-4">
                        <Thermometer className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="font-light text-gray-900">온도 주의</div>
                          <div className="text-gray-600 mt-1 font-light">
                            {weatherResult.detailedAnalysis.temperature.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {weatherResult.detailedAnalysis?.humidity.status === 'warning' && (
                    <div className="border border-gray-100 p-6">
                      <div className="flex items-start gap-4">
                        <Droplets className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="font-light text-gray-900">습도 주의</div>
                          <div className="text-gray-600 mt-1 font-light">
                            {weatherResult.detailedAnalysis.humidity.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {weatherResult.detailedAnalysis?.wind.status === 'warning' && (
                    <div className="border border-gray-100 p-6">
                      <div className="flex items-start gap-4">
                        <Wind className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="font-light text-gray-900">바람 주의</div>
                          <div className="text-gray-600 mt-1 font-light">
                            {weatherResult.detailedAnalysis.wind.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border border-gray-100 p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-light text-gray-900">등반 조언</div>
                        <div className="text-gray-600 mt-1 font-light whitespace-pre-line">
                          <span className="block text-base font-medium text-gray-800 mb-1">최적시간과 추천시간을 잘 고려해서 등반하세요.</span>
                          <span className="block text-yellow-800 bg-yellow-50 rounded px-2 py-1 font-semibold">{getAdviceHighlight(weatherResult.hourlyData.find(d => weatherResult.optimalTime.startsWith(d.hour + ':')))}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {weatherResult && weatherResult.hourlyData && (
              (() => {
                const { recommendedIdxs } = getOptimalClimbingTimes(weatherResult.hourlyData, selectedDate);
                const highlightMsg = getAdviceHighlight(weatherResult.hourlyData.find(d => weatherResult.optimalTime.startsWith(d.hour + ':')));
                return (
                  <div className="max-w-2xl mx-auto mt-8 space-y-8">
                    {/* 1. 등반조언(카드) */}

                    {/* 2. 시간별 날씨 카드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {weatherResult.hourlyData.map((data, idx) => {
                        // 최적/추천 뱃지 표시
                        const isBest = weatherResult.optimalTime.startsWith(data.hour + ':');
                        const isRecommended = recommendedIdxs && recommendedIdxs.includes(idx);
                        return (
                          <div key={idx} className={`bg-white rounded-lg shadow p-3 text-center border ${isBest ? 'border-blue-500' : isRecommended ? 'border-green-400' : ''}`}>
                            <div className="text-sm sm:text-base font-semibold mb-2">{data.hour}:00~{data.hour + 1}:00</div>
                            <div className="flex flex-col gap-1 sm:gap-2 items-center text-xs sm:text-sm">
                              <span className="text-blue-600">온도: {data.temperature !== null ? `${data.temperature}°C` : '-'}</span>
                              <span className="text-green-600">습도: {data.humidity !== null ? `${data.humidity}%` : '-'}</span>
                              <span className="text-yellow-600">풍속: {data.windSpeed !== null ? `${data.windSpeed}m/s` : '-'}</span>
                            </div>
                            {isBest && <div className="mt-2 sm:mt-3 inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">최적</div>}
                            {isRecommended && <div className="mt-2 sm:mt-3 inline-block bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">추천</div>}
                          </div>
                        );
                      })}
                    </div>
                    {/* 3. 다시 검색 버튼과 공유 버튼 */}
                    <div className="text-center pt-8 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          size="lg"
                          className="w-full sm:w-auto px-8 py-4 text-base font-semibold tracking-wide bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-lg shadow-sm transition-all duration-200"
                        >
                          다른 조건으로 다시 검색하기
                        </Button>
                        
                        <Button
                          onClick={() => {
                            // StorySticker 미리보기 토글
                            setShowStoryPreview(!showStoryPreview);
                          }}
                          size="lg"
                          className="w-full sm:w-auto px-8 py-4 text-base font-semibold tracking-wide bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-lg shadow-sm transition-all duration-200"
                        >
                          📱 스토리 미리보기
                        </Button>
                        
                        <Button
                          onClick={async () => {
                            try {
                              // 더 매력적인 공유 텍스트 생성
                              const shareText = `🧗‍♂️ ${selectedLocation?.name} ${selectedSpot?.name} 등반 날씨 체크!\n\n` +
                                `📅 ${selectedDate?.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} ` +
                                `${selectedDate?.toLocaleDateString('ko-KR', { weekday: 'long' })}\n` +
                                `⏰ 최적 등반 시간: ${weatherResult.optimalTime}\n` +
                                `🌡️ 온도: ${weatherResult.hourlyData[0].temperature}°C\n` +
                                `💧 습도: ${weatherResult.hourlyData[0].humidity}%\n` +
                                `💨 풍속: ${weatherResult.hourlyData[0].windSpeed}m/s\n\n` +
                                `🎯 바위 날씨 가이드로 정확한 등반 타이밍을 잡아보세요!\n` +
                                `📸 @howstherock\n` +
                                `👉 나도 하러가기: `;

                              const fullText = shareText + window.location.href;

                              // iOS Safari 특화 처리
                              const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                              const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

                              if (isIOS && isSafari) {
                                // iOS Safari에서는 특별한 처리
                                try {
                                  // 1. 먼저 Web Share API 시도
                                  if (navigator.share && navigator.canShare) {
                                    const shareData = {
                                      title: '바위어때? - 정확한 등반 타이밍',
                                      text: shareText,
                                      url: window.location.href
                                    };
                                    
                                    if (navigator.canShare(shareData)) {
                                      await navigator.share(shareData);
                                      return;
                                    }
                                  }
                                } catch (shareError) {
                                  console.log('Web Share API 실패, 대체 방법 사용');
                                }

                                // 2. iOS Safari에서 안정적인 클립보드 복사
                                try {
                                  if (navigator.clipboard && navigator.clipboard.writeText) {
                                    await navigator.clipboard.writeText(fullText);
                                    
                                    // iOS 사용자를 위한 특별한 안내 모달
                                    const modal = document.createElement('div');
                                    modal.style.cssText = `
                                      position: fixed;
                                      top: 0;
                                      left: 0;
                                      width: 100%;
                                      height: 100%;
                                      background: rgba(0,0,0,0.8);
                                      z-index: 10000;
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                      padding: 20px;
                                    `;
                                    
                                    const modalContent = document.createElement('div');
                                    modalContent.style.cssText = `
                                      background: white;
                                      padding: 24px;
                                      border-radius: 16px;
                                      max-width: 90%;
                                      text-align: center;
                                    `;
                                    
                                    modalContent.innerHTML = `
                                      <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
                                      <h3 style="margin: 0 0 12px 0; font-size: 20px; font-weight: bold; color: #333;">텍스트가 복사되었습니다!</h3>
                                      <p style="margin: 0 0 20px 0; font-size: 16px; color: #666; line-height: 1.5;">
                                        이제 인스타그램 앱을 열어서 스토리에 붙여넣기 해주세요.
                                      </p>
                                      <div style="display: flex; gap: 12px; justify-content: center;">
                                        <button onclick="window.location.href='instagram://story-camera'; this.parentElement.parentElement.parentElement.remove();" 
                                                style="background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color: white; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; flex: 1;">
                                          📸 인스타그램 열기
                                        </button>
                                        <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                                                style="background: #f1f3f4; color: #333; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; flex: 1;">
                                          닫기
                                        </button>
                                      </div>
                                      <p style="margin: 16px 0 0 0; font-size: 14px; color: #999;">
                                        💡 팁: 인스타그램 스토리에서 텍스트를 길게 눌러 붙여넣기 하세요
                                      </p>
                                    `;
                                    
                                    modal.appendChild(modalContent);
                                    document.body.appendChild(modal);
                                    
                                    return;
                                  }
                                } catch (clipboardError) {
                                  console.log('Clipboard API 실패, 구형 방법 사용');
                                }

                                // 3. 구형 브라우저 지원 (iOS Safari에서도 작동)
                                const textArea = document.createElement('textarea');
                                textArea.value = fullText;
                                textArea.style.position = 'fixed';
                                textArea.style.left = '-999999px';
                                textArea.style.top = '-999999px';
                                document.body.appendChild(textArea);
                                textArea.focus();
                                textArea.select();
                                
                                try {
                                  const successful = document.execCommand('copy');
                                  if (successful) {
                                    // iOS 사용자를 위한 특별한 안내 모달
                                    const modal = document.createElement('div');
                                    modal.style.cssText = `
                                      position: fixed;
                                      top: 0;
                                      left: 0;
                                      width: 100%;
                                      height: 100%;
                                      background: rgba(0,0,0,0.8);
                                      z-index: 10000;
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                      padding: 20px;
                                    `;
                                    
                                    const modalContent = document.createElement('div');
                                    modalContent.style.cssText = `
                                      background: white;
                                      padding: 24px;
                                      border-radius: 16px;
                                      max-width: 90%;
                                      text-align: center;
                                    `;
                                    
                                    modalContent.innerHTML = `
                                      <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
                                      <h3 style="margin: 0 0 12px 0; font-size: 20px; font-weight: bold; color: #333;">텍스트가 복사되었습니다!</h3>
                                      <p style="margin: 0 0 20px 0; font-size: 16px; color: #666; line-height: 1.5;">
                                        이제 인스타그램 앱을 열어서 스토리에 붙여넣기 해주세요.
                                      </p>
                                      <div style="display: flex; gap: 12px; justify-content: center;">
                                        <button onclick="window.location.href='instagram://story-camera'; this.parentElement.parentElement.parentElement.remove();" 
                                                style="background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color: white; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; flex: 1;">
                                          📸 인스타그램 열기
                                        </button>
                                        <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                                                style="background: #f1f3f4; color: #333; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; flex: 1;">
                                          닫기
                                        </button>
                                      </div>
                                      <p style="margin: 16px 0 0 0; font-size: 14px; color: #999;">
                                        💡 팁: 인스타그램 스토리에서 텍스트를 길게 눌러 붙여넣기 하세요
                                      </p>
                                    `;
                                    
                                    modal.appendChild(modalContent);
                                    document.body.appendChild(modal);
                                  } else {
                                    throw new Error('복사 실패');
                                  }
                                } catch (execError) {
                                  // 4. 최후의 수단: 사용자에게 직접 복사 안내
                                  toast({
                                    title: "📱 수동 복사가 필요합니다",
                                    description: "아래 텍스트를 선택해서 복사해주세요.",
                                    variant: "default",
                                  });
                                  
                                  // 모달로 텍스트 표시
                                  const modal = document.createElement('div');
                                  modal.style.cssText = `
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: rgba(0,0,0,0.8);
                                    z-index: 10000;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    padding: 20px;
                                  `;
                                  
                                  const modalContent = document.createElement('div');
                                  modalContent.style.cssText = `
                                    background: white;
                                    padding: 20px;
                                    border-radius: 12px;
                                    max-width: 90%;
                                    max-height: 80%;
                                    overflow-y: auto;
                                  `;
                                  
                                  modalContent.innerHTML = `
                                    <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">복사할 텍스트</h3>
                                    <textarea 
                                      style="width: 100%; height: 200px; padding: 10px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px;"
                                      readonly
                                    >${fullText}</textarea>
                                    <div style="margin-top: 15px; text-align: center;">
                                      <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                                              style="background: #007AFF; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 16px;">
                                        닫기
                                      </button>
                                    </div>
                                  `;
                                  
                                  modal.appendChild(modalContent);
                                  document.body.appendChild(modal);
                                }
                                
                                document.body.removeChild(textArea);
                              } else {
                                // 안드로이드 및 기타 브라우저
                                if (navigator.share && navigator.canShare) {
                                  const shareData = {
                                    title: '바위어때? - 정확한 등반 타이밍',
                                    text: shareText,
                                    url: window.location.href
                                  };
                                  
                                  if (navigator.canShare(shareData)) {
                                    await navigator.share(shareData);
                                    return;
                                  }
                                }
                                
                                // Web Share API가 지원되지 않거나 실패한 경우 클립보드에 복사
                                if (navigator.clipboard && navigator.clipboard.writeText) {
                                  await navigator.clipboard.writeText(fullText);
                                  toast({
                                    title: "📋 클립보드에 복사되었습니다!",
                                    description: "인스타그램 스토리에 붙여넣기 해주세요.",
                                    variant: "default",
                                  });
                                } else {
                                  // 구형 브라우저 지원
                                  const textArea = document.createElement('textarea');
                                  textArea.value = fullText;
                                  document.body.appendChild(textArea);
                                  textArea.select();
                                  document.execCommand('copy');
                                  document.body.removeChild(textArea);
                                  
                                  toast({
                                    title: "📋 클립보드에 복사되었습니다!",
                                    description: "인스타그램 스토리에 붙여넣기 해주세요.",
                                    variant: "default",
                                  });
                                }
                              }
                            } catch (error) {
                              console.error('공유하기 실패:', error);
                              toast({
                                title: "공유하기 실패",
                                description: "수동으로 복사해서 공유해주세요.",
                                variant: "destructive",
                              });
                            }
                          }}
                          size="lg"
                          className="w-full sm:w-auto px-8 py-4 text-base font-semibold tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 text-white border-0 rounded-lg shadow-sm transition-all duration-200"
                        >
                          <Share className="w-5 h-5 mr-2" />
                          📸 인스타그램 스토리로 공유하기
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}

            {/* 스토리 미리보기 섹션 */}
            {showStoryPreview && weatherResult && (
              <div className="mt-8">
                <div className="max-w-md mx-auto">
                  <h2 className="mb-4 text-center text-xl font-bold text-gray-800">📱 인스타그램 스토리 미리보기</h2>
                  <div className="bg-black rounded-3xl p-4 shadow-2xl">
                    <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-6 text-gray-900 relative overflow-hidden">
                      {/* 로고 배경 */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <img 
                          src="/logo.png" 
                          alt="바위 어때 로고"
                          className="w-32 h-32 object-cover"
                          style={{ background: '#f5f5e6' }}
                        />
                      </div>
                      
                      <div className="text-center space-y-4 relative z-10">
                        <div className="text-2xl font-bold text-gray-900">바위어때?</div>
                        <div className="text-lg text-gray-800">
                          {selectedLocation?.name} {selectedSpot?.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          📅 {selectedDate?.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} {selectedDate?.toLocaleDateString('ko-KR', { weekday: 'long' })}
                        </div>
                        <div className="bg-white bg-opacity-80 rounded-lg p-4 space-y-2 shadow-sm">
                          <div className="text-xl font-bold text-gray-900">⏰ 최적 등반 시간</div>
                          <div className="text-2xl font-bold text-blue-600">{weatherResult.optimalTime}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">🌡️ 온도</div>
                            <div className="font-bold text-gray-900">{weatherResult.hourlyData[0].temperature}°C</div>
                          </div>
                          <div>
                            <div className="text-gray-600">💧 습도</div>
                            <div className="font-bold text-gray-900">{weatherResult.hourlyData[0].humidity}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">💨 풍속</div>
                            <div className="font-bold text-gray-900">{weatherResult.hourlyData[0].windSpeed}m/s</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          🎯 정확한 등반 타이밍을 잡아보세요!
                        </div>
                        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-full px-4 py-2 text-sm font-bold">
                          📸 @howstherock
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4 text-sm text-gray-600">
                    실제 인스타그램 스토리에서 이렇게 보입니다
                  </div>
                  
                  {/* 이미지 저장 및 공유 버튼들 */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={async () => {
                        try {
                          // 오프스크린 요소를 캡처
                          const storyElement = document.getElementById('story-capture');
                          if (!storyElement) {
                            toast({
                              title: "스토리 미리보기를 찾을 수 없습니다",
                              description: "잠시 후 다시 시도해주세요.",
                              variant: "destructive",
                            });
                            return;
                          }
                          const html2canvas = (await import('html2canvas')).default;
                          const canvas = await html2canvas(storyElement as HTMLElement, {
                            backgroundColor: '#000000',
                            width: 1080,
                            height: 1920,
                            scale: 1,
                            useCORS: true,
                            allowTaint: true
                          });
                          // 이미지를 Blob으로 변환
                          canvas.toBlob(async (blob) => {
                            if (!blob) {
                              toast({
                                title: "이미지 생성 실패",
                                description: "잠시 후 다시 시도해주세요.",
                                variant: "destructive",
                              });
                              return;
                            }
                            // iOS Safari 특화 처리
                            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                            const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

                            if (isIOS && isSafari) {
                              // iOS Safari에서는 파일 다운로드 후 안내
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `bawi-weather-${selectedLocation?.name}-${selectedSpot?.name}.png`;
                              link.click();
                              URL.revokeObjectURL(url);

                              // iOS 사용자를 위한 안내 모달
                              const modal = document.createElement('div');
                              modal.style.cssText = `
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(0,0,0,0.8);
                                z-index: 10000;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                padding: 20px;
                              `;
                              
                              const modalContent = document.createElement('div');
                              modalContent.style.cssText = `
                                background: white;
                                padding: 24px;
                                border-radius: 16px;
                                max-width: 90%;
                                text-align: center;
                              `;
                              
                              modalContent.innerHTML = `
                                <div style="font-size: 48px; margin-bottom: 16px;">📸</div>
                                <h3 style="margin: 0 0 12px 0; font-size: 20px; font-weight: bold; color: #333;">이미지가 다운로드되었습니다!</h3>
                                <p style="margin: 0 0 20px 0; font-size: 16px; color: #666; line-height: 1.5;">
                                  이제 인스타그램 앱을 열어서 스토리에 이미지를 업로드해주세요.
                                </p>
                                <div style="display: flex; gap: 12px; justify-content: center;">
                                  <button onclick="window.location.href='instagram://story-camera'; this.parentElement.parentElement.parentElement.remove();" 
                                          style="background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color: white; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; flex: 1;">
                                    📸 인스타그램 열기
                                  </button>
                                  <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                                          style="background: #f1f3f4; color: #333; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; flex: 1;">
                                    닫기
                                  </button>
                                </div>
                                <p style="margin: 16px 0 0 0; font-size: 14px; color: #999;">
                                  💡 팁: 인스타그램 스토리에서 갤러리 아이콘을 눌러 다운로드한 이미지를 선택하세요
                                </p>
                              `;
                              
                              modal.appendChild(modalContent);
                              document.body.appendChild(modal);
                            } else {
                              // 안드로이드 및 기타 브라우저에서는 Web Share API 시도
                              if (navigator.share && navigator.canShare) {
                                const files = [new File([blob], `bawi-weather-${selectedLocation?.name}-${selectedSpot?.name}.png`, { type: 'image/png' })];
                                
                                if (navigator.canShare({ files })) {
                                  await navigator.share({
                                    title: '바위어때? - 정확한 등반 타이밍',
                                    text: `${selectedLocation?.name} ${selectedSpot?.name} 등반 날씨 체크!`,
                                    files: files
                                  });
                                  return;
                                }
                              }

                              // Web Share API가 지원되지 않으면 다운로드
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `bawi-weather-${selectedLocation?.name}-${selectedSpot?.name}.png`;
                              link.click();
                              URL.revokeObjectURL(url);

                              toast({
                                title: "📸 이미지가 다운로드되었습니다!",
                                description: "인스타그램 앱에서 갤러리에서 이미지를 선택해주세요.",
                                variant: "default",
                              });
                            }
                          }, 'image/png');
                        } catch (error) {
                          console.error('이미지 공유 실패:', error);
                          toast({
                            title: "이미지 공유 실패",
                            description: "수동으로 이미지를 저장해서 공유해주세요.",
                            variant: "destructive",
                          });
                        }
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                    >
                      📸 인스타그램 스토리에 이미지 공유하기
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 오프스크린(1080x1920) 스토리 미리보기 */}
            {showStoryPreview && weatherResult && (
              <div
                id="story-capture"
                style={{
                  width: 1080,
                  height: 1920,
                  position: 'fixed',
                  left: -99999,
                  top: 0,
                  zIndex: -1,
                  pointerEvents: 'none',
                  background: 'black',
                }}
              >
                <div style={{width: '100%', height: '100%', position: 'relative', borderRadius: 48, overflow: 'hidden', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: 80}}>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.05}}>
                    <img src="/logo.png" alt="바위 어때 로고" style={{ width: 400, height: 400, objectFit: 'cover', background: '#f5f5e6' }} />
                  </div>
                  <div style={{textAlign: 'center', position: 'relative', zIndex: 1, marginTop: 80}}>
                    <div style={{fontSize: 64, fontWeight: 700, color: '#222'}}>바위어때?</div>
                    <div style={{fontSize: 40, color: '#333', margin: '32px 0 0 0'}}>{selectedLocation?.name} {selectedSpot?.name}</div>
                    <div style={{fontSize: 28, color: '#666', margin: '24px 0'}}>
                      📅 {selectedDate?.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} {selectedDate?.toLocaleDateString('ko-KR', { weekday: 'long' })}
                    </div>
                    <div style={{background: 'rgba(255,255,255,0.85)', borderRadius: 32, display: 'inline-block', padding: '40px 60px', margin: '32px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
                      <div style={{fontSize: 36, fontWeight: 700, color: '#222'}}>⏰ 최적 등반 시간</div>
                      <div style={{fontSize: 48, fontWeight: 700, color: '#2563eb', marginTop: 12}}>{weatherResult.optimalTime}</div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', gap: 48, fontSize: 28, margin: '32px 0'}}>
                      <div>
                        <div style={{color: '#666'}}>🌡️ 온도</div>
                        <div style={{fontWeight: 700, color: '#222'}}>{weatherResult.hourlyData[0].temperature}°C</div>
                      </div>
                      <div>
                        <div style={{color: '#666'}}>💧 습도</div>
                        <div style={{fontWeight: 700, color: '#222'}}>{weatherResult.hourlyData[0].humidity}%</div>
                      </div>
                      <div>
                        <div style={{color: '#666'}}>💨 풍속</div>
                        <div style={{fontWeight: 700, color: '#222'}}>{weatherResult.hourlyData[0].windSpeed}m/s</div>
                      </div>
                    </div>
                    <div style={{fontSize: 28, color: '#666', margin: '32px 0'}}>🎯 정확한 등반 타이밍을 잡아보세요!</div>
                    <div style={{background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #f59e42 100%)', color: 'white', borderRadius: 32, display: 'inline-block', padding: '18px 48px', fontSize: 32, fontWeight: 700, marginTop: 24}}>
                      📸 @howstherock
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

