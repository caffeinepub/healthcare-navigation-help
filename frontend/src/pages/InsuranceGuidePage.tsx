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
      'The amount you pay for covered health services before your insurance starts to pay. For example, if your deductible is $1,000, you pay the first $1,000 of covered services yourself.',
  },
  {
    term: 'Copay',
    definition:
      'A fixed amount you pay for a covered health care service, usually at the time of service. For example, $25 for a doctor visit or $10 for a prescription.',
  },
  {
    term: 'Premium',
    definition:
      'The amount you pay for your health insurance every month, regardless of whether you use medical services or not.',
  },
  {
    term: 'Out-of-Pocket Maximum',
    definition:
      'The most you have to pay for covered services in a plan year. After you spend this amount, your insurance pays 100% of covered services.',
  },
  {
    term: 'Coinsurance',
    definition:
      'Your share of the costs of a covered health care service, calculated as a percentage. For example, if your coinsurance is 20%, you pay 20% and your insurance pays 80%.',
  },
  {
    term: 'In-Network',
    definition:
      'Providers, hospitals, and facilities that have agreed to provide services to members of a health plan at negotiated rates. Using in-network providers costs you less.',
  },
  {
    term: 'Out-of-Network',
    definition:
      'Providers, hospitals, and facilities that have NOT contracted with your health plan. Using out-of-network providers usually costs significantly more.',
  },
  {
    term: 'Explanation of Benefits (EOB)',
    definition:
      'A statement from your insurance company explaining what medical treatments or services were paid for on your behalf. It is NOT a bill — it shows what was covered and what you may owe.',
  },
  {
    term: 'Prior Authorization',
    definition:
      'Approval from your health plan required before you receive certain services, medications, or equipment. Without it, your plan may not cover the cost.',
  },
  {
    term: 'Formulary',
    definition:
      'A list of prescription drugs covered by your health insurance plan. Drugs on the formulary are covered at lower cost; those not on it may require prior authorization.',
  },
  {
    term: 'COBRA',
    definition:
      'A federal law that allows you to continue your employer-sponsored health insurance coverage for a limited time after leaving a job, though you typically pay the full premium.',
  },
  {
    term: 'HSA (Health Savings Account)',
    definition:
      'A tax-advantaged savings account available to people enrolled in high-deductible health plans. Funds can be used for qualified medical expenses.',
  },
  {
    term: 'Medicaid',
    definition:
      'A joint federal and state program that provides free or low-cost health coverage to low-income individuals and families. Eligibility and benefits vary by state.',
  },
  {
    term: 'Medicare',
    definition:
      'A federal health insurance program primarily for people 65 and older, and for some younger people with disabilities or certain conditions.',
  },
  {
    term: 'Health Insurance Marketplace',
    definition:
      'A service available in every state that helps individuals, families, and small businesses shop for and enroll in affordable health insurance. Subsidies may be available based on income.',
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
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
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
            {filtered.map((term, idx) => (
              <InsuranceTermCard key={idx} term={term} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
