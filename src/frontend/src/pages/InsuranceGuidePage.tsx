import { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InsuranceTermCard } from '../components/InsuranceTermCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useInsuranceTerms } from '../hooks/useQueries';
import type { InsuranceTerm } from '../backend';

// Fallback terms if backend is empty
const fallbackTerms: InsuranceTerm[] = [
  {
    term: 'Deductible',
    definition:
      'The amount you pay for covered health services before your insurance starts to pay. For example, if your deductible is $1,000, you pay the first $1,000 of covered services yourself. After meeting your deductible, you typically share costs with your insurer through copays or coinsurance. Deductibles reset at the start of each plan year, so tracking your spending is important.',
  },
  {
    term: 'Copay',
    definition:
      'A fixed amount you pay for a covered health care service, usually at the time of service. For example, $25 for a doctor visit or $10 for a prescription. Copays are straightforward and predictable — you know exactly what you owe each visit. Some plans waive copays for preventive care like annual checkups or vaccinations.',
  },
  {
    term: 'Premium',
    definition:
      'The amount you pay for your health insurance every month, regardless of whether you use medical services or not. Think of it like a subscription fee to keep your coverage active. If you get insurance through an employer, your employer often pays a portion of the premium and you pay the rest through payroll deductions. Missing premium payments can cause your coverage to lapse.',
  },
  {
    term: 'Out-of-Pocket Maximum',
    definition:
      'The most you have to pay for covered services in a plan year. After you spend this amount on deductibles, copays, and coinsurance, your insurance pays 100% of covered services for the rest of the year. This cap protects you from very high medical costs. It does NOT include your monthly premiums or costs for out-of-network services on some plans.',
  },
  {
    term: 'Coinsurance',
    definition:
      'Your share of the costs of a covered health care service, calculated as a percentage after you have met your deductible. For example, if your coinsurance is 20%, you pay 20% of the bill and your insurance pays 80%. A common split is 80/20. Coinsurance applies to many services like hospital stays, surgeries, and specialist visits.',
  },
  {
    term: 'In-Network',
    definition:
      'Providers, hospitals, and facilities that have agreed to provide services to members of a health plan at negotiated (lower) rates. Using in-network providers costs you significantly less out of pocket. Always verify a provider is in-network before your appointment by calling your insurance company or checking their online directory, as provider lists can change.',
  },
  {
    term: 'Out-of-Network',
    definition:
      'Providers, hospitals, and facilities that have NOT contracted with your health plan. Using out-of-network providers usually costs significantly more and sometimes is not covered at all, except in emergencies. Some plan types like PPOs provide partial out-of-network coverage, while HMOs typically do not cover out-of-network care except for emergencies.',
  },
  {
    term: 'Explanation of Benefits (EOB)',
    definition:
      'A statement from your insurance company explaining what medical treatments or services were paid for on your behalf after a visit or procedure. It is NOT a bill — it shows what was billed, what your plan covered, and what you may still owe the provider. Review your EOB carefully and compare it to any bill you receive. Errors on medical bills are common, and the EOB helps you spot them.',
  },
  {
    term: 'Prior Authorization',
    definition:
      'Approval from your health plan required before you receive certain services, medications, or equipment. Without prior authorization, your plan may deny coverage or require you to pay the full cost yourself. Your doctor typically requests this on your behalf, but it is important to confirm approval before your procedure or prescription is filled. Common services that require prior authorization include specialty medications, MRIs, surgeries, and certain referrals.',
  },
  {
    term: 'Formulary',
    definition:
      'A list of prescription drugs covered by your health insurance plan, organized into tiers that determine your cost. Tier 1 drugs (generics) are usually the least expensive. Tier 2 includes preferred brand-name drugs at moderate cost. Tier 3 and above cover non-preferred or specialty drugs at higher cost. Drugs not on the formulary may require prior authorization or may not be covered at all. Always check the formulary before filling a new prescription to understand your costs.',
  },
  {
    term: 'COBRA',
    definition:
      'A federal law that allows you to continue your employer-sponsored health insurance coverage for a limited period (usually 18 months) after leaving a job, being laid off, or experiencing another qualifying event. The major drawback is that you pay the full premium — both your share and the employer\'s share — plus a small administrative fee, which can be expensive. COBRA is useful as a bridge while you search for new coverage.',
  },
  {
    term: 'HSA (Health Savings Account)',
    definition:
      'A tax-advantaged savings account available to people enrolled in a qualifying high-deductible health plan (HDHP). Money contributed to an HSA is not taxed, grows tax-free, and can be withdrawn tax-free for qualified medical expenses like doctor visits, prescriptions, dental care, and vision. Unlike FSAs, HSA funds roll over year to year and the account belongs to you even if you change jobs.',
  },
  {
    term: 'FSA (Flexible Spending Account)',
    definition:
      'A special account set up through your employer that lets you set aside pre-tax dollars to pay for eligible medical expenses. The key difference from an HSA is that FSA funds typically must be used within the plan year or you lose them — this is called the "use it or lose it" rule. Some employers offer a grace period or allow a small carryover. FSAs can be used for copays, prescriptions, medical equipment, and other approved expenses.',
  },
  {
    term: 'Medicaid',
    definition:
      'A joint federal and state government program that provides free or very low-cost health coverage to eligible low-income individuals and families, including children, pregnant women, elderly adults, and people with disabilities. Each state runs its own Medicaid program with different eligibility rules and benefits. To find out if you qualify, visit your state\'s Medicaid office or healthcare.gov. Enrollment is open year-round.',
  },
  {
    term: 'Medicare',
    definition:
      'A federal health insurance program primarily for people 65 and older, and for some younger people with certain disabilities or conditions like End-Stage Renal Disease. Medicare has several parts: Part A covers hospital stays, Part B covers doctor visits and outpatient care, Part C (Medicare Advantage) is an alternative offered through private insurers, and Part D covers prescription drugs. Understanding which parts apply to you is key to getting the most from your coverage.',
  },
  {
    term: 'Health Insurance Marketplace',
    definition:
      'A service available in every state — also called the Exchange — that helps individuals, families, and small businesses compare and enroll in health insurance plans. Plans are categorized as Bronze, Silver, Gold, and Platinum based on how costs are split between you and the insurer. Financial assistance in the form of premium tax credits and cost-sharing reductions may be available based on your household income. Open enrollment typically runs from November through January each year, with special enrollment periods for qualifying life events.',
  },
  {
    term: 'Open Enrollment',
    definition:
      'A set period each year when you can sign up for, change, or drop health insurance coverage. For Marketplace plans, open enrollment usually runs from November 1 through January 15. Employer plans typically hold open enrollment in the fall. Outside of open enrollment, you can only enroll or make changes if you have a qualifying life event such as losing other coverage, getting married, having a baby, or moving to a new area.',
  },
  {
    term: 'Special Enrollment Period (SEP)',
    definition:
      'A time outside of the annual open enrollment period when you are allowed to enroll in or change health insurance due to a qualifying life event. Common qualifying events include losing job-based coverage, getting married or divorced, having a baby or adopting a child, moving to a new coverage area, or gaining citizenship. You typically have 60 days from the qualifying event to enroll. Missing this window may mean waiting until the next open enrollment.',
  },
  {
    term: 'Primary Care Provider (PCP)',
    definition:
      'Your main doctor who provides general medical care, manages routine health concerns, and coordinates referrals to specialists when needed. Many insurance plans — particularly HMOs — require you to choose a PCP. Your PCP serves as your first point of contact for non-emergency medical issues, preventive care, vaccinations, and managing chronic conditions. Establishing a relationship with a PCP can save you money by helping you avoid unnecessary specialist or emergency room visits.',
  },
  {
    term: 'Referral',
    definition:
      'A recommendation or authorization from your primary care provider to see a specialist or receive certain services. Some insurance plans, especially HMOs, require a formal referral before they will cover specialist visits. Without a required referral, you may be responsible for the full cost of the visit. Always check your plan\'s referral requirements before scheduling appointments with specialists to avoid unexpected bills.',
  },
  {
    term: 'HMO (Health Maintenance Organization)',
    definition:
      'A type of health insurance plan that requires you to get care from doctors, hospitals, and other providers within its network. You typically need to choose a primary care provider and get referrals to see specialists. HMO plans generally have lower premiums and out-of-pocket costs, but less flexibility to see providers outside the network. Emergency care is covered regardless of network.',
  },
  {
    term: 'PPO (Preferred Provider Organization)',
    definition:
      'A type of health insurance plan that gives you more flexibility to see any doctor or specialist, in-network or out-of-network, without needing a referral. You pay less when using in-network providers, but you still have some coverage when seeing out-of-network providers. PPOs typically have higher premiums than HMOs but offer greater choice and convenience.',
  },
  {
    term: 'EPO (Exclusive Provider Organization)',
    definition:
      'A type of health plan that only covers care from doctors, specialists, and hospitals in its network, except in emergencies. Unlike PPOs, EPOs do not cover out-of-network care at all. Unlike HMOs, EPOs generally do not require referrals to see specialists. EPOs can offer lower premiums than PPOs while still providing easy access to specialists within the network.',
  },
  {
    term: 'Preventive Care',
    definition:
      'Health services focused on preventing illness or detecting health problems early when they are easier and less costly to treat. Under the Affordable Care Act, most health insurance plans are required to cover many preventive services at no cost to you — meaning no copay or deductible applies. These services include annual wellness visits, vaccinations, cancer screenings, blood pressure checks, and cholesterol testing. Taking advantage of free preventive care is one of the smartest ways to protect your health.',
  },
  {
    term: 'Pre-Existing Condition',
    definition:
      'A health problem you had before starting a new health insurance plan. Under the Affordable Care Act, insurance companies are prohibited from denying coverage or charging higher premiums based on pre-existing conditions for plans sold in the individual and small group markets. This protection means you cannot be turned away for having conditions like diabetes, asthma, cancer, or heart disease.',
  },
  {
    term: 'Claim',
    definition:
      'A request for payment that you or your healthcare provider submits to your health insurance company after you receive care. Providers typically file claims on your behalf directly with your insurer. After the claim is processed, you receive an Explanation of Benefits (EOB) detailing what was covered. If a claim is denied, you have the right to appeal the decision.',
  },
  {
    term: 'Appeal',
    definition:
      'A formal request to your insurance company to reconsider a denied claim or coverage decision. If your insurer denies payment for a service, you have the right to appeal. The first step is an internal appeal to the insurance company itself. If the internal appeal is denied, you can request an external review by an independent organization. Appeals must be submitted within specific deadlines, so act quickly when you receive a denial notice.',
  },
  {
    term: 'Balance Billing',
    definition:
      'When an out-of-network provider bills you for the difference between their charge and what your insurance paid, on top of your regular cost-sharing amounts. This can result in unexpectedly large bills. Federal law now protects patients from surprise balance billing in many situations, such as emergency care or when you unknowingly receive care from an out-of-network provider at an in-network facility. If you receive a surprise balance bill, you have the right to dispute it.',
  },
  {
    term: 'Coordination of Benefits',
    definition:
      'A process used when you are covered by more than one health insurance plan to determine which plan pays first (primary) and which pays second (secondary). For example, a child covered by both parents\' employer plans would have coordination of benefits. The primary plan pays its share first, then the secondary plan may cover some or all of the remaining costs. This can reduce your out-of-pocket expenses significantly.',
  },
];


export default function InsuranceGuidePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: terms, isLoading } = useInsuranceTerms();

  const displayTerms = terms && terms.length > 0 ? terms : fallbackTerms;

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return displayTerms;
    const q = searchQuery.toLowerCase();
    return displayTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [displayTerms, searchQuery]);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <BookOpen className="w-4 h-4" />
            Insurance Glossary
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Insurance Guide
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Understand common health insurance terms in plain language — no jargon, no confusion.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Terms Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['a','b','c','d','e','f','g','h']).map((id) => (
              <Skeleton key={id} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No terms found</p>
            <p className="text-sm">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((term) => (
              <InsuranceTermCard key={term.term} term={term} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
