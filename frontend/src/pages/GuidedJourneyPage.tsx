import { useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, ExternalLink, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepNavigator } from '../components/StepNavigator';
import { journeys } from '../data/journeys';

export function GuidedJourneyPage() {
  const { journeyId } = useParams({ from: '/journey/$journeyId' });
  const [currentStep, setCurrentStep] = useState(0);

  const journey = journeys.find((j) => j.id === journeyId);

  if (!journey) {
    return (
      <main className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Journey Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find that guided journey.</p>
          <Button asChild>
            <Link to="/navigation-tools">Back to Navigation Tools</Link>
          </Button>
        </div>
      </main>
    );
  }

  const step = journey.steps[currentStep];
  const progress = Math.round(((currentStep + 1) / journey.steps.length) * 100);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            to="/navigation-tools"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Navigation Tools
          </Link>

          {/* Journey Header */}
          <div className="mb-8">
            <div className="text-4xl mb-3">{journey.icon}</div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              {journey.title}
            </h1>
            <p className="text-muted-foreground">{journey.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold text-foreground">
                Step {currentStep + 1} of {journey.steps.length}
              </span>
              <span className="text-muted-foreground">{progress}% complete</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card animate-fade-in" key={currentStep}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg font-serif shrink-0">
                {currentStep + 1}
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">{step.title}</h2>
            </div>

            <p className="text-foreground/80 leading-relaxed text-base mb-5">{step.description}</p>

            {step.tip && (
              <div className="bg-accent/15 border border-accent/30 rounded-xl p-4 flex items-start gap-3 mb-5">
                <Lightbulb className="w-4 h-4 text-accent-foreground mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/80 leading-relaxed">{step.tip}</p>
              </div>
            )}

            {step.actionLabel && step.actionLink && (
              <Button asChild variant="outline" className="font-semibold">
                <Link to={step.actionLink}>
                  {step.actionLabel} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            )}
          </div>

          {/* Step Navigator */}
          <StepNavigator
            currentStep={currentStep}
            totalSteps={journey.steps.length}
            onPrev={() => setCurrentStep((s) => Math.max(0, s - 1))}
            onNext={() => setCurrentStep((s) => Math.min(journey.steps.length - 1, s + 1))}
          />

          {/* Completion */}
          {currentStep === journey.steps.length - 1 && (
            <div className="mt-6 bg-primary/8 border border-primary/20 rounded-xl p-5 text-center">
              <p className="font-bold text-primary text-lg mb-2">🎉 You've completed this journey!</p>
              <p className="text-sm text-muted-foreground mb-4">
                You now have the knowledge to navigate this situation with confidence.
              </p>
              <Button asChild variant="outline" className="font-semibold">
                <Link to="/navigation-tools">Explore More Journeys</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
