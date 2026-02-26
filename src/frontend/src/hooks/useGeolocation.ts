import { useState, useCallback } from 'react';

export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'error';

export interface GeolocationState {
  status: GeolocationStatus;
  coords: GeolocationCoordinates | null;
  error: string | null;
}

export interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
  reset: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    coords: null,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        status: 'error',
        coords: null,
        error: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setState({ status: 'loading', coords: null, error: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'success',
          coords: position.coords,
          error: null,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({
            status: 'denied',
            coords: null,
            error: 'Location access denied. Please enter your zip code or address below.',
          });
        } else {
          setState({
            status: 'error',
            coords: null,
            error: 'Unable to retrieve your location. Please enter your zip code or address below.',
          });
        }
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const reset = useCallback(() => {
    setState({ status: 'idle', coords: null, error: null });
  }, []);

  return { ...state, requestLocation, reset };
}
