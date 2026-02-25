import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useWorkshops } from '../hooks/useQueries';
import { WorkshopCard } from '../components/WorkshopCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Workshop } from '../backend';

type WorkshopWithCategory = Workshop & { category: string };

const fallbackWorkshops: WorkshopWithCategory[] = [
  {
    title: 'Navigating Health Insurance 101',
    description:
      'Learn the basics of health insurance, including how to read your insurance card, understand copays and deductibles, and use your benefits effectively.',
    audience: 'Open to all ages',
    date: 'Monthly — check schedule',
    location: 'Leominster Public Library',
    category: 'Workshop',
  },
  {
    title: 'Understanding Your Medical Bill',
    description:
      'A hands-on workshop walking through a sample medical bill. Learn to identify charges, spot errors, and know your rights as a patient.',
    audience: 'Adults and families',
    date: 'Quarterly',
    location: 'Leominster Community Center',
    category: 'Workshop',
  },
  {
    title: 'How to Find Affordable Care in Massachusetts',
    description:
      'A comprehensive guide to finding low-cost and free healthcare services in Leominster and surrounding communities, including community health centers and free clinics.',
    audience: 'Uninsured and underinsured residents',
    date: undefined,
    location: undefined,
    category: 'Guide',
  },
  {
    title: 'Advocacy Skills for Healthcare Appointments',
    description:
      'Learn how to communicate effectively with healthcare providers, ask the right questions, and advocate for your needs during medical appointments.',
    audience: 'All community members',
    date: 'Bi-monthly',
    location: 'Virtual (Zoom)',
    category: 'Advocacy',
  },
  {
    title: 'MassHealth & ConnectorCare Enrollment Help',
    description:
      'Step-by-step assistance with applying for MassHealth and ConnectorCare. Bring your documents and get personalized help completing your application.',
    audience: 'Uninsured Massachusetts residents',
    date: 'Every Tuesday',
    location: 'Montachusett Opportunity Council',
    category: 'Workshop',
  },
  {
    title: 'Healthcare Navigation for Youth',
    description:
      'A youth-focused session teaching young adults how to access healthcare independently, understand their insurance, and advocate for their health needs.',
    audience: 'Ages 16–25',
    date: 'Semester-based',
    location: 'Leominster High School & Community Centers',
    category: 'Advocacy',
  },
  {
    title: 'Reading Your Explanation of Benefits (EOB)',
    description:
      "Demystify the EOB document. Learn what it means, how to compare it to your bill, and what to do if something doesn't look right.",
    audience: 'Insurance holders',
    date: undefined,
    location: undefined,
    category: 'Guide',
  },
  {
    title: 'Prescription Assistance Programs Overview',
    description:
      'Discover programs that help cover the cost of medications, including manufacturer patient assistance programs, state programs, and local pharmacy resources.',
    audience: 'Anyone paying for prescriptions',
    date: undefined,
    location: undefined,
    category: 'Guide',
  },
];

const categories = ['All', 'Workshop', 'Guide', 'Advocacy'];

export function EducationPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: workshops, isLoading } = useWorkshops();

  const backendWorkshops: WorkshopWithCategory[] | null =
    workshops && workshops.length > 0
      ? workshops.map((w) => ({ ...w, category: 'Workshop' }))
      : null;

  const displayWorkshops: WorkshopWithCategory[] = backendWorkshops ?? fallbackWorkshops;

  const filtered =
    activeCategory === 'All'
      ? displayWorkshops
      : displayWorkshops.filter((w) => w.category === activeCategory);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <BookOpen className="w-4 h-4" />
            Educational Resources &amp; Workshops
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Education &amp; Workshops
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Build your healthcare knowledge and advocacy skills. Browse our educational guides,
            upcoming workshops, and skill-building sessions — all designed for real people navigating
            real situations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Workshops Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((workshop, i) => (
              <WorkshopCard key={i} workshop={workshop} category={workshop.category} />
            ))}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No resources found for this category.</p>
          </div>
        )}

        {/* Tip */}
        <div className="mt-12 bg-secondary rounded-xl p-5 border border-border">
          <p className="text-sm text-foreground/80">
            <span className="font-bold text-primary">💡 Stay Connected: </span>
            Workshops are offered regularly throughout the year. Contact us or check back often for
            updated schedules. All workshops are free and open to community members in Leominster and
            surrounding Massachusetts communities.
          </p>
        </div>
      </div>
    </main>
  );
}
