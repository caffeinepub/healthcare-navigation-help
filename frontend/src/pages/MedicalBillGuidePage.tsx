import { FileText } from 'lucide-react';
import { GuideStep } from '../components/GuideStep';
import { CalloutBox } from '../components/CalloutBox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const commonErrors = [
  'Duplicate charges for the same service',
  'Incorrect patient information (name, date of birth, insurance ID)',
  'Wrong diagnosis or procedure codes (ICD/CPT codes)',
  'Charges for services you did not receive',
  'Unbundling — charging separately for services that should be billed together',
  'Upcoding — billing for a more expensive service than what was provided',
  'Incorrect dates of service',
];

const paymentOptions = [
  { title: 'Payment Plans', content: 'Most hospitals and providers will set up a payment plan with no interest. Call the billing department and ask. Be honest about what you can afford per month — they want to work with you.' },
  { title: 'Prompt-Pay Discounts', content: 'Some providers offer a discount if you pay your balance in full quickly. Ask the billing department if a prompt-pay discount is available.' },
  { title: 'Financial Hardship Programs', content: 'If you are experiencing financial hardship, ask about the provider\'s financial assistance or charity care program. You may qualify for significant bill reduction or forgiveness based on your income.' },
  { title: 'Health Safety Net (Massachusetts)', content: 'Massachusetts\' Health Safety Net program helps pay for certain health services for uninsured or underinsured residents who don\'t qualify for MassHealth. Ask your provider\'s billing department about this option.' },
  { title: 'Negotiation', content: 'Medical bills are often negotiable, especially if you are uninsured or paying out of pocket. You can ask for the "self-pay" or "cash-pay" rate, which is often significantly lower than the billed amount.' },
];

export function MedicalBillGuidePage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <FileText className="w-4 h-4" />
              Medical Bill Guide
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Understanding Your Medical Bill
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Receiving a medical bill can be confusing and stressful. This guide walks you through
              how to read your bill, spot errors, and find help if you can't afford to pay.
            </p>
          </div>

          {/* Patient Rights Callout */}
          <CalloutBox variant="right" title="Your Right to an Itemized Bill">
            You have the legal right to request an itemized bill from any healthcare provider.
            An itemized bill lists every single charge individually — every medication, supply, test,
            and service. Always request one before paying any medical bill. This is your right, and
            providers are required to provide it.
          </CalloutBox>

          {/* Step 1 */}
          <GuideStep stepNumber={1} title="How to Read a Medical Bill">
            <p className="mb-3">A medical bill typically includes several key sections:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Patient information</strong> — Your name, date of birth, and insurance ID. Verify these are correct.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Date(s) of service</strong> — When you received care. Check that these match your actual visit dates.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Procedure codes (CPT codes)</strong> — Numeric codes for each service provided. You can look these up online.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Diagnosis codes (ICD codes)</strong> — Codes representing your diagnosis. These affect what insurance covers.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Billed amount vs. allowed amount</strong> — The billed amount is what the provider charges; the allowed amount is what your insurance agreed to pay.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Your responsibility</strong> — What you owe after insurance has paid its portion.</span></li>
            </ul>
          </GuideStep>

          {/* Step 2 */}
          <GuideStep stepNumber={2} title="How to Identify Common Billing Errors">
            <p className="mb-4">
              Studies show that a significant percentage of medical bills contain errors. Always review
              your bill carefully before paying. Common errors include:
            </p>
            <ul className="space-y-2">
              {commonErrors.map((error, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-destructive font-bold mt-0.5">✗</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
            <CalloutBox variant="tip" title="What to Do If You Find an Error">
              Contact the provider's billing department immediately. Ask them to correct the error and
              resubmit the claim to your insurance if applicable. Get the correction in writing.
              If the error is not corrected, you can file a complaint with your state insurance commissioner.
            </CalloutBox>
          </GuideStep>

          {/* Step 3 */}
          <GuideStep stepNumber={3} title="How to Request an Itemized Bill">
            <p className="mb-3">Follow these steps to get your itemized bill:</p>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs">1</span>
                <span>Call the billing department at the phone number on your bill or the provider's main number.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs">2</span>
                <span>Say: "I would like to request an itemized bill for my visit on [date]."</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs">3</span>
                <span>Ask for it in writing (mail or email). Keep a copy for your records.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs">4</span>
                <span>Compare the itemized bill to your Explanation of Benefits (EOB) from your insurance company.</span>
              </li>
            </ol>
          </GuideStep>

          {/* Step 4 */}
          <GuideStep stepNumber={4} title="Exploring Payment Plans & Financial Assistance">
            <p className="mb-4">
              If you cannot afford your bill, you have options. Don't ignore the bill — contact the
              billing department and ask about the following:
            </p>
            <Accordion type="single" collapsible className="w-full">
              {paymentOptions.map((option, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="font-semibold text-left">{option.title}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {option.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GuideStep>

          {/* Final tip */}
          <div className="bg-secondary rounded-xl p-5 border border-border mt-4">
            <p className="text-sm text-foreground/80">
              <span className="font-bold text-primary">💡 Remember: </span>
              Never pay a medical bill you don't understand. You have the right to ask questions,
              request corrections, and negotiate. Most providers would rather work with you than send
              your bill to collections.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
