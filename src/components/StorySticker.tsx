import { useEffect, useRef } from 'react';
import { Location, ClimbingSpot, WeatherRecommendation } from '@/types/weather';

interface StoryStickerProps {
  location: Location;
  spot: ClimbingSpot;
  weatherResult: WeatherRecommendation;
}

export const StorySticker: React.FC<StoryStickerProps> = ({ location, spot, weatherResult }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateSticker = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정 (인스타그램 스토리 비율 9:16)
    canvas.width = 1080;
    canvas.height = 1920;

    // 배경색 설정 (연한 회색)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 배경 로고 그리기
    const logo = new Image();
    logo.src = '/logo.png';
    await new Promise((resolve) => {
      logo.onload = resolve;
    });
    
    // 로고 크기 계산 (화면의 80% 크기로)
    const logoSize = Math.min(canvas.width, canvas.height) * 0.8;
    const logoX = (canvas.width - logoSize) / 2;
    const logoY = (canvas.height - logoSize) / 2;
    
    // 로고 배경에 반투명한 흰색 오버레이 추가
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 로고 그리기 (투명도 0.15로 증가)
    ctx.globalAlpha = 0.15;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    ctx.globalAlpha = 1.0;

    // 상단 그라데이션 배경
    const headerGradient = ctx.createLinearGradient(0, 0, 0, 200);
    headerGradient.addColorStop(0, '#2c3e50');
    headerGradient.addColorStop(1, '#34495e');
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, canvas.width, 200);

    // 위치 정보
    ctx.fillStyle = 'white';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(location.name, canvas.width / 2, 60);
    ctx.font = 'bold 48px Arial';
    ctx.fillText(spot.name, canvas.width / 2, 120);

    // 시간 정보 컨테이너
    const timeContainerY = 250;
    const containerPadding = 40;
    const containerHeight = 400;
    
    // 컨테이너 배경
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    ctx.fillRect(
      containerPadding,
      timeContainerY,
      canvas.width - (containerPadding * 2),
      containerHeight
    );
    ctx.shadowBlur = 0;

    // 최적 등반 시간
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('최적 등반 시간', canvas.width / 2, timeContainerY + 60);
    
    // 최적 시간대 표시
    const optimalTime = weatherResult.optimalTime.split(' ~ ');
    if (optimalTime.length === 2) {
      ctx.font = 'bold 40px Arial';
      ctx.fillText(
        optimalTime[0] + ' ~ ' + optimalTime[1],
        canvas.width / 2,
        timeContainerY + 120
      );
    }

    // 추천 등반 시간
    ctx.font = 'bold 32px Arial';
    ctx.fillText('추천 등반 시간', canvas.width / 2, timeContainerY + 200);
    
    // 추천 시간대 표시 (시간 순서대로)
    const recommendedHours = weatherResult.hourlyData
      .map(hour => hour.hour)
      .sort((a, b) => a - b);
    
    // 시간대를 그룹화하여 표시
    const timeGroups = [];
    let currentGroup = [recommendedHours[0]];
    
    for (let i = 1; i < recommendedHours.length; i++) {
      if (recommendedHours[i] - recommendedHours[i-1] === 1) {
        currentGroup.push(recommendedHours[i]);
      } else {
        timeGroups.push([...currentGroup]);
        currentGroup = [recommendedHours[i]];
      }
    }
    timeGroups.push(currentGroup);
    
    // 시간대 그룹을 문자열로 변환
    const timeRanges = timeGroups.map(group => {
      if (group.length === 1) return `${group[0]}:00`;
      return `${group[0]}:00 ~ ${group[group.length-1]}:00`;
    });
    
    // 시간대 표시 (최대 2줄)
    ctx.font = 'bold 36px Arial';
    const maxWidth = canvas.width - (containerPadding * 4);
    let y = timeContainerY + 260;
    
    if (timeRanges.length <= 2) {
      // 한 줄에 하나의 시간대
      timeRanges.forEach((range, index) => {
        ctx.fillText(range, canvas.width / 2, y + (index * 50));
      });
    } else {
      // 여러 시간대를 한 줄에 표시
      const text = timeRanges.join(', ');
      const words = text.split(', ');
      let line = '';
      
      for (const word of words) {
        const testLine = line + (line ? ', ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
          ctx.fillText(line, canvas.width / 2, y);
          line = word;
          y += 50;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);
    }

    // 웹사이트 정보
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('bawi-weather-guide.vercel.app', canvas.width / 2, canvas.height - 40);
  };

  useEffect(() => {
    generateSticker();
  }, [location, spot, weatherResult]);

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `bawi-weather-${location.name}-${spot.name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="max-w-full rounded-lg shadow-lg"
        style={{ maxHeight: '80vh' }}
      />
      <button
        onClick={saveImage}
        className="rounded-lg bg-gray-700 px-6 py-3 text-white hover:bg-gray-600 transition-colors"
      >
        이미지 저장하기
      </button>
    </div>
  );
}; 