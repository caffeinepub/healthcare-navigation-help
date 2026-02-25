import { Card, CardContent } from '@/components/ui/card';
import type { InsuranceTerm } from '../backend';

interface InsuranceTermCardProps {
  term: InsuranceTerm;
}

export function InsuranceTermCard({ term }: InsuranceTermCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200 border-border">
      <CardContent className="pt-5 pb-5">
        <h3 className="font-serif font-bold text-primary text-lg mb-2">{term.term}</h3>
        <p className="text-foreground/80 text-sm leading-relaxed">{term.definition}</p>
      </CardContent>
    </Card>
  );
}
