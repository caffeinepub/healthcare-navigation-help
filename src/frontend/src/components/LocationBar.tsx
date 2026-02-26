import { useState, FormEvent } from 'react';
import { MapPin, Navigation, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { UseGeolocationReturn } from '../hooks/useGeolocation';

export interface ActiveLocation {
  type: 'coords' | 'manual';
  label: string;
  zip?: string;
  coords?: GeolocationCoordinates;
  resolvedLat?: number;
  resolvedLng?: number;
}

interface LocationBarProps {
  geolocation: UseGeolocationReturn;
  activeLocation: ActiveLocation | null;
  onLocationSet: (location: ActiveLocation) => void;
  onLocationClear: () => void;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

async function geocodeLocation(query: string): Promise<{ lat: number; lng: number; displayName: string } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'HealthcareResourceFinder/1.0',
      },
    });
    if (!response.ok) return null;
    const results: NominatimResult[] = await response.json();
    if (!results || results.length === 0) return null;
    const first = results[0];
    return {
      lat: parseFloat(first.lat),
      lng: parseFloat(first.lon),
      displayName: first.display_name,
    };
  } catch {
    return null;
  }
}

function extractZip(input: string): string | undefined {
  const match = input.match(/\b(\d{5})(?:-\d{4})?\b/);
  return match ? match[1] : undefined;
}

export function LocationBar({
  geolocation,
  activeLocation,
  onLocationSet,
  onLocationClear,
}: LocationBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  const handleUseMyLocation = () => {
    setGeocodeError(null);
    geolocation.requestLocation();
  };

  const handleSubmitManual = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setIsGeocoding(true);
    setGeocodeError(null);

    const result = await geocodeLocation(trimmed);

    if (result) {
      // Build a short, friendly label from the display name
      const parts = result.displayName.split(',').map((s) => s.trim());
      // Use first 3 parts for a concise label (e.g. "Miami, Miami-Dade County, Florida")
      const shortLabel = parts.slice(0, 3).join(', ');

      onLocationSet({
        type: 'manual',
        label: shortLabel,
        zip: extractZip(trimmed) ?? extractZip(result.displayName),
        resolvedLat: result.lat,
        resolvedLng: result.lng,
      });
      setInputValue('');
    } else {
      setGeocodeError(
        'Could not find that location. Please try a different city, zip code, or address.'
      );
    }

    setIsGeocoding(false);
  };

  const isLoading = geolocation.status === 'loading' || isGeocoding;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 mb-8 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-foreground text-base">Find Resources Near You</h2>
      </div>

      {/* Active location display */}
      {activeLocation ? (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-medium text-foreground">
              Showing resources near:{' '}
              <span className="text-primary font-semibold">{activeLocation.label}</span>
            </span>
          </div>
          <button
            onClick={() => {
              onLocationClear();
              geolocation.reset();
              setGeocodeError(null);
            }}
            className="ml-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear location"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">
          Share your location or enter a city, zip code, or address to find the closest resources near you.
        </p>
      )}

      {/* Geocode error message */}
      {geocodeError && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 mb-4">
          {geocodeError}
        </div>
      )}

      {/* Geolocation error / denied message */}
      {(geolocation.status === 'denied' || geolocation.status === 'error') && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 mb-4">
          {geolocation.error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Use My Location button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUseMyLocation}
          disabled={isLoading}
          className="flex items-center gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary"
        >
          {geolocation.status === 'loading' ? (
            <>
              <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Detecting…
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              Use My Location
            </>
          )}
        </Button>

        {/* Manual input */}
        <form onSubmit={handleSubmitManual} className="flex flex-1 gap-2">
          <Input
            type="text"
            placeholder="Enter city, zip code, or address…"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (geocodeError) setGeocodeError(null);
            }}
            className="flex-1 text-sm"
            disabled={isGeocoding}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!inputValue.trim() || isGeocoding}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1"
          >
            {isGeocoding ? (
              <>
                <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Searching…</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
