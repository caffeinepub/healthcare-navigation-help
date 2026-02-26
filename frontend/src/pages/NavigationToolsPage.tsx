import { Compass } from 'lucide-react';
import { JourneyCard } from '../components/JourneyCard';
import { journeys } from '../data/journeys';

export default function NavigationToolsPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <Compass className="w-4 h-4" />
            Step-by-Step Navigation Tools
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Healthcare Navigation Tools
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Not sure what to do next? Choose a guided journey that matches your situation.
            We'll walk you through each step with clear explanations and recommended actions.
          </p>
        </div>

        {/* Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {journeys.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>

        {/* How it works */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
            How Guided Journeys Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Choose Your Situation</h3>
              <p className="text-sm text-muted-foreground">
                Select the journey that best matches what you're going through right now.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">Follow the Steps</h3>
              <p className="text-sm text-muted-foreground">
                Each step explains what to do, why it matters, and what to expect.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">Take Action</h3>
              <p className="text-sm text-muted-foreground">
                Use the links and tips in each step to take real action with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
