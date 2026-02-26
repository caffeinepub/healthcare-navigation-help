import { Phone, Tag, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AssistanceProgram } from '../backend';

interface ProgramCardProps {
  program: AssistanceProgram;
  tag?: string;
}

export function ProgramCard({ program, tag }: ProgramCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200 border-border h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="font-serif text-lg text-foreground">{program.name}</CardTitle>
          {tag && (
            <Badge variant="outline" className="shrink-0 text-xs bg-primary/10 text-primary border-primary/20">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <p className="text-muted-foreground text-sm leading-relaxed">{program.description}</p>
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-foreground mb-0.5">Eligibility</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{program.eligibility}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary font-semibold mt-auto">
          <Phone className="w-4 h-4" />
          <span>{program.contactInfo}</span>
        </div>
      </CardContent>
    </Card>
  );
}
