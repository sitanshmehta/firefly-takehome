'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN =
  'pk.eyJ1Ijoic2l0YW5zaDE0NCIsImEiOiJjbWhvNTMzMWUwN3I5MmpvaHMzN3d0aDdwIn0.FWciqdZ1wqFFzs5u2dwrpw';

export default function Home() {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapboxgl.accessToken = TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.3832, 43.6532],
      zoom: 12,
    });

    return () => mapRef.current?.remove();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center py-12 px-6">
        <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow-md" />
      </main>
    </div>
  );
}
