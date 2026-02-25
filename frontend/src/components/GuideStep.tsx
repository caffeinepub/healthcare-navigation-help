interface GuideStepProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}

export function GuideStep({ stepNumber, title, children }: GuideStepProps) {
  return (
    <div className="flex gap-5 mb-8">
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg font-serif shadow-sm">
          {stepNumber}
        </div>
        {/* Connector line */}
        <div className="w-0.5 bg-primary/20 mx-auto mt-2 h-full min-h-[2rem]" />
      </div>
      <div className="flex-1 pb-6">
        <h3 className="font-serif font-bold text-foreground text-xl mb-3">{title}</h3>
        <div className="text-foreground/80 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
