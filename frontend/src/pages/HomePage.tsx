import { Link } from '@tanstack/react-router';
import { ArrowRight, Search, FileText, DollarSign, Map, BookOpen, Compass, AlertTriangle, Shield } from 'lucide-react';
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
    description: 'Discover programs that can help cover your healthcare costs.',
    path: '/financial-assistance',
    color: 'text-accent-foreground',
    bg: 'bg-accent/15',
  },
  {
    icon: BookOpen,
    title: 'Community Resources',
    description: 'Browse local healthcare resources and support services near you.',
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
  {
    icon: AlertTriangle,
    title: 'Healthcare Challenges',
    description: 'Learn about common healthcare obstacles, billing pitfalls, and how to overcome them.',
    path: '/challenges',
    color: 'text-amber-600',
    bg: 'bg-amber-100 dark:bg-amber-950/40',
  },
  {
    icon: Shield,
    title: 'Know Your Rights',
    description: 'Learn about your fundamental rights as a patient and healthcare consumer.',
    path: '/healthcare-rights',
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

export default function HomePage() {
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
              Choose a topic to get started. All our tools are free and designed for real people
              navigating real situations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path} className="group">
                  <Card className="h-full shadow-card hover:shadow-card-hover transition-all duration-200 border-border group-hover:border-primary/30">
                    <CardContent className="pt-6 pb-6">
                      <div
                        className={`w-12 h-12 rounded-xl ${link.bg} flex items-center justify-center mb-4`}
                      >
                        <Icon className={`w-6 h-6 ${link.color}`} />
                      </div>
                      <h3 className="font-serif font-bold text-foreground text-lg mb-2">
                        {link.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5">
                  We Help You Navigate Every Step
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Healthcare can feel overwhelming — confusing paperwork, unexpected bills, and
                  hard-to-understand insurance. We're here to make it simpler.
                </p>
                <ul className="space-y-3">
                  {whatWeDo.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-primary font-bold text-lg">{item.emoji}</span>
                      <span className="text-foreground text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/assets/generated/section-bg-pattern.dim_1440x400.png"
                  alt="Healthcare navigation illustration"
                  className="rounded-2xl shadow-card w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Preparing for an Appointment?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Use our appointment prep checklist to make the most of your time with your doctor.
              Know what to bring, what to ask, and how to follow up.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="font-bold">
                <Link to="/appointment-prep">
                  Appointment Prep Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link to="/find-care">Find Care Near You</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
