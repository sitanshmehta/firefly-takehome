import mapboxgl, { Marker, NavigationControl } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { IncidentCard } from "./incident-card";

const TOKEN =
  'pk.eyJ1Ijoic2l0YW5zaDE0NCIsImEiOiJjbWhvNTMzMWUwN3I5MmpvaHMzN3d0aDdwIn0.FWciqdZ1wqFFzs5u2dwrpw';

export function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const [incidentVisible, setIncidentVisible] = useState(false);

    const userLocation = { lng: -79.3800, lat: 43.6550 };

    const incidentMarker = {
        type: "FeatureCollection",
        features: [
            { type: "Feature", geometry: { type: "Point", coordinates: [-79.3810, 43.6550] } },
        ]
    };

    useEffect(() => {
        if (mapRef.current) return;

        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-79.3800, 43.6550],
            zoom: 16,
        });

        mapRef.current = map;

        const marker = new Marker({ color: "#1E90FF" })
            .setLngLat([userLocation.lng, userLocation.lat])
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setText("User in Need (SL) - Live Location")
            )
            .addTo(map);
        markerRef.current = marker;

        map.addControl(new NavigationControl(), 'top-right');

        // Wait for map to finish loading before we start the simulation
        map.on('load', () => {
            // Delay the incident by 3 seconds (3000 ms)
            const incidentTimeout = setTimeout(() => {
                map.addSource('red-dots', {
                    type: 'geojson',
                    data: incidentMarker,
                });

                map.addLayer({
                    id: 'red-dots-layer',
                    type: 'circle',
                    source: 'red-dots',
                    paint: {
                        'circle-radius': 12,
                        'circle-color': '#FF0000',
                        'circle-opacity': 0.65,
                    },
                });
                new mapboxgl.Popup({ offset: 25 })
                    .setLngLat(incidentMarker.features[0].geometry.coordinates)
                    .setText("Incident reported nearby!")
                    .addTo(map);
                setIncidentVisible(true);
            }, 3000);

            return () => clearTimeout(incidentTimeout);
        });

        return () => map.remove();
    }, []);


    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000");
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received:", data);

            if (data.coords && data.coords["lat"] && markerRef.current) {
                markerRef.current.setLngLat([data.coords["long"], data.coords["lat"]]);
            } 
        };
        return () => ws.close();
    }, []);

    return (          
        <div className="flex-grow">
            <div 
              ref={mapContainer} 
              className="w-full h-[800px] rounded-xl shadow-xl border border-gray-100" 
            />
            {incidentVisible && (
                <div className="absolute top-60 right-60 w-100 z-10">
                    <IncidentCard
                        title="Fire Reported"
                        details="Emergency services are en route to the scene."
                        location="Dundas St W & Bay St, Toronto"
                        time="3:02 PM"
                        severity="High"
                        distance="200m" //assume this will be calculated by backend and return in appropriate units
                    />
                </div>
            )}
        </div>
    );
}
