
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WeatherRecommendation, Location, ClimbingSpot } from '@/types/weather';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface WeatherResultProps {
  location: Location;
  spot: ClimbingSpot;
  date: Date;
  startTime: string;
  endTime: string;
  recommendation: WeatherRecommendation;
}

const WeatherResult: React.FC<WeatherResultProps> = ({
  location,
  spot,
  date,
  startTime,
  endTime,
  recommendation,
}) => {
  const isToday = new Date().toDateString() === date.toDateString();
  
  return (
    <div className="w-full max-w-2xl space-y-4">
      <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-slate-700">
            바위 어때? 🧗‍♂️
          </CardTitle>
          <p className="text-slate-600">
            {location.name} • {spot.name}
          </p>
          <p className="text-sm text-slate-500">
            {format(date, 'yyyy년 M월 d일 (E)', { locale: ko })} • {startTime} ~ {endTime}
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-slate-700">
            {isToday ? '오늘' : format(date, 'M월 d일', { locale: ko })} 날씨 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {recommendation.hourlyData[0]?.temperature || 20}°C
              </p>
              <p className="text-sm text-slate-600">온도</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {recommendation.hourlyData[0]?.humidity || 65}%
              </p>
              <p className="text-sm text-slate-600">습도</p>
            </div>
          </div>

          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <Badge variant="secondary" className="mb-2">
              {recommendation.hourlyData[0]?.weather || '맑음'}
            </Badge>
            <p className="text-slate-700">{recommendation.weatherSummary}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-lg text-orange-700 flex items-center gap-2">
            🎯 최적의 등반 시간
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {recommendation.optimalTime}
            </div>
            <p className="text-slate-600">이 시간대가 가장 좋습니다!</p>
          </div>
          <div className="p-4 bg-white rounded-lg border-l-4 border-orange-400">
            <p className="text-slate-700 leading-relaxed">
              {recommendation.advice}
            </p>
          </div>
        </CardContent>
      </Card>

      {recommendation.hourlyData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-700">시간별 날씨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {recommendation.hourlyData.slice(0, 8).map((data, index) => (
                <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-600">
                    {data.hour}:00
                  </p>
                  <p className="text-lg font-bold text-slate-700">
                    {data.temperature}°
                  </p>
                  <p className="text-xs text-slate-500">
                    {data.weather}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherResult;
