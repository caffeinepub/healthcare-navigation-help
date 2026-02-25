import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
}

export function StepNavigator({ currentStep, totalSteps, onPrev, onNext }: StepNavigatorProps) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 0}
        className="font-semibold"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-200 ${
              i === currentStep
                ? 'w-6 h-3 bg-primary'
                : i < currentStep
                ? 'w-3 h-3 bg-primary/50'
                : 'w-3 h-3 bg-border'
            }`}
          />
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="font-semibold"
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
