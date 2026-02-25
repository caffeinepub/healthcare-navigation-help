import { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InsuranceTermCard } from '../components/InsuranceTermCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useInsuranceTerms } from '../hooks/useQueries';
import type { InsuranceTerm } from '../backend';

// Fallback terms if backend is empty
const fallbackTerms: InsuranceTerm[] = [
  { term: 'Deductible', definition: 'The amount you pay for covered health services before your insurance starts to pay. For example, if your deductible is $1,000, you pay the first $1,000 of covered services yourself.' },
  { term: 'Copay', definition: 'A fixed amount you pay for a covered health care service, usually at the time of service. For example, $25 for a doctor visit or $10 for a prescription.' },
  { term: 'Premium', definition: 'The amount you pay for your health insurance every month, regardless of whether you use medical services or not.' },
  { term: 'Out-of-Pocket Maximum', definition: 'The most you have to pay for covered services in a plan year. After you spend this amount, your insurance pays 100% of covered services.' },
  { term: 'Coinsurance', definition: 'Your share of the costs of a covered health care service, calculated as a percentage. For example, if your coinsurance is 20%, you pay 20% and your insurance pays 80%.' },
  { term: 'In-Network', definition: 'Providers, hospitals, and facilities that have agreed to provide services to members of a health plan at negotiated rates. Using in-network providers costs you less.' },
  { term: 'Out-of-Network', definition: 'Providers, hospitals, and facilities that have NOT contracted with your health plan. Using out-of-network providers usually costs significantly more.' },
  { term: 'Explanation of Benefits (EOB)', definition: 'A statement from your insurance company explaining what medical treatments or services were paid for on your behalf. It is NOT a bill — it shows what was covered and what you may owe.' },
  { term: 'Prior Authorization', definition: 'Approval from your health insurance plan that may be required before you receive certain services, medications, or equipment. Without it, your insurance may not cover the cost.' },
  { term: 'Formulary', definition: 'A list of prescription drugs covered by your health insurance plan. Drugs on the formulary are covered; those not on it may require special approval or cost more.' },
  { term: 'Primary Care Provider (PCP)', definition: 'A doctor, nurse practitioner, or physician assistant who provides general health care. Your PCP is often your first point of contact and may coordinate referrals to specialists.' },
  { term: 'Referral', definition: 'A recommendation from your primary care provider to see a specialist or get certain medical services. Some insurance plans require a referral before they will cover specialist visits.' },
  { term: 'Open Enrollment', definition: 'A period each year when you can sign up for health insurance or change your existing plan. Outside of open enrollment, you can only enroll if you have a qualifying life event.' },
  { term: 'Qualifying Life Event', definition: 'A change in your life situation that allows you to enroll in or change health insurance outside of open enrollment. Examples include losing job-based coverage, getting married, or having a baby.' },
  { term: 'Health Savings Account (HSA)', definition: 'A tax-advantaged savings account you can use to pay for qualified medical expenses. You must be enrolled in a high-deductible health plan (HDHP) to contribute to an HSA.' },
  { term: 'Flexible Spending Account (FSA)', definition: 'An account that lets you set aside pre-tax dollars to pay for eligible health care expenses. Unlike an HSA, FSA funds typically must be used within the plan year.' },
  { term: 'Medicaid', definition: 'A joint federal and state program that provides health coverage to eligible low-income adults, children, pregnant women, elderly adults, and people with disabilities. In Massachusetts, this is called MassHealth.' },
  { term: 'Medicare', definition: 'A federal health insurance program for people 65 or older, and for some younger people with disabilities or certain conditions.' },
];

export function InsuranceGuidePage() {
  const [search, setSearch] = useState('');
  const { data: terms, isLoading } = useInsuranceTerms();

  const displayTerms = (terms && terms.length > 0) ? terms : fallbackTerms;

  const filtered = useMemo(() => {
    if (!search.trim()) return displayTerms;
    const q = search.toLowerCase();
    return displayTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [displayTerms, search]);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <BookOpen className="w-4 h-4" />
            Insurance Terms & Coverage
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Insurance Guide
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Insurance language can be confusing. This glossary explains common terms in plain, everyday
            language so you can understand your coverage and make informed decisions.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search insurance terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>

        {/* Count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} of {displayTerms.length} terms
          </p>
        )}

        {/* Terms Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((term, i) => (
              <InsuranceTermCard key={i} term={term} />
            ))}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No terms found for "{search}".</p>
            <button onClick={() => setSearch('')} className="text-primary hover:underline mt-2 text-sm">
              Clear search
            </button>
          </div>
        )}

        {/* Tip */}
        <div className="mt-12 bg-secondary rounded-xl p-5 border border-border">
          <p className="text-sm text-foreground/80">
            <span className="font-bold text-primary">💡 Tip: </span>
            When you receive an insurance card or plan documents, look for your deductible, out-of-pocket maximum,
            and copay amounts. These three numbers tell you the most about what you'll pay for care.
          </p>
        </div>
      </div>
    </main>
  );
}
