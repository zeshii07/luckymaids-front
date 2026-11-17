import { useEffect, useRef, useState } from 'react';
import { MapPin, LocateFixed, Crosshair, Loader2, Check } from 'lucide-react';

/**
 * MapPicker
 * ----------
 * Interactive map that lets the customer pick their exact location for the
 * cleaning crew. The selected point is returned to the parent as a Google
 * Maps URL (`https://www.google.com/maps?q=LAT,LNG`) so the existing backend
 * email keeps showing a "View Location" link — no backend change needed.
 *
 * Implementation notes:
 *  - Uses Leaflet + OpenStreetMap tiles loaded from CDN (free, no API key).
 *  - Loads the CDN <link> + <script> once, lazily, on first mount.
 *  - Supports clicking the map to drop/move a marker.
 *  - Supports a "Use my location" button that calls the browser geolocation
 *    API (asks the user for permission).
 *  - Falls back to Dubai city centre if the user declines geolocation.
 *
 * Props:
 *  - value:        current Google Maps URL (controlled)
 *  - onChange:     (googleMapsUrl) => void
 *  - addressHint:  optional text shown as a subtitle (e.g. typed address)
 */

// Dubai city centre — sensible default so the map opens somewhere useful even
// before the user grants geolocation.
const DEFAULT_CENTER = { lat: 25.2048, lng: 55.2708 };
const DEFAULT_ZOOM = 12;

const SCRIPT_ID = 'leaflet-js';
const STYLE_ID = 'leaflet-css';
const MARKER_DIV_ID = 'byt-marker-icon';

function loadLeafletCSS() {
  return new Promise((resolve) => {
    if (document.getElementById(STYLE_ID)) return resolve();
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity =
      'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    link.onload = () => resolve();
    link.onerror = () => resolve(); // resolve anyway; map just won't show
    document.head.appendChild(link);
  });
}

function loadLeafletJS() {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      if (window.L) return resolve(window.L);
      existing.addEventListener('load', () => resolve(window.L));
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity =
      'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error('Failed to load Leaflet'));
    document.head.appendChild(script);
  });
}

// Custom pin marker (matches the indigo brand colour).
function ensureMarkerIcon() {
  if (document.getElementById(MARKER_DIV_ID)) return;
  const div = document.createElement('div');
  div.id = MARKER_DIV_ID;
  div.innerHTML = `
    <svg width="36" height="48" viewBox="0 0 36 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8.07 0 0 8.07 0 18c0 13.5 18 30 18 30s18-16.5 18-30c0-9.93-8.07-18-18-18z" fill="#5D50E8"/>
      <circle cx="18" cy="18" r="7" fill="#ffffff"/>
    </svg>`;
  div.style.display = 'none';
  document.body.appendChild(div);
}

function parseGoogleMapsUrl(url) {
  if (!url) return null;
  // Accept "https://www.google.com/maps?q=LAT,LNG"
  const m = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
  return null;
}

function buildGoogleMapsUrl(lat, lng) {
  return `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
}

export default function MapPicker({ value, onChange, addressHint }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const leafletRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);

  // Initial centre: previously chosen point, else Dubai.
  const initialPoint = parseGoogleMapsUrl(value) || DEFAULT_CENTER;

  // Load Leaflet (CSS + JS), then init the map.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await loadLeafletCSS();
        const L = await loadLeafletJS();
        ensureMarkerIcon();
        if (cancelled || !containerRef.current) return;

        const map = L.map(containerRef.current, {
          center: [initialPoint.lat, initialPoint.lng],
          zoom: DEFAULT_ZOOM,
          scrollWheelZoom: true,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Custom marker using the inline SVG.
        const icon = L.divIcon({
          html: document.getElementById(MARKER_DIV_ID).innerHTML,
          className: 'byt-map-pin',
          iconSize: [36, 48],
          iconAnchor: [18, 48],
        });

        // If a point already exists, show it.
        if (parseGoogleMapsUrl(value)) {
          markerRef.current = L.marker(
            [initialPoint.lat, initialPoint.lng],
            { icon },
          ).addTo(map);
        }

        // Click to drop / move the pin.
        map.on('click', (e) => {
          const { lat, lng } = e.latlng;
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
          }
          onChange(buildGoogleMapsUrl(lat, lng));
        });

        leafletRef.current = L;
        mapRef.current = map;
        setReady(true);

        // Invalidate size after layout settles (container may have 0 height
        // at first paint).
        setTimeout(() => map.invalidateSize(), 150);
      } catch (err) {
        setError('Map could not be loaded. Please paste a Google Maps link instead.');
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // "Use my location" — asks the browser for geolocation permission.
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const L = leafletRef.current;
        const map = mapRef.current;
        if (!L || !map) {
          setLocating(false);
          return;
        }
        map.setView([lat, lng], 15);
        const icon = L.divIcon({
          html: document.getElementById(MARKER_DIV_ID).innerHTML,
          className: 'byt-map-pin',
          iconSize: [36, 48],
          iconAnchor: [18, 48],
        });
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
        }
        onChange(buildGoogleMapsUrl(lat, lng));
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. You can still tap the map to pick your spot.');
        } else {
          setError('Could not get your location. Tap the map to pick your spot.');
        }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  };

  const picked = parseGoogleMapsUrl(value);

  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-[var(--line)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-paper px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-soft">
            Pick your location on the map
          </p>
          <p className="truncate text-xs text-ink-muted">
            {picked
              ? `Selected: ${picked.lat.toFixed(5)}, ${picked.lng.toFixed(5)}`
              : addressHint || 'Tap the map or use my location to drop a pin'}
          </p>
        </div>
        <button
          type="button"
          onClick={useMyLocation}
          disabled={!ready || locating}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-deep px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo disabled:cursor-wait disabled:opacity-60"
        >
          {locating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : picked ? (
            <Crosshair className="h-4 w-4" />
          ) : (
            <LocateFixed className="h-4 w-4" />
          )}
          {locating ? 'Locating...' : 'Use my location'}
        </button>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="h-72 w-full sm:h-80"
        role="application"
        aria-label="Interactive map to pick your location"
        style={{ background: '#e5e7eb' }}
      />

      {/* Status row */}
      <div className="flex items-center gap-2 border-t border-[var(--line)] bg-white px-4 py-2.5 text-xs">
        {picked ? (
          <>
            <span className="inline-flex items-center gap-1.5 font-semibold text-green-700">
              <Check className="h-4 w-4" /> Location set
            </span>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="ml-auto truncate text-indigo-deep hover:underline"
            >
              Open in Google Maps ↗
            </a>
          </>
        ) : (
          <span className="text-ink-muted">
            <MapPin className="mr-1 inline h-3.5 w-3.5" />
            No pin yet — tap the map or press “Use my location”.
          </span>
        )}
      </div>

      {error && (
        <p className="border-t border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          {error}
        </p>
      )}
    </div>
  );
}
