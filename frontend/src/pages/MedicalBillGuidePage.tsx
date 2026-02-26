import { Link } from '@tanstack/react-router';
import {
  FileText,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const billReadingSteps = [
  {
    step: '1',
    title: 'Request an Itemized Bill',
    description:
      'Always ask for an itemized bill that lists every charge individually. You have the right to receive one. This makes it easier to spot errors.',
  },
  {
    step: '2',
    title: 'Check for Errors',
    description:
      'Compare the itemized bill to your Explanation of Benefits (EOB) from your insurer. Look for duplicate charges, services you didn\'t receive, or incorrect billing codes.',
  },
  {
    step: '3',
    title: 'Verify Insurance Payments',
    description:
      'Confirm that your insurance company paid its share. Sometimes claims are denied or underpaid due to administrative errors.',
  },
  {
    step: '4',
    title: 'Understand Your Responsibility',
    description:
      'After insurance pays, you\'re responsible for your deductible, copay, and coinsurance. Make sure the amounts match your plan\'s terms.',
  },
  {
    step: '5',
    title: 'Negotiate or Apply for Assistance',
    description:
      'If you can\'t afford the bill, contact the billing department. Ask about financial assistance, charity care, or a payment plan. Many providers will reduce bills for uninsured or low-income patients.',
  },
];

const commonErrors = [
  'Duplicate charges for the same service',
  'Charges for services you didn\'t receive',
  'Incorrect patient information',
  'Wrong billing codes (upcoding or unbundling)',
  'Charges for items included in a bundled rate',
  'Incorrect insurance information leading to denied claims',
];

const negotiationTips = [
  {
    title: 'Ask for the Cash Pay Rate',
    description:
      'Hospitals often have lower rates for patients paying out of pocket. Ask specifically for the "cash pay" or "self-pay" rate.',
  },
  {
    title: 'Request a Payment Plan',
    description:
      'Most providers will set up interest-free payment plans. Ask for a plan you can realistically afford.',
  },
  {
    title: 'Apply for Charity Care',
    description:
      'Nonprofit hospitals are required to offer charity care. Ask the billing department about financial assistance programs before paying.',
  },
  {
    title: 'Hire a Medical Billing Advocate',
    description:
      'For large bills, a professional medical billing advocate can review your bill and negotiate on your behalf, often saving significant amounts.',
  },
];

export default function MedicalBillGuidePage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <FileText className="w-4 h-4" />
            Medical Bill Guide
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Understanding Your Medical Bills
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Learn how to read, review, and dispute your medical bills. Don't pay more than you owe.
          </p>
        </div>

        <div className="max-w-4xl space-y-10">
          {/* Important Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Don't Ignore Medical Bills</AlertTitle>
            <AlertDescription>
              Ignoring medical bills can lead to collections and credit damage. Contact the billing
              department as soon as possible to discuss your options — even if you can't pay right
              away.
            </AlertDescription>
          </Alert>

          {/* How to Read Your Bill */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
              How to Review Your Bill
            </h2>
            <div className="space-y-4">
              {billReadingSteps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Errors */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Common Billing Errors to Watch For
            </h2>
            <Card className="border-border">
              <CardContent className="pt-6">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {commonErrors.map((error) => (
                    <li
                      key={error}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      {error}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Negotiation Tips */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
              How to Negotiate Your Bill
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {negotiationTips.map((tip) => (
                <Card key={tip.title} className="border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* When to Get Help */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              When to Get Help
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Your bill is over $1,000 and you can\'t afford it',
                'Your insurance denied a claim you believe should be covered',
                'You received a bill for services you didn\'t receive',
                'You\'re being sent to collections',
                'You don\'t understand what you\'re being charged for',
                'You need help applying for financial assistance',
              ].map((situation) => (
                <div
                  key={situation}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {situation}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link to="/financial-assistance">
                <DollarSign className="mr-2 h-4 w-4" />
                Find Financial Assistance
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/resources">
                <Phone className="mr-2 h-4 w-4" />
                Find Local Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
