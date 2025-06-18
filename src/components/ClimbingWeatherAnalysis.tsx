import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { ClimbingCondition } from '@/utils/weatherAnalysis';

interface ClimbingWeatherAnalysisProps {
  analysis: ClimbingCondition;
}

const ClimbingWeatherAnalysis: React.FC<ClimbingWeatherAnalysisProps> = ({ analysis }) => {
  const StatusIcon = ({ isGood }: { isGood: boolean }) => 
    isGood ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-yellow-500" />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-slate-700">클라이밍 날씨 분석</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className={analysis.isOptimal ? "bg-green-50" : "bg-yellow-50"}>
          <AlertTitle className="flex items-center gap-2">
            {analysis.isOptimal ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Info className="h-5 w-5 text-yellow-500" />}
            {analysis.overallMessage}
          </AlertTitle>
          {analysis.recommendations.length > 0 && (
            <AlertDescription className="mt-2">
              <ul className="list-disc list-inside space-y-1">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">{rec}</li>
                ))}
              </ul>
            </AlertDescription>
          )}
        </Alert>

        <div className="grid gap-3">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50">
            <StatusIcon isGood={analysis.temperatureStatus.isGood} />
            <div>
              <div className="font-medium text-sm">온도</div>
              <div className="text-sm text-slate-600">{analysis.temperatureStatus.message}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50">
            <StatusIcon isGood={analysis.humidityStatus.isGood} />
            <div>
              <div className="font-medium text-sm">습도</div>
              <div className="text-sm text-slate-600">{analysis.humidityStatus.message}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50">
            <StatusIcon isGood={analysis.dewPointStatus.isGood} />
            <div>
              <div className="font-medium text-sm">이슬점</div>
              <div className="text-sm text-slate-600">{analysis.dewPointStatus.message}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50">
            <StatusIcon isGood={analysis.windStatus.isGood} />
            <div>
              <div className="font-medium text-sm">바람</div>
              <div className="text-sm text-slate-600">{analysis.windStatus.message}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClimbingWeatherAnalysis; 