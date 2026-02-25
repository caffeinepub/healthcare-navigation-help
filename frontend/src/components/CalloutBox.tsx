import { AlertCircle, Info, Lightbulb } from 'lucide-react';

type CalloutVariant = 'info' | 'tip' | 'warning' | 'right';

interface CalloutBoxProps {
  variant?: CalloutVariant;
  title: string;
  children: React.ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    bg: 'bg-primary/8',
    border: 'border-primary/30',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-accent/15',
    border: 'border-accent/40',
    iconColor: 'text-accent-foreground',
    titleColor: 'text-accent-foreground',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-destructive/8',
    border: 'border-destructive/30',
    iconColor: 'text-destructive',
    titleColor: 'text-destructive',
  },
  right: {
    icon: AlertCircle,
    bg: 'bg-secondary',
    border: 'border-primary/30',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
  },
};

export function CalloutBox({ variant = 'info', title, children }: CalloutBoxProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border-2 p-5 my-6 ${config.bg} ${config.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />
        <div>
          <h4 className={`font-bold text-base mb-1.5 ${config.titleColor}`}>{title}</h4>
          <div className="text-foreground/80 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
