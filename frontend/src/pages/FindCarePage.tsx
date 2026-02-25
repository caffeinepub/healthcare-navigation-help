import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { useHealthcareServices } from '../hooks/useQueries';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

// Fallback data in case backend is empty
const fallbackServices = [
  {
    category: 'Urgent Care',
    name: 'Leominster Urgent Care Center',
    description: 'Walk-in urgent care for non-life-threatening conditions. No appointment needed. Open 7 days a week for illnesses, minor injuries, and more.',
    contactInfo: '978-555-1234',
  },
  {
    category: 'Community Health',
    name: 'Leominster Community Medical Center',
    description: 'Federally Qualified Health Center offering primary care on a sliding-fee scale based on income. Serves uninsured and underinsured patients.',
    contactInfo: '978-555-4567',
  },
  {
    category: 'Routine Care',
    name: 'Greater Leominster Primary Care',
    description: 'Comprehensive primary care for adults and children. Preventive care, chronic disease management, and annual wellness visits.',
    contactInfo: '978-555-7890',
  },
  {
    category: 'Specialist',
    name: 'UMass Memorial Specialty Clinics',
    description: 'Specialist care including cardiology, orthopedics, dermatology, and more. Referral from primary care provider typically required.',
    contactInfo: '508-555-2345',
  },
  {
    category: 'Community Health',
    name: 'North Central MA Free Clinic',
    description: 'Free medical care for uninsured adults. Volunteer physicians provide basic primary care services at no cost.',
    contactInfo: '978-555-3456',
  },
  {
    category: 'Routine Care',
    name: 'Fitchburg Family Health Center',
    description: 'Family medicine practice accepting MassHealth and most insurance plans. Same-day appointments often available.',
    contactInfo: '978-555-6789',
  },
];

const categories = ['All', 'Urgent Care', 'Routine Care', 'Specialist', 'Community Health'];

const categoryGuidance: Record<string, string> = {
  'Urgent Care': 'Go here for: sudden illness, minor injuries, infections, or when your doctor is unavailable. Not for emergencies — call 911 for life-threatening situations.',
  'Routine Care': 'Go here for: annual checkups, managing chronic conditions, vaccinations, and preventive care. Establish a relationship with a primary care provider.',
  'Specialist': 'Go here for: specific health conditions requiring expert care. Usually requires a referral from your primary care provider.',
  'Community Health': 'Go here for: affordable or free care regardless of insurance status. Fees are based on your income (sliding scale).',
};

export function FindCarePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: services, isLoading } = useHealthcareServices();

  const displayServices = (services && services.length > 0) ? services : fallbackServices;
  const filtered = activeCategory === 'All'
    ? displayServices
    : displayServices.filter((s) => s.category === activeCategory);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <MapPin className="w-4 h-4" />
            Leominster, MA & Surrounding Communities
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Affordable Care
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Not sure where to go for your health needs? Browse care options by type and find the right
            place for your situation — from urgent walk-in care to free community clinics.
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

        {/* Guidance Banner */}
        {activeCategory !== 'All' && categoryGuidance[activeCategory] && (
          <div className="bg-primary/8 border border-primary/20 rounded-xl p-4 mb-8 text-sm text-foreground/80 leading-relaxed">
            <span className="font-bold text-primary">When to use {activeCategory}: </span>
            {categoryGuidance[activeCategory]}
          </div>
        )}

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((service, i) => (
              <ServiceCategoryCard key={i} service={service} />
            ))}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No services found for this category.</p>
          </div>
        )}

        {/* Emergency Note */}
        <div className="mt-12 bg-destructive/8 border border-destructive/20 rounded-xl p-5">
          <p className="text-sm text-foreground/80">
            <span className="font-bold text-destructive">🚨 Emergency? </span>
            If you are experiencing a life-threatening emergency, call <strong>911</strong> immediately or go to the nearest emergency room.
            Hospitals are required by law to treat you regardless of your insurance status or ability to pay.
          </p>
        </div>
      </div>
    </main>
  );
}
