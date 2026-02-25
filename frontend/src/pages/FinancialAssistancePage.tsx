import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useAssistancePrograms } from '../hooks/useQueries';
import { ProgramCard } from '../components/ProgramCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { AssistanceProgram } from '../backend';

const fallbackPrograms: (AssistanceProgram & { tag: string })[] = [
  {
    name: 'MassHealth',
    description: 'Massachusetts\' Medicaid program providing comprehensive health coverage for eligible low-income residents, including doctor visits, hospital care, prescriptions, and more.',
    eligibility: 'Based on income, family size, age, disability status, and immigration status. Many adults and children qualify.',
    contactInfo: '800-841-2900',
    tag: 'Public Coverage',
  },
  {
    name: 'ConnectorCare',
    description: 'Subsidized health insurance through the Massachusetts Health Connector for residents who earn too much for MassHealth but still need help affording coverage.',
    eligibility: 'Massachusetts residents with income between 100% and 300% of the Federal Poverty Level who are not offered affordable employer coverage.',
    contactInfo: '877-623-6765',
    tag: 'Public Coverage',
  },
  {
    name: 'Health Safety Net',
    description: 'A Massachusetts program that pays for certain health services for uninsured or underinsured residents who don\'t qualify for MassHealth. Covers hospital and community health center services.',
    eligibility: 'Massachusetts residents who are uninsured or underinsured with income at or below 400% of the Federal Poverty Level.',
    contactInfo: '800-841-2900',
    tag: 'State Program',
  },
  {
    name: 'UMass Memorial Charity Care',
    description: 'Financial assistance program for patients who receive care at UMass Memorial Medical Center and cannot afford to pay their bills. May cover all or part of your bill.',
    eligibility: 'Patients with income at or below 200% of the Federal Poverty Level may qualify for free care. Sliding scale assistance available up to 400% FPL.',
    contactInfo: '508-334-1000',
    tag: 'Hospital Aid',
  },
  {
    name: 'Leominster Hospital Financial Assistance',
    description: 'Hospital-based charity care program for patients who receive care at local facilities and demonstrate financial need. Applications reviewed on a case-by-case basis.',
    eligibility: 'Patients experiencing financial hardship. Income and asset verification required. Apply within 240 days of receiving services.',
    contactInfo: '978-466-2000',
    tag: 'Hospital Aid',
  },
  {
    name: 'Children\'s Medical Security Plan (CMSP)',
    description: 'A Massachusetts program providing basic health coverage for uninsured children under age 19 whose families do not qualify for MassHealth.',
    eligibility: 'Children under 19 who are Massachusetts residents and are uninsured. No income limit.',
    contactInfo: '800-841-2900',
    tag: 'Children\'s Coverage',
  },
  {
    name: 'Prescription Advantage',
    description: 'Massachusetts\' state pharmaceutical assistance program helping seniors and people with disabilities afford prescription medications.',
    eligibility: 'Massachusetts residents age 65 or older, or adults with disabilities, with income below program limits.',
    contactInfo: '800-243-4636',
    tag: 'Prescription Help',
  },
];

const allTags = ['All', 'Public Coverage', 'State Program', 'Hospital Aid', 'Children\'s Coverage', 'Prescription Help'];

export function FinancialAssistancePage() {
  const [activeTag, setActiveTag] = useState('All');
  const { data: programs, isLoading } = useAssistancePrograms();

  const backendPrograms = programs && programs.length > 0
    ? programs.map((p) => ({ ...p, tag: 'Program' }))
    : null;

  const displayPrograms = backendPrograms ?? fallbackPrograms;
  const filtered = activeTag === 'All'
    ? displayPrograms
    : displayPrograms.filter((p) => p.tag === activeTag);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <DollarSign className="w-4 h-4" />
            Financial Assistance Programs
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Financial Assistance
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            You may qualify for programs that help cover the cost of healthcare. Browse available
            programs below and learn how to apply. Don't let cost be a barrier to getting the care you need.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                activeTag === tag
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary/40 hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((program, i) => (
              <ProgramCard key={i} program={program} tag={program.tag} />
            ))}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No programs found for this category.</p>
          </div>
        )}

        {/* Tip */}
        <div className="mt-12 bg-secondary rounded-xl p-5 border border-border">
          <p className="text-sm text-foreground/80">
            <span className="font-bold text-primary">💡 Tip: </span>
            When applying for financial assistance, gather documents like recent pay stubs, tax returns,
            and proof of household size. Many programs have navigators who can help you complete the application —
            ask when you call.
          </p>
        </div>
      </div>
    </main>
  );
}
