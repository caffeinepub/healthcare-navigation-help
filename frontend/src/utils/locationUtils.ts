import type { CommunityResource } from '../backend';

/**
 * Extract a 5-digit zip code from a string (address or raw zip input).
 */
export function extractZipCode(input: string): string | null {
  const match = input.match(/\b(\d{5})(?:-\d{4})?\b/);
  return match ? match[1] : null;
}

/**
 * Simple numeric distance between two zip codes (as integers).
 * This is a rough heuristic — not geographic distance.
 */
export function zipCodeDistance(zip1: string, zip2: string): number {
  const n1 = parseInt(zip1, 10);
  const n2 = parseInt(zip2, 10);
  if (isNaN(n1) || isNaN(n2)) return Infinity;
  return Math.abs(n1 - n2);
}

/**
 * Haversine formula: returns distance in miles between two lat/lng pairs.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Sort resources by haversine distance from a target lat/lng.
 * Resources without lat/lng fall to the bottom.
 * Returns an array of { resource, distance } objects.
 */
export function sortResourcesByCoordinates(
  resources: CommunityResource[],
  targetLat: number,
  targetLng: number
): Array<{ resource: CommunityResource; distance: number | null }> {
  const withDistance = resources.map((r) => {
    if (r.lat != null && r.lng != null) {
      return { resource: r, distance: haversineDistance(targetLat, targetLng, r.lat, r.lng) };
    }
    return { resource: r, distance: null };
  });

  return withDistance.sort((a, b) => {
    if (a.distance === null && b.distance === null) return 0;
    if (a.distance === null) return 1;
    if (b.distance === null) return -1;
    return a.distance - b.distance;
  });
}

/**
 * Sort resources by proximity to a target zip code.
 */
export function sortResourcesByZip(
  resources: CommunityResource[],
  targetZip: string
): CommunityResource[] {
  return [...resources].sort((a, b) => {
    const distA = zipCodeDistance(a.zipCode ?? '', targetZip);
    const distB = zipCodeDistance(b.zipCode ?? '', targetZip);
    return distA - distB;
  });
}

/**
 * Filter resources to only those within a numeric zip distance threshold,
 * sorted by proximity.
 */
export function filterResourcesByZipProximity(
  resources: CommunityResource[],
  targetZip: string,
  threshold = 200
): CommunityResource[] {
  const sorted = sortResourcesByZip(resources, targetZip);
  return sorted.filter(
    (r) => zipCodeDistance(r.zipCode ?? '', targetZip) <= threshold
  );
}
