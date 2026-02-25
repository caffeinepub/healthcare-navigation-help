import { Link } from '@tanstack/react-router';
import { Heart, MapPin, Users, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const whoWeServe = [
  { emoji: '👨‍👩‍👧‍👦', label: 'Families managing healthcare costs' },
  { emoji: '🎓', label: 'Youth learning to advocate for themselves' },
  { emoji: '📋', label: 'First-time insurance users' },
  { emoji: '📄', label: 'People facing confusing medical bills' },
  { emoji: '🏥', label: 'Anyone unsure how to access affordable care' },
  { emoji: '🌍', label: 'Individuals navigating large healthcare systems' },
];

const whatWeDo = [
  { icon: '📚', title: 'Educational Guides', description: 'Easy-to-read resources explaining healthcare systems, insurance, and billing in plain language.' },
  { icon: '🎯', title: 'Workshops & Learning Sessions', description: 'Community workshops covering insurance basics, bill navigation, and advocacy skills.' },
  { icon: '🧭', title: 'Step-by-Step Navigation Tools', description: 'Guided journeys and checklists for common healthcare situations.' },
  { icon: '🗺️', title: 'Community Resource Mapping', description: 'A directory of local healthcare resources in Leominster and surrounding communities.' },
  { icon: '💪', title: 'Advocacy Skill Building', description: 'Tools and practice to help you communicate confidently with healthcare providers.' },
  { icon: '🤝', title: 'Real-Life Practice Scenarios', description: 'Practical examples and scenarios to build confidence before real healthcare encounters.' },
];

export function AboutPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">

        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <Heart className="w-4 h-4" />
            Our Mission
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Healthcare Access Should Be Fair, Understandable, and Achievable for Everyone
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Healthcare Navigation Help is a community support program designed to make healthcare easier
            to understand, easier to access, and more affordable for individuals and families.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground mb-16 max-w-4xl mx-auto">
          <p className="font-serif text-2xl md:text-3xl font-bold leading-relaxed">
            "No one should miss medical care because the system is confusing, overwhelming, or hard to afford."
          </p>
        </div>

        {/* What We Do */}
        <section className="mb-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
            What We Do
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            We provide clear guidance and practical tools so people can successfully move through the
            healthcare system step by step. We focus on real-life navigation skills, not just information.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatWeDo.map((item, i) => (
              <Card key={i} className="shadow-card border-border">
                <CardContent className="pt-6 pb-6">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-serif font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Who We Serve */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                <Users className="w-4 h-4" />
                Who We Serve
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built for Our Community
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our program is especially helpful for people who face barriers to healthcare that are
                not medical — but logistical, financial, or informational. We help people become
                confident healthcare decision-makers, not just patients.
              </p>
              <Button asChild className="font-bold">
                <Link to="/find-care">
                  Find Care Near You <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="space-y-3">
              {whoWeServe.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-card rounded-lg px-4 py-3 shadow-xs border border-border"
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-foreground text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-secondary rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <MapPin className="w-4 h-4" />
              Our Service Area
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Leominster, MA &amp; Surrounding Communities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We support individuals and families in Leominster and surrounding communities across
              Massachusetts, including Fitchburg, Gardner, Westminster, Lunenburg, and the broader
              North Central Massachusetts region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We also help individuals better understand how to navigate large regional healthcare
              systems, including providers such as UMass Memorial Medical Center and other major care
              networks serving our communities.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold mb-3">
              <Globe className="w-4 h-4" />
              Our Vision
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              From Local to Global Impact
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              Healthcare Navigation Help is building a model that can grow from local communities to
              regional, national, and global impact — empowering people everywhere to confidently
              access the care they need.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We believe that when people understand how to use the healthcare system, they get care
              earlier, reduce their financial burden, avoid confusion and mistakes, and take control
              of their health decisions. Healthcare becomes more accessible when people understand
              how to use it.
            </p>
          </div>
        </section>

        {/* Commitment */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-8 text-center">
            <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Commitment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              We are committed to making healthcare systems more transparent, more understandable,
              and more accessible — one person, one family, and one community at a time.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="font-bold">
                <Link to="/navigation-tools">
                  Start Your Journey <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link to="/education">
                  Browse Workshops &amp; Guides
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
