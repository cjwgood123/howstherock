import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { LOCATIONS, Location, ClimbingSpot } from '@/types/weather';
import { DifficultyFilter, GradeType } from './DifficultyFilter';

interface LocationSelectorProps {
  selectedLocation: Location | null;
  selectedSpot: ClimbingSpot | null;
  onLocationSelect: (location: Location) => void;
  onSpotSelect: (spot: ClimbingSpot) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  selectedSpot,
  onLocationSelect,
  onSpotSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeType, setSelectedGradeType] = useState<GradeType>('font');

  const filteredSpots = useMemo(() => {
    if (!selectedLocation) return [];
    
    const spots = selectedLocation.boulderInfo?.spots || [];

    if (!searchQuery) return spots;

    const query = searchQuery.toLowerCase();
    return spots.filter(spot => 
      spot.name.toLowerCase().includes(query) ||
      spot.difficulty.toLowerCase().includes(query) ||
      (spot.description && spot.description.toLowerCase().includes(query))
    );
  }, [selectedLocation, searchQuery]);

  const getDisplayGrade = (spot: ClimbingSpot) => {
    if (selectedGradeType === 'v' && spot.vGrade) {
      return spot.vGrade;
    }
    if (selectedGradeType === 'font' && spot.fontGrade) {
      return spot.fontGrade;
    }
    return spot.difficulty;
  };

  const renderSpotButton = (spot: ClimbingSpot) => (
    <Button
      key={spot.id}
      variant={selectedSpot?.id === spot.id ? "default" : "outline"}
      onClick={() => onSpotSelect(spot)}
      className="w-full justify-start h-auto p-3"
    >
      <div className="text-left">
        <div className="font-medium">{spot.name}</div>
        <div className="text-xs text-muted-foreground">
          {spot.type} • {getDisplayGrade(spot)}
          {spot.description && (
            <div className="mt-1 text-xs text-slate-500">{spot.description}</div>
          )}
        </div>
      </div>
    </Button>
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-slate-700">자연볼더 선택</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2 text-slate-600">지역</p>
          <div className="grid grid-cols-1 gap-2 max-h-[240px] overflow-y-auto pr-2">
            {LOCATIONS.map((location) => (
              <Button
                key={location.id}
                variant={selectedLocation?.id === location.id ? "default" : "outline"}
                onClick={() => {
                  onLocationSelect(location);
                  setSearchQuery('');
                }}
                className="justify-start h-auto p-3"
              >
                <div className="text-left">
                  <div className="font-medium">{location.name}</div>
                  <div className="text-xs text-muted-foreground">{location.region}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {selectedLocation && (
          <div>
            <p className="text-sm font-medium mb-2 text-slate-600">볼더 정보</p>
            
            <DifficultyFilter
              selectedGradeType={selectedGradeType}
              onGradeTypeChange={setSelectedGradeType}
            />

            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="이름, 난이도, 설명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            {selectedLocation.boulderInfo?.description && !searchQuery && (
              <div className="text-sm text-slate-600 mb-4">
                {selectedLocation.boulderInfo.description}
              </div>
            )}

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {filteredSpots.length > 0 ? (
                filteredSpots.map(renderSpotButton)
              ) : (
                <div className="text-center text-sm text-slate-500 py-4">
                  {searchQuery ? '검색 결과가 없습니다.' : '볼더 정보가 없습니다.'}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
