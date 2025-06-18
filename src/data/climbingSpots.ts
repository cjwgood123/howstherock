import { Location, ClimbingSpot } from '@/types/weather';

export const climbingSpots: Location[] = [
  {
    id: 'anyang',
    name: '안양',
    spots: [
      {
        id: 'anyang-1',
        name: '안양 볼더링장',
        description: '안양 볼더링장은 실내 클라이밍 시설로, 다양한 난이도의 문제들이 있습니다.',
        difficulty: '초급~중급',
        type: '실내',
        address: '경기도 안양시 동안구 관악대로 1',
        coordinates: { lat: 37.3925, lng: 126.9269 }
      }
    ]
  },
  {
    id: 'mudeungsan',
    name: '무등산',
    spots: [
      {
        id: 'mudeungsan-1',
        name: 'Eternal Sunshine',
        description: '무등산의 대표적인 볼더링 구역으로, 다양한 난이도의 문제들이 있습니다. 특히 8B+ 난이도의 Eternal Sunshine과 Pinch Traverse가 유명합니다.',
        difficulty: '중급~상급',
        type: '야외',
        address: '광주광역시 동구 무등산',
        coordinates: { lat: 35.1333, lng: 126.9833 },
        routes: [
          { name: 'Eternal Sunshine', grade: '8B+', type: 'Boulder', attempts: 0, sector: 'N1' },
          { name: 'Pinch Traverse', grade: '8B+', type: 'Boulder', attempts: 0, sector: 'N1' },
          { name: 'Gear Third', grade: '8B', type: 'Boulder', attempts: 1, sector: 'U1' },
          { name: 'Hymm(힘)', grade: '8B', type: 'Boulder', attempts: 0, sector: '일석사조' },
          { name: 'Gear Second', grade: '8A+', type: 'Boulder', attempts: 2, sector: 'U1' },
          { name: 'Kitty', grade: '8A+', type: 'Boulder', attempts: 1, sector: 'U4' },
          { name: '유관신', grade: '8A+', type: 'Boulder', attempts: 2, sector: '일석사조' },
          { name: '보릿고개', grade: '8A+', type: 'Boulder', attempts: 5, sector: 'N5' },
          { name: '02062', grade: '8A+', type: 'Boulder', attempts: 2, sector: 'N1' },
          { name: '한울이와 아이들', grade: '8A', type: 'Boulder', attempts: 5, sector: 'E1' }
        ]
      },
      {
        id: 'mudeungsan-2',
        name: '일석사조',
        description: '무등산의 또 다른 인기 볼더링 구역으로, 다양한 난이도의 문제들이 있습니다.',
        difficulty: '중급~상급',
        type: '야외',
        address: '광주광역시 동구 무등산',
        coordinates: { lat: 35.1333, lng: 126.9833 },
        routes: [
          { name: '저 너머엔 무엇이', grade: '7C+', type: 'Boulder', attempts: 2, sector: 'B8' },
          { name: '일석사조', grade: '7C+', type: 'Boulder', attempts: 8, sector: '일석사조' },
          { name: '동혁이와 형들', grade: '7C+', type: 'Boulder', attempts: 2, sector: 'E1' },
          { name: '날개 잃은 천사', grade: '7C', type: 'Boulder', attempts: 3, sector: 'U4' },
          { name: 'Dirty', grade: '7C', type: 'Boulder', attempts: 9, sector: 'U6' }
        ]
      },
      {
        id: 'mudeungsan-3',
        name: '한울아',
        description: '무등산의 초급~중급 볼더링 구역으로, 입문자들에게 적합한 문제들이 많습니다.',
        difficulty: '초급~중급',
        type: '야외',
        address: '광주광역시 동구 무등산',
        coordinates: { lat: 35.1333, lng: 126.9833 },
        routes: [
          { name: '이맘때', grade: '7C', type: 'Boulder', attempts: 0, sector: 'E1' },
          { name: '호기롭게', grade: '7B+', type: 'Boulder', attempts: 1, sector: 'E1' },
          { name: '자유롭게', grade: '7A+', type: 'Boulder', attempts: 12, sector: 'E1' },
          { name: '감미롭게', grade: '6A+', type: 'Boulder', attempts: 1, sector: 'E1' },
          { name: '여유롭게', grade: '5+', type: 'Boulder', attempts: 0, sector: 'E1' }
        ]
      }
    ]
  }
]; 