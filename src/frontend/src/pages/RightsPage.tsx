import { Link } from '@tanstack/react-router';
import {
  Shield,
  DollarSign,
  Languages,
  FileText,
  Stethoscope,
  RefreshCw,
  Zap,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  AlertCircle,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const rightsSections = [
  {
    icon: Zap,
    title: 'Emergency Care Rights',
    color: 'text-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800',
    summary:
      'If you have a medical emergency, hospitals that accept Medicare are legally required to provide stabilizing treatment — regardless of your ability to pay, insurance status, or immigration status.',
    points: [
      'Emergency rooms cannot turn you away or delay care to ask about payment.',
      'You must be stabilized before being transferred to another facility.',
      'This protection applies to all patients, insured or uninsured.',
      'You can request an interpreter at no cost during emergency care.',
    ],
  },
  {
    icon: DollarSign,
    title: 'Billing & Dispute Rights',
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    summary:
      'You have the right to understand every charge on your medical bill and to dispute errors. Billing mistakes are common — always ask for an itemized bill.',
    points: [
      'Request an itemized bill listing every service, supply, and charge.',
      'Compare your bill to your Explanation of Benefits (EOB) from your insurer.',
      'Dispute errors in writing and keep copies of all correspondence.',
      'Ask about financial hardship programs, payment plans, or charity care.',
      'Hospitals must provide a Good Faith Estimate before scheduled services.',
    ],
  },
  {
    icon: Languages,
    title: 'Language Assistance Rights',
    color: 'text-teal-700',
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-800',
    summary:
      'Healthcare providers who receive federal funding are required to provide free language assistance to patients with limited English proficiency. You should never have to pay for an interpreter.',
    points: [
      'Ask for a qualified medical interpreter — in person, by phone, or by video.',
      'You have the right to refuse a family member as your interpreter.',
      'Providers must translate vital documents upon request.',
      'Language assistance applies to sign language and other communication needs.',
      'File a complaint with the Office for Civil Rights if this right is denied.',
    ],
  },
  {
    icon: FileText,
    title: 'Medical Records Access',
    color: 'text-primary',
    bg: 'bg-primary/5',
    border: 'border-primary/20',
    summary:
      'Under federal law, you have the right to access, review, and obtain copies of your own medical records. Providers must respond to your request within 30 days.',
    points: [
      'Request your records in writing from any provider or hospital.',
      'Providers can charge a reasonable fee for copies but cannot deny access.',
      'You can request corrections to inaccurate information in your records.',
      'You control who else can access your health information (HIPAA).',
      'Electronic records must be provided in a readable electronic format if requested.',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Right to a Second Opinion',
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    summary:
      'You always have the right to seek a second opinion before agreeing to any diagnosis, treatment plan, or surgery. A good provider will support this decision.',
    points: [
      'Ask your doctor to refer you to another specialist for a second opinion.',
      'Many insurance plans cover second opinions — check your benefits.',
      'Bring your records and test results to the second provider.',
      'You are never obligated to proceed with a treatment you are unsure about.',
      'Second opinions are especially important for cancer diagnoses and major surgeries.',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Insurance Appeal Rights',
    color: 'text-accent-foreground',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    summary:
      'If your insurance company denies a claim or prior authorization, you have the right to appeal that decision — both internally through your insurer and externally through an independent review.',
    points: [
      'Request a written explanation for any denial.',
      'File an internal appeal with your insurance company within the allowed timeframe.',
      'If the internal appeal fails, request an external independent review.',
      'You can ask your state insurance commissioner for help with disputes.',
      'Keep records of all communications, dates, and reference numbers.',
    ],
  },
  {
    icon: Shield,
    title: 'Surprise Billing Protections',
    color: 'text-primary',
    bg: 'bg-primary/5',
    border: 'border-primary/20',
    summary:
      'Federal law protects you from unexpected bills from out-of-network providers in many situations — including emergency care and certain services at in-network facilities.',
    points: [
      'You cannot be billed more than in-network cost-sharing for emergency services.',
      'Out-of-network providers at in-network facilities cannot surprise-bill you without consent.',
      'You must receive a notice and consent form before being billed out-of-network for non-emergency care.',
      'Disputes between providers and insurers are handled through arbitration — not passed to you.',
      'Contact your insurer or the No Surprises Help Desk if you receive an unexpected bill.',
    ],
  },
];

const keyReminders = [
  'Always ask questions — you have the right to understand your care.',
  'Get everything in writing: diagnoses, treatment plans, referrals, and bills.',
  'You can refuse any treatment or procedure at any time.',
  'You have the right to privacy and confidentiality of your health information.',
  'Providers cannot discriminate based on race, color, national origin, sex, age, or disability.',
  'If you feel your rights were violated, you can file a complaint with the Office for Civil Rights.',
];

export default function RightsPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <Scale className="w-4 h-4" />
            Know Your Rights
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance">
            Your Healthcare Rights as a Patient
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            As a patient, you have important legal rights that protect you when seeking and
            receiving healthcare. Understanding these rights can help you get better care, avoid
            unexpected costs, and advocate for yourself with confidence.
          </p>
        </div>

        {/* Intro Alert */}
        <section className="mb-14 max-w-4xl mx-auto">
          <Alert className="border-primary/30 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">These Rights Apply to You</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Federal laws protect patients across the country. These rights apply regardless of
              your insurance status, income, immigration status, or where you live. If you believe
              your rights have been violated, you can file a complaint with the U.S. Department of
              Health and Human Services Office for Civil Rights.
            </AlertDescription>
          </Alert>
        </section>

        {/* Rights Sections */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Your Fundamental Patient Rights
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Seven key areas where federal law protects you as a healthcare consumer.
            </p>
          </div>

          <div className="space-y-5">
            {rightsSections.map((section, i) => {
              const Icon = section.icon;
              return (
                <Card
                  key={i}
                  className={`shadow-card border ${section.border} ${section.bg}`}
                >
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-card/60`}>
                        <Icon className={`w-5 h-5 ${section.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-foreground text-lg mb-2">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {section.summary}
                        </p>
                        <ul className="space-y-2">
                          {section.points.map((point, j) => (
                            <li key={j} className="flex items-start gap-2.5">
                              <CheckCircle className={`w-4 h-4 ${section.color} flex-shrink-0 mt-0.5`} />
                              <span className="text-foreground text-sm leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Key Reminders */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-secondary border border-border rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Always Remember
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              These reminders apply in every healthcare setting — from a routine checkup to a
              hospital stay. Keep them in mind whenever you interact with the healthcare system.
            </p>
            <ul className="space-y-3">
              {keyReminders.map((reminder, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm leading-relaxed">{reminder}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-8 text-center">
            <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Knowing your rights is just the beginning. Use my tools to find affordable care,
              understand your insurance, and navigate the healthcare system with confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="font-bold">
                <Link to="/challenges">
                  Common Healthcare Challenges <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link to="/navigation-tools">Start a Guided Journey</Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
