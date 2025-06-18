import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type GradeType = 'font' | 'v';

interface DifficultyFilterProps {
  selectedGradeType: GradeType;
  onGradeTypeChange: (type: GradeType) => void;
}

export function DifficultyFilter({ selectedGradeType, onGradeTypeChange }: DifficultyFilterProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">난이도 표시</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button
            variant={selectedGradeType === 'font' ? 'default' : 'outline'}
            onClick={() => onGradeTypeChange('font')}
            className="flex-1 text-xs h-8"
          >
            Font Grade
          </Button>
          <Button
            variant={selectedGradeType === 'v' ? 'default' : 'outline'}
            onClick={() => onGradeTypeChange('v')}
            className="flex-1 text-xs h-8"
          >
            V-Grade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 