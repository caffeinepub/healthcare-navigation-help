import { Phone, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { HealthcareService } from '../backend';

const categoryColors: Record<string, string> = {
  'Urgent Care': 'bg-accent-coral/10 text-accent-foreground border-accent-coral/20',
  'Routine Care': 'bg-primary/10 text-primary border-primary/20',
  'Specialist': 'bg-secondary text-secondary-foreground border-secondary',
  'Community Health': 'bg-accent/20 text-accent-foreground border-accent/30',
};

const categoryIcons: Record<string, string> = {
  'Urgent Care': '🚑',
  'Routine Care': '🩺',
  'Specialist': '🔬',
  'Community Health': '🏘️',
};

interface ServiceCategoryCardProps {
  service: HealthcareService;
}

export function ServiceCategoryCard({ service }: ServiceCategoryCardProps) {
  const colorClass = categoryColors[service.category] ?? 'bg-muted text-muted-foreground border-border';
  const icon = categoryIcons[service.category] ?? '🏥';

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200 border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <CardTitle className="font-serif text-lg text-foreground">{service.name}</CardTitle>
          </div>
          <Badge variant="outline" className={`shrink-0 text-xs font-semibold ${colorClass}`}>
            <Tag className="w-3 h-3 mr-1" />
            {service.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
        {service.contactInfo && (
          <div className="flex items-center gap-2 text-sm text-primary font-semibold">
            <Phone className="w-4 h-4" />
            <span>{service.contactInfo}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
