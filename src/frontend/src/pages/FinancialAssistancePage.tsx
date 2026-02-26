import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { useAssistancePrograms } from '../hooks/useQueries';
import { ProgramCard } from '../components/ProgramCard';
import { LocationBar, type ActiveLocation } from '../components/LocationBar';
import { useGeolocation } from '../hooks/useGeolocation';
import { Skeleton } from '@/components/ui/skeleton';
import type { AssistanceProgram } from '../backend';

const fallbackPrograms: (AssistanceProgram & { tag: string })[] = [
  {
    name: 'State Medicaid Program',
    description:
      'Medicaid provides free or low-cost health coverage to eligible low-income adults, children, pregnant women, elderly adults, and people with disabilities. Each state runs its own Medicaid program.',
    eligibility:
      'Based on income, family size, age, disability status, and other factors. Eligibility rules vary by state.',
    contactInfo: 'Visit your state\'s Medicaid office or call 1-800-318-2596',
    tag: 'Public Coverage',
  },
  {
    name: "Children's Health Insurance Program (CHIP)",
    description:
      'CHIP provides low-cost health coverage to children in families that earn too much to qualify for Medicaid but cannot afford private insurance.',
    eligibility:
      'Children up to age 19 in families with incomes too high for Medicaid but who need affordable coverage.',
    contactInfo: 'Contact your state CHIP office or call 1-800-318-2596',
    tag: "Children's Coverage",
  },
  {
    name: 'Hospital Charity Care / Financial Assistance',
    description:
      'Most hospitals are required to offer charity care or financial assistance programs to patients who cannot afford their bills. Discounts or free care may be available based on income.',
    eligibility:
      'Based on income relative to the federal poverty level. Ask your local hospital\'s billing or financial counseling office.',
    contactInfo: 'Contact your local hospital\'s billing or patient financial services department',
    tag: 'Hospital Aid',
  },
  {
    name: 'Community Health Center Sliding Scale',
    description:
      'Federally Qualified Health Centers (FQHCs) offer primary care services on a sliding fee scale based on your income and family size, so you pay only what you can afford.',
    eligibility: 'Open to all patients regardless of ability to pay or insurance status.',
    contactInfo: 'Find a health center at findahealthcenter.hrsa.gov or call 1-877-464-4772',
    tag: 'Community Care',
  },
  {
    name: 'Prescription Assistance Programs',
    description:
      'Many pharmaceutical companies and nonprofits offer programs to help people who cannot afford their medications. Free or discounted prescriptions may be available.',
    eligibility:
      'Typically based on income and lack of adequate prescription drug coverage. Requirements vary by program.',
    contactInfo: 'Visit NeedyMeds.org or RxAssist.org, or call 1-800-503-6897',
    tag: 'Prescription Help',
  },
  {
    name: 'Health Insurance Marketplace / ACA Plans',
    description:
      'The Health Insurance Marketplace offers subsidized health insurance plans. Premium tax credits and cost-sharing reductions may significantly lower your monthly costs.',
    eligibility:
      "Available to U.S. citizens and legal residents who don't have access to affordable employer coverage.",
    contactInfo: 'Visit HealthCare.gov or call 1-800-318-2596',
    tag: 'Public Coverage',
  },
  {
    name: 'Veterans Health Administration (VA)',
    description:
      'The VA provides comprehensive healthcare services to eligible military veterans, including preventive care, mental health services, and specialty care.',
    eligibility: 'U.S. military veterans who meet service and other eligibility requirements.',
    contactInfo: 'Visit va.gov or call 1-800-827-1000',
    tag: 'State Program',
  },
];

const allTags = [
  'All',
  'Public Coverage',
  'State Program',
  'Hospital Aid',
  "Children's Coverage",
  'Prescription Help',
  'Community Care',
];

export default function FinancialAssistancePage() {
  const [activeTag, setActiveTag] = useState('All');
  const [activeLocation, setActiveLocation] = useState<ActiveLocation | null>(null);
  const geolocation = useGeolocation();
  const { data: programs, isLoading } = useAssistancePrograms();

  useEffect(() => {
    if (geolocation.status === 'success' && geolocation.coords && !activeLocation) {
      setActiveLocation({
        type: 'coords',
        label: 'your current location',
        coords: geolocation.coords,
      });
    }
  }, [geolocation.status, geolocation.coords, activeLocation]);

  const handleLocationSet = (location: ActiveLocation) => {
    setActiveLocation(location);
  };

  const handleLocationClear = () => {
    setActiveLocation(null);
    geolocation.reset();
  };

  const backendPrograms =
    programs && programs.length > 0
      ? programs.map((p) => ({ ...p, tag: 'Program' }))
      : null;

  const displayPrograms = backendPrograms ?? fallbackPrograms;
  const filtered =
    activeTag === 'All'
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
            programs below and learn how to apply. Don't let cost be a barrier to getting the care
            you need.
          </p>
        </div>

        {/* Location Bar */}
        <LocationBar
          geolocation={geolocation}
          activeLocation={activeLocation}
          onLocationSet={handleLocationSet}
          onLocationClear={handleLocationClear}
        />

        {/* Active location note */}
        {activeLocation && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing programs — enter your location to find local assistance near{' '}
            <span className="font-semibold text-primary">{activeLocation.label}</span>.
          </p>
        )}

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              type="button"
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
            {(['p1','p2','p3','p4','p5','p6'] as const).map((k) => (
              <Skeleton key={k} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((program) => (
              <ProgramCard key={program.name} program={program} tag={program.tag} />
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
            When applying for financial assistance, gather documents like recent pay stubs, tax
            returns, and proof of household size. Many programs have navigators who can help you
            complete the application — ask when you call.
          </p>
        </div>
      </div>
    </main>
  );
}
