# Specification

## Summary
**Goal:** Enable real location-based resource lookup so that entering any city, zip code, or address shows nearby resources sorted by actual geographic distance.

**Planned changes:**
- In `ResourcesPage.tsx`, call the Nominatim/OpenStreetMap geocoding API when the user submits a location via the text input, resolving it to lat/lng coordinates and updating the active location context with the resolved name (e.g., "Showing resources near: Miami, FL").
- Display a user-friendly error message if geocoding fails or returns no results.
- Add optional `lat` and `lng` Float fields to the `CommunityResource` type in `backend/main.mo` and populate realistic coordinates for all existing sample resource entries.
- Update the static fallback resource array in `ResourcesPage.tsx` to include lat/lng for each entry.
- Update `locationUtils.ts` to implement a haversine distance calculation using lat/lng coordinates, replacing the zip-code numeric comparison for proximity sorting.
- Sort resources by ascending haversine distance from the active location when coordinates are available; resources without coordinates fall to the bottom.
- Display an approximate distance label (e.g., "~3 miles away") on each resource card when a location is active; hide labels when no location is active.
- Preserve existing "Use My Location" geolocation behavior unchanged.

**User-visible outcome:** Users can type a city name, zip code, or address (e.g., "Miami") into the location bar and see community resources sorted by actual proximity to that location, with distance labels on each result.
