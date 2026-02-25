import { Link } from '@tanstack/react-router';
import { ArrowRight, Search, FileText, DollarSign, Map, BookOpen, Compass } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const quickLinks = [
  {
    icon: Search,
    title: 'Find Affordable Care',
    description: 'Locate low-cost clinics, community health centers, and urgent care near you.',
    path: '/find-care',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: FileText,
    title: 'Insurance Guide',
    description: 'Understand deductibles, copays, networks, and more in plain language.',
    path: '/insurance-guide',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: DollarSign,
    title: 'Medical Bill Help',
    description: 'Learn to read bills, spot errors, and find payment assistance.',
    path: '/medical-bills',
    color: 'text-accent-foreground',
    bg: 'bg-accent/15',
  },
  {
    icon: Map,
    title: 'Financial Assistance',
    description: 'Discover MassHealth, hospital charity care, and other programs.',
    path: '/financial-assistance',
    color: 'text-accent-foreground',
    bg: 'bg-accent/15',
  },
  {
    icon: BookOpen,
    title: 'Community Resources',
    description: 'Browse local healthcare resources in Leominster and surrounding areas.',
    path: '/resources',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Compass,
    title: 'Navigation Tools',
    description: 'Step-by-step guided journeys for common healthcare situations.',
    path: '/navigation-tools',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
];

const whatWeDo = [
  { emoji: '✔', text: 'Find low-cost or affordable healthcare services' },
  { emoji: '✔', text: 'Understand insurance terms and coverage' },
  { emoji: '✔', text: 'Prepare for doctor or hospital visits' },
  { emoji: '✔', text: 'Understand medical bills and payment options' },
  { emoji: '✔', text: 'Learn about financial assistance programs' },
  { emoji: '✔', text: 'Communicate confidently with healthcare providers' },
  { emoji: '✔', text: 'Make informed healthcare decisions' },
];

export function HomePage() {
  return (
    <main>
      <HeroSection />

      {/* Quick Links */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              How Can We Help You Today?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose a topic to get started. All our tools are free and designed for real people navigating real situations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path} className="group">
                  <Card className="h-full shadow-card hover:shadow-card-hover transition-all duration-200 border-border group-hover:border-primary/30">
                    <CardContent className="pt-6 pb-6">
                      <div className={`w-12 h-12 rounded-xl ${link.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${link.color}`} />
                      </div>
                      <h3 className="font-serif font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 section-pattern relative">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  We Support You Every Step of the Way
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Healthcare systems can be complicated. Many people don't know where to go for affordable care,
                  how insurance works, or what to do when they receive a medical bill. We provide clear guidance
                  and practical tools so you can move through the system with confidence.
                </p>
                <Button asChild className="font-bold">
                  <Link to="/about">
                    Learn About Our Mission <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-3">
                {whatWeDo.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card rounded-lg px-4 py-3 shadow-xs border border-border">
                    <span className="text-primary font-bold text-lg">{item.emoji}</span>
                    <span className="text-foreground text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Prep CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Have an Upcoming Appointment?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Use our interactive checklist to prepare — know what to bring, what to ask, and how to advocate for yourself.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-bold">
                <Link to="/appointment-prep">
                  Open Appointment Checklist <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-bold">
                <Link to="/education">
                  Browse Workshops & Guides
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
