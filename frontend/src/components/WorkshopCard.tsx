import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Workshop } from '../backend';

interface WorkshopCardProps {
  workshop: Workshop;
  category?: string;
}

export function WorkshopCard({ workshop, category }: WorkshopCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200 border-border h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="font-serif text-lg text-foreground">{workshop.title}</CardTitle>
          {category && (
            <Badge variant="outline" className="shrink-0 text-xs bg-primary/10 text-primary border-primary/20">
              <Tag className="w-3 h-3 mr-1" />
              {category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{workshop.description}</p>
        <div className="space-y-1.5 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-primary/60" />
            <span>{workshop.audience}</span>
          </div>
          {workshop.date && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-primary/60" />
              <span>{workshop.date}</span>
            </div>
          )}
          {workshop.location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary/60" />
              <span>{workshop.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
