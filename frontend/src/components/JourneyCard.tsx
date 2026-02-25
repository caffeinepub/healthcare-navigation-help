import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Journey } from '../data/journeys';

interface JourneyCardProps {
  journey: Journey;
}

export function JourneyCard({ journey }: JourneyCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-200 border-border group">
      <CardContent className="pt-6 pb-6">
        <div className="text-4xl mb-4">{journey.icon}</div>
        <h3 className="font-serif font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors">
          {journey.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{journey.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            {journey.steps.length} steps
          </span>
          <Button asChild size="sm" className="font-semibold">
            <Link to="/journey/$journeyId" params={{ journeyId: journey.id }}>
              Start Journey <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
