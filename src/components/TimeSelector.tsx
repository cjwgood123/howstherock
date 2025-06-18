import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeSelectorProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-slate-700">등반 시간</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-time" className="text-sm font-medium text-slate-600">
              시작 시간
            </Label>
            <Select value={startTime} onValueChange={onStartTimeChange}>
              <SelectTrigger id="start-time">
                <SelectValue placeholder="시작 시간" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-time" className="text-sm font-medium text-slate-600">
              종료 시간
            </Label>
            <Select value={endTime} onValueChange={onEndTimeChange}>
              <SelectTrigger id="end-time">
                <SelectValue placeholder="종료 시간" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {startTime && endTime && (
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">
              등반 시간: <span className="font-medium">{startTime} ~ {endTime}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSelector;
