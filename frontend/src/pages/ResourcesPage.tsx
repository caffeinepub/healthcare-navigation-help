import { useState } from 'react';
import { Map } from 'lucide-react';
import { useCommunityResources } from '../hooks/useQueries';
import { ResourceDirectoryItem } from '../components/ResourceDirectoryItem';
import { Skeleton } from '@/components/ui/skeleton';
import type { CommunityResource } from '../backend';

const fallbackResources: CommunityResource[] = [
  {
    name: 'Leominster Community Medical Center',
    resourceType: 'Community Health Center',
    address: '123 Main Street, Leominster, MA 01453',
    phone: '978-555-4567',
    website: 'www.leominsterchc.org',
  },
  {
    name: 'North Central MA Free Clinic',
    resourceType: 'Community Health Center',
    address: '45 Central Street, Fitchburg, MA 01420',
    phone: '978-555-3456',
    website: undefined,
  },
  {
    name: 'Montachusett Opportunity Council',
    resourceType: 'Financial Aid',
    address: '100 Erdman Way, Leominster, MA 01453',
    phone: '978-345-7040',
    website: 'www.moc-inc.org',
  },
  {
    name: 'Behavioral Health Network',
    resourceType: 'Mental Health',
    address: '417 Main Street, Fitchburg, MA 01420',
    phone: '978-345-0181',
    website: 'www.bhninc.org',
  },
  {
    name: 'Leominster Dental Health Center',
    resourceType: 'Dental',
    address: '78 West Street, Leominster, MA 01453',
    phone: '978-555-8901',
    website: undefined,
  },
  {
    name: 'Greater Gardner Community Health Center',
    resourceType: 'Primary Care',
    address: '160 Elm Street, Gardner, MA 01440',
    phone: '978-630-6300',
    website: 'www.ggchc.org',
  },
  {
    name: 'Advocates Community Counseling',
    resourceType: 'Mental Health',
    address: '1 Arch Street, Leominster, MA 01453',
    phone: '978-537-0771',
    website: 'www.advocates.org',
  },
  {
    name: 'MassHealth Enrollment Center',
    resourceType: 'Financial Aid',
    address: '100 Erdman Way, Leominster, MA 01453',
    phone: '800-841-2900',
    website: 'www.mass.gov/masshealth',
  },
];

const resourceTypes = ['All', 'Community Health Center', 'Primary Care', 'Mental Health', 'Dental', 'Financial Aid'];

export function ResourcesPage() {
  const [activeType, setActiveType] = useState('All');
  const { data: resources, isLoading } = useCommunityResources();

  const displayResources = (resources && resources.length > 0) ? resources : fallbackResources;
  const filtered = activeType === 'All'
    ? displayResources
    : displayResources.filter((r) => r.resourceType === activeType);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <Map className="w-4 h-4" />
            Leominster, MA & Surrounding Communities
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Community Resources
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A directory of local healthcare resources in Leominster and surrounding Massachusetts
            communities. Find primary care, mental health services, dental care, and financial assistance near you.
          </p>
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                activeType === type
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary/40 hover:text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Resources List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((resource, i) => (
              <ResourceDirectoryItem key={i} resource={resource} />
            ))}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No resources found for this type.</p>
          </div>
        )}

        {/* Note */}
        <div className="mt-12 bg-secondary rounded-xl p-5 border border-border">
          <p className="text-sm text-foreground/80">
            <span className="font-bold text-primary">📍 Note: </span>
            Resource information is updated regularly, but we recommend calling ahead to confirm hours,
            availability, and services. Many community health centers offer same-day appointments and
            accept patients regardless of insurance status.
          </p>
        </div>
      </div>
    </main>
  );
}
