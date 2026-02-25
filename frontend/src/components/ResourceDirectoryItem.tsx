import { Phone, Globe, MapPin, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CommunityResource } from '../backend';

const typeColors: Record<string, string> = {
  'Community Health Center': 'bg-primary/10 text-primary border-primary/20',
  'Mental Health': 'bg-accent/20 text-accent-foreground border-accent/30',
  'Dental': 'bg-secondary text-secondary-foreground border-secondary',
  'Financial Aid': 'bg-accent-warm/20 text-accent-foreground border-accent-warm/30',
  'Primary Care': 'bg-primary/10 text-primary border-primary/20',
};

interface ResourceDirectoryItemProps {
  resource: CommunityResource;
}

export function ResourceDirectoryItem({ resource }: ResourceDirectoryItemProps) {
  const colorClass = typeColors[resource.resourceType] ?? 'bg-muted text-muted-foreground border-border';

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <h3 className="font-serif font-bold text-foreground text-lg">{resource.name}</h3>
        <Badge variant="outline" className={`shrink-0 text-xs font-semibold ${colorClass}`}>
          <Tag className="w-3 h-3 mr-1" />
          {resource.resourceType}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/60" />
          <span>{resource.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary font-semibold">
          <Phone className="w-4 h-4 shrink-0" />
          <span>{resource.phone}</span>
        </div>
        {resource.website && (
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 shrink-0 text-primary/60" />
            <a
              href={`https://${resource.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {resource.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
