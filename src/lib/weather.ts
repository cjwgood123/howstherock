import { WeatherResponse, Location } from '@/types/weather';

// API 엔드포인트를 직접 기상청 API URL로 변경
const KMA_API_BASE_URL = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0';
const API_KEY = import.meta.env.VITE_KMA_API_KEY;

// 위경도-격자 좌표 변환 함수
function convertToGrid(lat: number, lon: number): { nx: number; ny: number } {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 표준위도 1
  const SLAT2 = 60.0; // 표준위도 2
  const OLON = 126.0; // 기준점 경도
  const OLAT = 38.0; // 기준점 위도
  const XO = 210 / GRID; // 기준점 X좌표
  const YO = 675 / GRID; // 기준점 Y좌표
  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = re * sf / Math.pow(ro, sn);

  let rs: { nx: number; ny: number } = { nx: 0, ny: 0 };
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;
  rs.nx = Math.floor(ro * Math.sin(theta) + XO + 0.5);
  rs.ny = Math.floor(ro - ro * Math.cos(theta) + YO + 0.5);

  return rs;
}

export async function getWeatherInfo(location: Location): Promise<WeatherResponse> {
  const { nx, ny } = convertToGrid(location.lat, location.lng);
  
  const now = new Date();
  const base_date = now.toISOString().slice(0,10).replace(/-/g,'');
  
  // 실황용 base_time (현재 시간 기준)
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // 실황은 매시 40분에 생성되어 10분 후부터 제공되므로, 현재 시간이 50분 이전이면 1시간 전 데이터 사용
  let ncst_base_time;
  if (currentMinute < 50) {
    const prevHour = currentHour === 0 ? 23 : currentHour - 1;
    ncst_base_time = (prevHour < 10 ? '0' : '') + prevHour + '00';
  } else {
    ncst_base_time = (currentHour < 10 ? '0' : '') + currentHour + '00';
  }

  // 단기예보용 base_time은 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 중 가장 가까운 값 사용
  const getNearestBaseTime = (hour: number) => {
    const baseTimes = [2,5,8,11,14,17,20,23];
    let nearest = baseTimes[0];
    for (let t of baseTimes) {
      if (hour >= t) nearest = t;
    }
    return (nearest < 10 ? '0' : '') + nearest + '00';
  };
  const fcst_base_time = getNearestBaseTime(currentHour);

  const queryParamsNcst = new URLSearchParams({
    serviceKey: API_KEY!,
    pageNo: '1',
    numOfRows: '1000',
    dataType: 'JSON',
    base_date,
    base_time: ncst_base_time,
    nx: nx.toString(),
    ny: ny.toString()
  });
  const queryParamsFcst = new URLSearchParams({
    serviceKey: API_KEY!,
    pageNo: '1',
    numOfRows: '1000',
    dataType: 'JSON',
    base_date,
    base_time: fcst_base_time,
    nx: nx.toString(),
    ny: ny.toString()
  });

  try {
    // 실황(현재값)
    const responseNcst = await fetch(
      `${KMA_API_BASE_URL}/getUltraSrtNcst?${queryParamsNcst}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (!responseNcst.ok) throw new Error(`API 호출 실패: ${responseNcst.status}`);
    const dataNcst = await responseNcst.json();
    const itemsNcst = dataNcst.response?.body?.items?.item || [];

    // 단기예보(시간별)
    const responseFcst = await fetch(
      `${KMA_API_BASE_URL}/getVilageFcst?${queryParamsFcst}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (!responseFcst.ok) throw new Error(`API 호출 실패: ${responseFcst.status}`);
    const dataFcst = await responseFcst.json();
    const itemsFcst = dataFcst.response?.body?.items?.item || [];

    // forecast: TMP(온도), REH(습도), WSD(풍속), SKY(하늘상태), PTY(강수형태) 추출
    const forecast = itemsFcst
      .filter((item: any) => ['TMP','REH','WSD','SKY','PTY'].includes(item.category))
      .map((item: any) => ({
        date: item.fcstDate,
        time: item.fcstTime,
        category: item.category,
        value: item.fcstValue
      }));

    return {
      location: location.name,
      current: {
        temperature: parseFloat(itemsNcst.find((item: any) => item.category === 'T1H')?.obsrValue || '0'),
        humidity: parseFloat(itemsNcst.find((item: any) => item.category === 'REH')?.obsrValue || '0'),
        windSpeed: parseFloat(itemsNcst.find((item: any) => item.category === 'WSD')?.obsrValue || '0'),
        windDirection: parseFloat(itemsNcst.find((item: any) => item.category === 'VEC')?.obsrValue || '0'),
        sky: itemsNcst.find((item: any) => item.category === 'SKY')?.obsrValue || '0',
        precipitation: itemsNcst.find((item: any) => item.category === 'PTY')?.obsrValue || '0'
      },
      forecast
    };
  } catch (error) {
    console.error('날씨 정보 조회 실패:', error);
    if (error instanceof Error && error.message.includes('OpenAPI_S')) {
      throw new Error('API 키가 유효하지 않거나 인증에 실패했습니다. API 키를 확인해주세요.');
    }
    throw error;
  }
} 