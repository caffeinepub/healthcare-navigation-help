import { Link } from '@tanstack/react-router';
import {
  AlertTriangle,
  DollarSign,
  ShieldX,
  Languages,
  Car,
  Clock,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  PhoneCall,
  FileWarning,
  HeartPulse,
  BadgeAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const barriers = [
  {
    icon: DollarSign,
    title: 'Cost & Affordability',
    description:
      'Even with insurance, out-of-pocket costs like deductibles, copays, and coinsurance can add up fast. Many people skip care because they simply cannot afford it — even when they technically have coverage.',
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
  },
  {
    icon: ShieldX,
    title: 'Insurance Confusion',
    description:
      "Insurance plans are full of confusing terms, exclusions, and fine print. People often don't know what's covered until they get a surprise bill — sometimes months after a visit.",
    color: 'text-primary',
    bg: 'bg-primary/5',
    border: 'border-primary/20',
  },
  {
    icon: Languages,
    title: 'Language & Literacy Barriers',
    description:
      'Medical forms, insurance documents, and provider instructions are often written at a high reading level or only in English. This creates real obstacles for non-native speakers and those with limited health literacy.',
    color: 'text-teal-700',
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-800',
  },
  {
    icon: Car,
    title: 'Transportation',
    description:
      "Getting to appointments can be a major challenge — especially for people without a car, those with disabilities, or those who live far from providers. Missing appointments due to transportation leads to worse health outcomes.",
    color: 'text-accent-foreground',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
  },
  {
    icon: Clock,
    title: 'Long Wait Times',
    description:
      "Finding a new primary care doctor or specialist can take weeks or even months. People in urgent need often end up in the emergency room — the most expensive option — simply because they can't get a timely appointment.",
    color: 'text-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800',
  },
  {
    icon: HeartPulse,
    title: 'Fear & Distrust',
    description:
      'Past negative experiences, cultural differences, or fear of judgment can prevent people from seeking care. Many people delay treatment until a problem becomes serious — and far more expensive to treat.',
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
  },
];

const affordabilityTips = [
  {
    title: 'Community Health Centers',
    description:
      'Federally Qualified Health Centers (FQHCs) offer care on a sliding-fee scale based on your income. You pay only what you can afford.',
  },
  {
    title: 'Medicaid & Government Programs',
    description:
      'If your income is low, you may qualify for free or very low-cost health coverage through your state\'s Medicaid program or the Health Insurance Marketplace.',
  },
  {
    title: 'Hospital Charity Care',
    description:
      'Most hospitals are required to offer free or reduced-cost care to patients who qualify. Always ask the billing department about financial assistance before paying a large bill.',
  },
  {
    title: 'Prescription Assistance',
    description:
      'Many drug manufacturers offer patient assistance programs. GoodRx, NeedyMeds, and RxAssist can help you find discounts on medications.',
  },
];

const billingPitfalls = [
  {
    icon: FileWarning,
    title: 'Surprise Bills',
    description:
      'You can receive a bill from an out-of-network provider even if you went to an in-network hospital. Always ask if every provider involved in your care is in-network.',
  },
  {
    icon: BadgeAlert,
    title: 'Billing Errors Are Common',
    description:
      'Studies show that a significant percentage of medical bills contain errors. Always request an itemized bill and compare it to your Explanation of Benefits (EOB) from your insurer.',
  },
  {
    icon: PhoneCall,
    title: 'You Can Negotiate',
    description:
      'Medical bills are often negotiable. Call the billing department, explain your situation, and ask about payment plans, discounts for paying in full, or financial hardship programs.',
  },
];

const advocacyTips = [
  'Always bring a list of your current medications and allergies to every appointment.',
  "Write down your questions before your visit — don't leave without getting answers.",
  'Ask your doctor to explain things in plain language. It\'s okay to say "I don\'t understand."',
  'Request an interpreter if English is not your first language — it\'s your right.',
  'Get a second opinion for any major diagnosis or surgery recommendation.',
  'Keep copies of all your medical records, test results, and bills.',
  'If you disagree with an insurance denial, you have the right to appeal.',
  'Ask about generic medications — they are just as effective and much cheaper.',
];

export default function ChallengesPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <AlertTriangle className="w-4 h-4" />
            Know the Obstacles
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance">
            Common Healthcare Challenges &amp; How to Overcome Them
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            The U.S. healthcare system is complicated — and that's not your fault. Understanding
            the most common problems people face is the first step toward getting the care you
            deserve.
          </p>
        </div>

        {/* Section 1: Why Healthcare Is So Confusing */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Why Is Healthcare So Confusing and Expensive?
            </h2>
            <div className="space-y-4 text-primary-foreground/90 leading-relaxed">
              <p>
                The U.S. healthcare system is one of the most complex in the world. Unlike many
                other countries, there is no single unified system — instead, there are hundreds of
                different insurance plans, provider networks, billing codes, and rules that vary by
                employer, state, and plan type.
              </p>
              <p>
                Costs are often hidden until after you receive care. Prices for the same procedure
                can vary by thousands of dollars depending on where you go, who your insurer is,
                and whether a provider is "in-network." This lack of transparency makes it nearly
                impossible to plan or budget for healthcare.
              </p>
              <p>
                Administrative complexity adds to the burden. Patients are expected to understand
                insurance terminology, navigate prior authorizations, manage referrals, and dispute
                billing errors — all while dealing with health issues. It's a lot to handle, and
                most people never received any training on how to do it.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Common Barriers */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Common Barriers to Getting Care
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are the most frequent obstacles people face when trying to access healthcare.
              Recognizing them is the first step to working around them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {barriers.map((barrier, i) => {
              const Icon = barrier.icon;
              return (
                <Card
                  key={i}
                  className={`shadow-card border ${barrier.border} ${barrier.bg}`}
                >
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-6 h-6 ${barrier.color} flex-shrink-0`} />
                      <h3 className="font-serif font-bold text-foreground text-base">
                        {barrier.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {barrier.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Section 3: What To Do When You Can't Afford Care */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                What To Do When You Can't Afford Care
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                You have more options than you might think.
              </p>
            </div>
          </div>

          <Alert className="mb-6 border-primary/30 bg-primary/5">
            <Lightbulb className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Important to Know</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Never skip necessary medical care because of cost without first exploring your
              options. Many programs exist specifically to help people in your situation — but you
              have to ask.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {affordabilityTips.map((tip, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-5 shadow-xs flex gap-4"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="font-bold">
              <Link to="/financial-assistance">
                Explore Financial Assistance <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-bold">
              <Link to="/find-care">Find Low-Cost Care Near You</Link>
            </Button>
          </div>
        </section>

        {/* Section 4: Billing Pitfalls */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Avoiding Insurance &amp; Billing Pitfalls
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Billing mistakes and insurance surprises are extremely common. Here's what to watch
              out for.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {billingPitfalls.map((pitfall, i) => {
              const Icon = pitfall.icon;
              return (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5 shadow-xs flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{pitfall.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {pitfall.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="font-bold">
              <Link to="/medical-bills">
                Medical Bill Guide <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-bold">
              <Link to="/insurance-guide">Insurance Guide</Link>
            </Button>
          </div>
        </section>

        {/* Section 5: Self-Advocacy Tips */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-secondary border border-border rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Self-Advocacy Tips That Actually Work
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Being your own advocate in the healthcare system can feel intimidating — but these
              simple habits can make a big difference in the quality and cost of your care.
            </p>
            <ul className="space-y-3">
              {advocacyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-8 text-center">
            <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              You Don't Have to Figure This Out Alone
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              My tools and guides are here to help you navigate every step — from finding
              affordable care to understanding your bill and advocating for yourself.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="font-bold">
                <Link to="/navigation-tools">
                  Start a Guided Journey <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link to="/resources">Browse Community Resources</Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
