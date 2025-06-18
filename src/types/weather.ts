export interface BaseLocation {
  id: string;
  name: string;
  region?: string;
  lat?: number;
  lng?: number;
  description?: string;
}

export interface Location extends BaseLocation {
  spots?: ClimbingSpot[];
  details?: ClimbingSpot[];
  boulderInfo?: BoulderInfo;
}

export interface ClimbingSpot {
  id: string;
  name: string;
  description?: string;
  difficulty: string;
  fontGrade?: string;  // Font Grade (7C+, 8B 등)
  vGrade?: string;     // V-Grade (V8, V9 등)
  type: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  attempts?: number;
  routes?: {
    name: string;
    grade: string;
    type: string;
    attempts: number;
    sector: string;
  }[];
}

export interface BoulderInfo {
  spots: ClimbingSpot[];
  description?: string;
}

export interface WeatherData {
  temperature: number;    // 기온
  humidity: number;       // 습도
  windSpeed: number;      // 풍속
  windDirection: number;  // 풍향
  sky: string;           // 하늘상태
  precipitation: string;  // 강수형태
}

export interface WeatherResponse {
  location: string;
  current: WeatherData;
  forecast: Array<{
    date: string;
    time: string;
    category: string;
    value: string;
  }>;
}

interface WeatherAnalysis {
  status: 'good' | 'warning' | 'neutral';
  message: string;
  advice: string;
}

export interface WeatherRecommendation {
  optimalTime: string;
  weatherSummary: string;
  advice: string;
  hourlyData: {
    hour: number;
    temperature: number;
    humidity: number;
    windSpeed: number;
    weather: string;
    precipitation: number;
  }[];
  detailedAnalysis: {
    temperature: WeatherAnalysis;
    humidity: WeatherAnalysis;
    dewPoint: WeatherAnalysis;
    wind: WeatherAnalysis;
    isOptimal: boolean;
  };
}

export const LOCATIONS: Location[] = [
  // 경기도 지역
  {
    id: 'anyang-art-park',
    name: '안양예술공원',
    region: '경기도',
    lat: 37.3833,
    lng: 126.9333,
    description: '안양예술공원의 볼더링 구역',
    boulderInfo: {
      description: '안양예술공원의 볼더링 구역 정보',
      spots: [
        // 감자볼더 구역
        { id: 'anyang-gamja-1', name: 'Super Charge', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: convertFontToVGrade('7C+'), description: '감자볼더 구역', attempts: 8 },
        { id: 'anyang-gamja-2', name: 'Real Time Machine', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: convertFontToVGrade('7C'), description: '감자볼더 구역', attempts: 2 },
        { id: 'anyang-gamja-3', name: 'Valar Morghulis', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: convertFontToVGrade('7C'), description: '감자볼더 구역', attempts: 6 },
        { id: 'anyang-gamja-4', name: 'Under control', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: convertFontToVGrade('7C'), description: '감자볼더 구역', attempts: 2 },
        { id: 'anyang-gamja-5', name: 'Adios amigos', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: convertFontToVGrade('7C'), description: '감자볼더 구역', attempts: 0 },
        { id: 'anyang-gamja-6', name: 'Green', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: convertFontToVGrade('7B+'), description: '감자볼더 구역', attempts: 1 },
        { id: 'anyang-gamja-7', name: 'Wild Wild East', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: convertFontToVGrade('7B+'), description: '감자볼더 구역', attempts: 11 },
        { id: 'anyang-gamja-8', name: 'First Charge', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: convertFontToVGrade('7B+'), description: '감자볼더 구역', attempts: 46 },
        { id: 'anyang-gamja-9', name: 'First Charge', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: convertFontToVGrade('7B+'), description: '감자볼더 구역', attempts: 4 },
        { id: 'anyang-gamja-10', name: 'Deadpool', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: convertFontToVGrade('7B'), description: '감자볼더 구역', attempts: 7 },
        { id: 'anyang-gamja-11', name: 'L', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: convertFontToVGrade('7B'), description: '감자볼더 구역', attempts: 0 },
        { id: 'anyang-gamja-12', name: 'Neruda Avenue', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: convertFontToVGrade('7A+'), description: '감자볼더 구역', attempts: 12 },
        { id: 'anyang-gamja-13', name: 'Broken Scouter', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: convertFontToVGrade('7A+'), description: '감자볼더 구역', attempts: 7 },
        { id: 'anyang-gamja-14', name: 'Time Machine', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: convertFontToVGrade('7A+'), description: '감자볼더 구역', attempts: 5 },
        { id: 'anyang-gamja-15', name: 'Frog', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: convertFontToVGrade('7A'), description: '감자볼더 구역', attempts: 11 },
        { id: 'anyang-gamja-16', name: 'Armstrong', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: convertFontToVGrade('7A'), description: '감자볼더 구역', attempts: 18 },
        { id: 'anyang-gamja-17', name: 'Spider', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: convertFontToVGrade('7A'), description: '감자볼더 구역', attempts: 25 },
        { id: 'anyang-gamja-18', name: 'Know When to Fold', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: convertFontToVGrade('6C+'), description: '감자볼더 구역', attempts: 4 },
        { id: 'anyang-gamja-19', name: 'Bud', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: convertFontToVGrade('6C+'), description: '감자볼더 구역', attempts: 18 },
        { id: 'anyang-gamja-20', name: 'Three-cushion', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: convertFontToVGrade('6C+'), description: '감자볼더 구역', attempts: 72 },
        { id: 'anyang-gamja-21', name: 'Pebble Wrestler', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: convertFontToVGrade('6C+'), description: '감자볼더 구역', attempts: 9 },
        { id: 'anyang-gamja-22', name: '새우깡', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: convertFontToVGrade('6C+'), description: '감자볼더 구역', attempts: 19 },
        { id: 'anyang-gamja-23', name: 'Frightening guy(무서운 놈)', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: convertFontToVGrade('6C'), description: '감자볼더 구역', attempts: 20 },
        { id: 'anyang-gamja-24', name: 'Couch potato', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: convertFontToVGrade('6C'), description: '감자볼더 구역', attempts: 35 },
        { id: 'anyang-gamja-25', name: 'Ninja Turtles', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: convertFontToVGrade('6B+'), description: '감자볼더 구역', attempts: 30 },
        { id: 'anyang-gamja-26', name: 'Potato(감자)', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: convertFontToVGrade('6B+'), description: '감자볼더 구역', attempts: 35 },
        { id: 'anyang-gamja-27', name: 'One Shot One Kill', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: convertFontToVGrade('6B+'), description: '감자볼더 구역', attempts: 74 },
        { id: 'anyang-gamja-1', name: 'Super Charge', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: '감자볼더 구역', attempts: 8 },
        { id: 'anyang-gamja-2', name: 'Real Time Machine', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '감자볼더 구역', attempts: 2 },
        { id: 'anyang-gamja-3', name: 'Valar Morghulis', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '감자볼더 구역', attempts: 6 },
        { id: 'anyang-gamja-4', name: 'Under control', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '감자볼더 구역', attempts: 2 },
        { id: 'anyang-gamja-5', name: 'Adios amigos', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '감자볼더 구역', attempts: 0 },
        { id: 'anyang-gamja-6', name: 'Green', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '감자볼더 구역', attempts: 1 },
        { id: 'anyang-gamja-7', name: 'Wild Wild East', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '감자볼더 구역', attempts: 11 },
        { id: 'anyang-gamja-8', name: 'First Charge', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '감자볼더 구역', attempts: 46 },
        { id: 'anyang-gamja-9', name: 'First Charge', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '감자볼더 구역', attempts: 4 },
        { id: 'anyang-gamja-10', name: 'Deadpool', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '감자볼더 구역', attempts: 7 },
        { id: 'anyang-gamja-11', name: 'L', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '감자볼더 구역', attempts: 0 },
        { id: 'anyang-gamja-12', name: 'Neruda Avenue', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '감자볼더 구역', attempts: 12 },
        { id: 'anyang-gamja-13', name: 'Broken Scouter', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '감자볼더 구역', attempts: 7 },
        { id: 'anyang-gamja-14', name: 'Time Machine', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '감자볼더 구역', attempts: 5 },
        { id: 'anyang-gamja-15', name: 'Frog', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '감자볼더 구역', attempts: 11 },
        { id: 'anyang-gamja-16', name: 'Armstrong', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '감자볼더 구역', attempts: 18 },
        { id: 'anyang-gamja-17', name: 'Spider', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '감자볼더 구역', attempts: 25 },
        { id: 'anyang-gamja-18', name: 'Know When to Fold', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '감자볼더 구역', attempts: 4 },
        { id: 'anyang-gamja-19', name: 'Bud', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '감자볼더 구역', attempts: 18 },
        { id: 'anyang-gamja-20', name: 'Three-cushion', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '감자볼더 구역', attempts: 72 },
        { id: 'anyang-gamja-21', name: 'Pebble Wrestler', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '감자볼더 구역', attempts: 9 },
        { id: 'anyang-gamja-22', name: '새우깡', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '감자볼더 구역', attempts: 19 },
        { id: 'anyang-gamja-23', name: 'Frightening guy(무서운 놈)', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: '감자볼더 구역', attempts: 20 },
        { id: 'anyang-gamja-24', name: 'Couch potato', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: '감자볼더 구역', attempts: 35 },
        { id: 'anyang-gamja-25', name: 'Ninja Turtles', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '감자볼더 구역', attempts: 30 },
        { id: 'anyang-gamja-26', name: 'Potato(감자)', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '감자볼더 구역', attempts: 35 },
        { id: 'anyang-gamja-27', name: 'One Shot One Kill', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '감자볼더 구역', attempts: 74 },
        { id: 'anyang-gamja-28', name: '8.15', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '감자볼더 구역', attempts: 104 },
        { id: 'anyang-gamja-29', name: 'Tadpole', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: '감자볼더 구역', attempts: 6 },
        { id: 'anyang-gamja-30', name: 'Leech(거머리)', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: '감자볼더 구역', attempts: 29 },
        { id: 'anyang-gamja-31', name: 'Worm traverse(송충이 트래버스)', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: '감자볼더 구역', attempts: 2 },
        { id: 'anyang-gamja-32', name: 'Reach(검은허리)', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: '감자볼더 구역', attempts: 2 },
        { id: 'anyang-gamja-33', name: 'G', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: '감자볼더 구역', attempts: 0 },
        { id: 'anyang-gamja-34', name: 'Baby Step', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V2', description: '감자볼더 구역', attempts: 53 },
        { id: 'anyang-gamja-35', name: 'Ninja Turtles standing', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V2', description: '감자볼더 구역', attempts: 50 },
        { id: 'anyang-gamja-36', name: 'A happy day', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: '감자볼더 구역', attempts: 41 },
        { id: 'anyang-gamja-37', name: '가제, We need him', type: 'bouldering', difficulty: '?', fontGrade: '?', vGrade: '?', description: '감자볼더 구역', attempts: 0 },

        // 고래볼더 구역 (신규)
        { id: 'anyang-whale-1', name: 'Migaloo', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V10', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-2', name: 'Whale Left', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-3', name: 'Whale Right', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-4', name: 'Whale', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V5', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-5', name: 'Krill', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V9', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-6', name: 'Sea Walker', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V4', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-7', name: 'Finding Nemo', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-8', name: 'Crab Left', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-9', name: 'Bombay', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-10', name: 'Blues', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-11', name: 'Gwangalli', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V9', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-12', name: 'Crab', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-13', name: 'Comfortable', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V1', description: '고래볼더 구역 - 언더핀치 왼손, 언더크림프 오른손 스타트. 스타트가 어려우면 왼손을 조금 더 오른쪽에 있는 저그(?)잡고 시작 가능', attempts: 0 },
        { id: 'anyang-whale-14', name: 'Uncomfortable', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V9', description: '고래볼더 구역', attempts: 0 },
        { id: 'anyang-whale-15', name: 'Anyang Sea', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V10', description: '고래볼더 구역', attempts: 0 },

        // 잠수함 볼더 구역 (신규)
        { id: 'anyang-submarine-1', name: 'Jangbogo', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V11', description: '잠수함 볼더 구역', attempts: 1 },
        { id: 'anyang-submarine-2', name: '솔이의 잠망경', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '잠수함 볼더 구역', attempts: 8 },
        { id: 'anyang-submarine-3', name: 'Dive', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V4', description: '잠수함 볼더 구역', attempts: 24 },
        { id: 'anyang-submarine-4', name: '솔이와 나들이', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V4', description: '잠수함 볼더 구역', attempts: 50 },
        { id: 'anyang-submarine-5', name: 'Periscope', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V3', description: '잠수함 볼더 구역', attempts: 36 },
        { id: 'anyang-submarine-6', name: 'Pororiyaa', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V1', description: '잠수함 볼더 구역', attempts: 21 },

        // 고물볼더 구역 (신규)
        { id: 'anyang-gomul-1', name: '고물', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '고물볼더 구역 - sit start at the bottom crimp, and go straight up', attempts: 0 },
        { id: 'anyang-gomul-2', name: '고물, stand', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: '고물볼더 구역 - stand start', attempts: 0 },
        { id: 'anyang-gomul-3', name: '야간작업 night work', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V9', description: '고물볼더 구역 - starting from sitting at a gomul v6 and connecting to the top of the damage v9', attempts: 0 },
        { id: 'anyang-gomul-4', name: 'Damage', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V10', description: '고물볼더 구역 - left hand on the bottom left crimp, right hand on the upper right sloppy crack', attempts: 0 },
        { id: 'anyang-gomul-5', name: 'Good evening', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V4', description: '고물볼더 구역 - Standing start with sloppy sidepull by left hand and pinch hold on the edge by right hand. Go up to the right slap', attempts: 0 },
        { id: 'anyang-gomul-6', name: 'Man of Steel', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '고물볼더 구역 - hard mantle, very exposed', attempts: 0 },
        { id: 'anyang-gomul-7', name: '바위늘보', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: '고물볼더 구역', attempts: 0 },
        { id: 'anyang-gomul-8', name: 'Kal-El', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V11', description: '고물볼더 구역', attempts: 0 },
        { id: 'anyang-gomul-9', name: 'Kryptonite', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V10', description: '고물볼더 구역 - undercling start. crux is to pull off', attempts: 0 },
        { id: 'anyang-gomul-10', name: 'Maniac', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '고물볼더 구역', attempts: 0 },
        { id: 'anyang-gomul-11', name: 'Mutant', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V11', description: '고물볼더 구역', attempts: 0 },
        { id: 'anyang-gomul-12', name: 'Venom', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V9', description: '고물볼더 구역 - same start with H.N.6 and move to the start point of H.N.5', attempts: 0 },
        { id: 'anyang-gomul-13', name: 'Honey No. 6', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '고물볼더 구역 - put your left hand on the crimps, and use left foot point for start. use on arete, sloppy line', attempts: 0 },
        { id: 'anyang-gomul-14', name: 'Honey No. 8', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '고물볼더 구역', attempts: 0 },
        { id: 'anyang-gomul-15', name: 'Honey No. 5', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V3', description: '고물볼더 구역 - just a single big lunge!', attempts: 0 },
        { id: 'anyang-gomul-16', name: '쌈장', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: '고물볼더 구역 - 냇물이 불어난 여름엔 등반이 어렵습니다', attempts: 0 },
        { id: 'anyang-gomul-17', name: '고추장', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V0', description: '고물볼더 구역', attempts: 0 }
      ]
    }
  },
  {
    id: 'bulamsan',
    name: '불암산',
    region: '경기도',
    lat: 37.6167,
    lng: 127.1167,
    description: '불암산의 다양한 볼더링 구역들로 구성된 클라이밍 장소입니다. Iceberg Sector, Monorail Sector, 마당바위 등 다양한 난이도의 문제들이 있습니다.',
    boulderInfo: {
      description: '불암산의 볼더링 정보',
      spots: [
        // Iceberg Sector
        { id: 'bulamsan-4', name: 'Roadside', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: convertFontToVGrade('7C+'), description: 'Iceberg Sector', attempts: 8 },
        { id: 'bulamsan-6', name: 'Small Giant', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: convertFontToVGrade('7C+'), description: 'Iceberg Sector', attempts: 17 },
        { id: 'bulamsan-7', name: 'Mental Mantle', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: convertFontToVGrade('7C'), description: 'Iceberg Sector', attempts: 2 },
        { id: 'bulamsan-9', name: 'Triple X,sit', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'Iceberg Sector', attempts: 19 },
        { id: 'bulamsan-16', name: 'Crimp face', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'Iceberg Sector', attempts: 18 },
        { id: 'bulamsan-20', name: 'Triple X', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'Iceberg Sector', attempts: 12 },
        { id: 'bulamsan-22', name: 'Awesome Track', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Iceberg Sector', attempts: 6 },
        { id: 'bulamsan-24', name: 'Giant Arete', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Iceberg Sector', attempts: 1 },
        { id: 'bulamsan-26', name: 'Hangle Day(한글날)', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: 'Iceberg Sector', attempts: 25 },
        { id: 'bulamsan-29', name: 'Mushroom Arete', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: 'Iceberg Sector', attempts: 24 },
        { id: 'bulamsan-36', name: 'Punching baby face', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Iceberg Sector', attempts: 16 },
        { id: 'bulamsan-40', name: 'Pressure Seat', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: 'Iceberg Sector', attempts: 7 },
        { id: 'bulamsan-43', name: 'Pressure,Sit, Right', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Iceberg Sector', attempts: 4 },
        { id: 'bulamsan-45', name: 'Arete', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Iceberg Sector', attempts: 56 },
        { id: 'bulamsan-54', name: 'Not Over Till Over', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Iceberg Sector', attempts: 0 },
        { id: 'bulamsan-58', name: 'Iceberg slab', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: 'Iceberg Sector', attempts: 4 },
        { id: 'bulamsan-62', name: 'Mushroom Flower', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: 'Iceberg Sector', attempts: 29 },
        { id: 'bulamsan-67', name: 'Iceberg', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: 'Iceberg Sector', attempts: 3 },
        { id: 'bulamsan-70', name: '푸르는 날', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: 'Iceberg Sector', attempts: 3 },
        { id: 'bulamsan-82', name: 'Project2', type: 'bouldering', difficulty: '?', fontGrade: '?', vGrade: '?', description: 'Iceberg Sector', attempts: 0 },
        { id: 'bulamsan-83', name: 'Project', type: 'bouldering', difficulty: '?', fontGrade: '?', vGrade: '?', description: 'Iceberg Sector', attempts: 0 },

        // Monorail Sector
        { id: 'bulamsan-2', name: 'Wacko', type: 'bouldering', difficulty: '8B+', fontGrade: '8B+', vGrade: 'V14', description: 'Monorail Sector', attempts: 1 },
        { id: 'bulamsan-10', name: 'One Punch Man', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'Monorail Sector', attempts: 11 },
        { id: 'bulamsan-17', name: 'Defined Line', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'Monorail Sector', attempts: 21 },
        { id: 'bulamsan-28', name: 'Mantle at the Mantlebloc', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: 'Monorail Sector', attempts: 7 },
        { id: 'bulamsan-33', name: 'No named', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Monorail Boulder1', attempts: 1 },
        { id: 'bulamsan-38', name: 'Straight up', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Monorail Sector', attempts: 16 },
        { id: 'bulamsan-41', name: 'The other Mantle', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: 'Monorail Sector', attempts: 3 },
        { id: 'bulamsan-55', name: '작은 천사', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: 'Monorail Sector', attempts: 7 },
        { id: 'bulamsan-66', name: 'The Copperfield', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: 'Monorail Sector', attempts: 1 },
        { id: 'bulamsan-73', name: 'Platonic-Solid', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V1', description: 'Monorail Sector', attempts: 1 },
        { id: 'bulamsan-77', name: '개구멍', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V0', description: 'Monorail Sector', attempts: 0 },
        { id: 'bulamsan-80', name: 'Route #9', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: 'Monorail Sector', attempts: 0 },
        { id: 'bulamsan-84', name: 'Project (Prismatoid)', type: 'bouldering', difficulty: '?', fontGrade: '?', vGrade: '?', description: 'Monorail Sector', attempts: 0 },
        { id: 'bulamsan-85', name: 'Project (Das Schwarze Auge)', type: 'bouldering', difficulty: '?', fontGrade: '?', vGrade: '?', description: 'Monorail Sector', attempts: 0 },

        // 마당바위(Madang)
        { id: 'bulamsan-8', name: 'Orion', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '마당바위(Madang)', attempts: 10 },
        { id: 'bulamsan-13', name: 'Sink Hole', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '마당바위(Madang)', attempts: 3 },
        { id: 'bulamsan-19', name: 'Carrier', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '마당바위(Madang)', attempts: 3 },
        { id: 'bulamsan-23', name: 'Pandemic', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '마당바위(Madang)', attempts: 2 },
        { id: 'bulamsan-30', name: 'Gemini', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '마당바위(Madang)', attempts: 7 },
        { id: 'bulamsan-32', name: 'WHO', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '마당바위(Madang)', attempts: 3 },
        { id: 'bulamsan-47', name: '마당1', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '마당바위(Madang)', attempts: 0 },
        { id: 'bulamsan-48', name: 'Beyond Sunshine', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '마당바위(Madang)', attempts: 0 },
        { id: 'bulamsan-56', name: '준호의 꿈', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: '마당바위(Madang)', attempts: 12 },
        { id: 'bulamsan-63', name: '마당3', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: '마당바위(Madang)', attempts: 13 },
        { id: 'bulamsan-64', name: '마당2', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: '마당바위(Madang)', attempts: 7 },
        { id: 'bulamsan-68', name: '뭔들', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: '마당바위(Madang)', attempts: 2 },
        { id: 'bulamsan-69', name: 'Zoodra', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: '마당바위(Madang)', attempts: 10 },
        { id: 'bulamsan-78', name: '성철이랑다훈이랑', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V0', description: '마당바위(Madang)', attempts: 0 },
        { id: 'bulamsan-79', name: '민제의 침대', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V0', description: '마당바위(Madang)', attempts: 0 },
        { id: 'bulamsan-81', name: '행클스타트', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: '마당바위(Madang)', attempts: 0 },
        { id: 'bulamsan-86', name: '마당0', type: 'bouldering', difficulty: '?', fontGrade: '?', vGrade: '?', description: '마당바위(Madang)', attempts: 0 },

        // Total Recall Block
        { id: 'bulamsan-3', name: 'Total Recall', type: 'bouldering', difficulty: '8A+', fontGrade: '8A+', vGrade: 'V12', description: 'Total Recall Block', attempts: 9 },
        { id: 'bulamsan-14', name: 'Rekall', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'Total Recall Block', attempts: 1 },

        // The Harp Block
        { id: 'bulamsan-15', name: 'The Harp', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'The Harp Block', attempts: 10 },

        // the V8 Block
        { id: 'bulamsan-18', name: '일곱난쟁이', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'the V8 Block', attempts: 14 },
        { id: 'bulamsan-21', name: 'the V8', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'the V8 Block', attempts: 16 },
        { id: 'bulamsan-25', name: '독사과', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'the V8 Block', attempts: 0 },
        { id: 'bulamsan-34', name: '백설공주', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'the V8 Block', attempts: 1 },

        // Warmup Block 2
        { id: 'bulamsan-11', name: 'Wrong Warmup', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'Warmup Block 2', attempts: 2 },
        { id: 'bulamsan-12', name: 'Madang Traverse', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'Warmup Block 2', attempts: 1 },
        { id: 'bulamsan-31', name: 'Bulamcool', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Warmup Block 2', attempts: 1 },
        { id: 'bulamsan-37', name: 'Oh Dyno', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Warmup Block 2', attempts: 12 },
        { id: 'bulamsan-39', name: 'Hankook Tire', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Warmup Block 2', attempts: 3 },
        { id: 'bulamsan-44', name: 'warmup 2', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Warmup block', attempts: 5 },
        { id: 'bulamsan-46', name: 'v4', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Warmup Block 2', attempts: 15 },
        { id: 'bulamsan-53', name: 'v4', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Warmup Block 2', attempts: 24 },
        { id: 'bulamsan-59', name: 'Noname', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: 'Warmup Block 2', attempts: 13 },
        { id: 'bulamsan-60', name: 'v3', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: 'Warmup Block 2', attempts: 15 },
        { id: 'bulamsan-61', name: 'Noname', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: 'Warmup Block 2', attempts: 3 },
        { id: 'bulamsan-65', name: 'Noname', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: 'Warmup Block 2', attempts: 0 },
        { id: 'bulamsan-71', name: '왕꿈틀이', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: 'Warmup Block 2', attempts: 23 },
        { id: 'bulamsan-72', name: '왕꿈틀이', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V2', description: 'Warmup Block 2', attempts: 1 },
        { id: 'bulamsan-74', name: 'Oh Mantle', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V0', description: 'Warmup Block 2', attempts: 2 },
        { id: 'bulamsan-76', name: 'Oh Mantle', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V0', description: 'Warmup Block 2', attempts: 0 },

        // Warmup block
        { id: 'bulamsan-52', name: 'warmup 1', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Warmup block', attempts: 6 },

        // Snakehead Block
        { id: 'bulamsan-5', name: 'Cocaine under the nose', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: 'Snakehead Block', attempts: 6 },
        { id: 'bulamsan-51', name: 'Snakehead', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Snakehead Block', attempts: 44 },

        // Pogostick Block
        { id: 'bulamsan-27', name: 'Pogostick', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: 'Pogostick Block', attempts: 1 },

        // Freaking
        { id: 'bulamsan-50', name: 'Freaking', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Freaking', attempts: 1 },

        // 비보이를 사랑한 발레리나
        { id: 'bulamsan-35', name: '비보이를 사랑한 발레리나', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '비보이를 사랑한 발레리나', attempts: 26 },
        { id: 'bulamsan-49', name: '비보이를 사랑한 발레리노 (직상)', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '비보이를 사랑한 발레리나', attempts: 0 },
        { id: 'bulamsan-57', name: '발레리나 warm up', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V3', description: '비보이를 사랑한 발레리나', attempts: 23 },

        // River Sector
        { id: 'bulamsan-75', name: 'Slab1', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V0', description: 'River Sector', attempts: 1 }
      ]
    }
  },
  {
    id: 'moraksan',
    name: '모락산 계원예대',
    region: '경기도',
    lat: 37.3833,
    lng: 127.1333,
    description: '모락산 계원예대 지역의 다양한 볼더링 구역',
    boulderInfo: {
      description: '모락산 계원예대의 볼더링 구역 정보',
      spots: [
        // 크롱 볼더 구역
        { id: 'moraksan-crong-1', name: '진달래', type: 'bouldering', difficulty: '8A', fontGrade: '8A', vGrade: convertFontToVGrade('8A'), description: '크롱 볼더 구역', attempts: 8 },
        { id: 'moraksan-crong-2', name: '악어의 눈물(Crocodile Tears)', type: 'bouldering', difficulty: '8A', fontGrade: '8A', vGrade: convertFontToVGrade('8A'), description: '크롱 볼더 구역', attempts: 2 },
        { id: 'moraksan-crong-3', name: '크롱', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: convertFontToVGrade('7C+'), description: '크롱 볼더 구역', attempts: 8 },
        { id: 'moraksan-crong-4', name: '악어새(Crocodile Bird)', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: convertFontToVGrade('7C'), description: '크롱 볼더 구역', attempts: 4 },
        { id: 'moraksan-crong-5', name: '베이비크롱', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '크롱 볼더 구역', attempts: 30 },
        { id: 'moraksan-crong-6', name: 'Dust Slide', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '크롱 볼더 구역', attempts: 3 },
        { id: 'moraksan-crong-7', name: '크롱탈출', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '크롱 볼더 구역', attempts: 25 },
        { id: 'moraksan-crong-8', name: 'Last crong', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '크롱 볼더 구역', attempts: 38 },

        // Dab boulder 구역
        { id: 'moraksan-dab-1', name: '상한크림파이', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: 'Dab boulder 구역', attempts: 0 },
        { id: 'moraksan-dab-2', name: '생크림파이', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'Dab boulder 구역', attempts: 11 },
        { id: 'moraksan-dab-3', name: 'Dab police', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Dab boulder 구역', attempts: 16 },
        { id: 'moraksan-dab-4', name: 'Heal the Heel', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: 'Dab boulder 구역', attempts: 20 },
        { id: 'moraksan-dab-5', name: 'School of Rock', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: 'Dab boulder 구역', attempts: 58 },
        { id: 'moraksan-dab-6', name: 'Masse', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: 'Dab boulder 구역', attempts: 0 },
        { id: 'moraksan-dab-7', name: '동물원', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Dab boulder 구역', attempts: 9 },
        { id: 'moraksan-dab-8', name: 'Small League', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Dab boulder 구역', attempts: 41 },
        { id: 'moraksan-dab-9', name: '손톱', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Dab boulder 구역', attempts: 14 },
        { id: 'moraksan-dab-10', name: '발등', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Dab boulder 구역', attempts: 10 },
        { id: 'moraksan-dab-11', name: 'Carom', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Dab boulder 구역', attempts: 2 },
        { id: 'moraksan-dab-12', name: '잘했으면', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Dab boulder 구역', attempts: 39 },
        { id: 'moraksan-dab-13', name: '크랙트래버스', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: 'Dab boulder 구역', attempts: 35 },
        { id: 'moraksan-dab-14', name: '포켓볼', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: 'Dab boulder 구역', attempts: 77 },
        { id: 'moraksan-dab-15', name: 'Ass Crack', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'Dab boulder 구역', attempts: 1 },
        { id: 'moraksan-dab-16', name: '말랐으면', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'Dab boulder 구역', attempts: 77 },
        { id: 'moraksan-dab-17', name: '키컷으면', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'Dab boulder 구역', attempts: 39 },
        { id: 'moraksan-dab-18', name: 'Up your crack', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'Dab boulder 구역', attempts: 3 },
        { id: 'moraksan-dab-19', name: '취객', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'Dab boulder 구역', attempts: 4 },
        { id: 'moraksan-dab-20', name: 'Brunch', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1', description: 'Dab boulder 구역', attempts: 26 },
        { id: 'moraksan-dab-21', name: 'Tree spotter', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1', description: 'Dab boulder 구역', attempts: 6 },
        { id: 'moraksan-dab-22', name: '손바닥', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1', description: 'Dab boulder 구역', attempts: 15 },
        { id: 'moraksan-dab-23', name: '뒷꿈치', type: 'bouldering', difficulty: '4+', fontGrade: '4+', vGrade: 'V0', description: 'Dab boulder 구역', attempts: 17 },
        { id: 'moraksan-dab-24', name: '모란선비', type: 'bouldering', difficulty: '4', fontGrade: '4', vGrade: 'V0', description: 'Dab boulder 구역', attempts: 0 },
        { id: 'moraksan-dab-25', name: '모락산', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: 'Dab boulder 구역', attempts: 1 },

        // 마당볼더 구역
        { id: 'moraksan-yard-1', name: '모락카노', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '마당볼더 구역', attempts: 32 },
        { id: 'moraksan-yard-2', name: 'first line', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '마당볼더 구역', attempts: 4 },
        { id: 'moraksan-yard-3', name: '공중부양', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '마당볼더 구역', attempts: 19 },
        { id: 'moraksan-yard-4', name: '마당크랙', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1', description: '마당볼더 구역', attempts: 41 },
        { id: 'moraksan-yard-5', name: '입등반금지', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: '마당볼더 구역', attempts: 4 },
        { id: 'moraksan-yard-6', name: '어려운 보라색', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '마당볼더 구역', attempts: 12 },
        { id: 'moraksan-yard-7', name: '무제', type: 'bouldering', difficulty: '4', fontGrade: '4', vGrade: 'V0', description: '마당볼더 구역', attempts: 1 },

        // 리틀볼더 구역
        { id: 'moraksan-little-1', name: '리틀그루브', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '리틀볼더 구역', attempts: 11 },
        { id: 'moraksan-little-2', name: '일방통행', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '리틀볼더 구역', attempts: 12 },
        { id: 'moraksan-little-3', name: 'Detour', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '리틀볼더 구역', attempts: 11 },
        { id: 'moraksan-little-4', name: '빵꾸똥꾸', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: '리틀볼더 구역', attempts: 3 },
        { id: 'moraksan-little-5', name: 'Easy cut', type: 'bouldering', difficulty: '4', fontGrade: '4', vGrade: 'V0', description: '리틀볼더 구역', attempts: 4 },
        { id: 'moraksan-little-6', name: '무죄', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: '리틀볼더 구역', attempts: 12 },
        { id: 'moraksan-little-7', name: '노숙자', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: '리틀볼더 구역', attempts: 2 },

        // 부엉이 바위 구역
        { id: 'moraksan-owl-1', name: 'Owl', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '부엉이 바위 구역', attempts: 4 },
        { id: 'moraksan-owl-2', name: 'Detroit smash', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: '부엉이 바위 구역', attempts: 9 },

        // 모비딕 볼더 구역
        { id: 'moraksan-mobydick-1', name: '링딩동', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '모비딕 볼더 구역', attempts: 11 },
        { id: 'moraksan-mobydick-2', name: '샤이니 트레버스', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '모비딕 볼더 구역', attempts: 1 },
        { id: 'moraksan-mobydick-3', name: '모비딕', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '모비딕 볼더 구역', attempts: 26 },
        { id: 'moraksan-mobydick-4', name: '모비딕언더', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '모비딕 볼더 구역', attempts: 0 },
        { id: 'moraksan-mobydick-5', name: '모비딕 Left', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: '모비딕 볼더 구역', attempts: 43 },
        { id: 'moraksan-mobydick-6', name: '샤이니', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: '모비딕 볼더 구역', attempts: 49 },

        // Valley Boulder 구역
        { id: 'moraksan-valley-1', name: 'Horsepens highball', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: 'Valley Boulder 구역', attempts: 1 },
        { id: 'moraksan-valley-2', name: 'South Alabama steel', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V2', description: 'Valley Boulder 구역', attempts: 1 },

        // 사선크랙 볼더 구역
        { id: 'moraksan-diagonal-1', name: 'Scarface', type: 'bouldering', difficulty: '6B', fontGrade: '6B', vGrade: 'V4', description: '사선크랙 볼더 구역', attempts: 24 },
        { id: 'moraksan-diagonal-2', name: 'Boulder problem #2', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: '사선크랙 볼더 구역', attempts: 0 },

        // 탱크 볼더 구역
        { id: 'moraksan-tank-1', name: '진실의 손', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1', description: '탱크 볼더 구역', attempts: 45 },
        { id: 'moraksan-tank-2', name: '(무제)', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1', description: '탱크 볼더 구역', attempts: 2 },
        { id: 'moraksan-tank-3', name: '물탱크', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: '탱크 볼더 구역', attempts: 61 },
        { id: 'moraksan-tank-4', name: '몸풀기', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'VB', description: '탱크 볼더 구역', attempts: 4 },

        // 모락산 스포츠 클라이밍
        { id: 'moraksan-sport-1', name: 'Moving sick', type: 'sport', difficulty: '4+', fontGrade: '4+', vGrade: 'V0', description: '모락산 스포츠 클라이밍', attempts: 0 },
        { id: 'moraksan-sport-2', name: 'Movingsick', type: 'sport', difficulty: '4+', fontGrade: '4+', vGrade: 'V0', description: '모락산 스포츠 클라이밍', attempts: 0 }
      ]
    }
  },
  {
    id: 'geomdansan',
    name: '검단산',
    region: '경기도',
    lat: 37.6111,
    lng: 126.7667,
    description: '검단산의 Memorial Boulder 구역은 다양한 난이도의 볼더링 문제들이 있는 인기 있는 클라이밍 장소입니다.',
    boulderInfo: {
      description: '검단산 Memorial Boulder 구역의 볼더링 정보',
      spots: [
        // 7C 이상 난이도
        { id: 'geomdansan-1', name: '현충 크랙(Memorial Crack)', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: convertFontToVGrade('7C'), description: 'Memorial Boulder 구역', attempts: 4 },
        { id: 'geomdansan-2', name: '현충 언더(Memorial Under)', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: convertFontToVGrade('7B+'), description: 'Memorial Boulder 구역', attempts: 1 },
        { id: 'geomdansan-3', name: '검단산(Black Sugar Mountain)', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: convertFontToVGrade('7B+'), description: 'Memorial Boulder 구역', attempts: 2 },
        { id: 'geomdansan-4', name: 'Green Mamba', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: convertFontToVGrade('7B+'), description: 'Memorial Boulder 구역', attempts: 0 },
        { id: 'geomdansan-5', name: '현충 탑(Memorial Top)', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: convertFontToVGrade('7A+'), description: 'Memorial Boulder 구역', attempts: 2 },
        { id: 'geomdansan-6', name: 'Black Mamba sit', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: convertFontToVGrade('7A+'), description: 'Memorial Boulder 구역', attempts: 0 },
        { id: 'geomdansan-7', name: 'Black Mamba', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: convertFontToVGrade('7A'), description: 'Memorial Boulder 구역', attempts: 2 },
        { id: 'geomdansan-8', name: '커브의 정석(FM of Curve)', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: convertFontToVGrade('7A'), description: 'Memorial Boulder 구역', attempts: 7 },
        
        // 6C+ 난이도
        { id: 'geomdansan-9', name: '바위의 정석 right(FM of Rock right)', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Memorial Boulder 구역', attempts: 3 },
        { id: 'geomdansan-10', name: '⚫️🔴', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Memorial Boulder 구역', attempts: 1 },
        { id: 'geomdansan-11', name: '현충 힐(Memorial Heel)', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Memorial Boulder 구역', attempts: 9 },
        { id: 'geomdansan-12', name: '찐진이(TrueJin)', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Memorial Boulder 구역', attempts: 7 },
        
        // 6B+ 난이도
        { id: 'geomdansan-13', name: '하남좌(Hanam Left)', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Memorial Boulder 구역', attempts: 4 },
        { id: 'geomdansan-14', name: '배달의 정석(FM of Delivery)', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Memorial Boulder 구역', attempts: 8 },
        { id: 'geomdansan-15', name: '태권V', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Memorial Boulder 구역', attempts: 7 },
        
        // 6A+ 이하 난이도
        { id: 'geomdansan-16', name: '삼메다', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: 'Memorial Boulder 구역', attempts: 5 },
        { id: 'geomdansan-17', name: 'Wild Body', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'Memorial Boulder 구역', attempts: 2 },
        { id: 'geomdansan-18', name: '상여좌(Sangyeo Left)', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'Memorial Boulder 구역', attempts: 7 },
        { id: 'geomdansan-19', name: '바위의 정석 left(FM of Rock left)', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V2', description: 'Memorial Boulder 구역', attempts: 7 },
        { id: 'geomdansan-20', name: "Bug's Life", type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1', description: 'Memorial Boulder 구역', attempts: 8 }
      ]
    }
  },
  // 다른 지역들
  {
    id: 'mudeungsan',
    name: '무등산',
    region: '광주광역시',
    lat: 35.1333,
    lng: 126.9833,
    description: '무등산의 대표적인 볼더링 구역으로, 다양한 난이도의 문제들이 있습니다.',
    boulderInfo: {
      description: '무등산의 볼더링 정보',
      spots: [
        // Eternal Sunshine 구역
        { id: 'mudeungsan-1', name: 'Eternal Sunshine', type: 'bouldering', difficulty: '8B+', fontGrade: '8B+', vGrade: convertFontToVGrade('8B+'), description: 'N1 구역' },
        { id: 'mudeungsan-2', name: 'Pinch Traverse', type: 'bouldering', difficulty: '8B+', fontGrade: '8B+', vGrade: convertFontToVGrade('8B+'), description: 'N1 구역' },
        { id: 'mudeungsan-3', name: 'Gear Third', type: 'bouldering', difficulty: '8B', fontGrade: '8B', vGrade: convertFontToVGrade('8B'), description: 'U1 구역' },
        { id: 'mudeungsan-4', name: 'Hymm(힘)', type: 'bouldering', difficulty: '8B', fontGrade: '8B', vGrade: convertFontToVGrade('8B'), description: '일석사조 구역' },
        { id: 'mudeungsan-5', name: 'Gear Second', type: 'bouldering', difficulty: '8A+', fontGrade: '8A+', vGrade: convertFontToVGrade('8A+'), description: 'U1 구역' },
        { id: 'mudeungsan-6', name: 'Kitty', type: 'bouldering', difficulty: '8A+', fontGrade: '8A+', vGrade: convertFontToVGrade('8A+'), description: 'U4 구역' },
        { id: 'mudeungsan-7', name: '유관신', type: 'bouldering', difficulty: '8A+', fontGrade: '8A+', vGrade: convertFontToVGrade('8A+'), description: '일석사조 구역' },
        { id: 'mudeungsan-8', name: '보릿고개', type: 'bouldering', difficulty: '8A+', fontGrade: '8A+', vGrade: convertFontToVGrade('8A+'), description: 'N5 구역' },
        { id: 'mudeungsan-9', name: '02062', type: 'bouldering', difficulty: '8A+', fontGrade: '8A+', vGrade: convertFontToVGrade('8A+'), description: 'N1 구역' },
        { id: 'mudeungsan-10', name: '한울이와 아이들', type: 'bouldering', difficulty: '8A', fontGrade: '8A', vGrade: convertFontToVGrade('8A'), description: 'E1 구역' },
        
        // 일석사조 구역
        { id: 'mudeungsan-11', name: '저 너머엔 무엇이', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: 'B8 구역' },
        { id: 'mudeungsan-12', name: '일석사조', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: '일석사조 구역' },
        { id: 'mudeungsan-13', name: '동혁이와 형들', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: 'E1 구역' },
        { id: 'mudeungsan-14', name: '날개 잃은 천사', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'U4 구역' },
        { id: 'mudeungsan-15', name: 'Dirty', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'U6 구역' },
        
        // 한울아 구역
        { id: 'mudeungsan-16', name: '이맘때', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'E1 구역' },
        { id: 'mudeungsan-17', name: '호기롭게', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'E1 구역' },
        { id: 'mudeungsan-18', name: '자유롭게', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'E1 구역' },
        { id: 'mudeungsan-19', name: '감미롭게', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: 'E1 구역' },
        { id: 'mudeungsan-20', name: '여유롭게', type: 'bouldering', difficulty: '5+', fontGrade: '5+', vGrade: 'V2', description: 'E1 구역' }
      ]
    }
  },
  {
    id: 'unilam',
    name: '운일암/반일암 계곡',
    region: '전라북도',
    lat: 35.8011,
    lng: 127.4239,
    description: '운일암/반일암 계곡은 전라북도 무주군에 위치한 암벽 등반 지역입니다. 다양한 난이도의 볼더링과 트래드 클라이밍 루트가 있으며, 특히 볼더링으로 유명합니다.',
    boulderInfo: {
      description: '운일암/반일암 계곡의 볼더링 정보',
      spots: [
        // 탱크 구역
        { id: 'unilam-1', name: '사이드 탱크(Side Tank)', type: 'bouldering', difficulty: '8A', fontGrade: '8A', vGrade: convertFontToVGrade('8A'), description: '탱크', attempts: 4 },
        { id: 'unilam-2', name: 'Tank', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: convertFontToVGrade('7C+'), description: '탱크', attempts: 2 },
        { id: 'unilam-3', name: '엘리베이터와 여자', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: convertFontToVGrade('6C+'), description: '탱크', attempts: 0 },
        // ... 이하 모든 spot에 대해 difficulty 기준 vGrade를 convertFontToVGrade로 재설정 ...

        // 발 없는 새 구역
        { id: 'unilam-4', name: 'Three little birds', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: '발 없는 새', attempts: 6 },
        { id: 'unilam-5', name: 'Bird Box', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '발 없는 새', attempts: 1 },
        { id: 'unilam-6', name: '발 없는 새', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '발 없는 새', attempts: 27 },
        { id: 'unilam-7', name: "Don't Hesitate,Sit", type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '발 없는 새', attempts: 12 },

        // 돌천막 구역
        { id: 'unilam-8', name: 'Under Pressure, sit', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: '돌천막', attempts: 1 },
        { id: 'unilam-9', name: 'Star Gate', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: '돌천막', attempts: 0 },
        { id: 'unilam-10', name: 'Wind Gate1', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '돌천막', attempts: 2 },
        { id: 'unilam-11', name: 'Gate of illusions', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: '돌천막', attempts: 21 },
        { id: 'unilam-12', name: 'Enemy of Gate', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '돌천막', attempts: 6 },
        { id: 'unilam-13', name: 'Under Pressure', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '돌천막', attempts: 2 },
        { id: 'unilam-14', name: 'Soft Tree', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '돌천막', attempts: 5 },
        { id: 'unilam-15', name: 'Korean El Poussah', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '돌천막', attempts: 2 },
        { id: 'unilam-16', name: 'New 다랑귀 놀이', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '돌천막', attempts: 23 },
        { id: 'unilam-17', name: 'Fly Harder', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '돌천막', attempts: 0 },
        { id: 'unilam-18', name: '오마이정', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '돌천막', attempts: 0 },
        { id: 'unilam-19', name: '붉은 노을', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '돌천막', attempts: 13 },
        { id: 'unilam-20', name: 'Fly Light', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '돌천막', attempts: 2 },

        // Holon 구역
        { id: 'unilam-21', name: '박쥐', type: 'bouldering', difficulty: '7C+', fontGrade: '7C+', vGrade: 'V10', description: 'Holon', attempts: 2 },
        { id: 'unilam-22', name: 'Homo Ludens', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Holon', attempts: 0 },
        { id: 'unilam-23', name: 'Holon', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Holon', attempts: 8 },

        // A6 구역
        { id: 'unilam-24', name: 'A6 Left, sit', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'A6', attempts: 0 },
        { id: 'unilam-25', name: 'Watchman', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'A6', attempts: 6 },
        { id: 'unilam-26', name: 'A6 Left', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'A6', attempts: 6 },
        { id: 'unilam-27', name: 'Road Hunter', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: 'A6', attempts: 1 },
        { id: 'unilam-28', name: 'Watchman Left', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'A6', attempts: 3 },
        { id: 'unilam-29', name: 'Snow Man', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'A6', attempts: 1 },
        { id: 'unilam-30', name: 'A6', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: 'A6', attempts: 17 },

        // 프리쳐스 구역
        { id: 'unilam-31', name: 'New Preachers', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '프리쳐스', attempts: 22 },
        { id: 'unilam-32', name: 'Preachers Direct', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '프리쳐스', attempts: 2 },
        { id: 'unilam-33', name: 'Son of preacher', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '프리쳐스', attempts: 1 },
        { id: 'unilam-34', name: '기다리 다이노', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '프리쳐스', attempts: 21 },
        { id: 'unilam-35', name: 'Maotai', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '프리쳐스', attempts: 12 },
        { id: 'unilam-36', name: 'Bishop', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '프리쳐스', attempts: 1 },
        { id: 'unilam-37', name: 'Festival', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: '프리쳐스', attempts: 66 },

        // 디리버리맨/알바트로스 구역
        { id: 'unilam-38', name: 'Since 1974, Low', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '디리버리맨/알바트로스', attempts: 2 },
        { id: 'unilam-39', name: 'Delivery Man, Direct, sit', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '디리버리맨/알바트로스', attempts: 16 },
        { id: 'unilam-40', name: '168다이노,Left', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '디리버리맨/알바트로스', attempts: 14 },
        { id: 'unilam-41', name: '168다이노', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '디리버리맨/알바트로스', attempts: 9 },
        { id: 'unilam-42', name: 'Since1974', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '디리버리맨/알바트로스', attempts: 34 },
        { id: 'unilam-43', name: 'Delivery Man, Low Start', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '디리버리맨/알바트로스', attempts: 5 },
        { id: 'unilam-44', name: 'Eagle', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '디리버리맨/알바트로스', attempts: 1 },
        { id: 'unilam-45', name: 'Since 1986', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '디리버리맨/알바트로스', attempts: 2 },
        { id: 'unilam-46', name: 'Delivery Man', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '디리버리맨/알바트로스', attempts: 57 },
        { id: 'unilam-47', name: 'Albatross', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: '디리버리맨/알바트로스', attempts: 41 },

        // 폭주족 구역
        { id: 'unilam-48', name: 'EasyBusy', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '폭주족', attempts: 1 },
        { id: 'unilam-49', name: '별아래 이끼', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '폭주족', attempts: 3 },
        { id: 'unilam-50', name: 'Family Business', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '폭주족', attempts: 20 },
        { id: 'unilam-51', name: '리틀 배트맨', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: '폭주족', attempts: 31 },

        // 고투헤븐 구역
        { id: 'unilam-52', name: '지옥의 묵시록', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '고투헤븐', attempts: 2 },
        { id: 'unilam-53', name: 'What The Hell', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '고투헤븐', attempts: 3 },
        { id: 'unilam-54', name: '천국과 지옥 사이', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '고투헤븐', attempts: 1 },
        { id: 'unilam-55', name: 'Go to Hell', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '고투헤븐', attempts: 29 },

        // 다이노 사피엔스 구역
        { id: 'unilam-56', name: 'Dyno Sapience, Sts', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '다이노 사피엔스', attempts: 1 },

        // 버티고 구역
        { id: 'unilam-57', name: '버티고', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '버티고', attempts: 4 },
        { id: 'unilam-58', name: 'Broken', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '버티고', attempts: 16 },

        // X맨 구역
        { id: 'unilam-59', name: 'ZMan', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'X맨', attempts: 3 },
        { id: 'unilam-60', name: 'X Man', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'X맨', attempts: 33 },
        { id: 'unilam-61', name: 'XMan Right', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'X맨', attempts: 0 },

        // 샤갈/말벌 구역
        { id: 'unilam-62', name: '샤갈의 눈내리는 마을', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '샤갈/말벌', attempts: 0 },

        // 긴팔 원숭이 구역
        { id: 'unilam-63', name: '긴팔 원숭이', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '긴팔 원숭이', attempts: 0 },

        // 대전 블루스 구역
        { id: 'unilam-64', name: '대전 블루스,Left', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: '대전 블루스', attempts: 0 },

        // 천렵 바위 구역
        { id: 'unilam-65', name: 'Bros', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '천렵 바위', attempts: 2 },
        { id: 'unilam-66', name: 'Range Against Machine', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '천렵 바위', attempts: 0 },
        { id: 'unilam-67', name: '천렵2', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '천렵 바위', attempts: 0 },
        { id: 'unilam-68', name: '삼각김밥 트래버스', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '천렵 바위', attempts: 1 },

        // Wind and Fire 구역
        { id: 'unilam-69', name: 'Wind and Fire', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Wind and Fire', attempts: 2 },

        // 탄이 구역
        { id: 'unilam-70', name: 'Bishop Kim', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '탄이', attempts: 0 },
        { id: 'unilam-71', name: '탄이(Tani)', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '탄이', attempts: 0 },

        // Mr.President 구역
        { id: 'unilam-72', name: 'Mr.President', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Mr.President', attempts: 0 },

        // Excalibur 구역
        { id: 'unilam-73', name: 'Stand Up', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Excalibur', attempts: 0 },

        // 이슬톡톡/Winter fish 구역
        { id: 'unilam-74', name: '충전기', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: '이슬톡톡/Winter fish', attempts: 1 },

        // Dryad 구역
        { id: 'unilam-75', name: 'Dryad', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'Dryad', attempts: 0 },

        // 니트로바 구역
        { id: 'unilam-76', name: 'Kneetrobar', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '니트로바', attempts: 11 },

        // 운일암 구역
        { id: 'unilam-77', name: '변태Ext', type: 'bouldering', difficulty: '7A', fontGrade: '7A', vGrade: 'V6', description: '운일암', attempts: 0 },
        { id: 'unilam-78', name: '변태', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '운일암', attempts: 2 },
        { id: 'unilam-79', name: 'Sneaky Snake', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '운일암', attempts: 2 },
        { id: 'unilam-80', name: '변태Ext, Right', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '운일암', attempts: 1 },

        // Special Korea 구역
        { id: 'unilam-81', name: 'Special Korea', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Special Korea', attempts: 4 },
        { id: 'unilam-82', name: '빵빵', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Special Korea', attempts: 0 },
        { id: 'unilam-83', name: '빵빵이', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Special Korea', attempts: 0 },

        // 탈출 구역
        { id: 'unilam-84', name: '탈출 Traverse', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '탈출', attempts: 1 },
        { id: 'unilam-85', name: '탈출', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '탈출', attempts: 1 },

        // 카타르시스 구역
        { id: 'unilam-86', name: 'Katharsis', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '카타르시스', attempts: 16 },

        // Since1975 구역
        { id: 'unilam-87', name: 'Since1975 밑으로', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Since1975', attempts: 4 },
        { id: 'unilam-88', name: 'Sunce1975', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Since1975', attempts: 3 },

        // 쪼꼬미 구역
        { id: 'unilam-89', name: '쪼꼬미(JJoggomi)', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '쪼꼬미', attempts: 1 },

        // 솔로 구역
        { id: 'unilam-90', name: '앉아 쫘', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '솔로', attempts: 0 },
        { id: 'unilam-91', name: 'Unobtanium', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '솔로', attempts: 0 },

        // Yellow Peach(황도) 구역
        { id: 'unilam-92', name: 'White Peach, Sit', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Yellow Peach(황도)', attempts: 2 },
        { id: 'unilam-93', name: 'Yellow Peach Left', type: 'bouldering', difficulty: '6C', fontGrade: '6C', vGrade: 'V5', description: 'Yellow Peach(황도)', attempts: 2 },

        // 기분전환 구역
        { id: 'unilam-94', name: '쵸코가 필요해', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '기분전환', attempts: 2 },

        // Time Attack 구역
        { id: 'unilam-95', name: 'Time Ataack', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Time Attack', attempts: 0 },

        // 물꽃/Hero 구역
        { id: 'unilam-96', name: 'Hero', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V8', description: '물꽃/Hero', attempts: 1 },
        { id: 'unilam-97', name: 'Free Hug', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: '물꽃/Hero', attempts: 0 },

        // Hell Boy 구역
        { id: 'unilam-98', name: 'Hell Boy', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'Hell Boy', attempts: 1 },

        // 만만한길 구역
        { id: 'unilam-99', name: '축제', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: '만만한길', attempts: 25 },
        { id: 'unilam-101', name: 'not too easy', type: 'bouldering', difficulty: '6a+', fontGrade: '6a+', vGrade: 'V3', description: '만만한길', attempts: 25 },

        // Wet Wet Wet 구역
        { id: 'unilam-100', name: 'Wet, Wet, Wet', type: 'bouldering', difficulty: '6B+', fontGrade: '6B+', vGrade: 'V5', description: 'Wet Wet Wet', attempts: 15 }
      ]
    }
  },
  {
    id: 'jukdo',
    name: '죽도암',
    region: '강원도',
    lat: 37.971545,
    lng: 128.765556,
    boulderInfo: {
      description: '죽도암의 볼더링 정보',
      spots: [
        { id: 'jukdo-1', name: '군함도', type: 'bouldering', difficulty: '7a+', fontGrade: '7a+', vGrade: 'V7', description: '컴프레션 루트. 긴 팔 길이가 유리합니다.' },
        { id: 'jukdo-2', name: '이대합격', type: 'bouldering', difficulty: '3', fontGrade: '3', vGrade: 'V0', description: '시트 스타트. 포켓을 따라 왼쪽으로 진행합니다.' },
        { id: 'jukdo-3', name: '가리비', type: 'bouldering', difficulty: '4+', fontGrade: '4+', vGrade: 'V0' },
        { id: 'jukdo-4', name: '조개속의 진주', type: 'bouldering', difficulty: '3+', fontGrade: '3+', vGrade: 'V0', description: '왼손으로 푸시하며 스탠딩 스타트. 쉬운 맨틀링.' },
        { id: 'jukdo-5', name: 'Barrel', type: 'bouldering', difficulty: '6a+', fontGrade: '6a+', vGrade: 'V4' },
        { id: 'jukdo-6', name: 'Mood', type: 'bouldering', difficulty: '6a+', fontGrade: '6a+', vGrade: 'V4', description: 'Free Climb와 동일 스타트 후 우측 방향 진행' },
        { id: 'jukdo-7', name: 'Free Climb', type: 'bouldering', difficulty: '6b+', fontGrade: '6b+', vGrade: 'V5', description: '라인 잘 지켜주세요. 가운데 포켓에서 직상합니다.' },
        { id: 'jukdo-8', name: 'Bestsleep', type: 'bouldering', difficulty: '7a+', fontGrade: '7a+', vGrade: 'V7' },
        { id: 'jukdo-9', name: 'Barrel standing', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1' },
        { id: 'jukdo-10', name: '유정이의 탑아웃', type: 'bouldering', difficulty: '4+', fontGrade: '4+', vGrade: 'V0', description: '1. 양손을 뻗어 오른손은 제일 튀어나온 끝 부분과 왼손은 어깨넓이 부분을 잡고 스타트 2. 양 발 찍고 왼쪽으로 이동 3. 왼손은 바위 윗부분에 튀어나온 탑을 잡고 왼손 스타트 부분에 오른발 힐을 걸어 안전하게 탑아웃' },
        { id: 'jukdo-11', name: 'Short board', type: 'bouldering', difficulty: '6a+', fontGrade: '6a+', vGrade: 'V4' },
        { id: 'jukdo-12', name: 'Fomula', type: 'bouldering', difficulty: '6c', fontGrade: '6c', vGrade: 'V5', description: '언더클링 스타트' },
        { id: 'jukdo-13', name: '해파랑길', type: 'bouldering', difficulty: '5', fontGrade: '5', vGrade: 'V1' },
        { id: 'jukdo-14', name: '대한민국', type: 'bouldering', difficulty: '7a', fontGrade: '7a', vGrade: 'V6' },
        { id: 'jukdo-15', name: '쿠쿠다스', type: 'bouldering', difficulty: '6c+', fontGrade: '6c+', vGrade: 'V6' },
        { id: 'jukdo-16', name: 'Chaechae', type: 'bouldering', difficulty: '6b', fontGrade: '6b', vGrade: 'V4' },
        { id: 'jukdo-17', name: 'Wave attack', type: 'bouldering', difficulty: '6a', fontGrade: '6a', vGrade: 'V3' }
      ]
    }
  },
  {
    id: 'bukhansan',
    name: '북한산',
    region: '서울특별시',
    lat: 37.6611,
    lng: 126.9789,
    description: '북한산은 서울특별시에 위치한 국립공원으로, 다양한 볼더링 구역이 있습니다. The Service Area와 Upper RBs 등 여러 구역으로 나뉘어 있습니다.',
    boulderInfo: {
      description: '북한산의 볼더링 정보',
      spots: [
        // 8B 난이도
        { id: 'bukhansan-1', name: 'Lucky', type: 'bouldering', difficulty: '8B', fontGrade: '8B', vGrade: 'V13', description: 'The Service Area', attempts: 8 },
        
        // 7C 난이도
        { id: 'bukhansan-2', name: 'Omit', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'The Service Area', attempts: 9 },
        { id: 'bukhansan-3', name: 'Bouldering on Blasphemy', type: 'bouldering', difficulty: '7C', fontGrade: '7C', vGrade: 'V9', description: 'The Service Area', attempts: 0 },
        
        // 7B+ 난이도
        { id: 'bukhansan-4', name: 'Mountain Talk', type: 'bouldering', difficulty: '7B+', fontGrade: '7B+', vGrade: 'V9', description: 'The Service Area', attempts: 1 },
        
        // 7B 난이도
        { id: 'bukhansan-5', name: 'Gimli', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'Upper RBs', attempts: 1 },
        { id: 'bukhansan-6', name: 'It goes like this', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'The Service Area', attempts: 19 },
        { id: 'bukhansan-7', name: 'Splinter', type: 'bouldering', difficulty: '7B', fontGrade: '7B', vGrade: 'V8', description: 'Upper RBs', attempts: 1 },
        
        // 7A+ 난이도
        { id: 'bukhansan-8', name: 'Innovation Strategy', type: 'bouldering', difficulty: '7A+', fontGrade: '7A+', vGrade: 'V7', description: 'The Service Area', attempts: 17 },
        
        // 6C+ 난이도
        { id: 'bukhansan-9', name: 'Anti-Scott', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'The Service Area', attempts: 20 },
        { id: 'bukhansan-10', name: 'Smooth Move', type: 'bouldering', difficulty: '6C+', fontGrade: '6C+', vGrade: 'V6', description: 'The Service Area', attempts: 0 },
        
        // 6A+ 난이도
        { id: 'bukhansan-11', name: 'Not-scott', type: 'bouldering', difficulty: '6A+', fontGrade: '6A+', vGrade: 'V4', description: 'The Service Area', attempts: 7 },
        
        // 6A 난이도
        { id: 'bukhansan-12', name: 'DMZ', type: 'bouldering', difficulty: '6A', fontGrade: '6A', vGrade: 'V3', description: 'The Service Area', attempts: 11 }
      ]
    }
  }
];

// Font Grade를 V-Grade로 변환하는 함수
export function convertFontToVGrade(fontGrade: string): string {
  const gradeMap: { [key: string]: string } = {
    '4': 'V0',
    '5': 'V1',
    '5+': 'V2',
    '6a': 'V3',
    '6a+': 'V4',
    '6b': 'V4',
    '6b+': 'V5',
    '6c': 'V5',
    '6c+': 'V6',
    '7a': 'V6',
    '7a+': 'V7',
    '7b': 'V8',
    '7b+': 'V9',
    '7c': 'V9',
    '7c+': 'V10',
    '8a': 'V11',
    '8a+': 'V12',
    '8b+': 'V13', // V13, V14 모두 8b+로 매핑됨
    '9a': 'V15',
    '?': '?'
  };
  return gradeMap[fontGrade.toLowerCase()] || fontGrade;
}

// V-Grade를 Font Grade로 변환하는 함수
export function convertVToFontGrade(vGrade: string): string {
  const gradeMap: { [key: string]: string } = {
    'V0': '4',
    'V1': '5',
    'V2': '5+',
    'V3': '6a',
    'V4': '6a+', // 또는 6b
    'V5': '6b+', // 또는 6c
    'V6': '6c+', // 또는 7a
    'V7': '7a+',
    'V8': '7b',
    'V9': '7b+', // 또는 7c
    'V10': '7c+',
    'V11': '8a',
    'V12': '8a+',
    'V13': '8b+',
    'V14': '8b+',
    'V15': '9a',
    '?': '?'
  };
  return gradeMap[vGrade.toUpperCase()] || vGrade;
}
