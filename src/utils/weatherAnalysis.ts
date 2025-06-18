interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  dewPoint: number;
}

export interface ClimbingCondition {
  isOptimal: boolean;
  temperatureStatus: {
    isGood: boolean;
    message: string;
  };
  humidityStatus: {
    isGood: boolean;
    message: string;
  };
  windStatus: {
    isGood: boolean;
    message: string;
  };
  dewPointStatus: {
    isGood: boolean;
    message: string;
  };
  overallMessage: string;
  recommendations: string[];
}

export const analyzeClimbingConditions = (weather: WeatherData): ClimbingCondition => {
  const recommendations: string[] = [];
  let isOptimal = true;

  // 온도 분석 (5-15°C가 최적)
  const tempStatus = {
    isGood: weather.temperature >= 5 && weather.temperature <= 15,
    message: ''
  };
  
  if (weather.temperature < 5) {
    tempStatus.message = '온도가 너무 낮습니다. 체온 유지에 주의하세요.';
    isOptimal = false;
    recommendations.push('따뜻한 옷을 입고 등반하세요.');
  } else if (weather.temperature > 15) {
    tempStatus.message = '온도가 다소 높습니다. 그늘진 곳을 찾아보세요.';
    isOptimal = false;
    recommendations.push('이른 아침이나 늦은 오후에 등반하는 것을 고려해보세요.');
  } else {
    tempStatus.message = '온도가 클라이밍에 최적입니다!';
  }

  // 습도 분석 (30-50%가 최적)
  const humidityStatus = {
    isGood: weather.humidity >= 30 && weather.humidity <= 50,
    message: ''
  };

  if (weather.humidity > 50) {
    humidityStatus.message = '습도가 높아 바위가 미끄러울 수 있습니다.';
    isOptimal = false;
    recommendations.push('바위의 상태를 주의 깊게 확인하세요.');
  } else if (weather.humidity < 30) {
    humidityStatus.message = '습도가 매우 낮습니다. 수분 섭취에 주의하세요.';
    recommendations.push('충분한 물을 마시고 등반하세요.');
  } else {
    humidityStatus.message = '습도가 클라이밍에 적당합니다.';
  }

  // 이슬점 분석 (공기 온도와의 차이가 10°C 이상이 좋음)
  const dewPointDiff = weather.temperature - weather.dewPoint;
  const dewPointStatus = {
    isGood: dewPointDiff >= 10,
    message: ''
  };

  if (dewPointDiff < 10) {
    dewPointStatus.message = '이슬점이 높아 바위가 다소 젖을 수 있습니다.';
    isOptimal = false;
    recommendations.push('바위의 마찰력을 주의 깊게 확인하세요.');
  } else {
    dewPointStatus.message = '이슬점이 적당하여 바위가 건조합니다.';
  }

  // 바람 분석
  const windStatus = {
    isGood: weather.windSpeed >= 5 && weather.windSpeed <= 15,
    message: ''
  };

  if (weather.windSpeed < 5) {
    windStatus.message = '바람이 거의 없습니다.';
  } else if (weather.windSpeed > 15) {
    windStatus.message = '바람이 강합니다. 체온 유지에 주의하세요.';
    isOptimal = false;
    recommendations.push('따뜻한 옷을 추가로 준비하세요.');
  } else {
    windStatus.message = '바람이 적당하여 바위를 건조하게 유지합니다.';
  }

  // 전체 메시지 생성
  let overallMessage = '';
  if (isOptimal) {
    overallMessage = '현재 날씨가 클라이밍에 최적의 조건입니다! 🎉';
  } else if (weather.condition.includes('비') || weather.condition.includes('눈')) {
    overallMessage = '비/눈이 예상되어 등반을 권장하지 않습니다. ⚠️';
    recommendations.push('날씨가 개선될 때까지 등반을 연기하는 것이 좋습니다.');
  } else {
    overallMessage = '클라이밍이 가능하지만, 아래 주의사항을 확인하세요.';
  }

  return {
    isOptimal,
    temperatureStatus: tempStatus,
    humidityStatus: humidityStatus,
    windStatus: windStatus,
    dewPointStatus: dewPointStatus,
    overallMessage,
    recommendations
  };
}; 