import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  completed: number;
  total: number;
}

export function ProgressIndicator({ completed, total }: ProgressIndicatorProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-serif font-bold text-foreground text-lg">Your Progress</h3>
          <p className="text-sm text-muted-foreground">
            {completed} of {total} items completed
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-primary">{percentage}%</span>
        </div>
      </div>
      <Progress value={percentage} className="h-3" />
      {percentage === 100 && (
        <p className="text-sm text-primary font-semibold mt-3 text-center">
          🎉 You're fully prepared for your appointment!
        </p>
      )}
    </div>
  );
}
