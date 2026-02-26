import { useState, useEffect } from 'react';
import { Map, MapPin } from 'lucide-react';
import { useCommunityResources } from '../hooks/useQueries';
import { ResourceDirectoryItem } from '../components/ResourceDirectoryItem';
import { LocationBar, type ActiveLocation } from '../components/LocationBar';
import { useGeolocation } from '../hooks/useGeolocation';
import {
  sortResourcesByCoordinates,
  filterResourcesByZipProximity,
} from '../utils/locationUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { CommunityResource } from '../backend';

const fallbackResources: CommunityResource[] = [
  {
    name: 'Community Health Center',
    resourceType: 'Community Health Center',
    address: '123 Main Street, Anytown, USA',
    phone: '(800) 555-0100',
    website: 'findahealthcenter.hrsa.gov',
    zipCode: '',
    lat: undefined,
    lng: undefined,
  },
  {
    name: 'Free Community Clinic',
    resourceType: 'Free Clinic',
    address: '456 Oak Avenue, Your City, USA',
    phone: '(800) 555-0101',
    website: 'freeclinics.us',
    zipCode: '',
    lat: undefined,
    lng: undefined,
  },
  {
    name: 'Local Hospital Financial Assistance Office',
    resourceType: 'Hospital',
    address: '789 Hospital Drive, Your City, USA',
    phone: '(800) 555-0102',
    website: undefined,
    zipCode: '',
    lat: undefined,
    lng: undefined,
  },
  {
    name: 'Community Mental Health Center',
    resourceType: 'Mental Health',
    address: '321 Wellness Blvd, Your City, USA',
    phone: '(800) 555-0103',
    website: 'samhsa.gov/find-help',
    zipCode: '',
    lat: undefined,
    lng: undefined,
  },
  {
    name: 'Prescription Assistance Program',
    resourceType: 'Pharmacy',
    address: '654 Care Lane, Your City, USA',
    phone: '(800) 555-0104',
    website: 'needymeds.org',
    zipCode: '',
    lat: undefined,
    lng: undefined,
  },
  {
    name: 'Local Social Services Office',
    resourceType: 'Social Services',
    address: '987 Support Street, Your City, USA',
    phone: '(800) 555-0105',
    website: 'benefits.gov',
    zipCode: '',
    lat: undefined,
    lng: undefined,
  },
];

const resourceTypes = [
  'All',
  'Community Health Center',
  'Free Clinic',
  'Hospital',
  'Mental Health',
  'Pharmacy',
  'Social Services',
  'Primary Care',
  'Financial Aid',
  'Dental',
];

export default function ResourcesPage() {
  const [activeType, setActiveType] = useState('All');
  const [activeLocation, setActiveLocation] = useState<ActiveLocation | null>(null);
  const geolocation = useGeolocation();

  const { data: resources, isLoading } = useCommunityResources();

  const baseResources =
    resources && resources.length > 0 ? resources : fallbackResources;

  // Apply type filter first
  const typeFiltered =
    activeType === 'All'
      ? baseResources
      : baseResources.filter((r) => r.resourceType === activeType);

  // Determine active coordinates (from geolocation or geocoded manual input)
  const activeLat =
    activeLocation?.resolvedLat ??
    (activeLocation?.type === 'coords' ? activeLocation.coords?.latitude : undefined);
  const activeLng =
    activeLocation?.resolvedLng ??
    (activeLocation?.type === 'coords' ? activeLocation.coords?.longitude : undefined);

  // Apply location filter / sort on top of type filter
  let locationFiltered: Array<{ resource: CommunityResource; distance: number | null }> =
    typeFiltered.map((r) => ({ resource: r, distance: null }));
  let noLocationResults = false;

  if (activeLocation) {
    if (activeLat != null && activeLng != null) {
      // Coordinate-based sort using haversine distance
      const sorted = sortResourcesByCoordinates(typeFiltered, activeLat, activeLng);
      locationFiltered = sorted;
    } else if (activeLocation.type === 'manual' && activeLocation.zip) {
      // Fallback: zip-based proximity filter
      const nearby = filterResourcesByZipProximity(typeFiltered, activeLocation.zip, 200);
      if (nearby.length > 0) {
        locationFiltered = nearby.map((r) => ({ resource: r, distance: null }));
      } else {
        locationFiltered = [];
        noLocationResults = true;
      }
    }
    // If we have no coords and no zip, show all (no filtering)
  }

  // Sync geolocation success → set active location once
  useEffect(() => {
    if (geolocation.status === 'success' && geolocation.coords && !activeLocation) {
      setActiveLocation({
        type: 'coords',
        label: 'your current location',
        coords: geolocation.coords,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation.status, geolocation.coords]);

  const handleLocationSet = (location: ActiveLocation) => {
    setActiveLocation(location);
  };

  const handleLocationClear = () => {
    setActiveLocation(null);
    geolocation.reset();
  };

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <Map className="w-4 h-4" />
            Community Resource Directory
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Community Resources
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A directory of local healthcare resources. Enter a city, zip code, or address to
            find primary care, mental health services, dental care, and financial assistance near
            you.
          </p>
        </div>

        {/* Location Bar */}
        <LocationBar
          geolocation={geolocation}
          activeLocation={activeLocation}
          onLocationSet={handleLocationSet}
          onLocationClear={handleLocationClear}
        />

        {/* Type Filter Pills */}
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
        {!isLoading && !noLocationResults && locationFiltered.length > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing {locationFiltered.length} resource
            {locationFiltered.length !== 1 ? 's' : ''}
            {activeLocation ? ` near ${activeLocation.label}` : ''}
          </p>
        )}

        {/* Resources List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : noLocationResults ? (
          /* No results for this location */
          <div className="text-center py-16">
            <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">
              No resources found near your location.
            </p>
            <p className="text-muted-foreground mb-6">
              Try a different city, zip code, or address to browse resources.
            </p>
            <Button
              variant="outline"
              onClick={handleLocationClear}
              className="border-primary/40 text-primary hover:bg-primary/10"
            >
              Show All Resources
            </Button>
          </div>
        ) : locationFiltered.length === 0 ? (
          /* No results for this type filter */
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No resources found for this type.</p>
            {activeLocation && (
              <Button
                variant="outline"
                onClick={handleLocationClear}
                className="mt-4 border-primary/40 text-primary hover:bg-primary/10"
              >
                Show All Resources
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locationFiltered.map(({ resource, distance }, i) => (
              <ResourceDirectoryItem
                key={i}
                resource={resource}
                distance={activeLocation ? distance : null}
              />
            ))}
          </div>
        )}

        {/* Note */}
        <div className="mt-12 bg-secondary rounded-xl p-5 border border-border">
          <p className="text-sm text-foreground/80">
            <span className="font-bold text-primary">📍 Note: </span>
            Resource information is updated regularly, but I recommend calling ahead to confirm
            hours, availability, and services. Many community health centers offer same-day
            appointments and accept patients regardless of insurance status.
          </p>
        </div>
      </div>
    </main>
  );
}
