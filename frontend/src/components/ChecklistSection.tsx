import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
}

interface ChecklistSectionProps {
  title: string;
  icon: string;
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function ChecklistSection({ title, icon, items, checked, onToggle }: ChecklistSectionProps) {
  const sectionChecked = items.filter((i) => checked[i.id]).length;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-serif font-bold text-foreground text-xl">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {sectionChecked} of {items.length} completed
          </p>
        </div>
      </div>
      <div className="space-y-3 pl-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
              checked[item.id]
                ? 'bg-primary/5 border-primary/20'
                : 'bg-card border-border hover:border-primary/30'
            }`}
            onClick={() => onToggle(item.id)}
          >
            <Checkbox
              id={item.id}
              checked={!!checked[item.id]}
              onCheckedChange={() => onToggle(item.id)}
              className="mt-0.5 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <Label
                htmlFor={item.id}
                className={`font-semibold text-sm cursor-pointer ${
                  checked[item.id] ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}
              >
                {item.label}
              </Label>
              {item.detail && (
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
