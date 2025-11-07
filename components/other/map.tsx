import mapboxgl, { Marker, NavigationControl } from "mapbox-gl";
import { useEffect, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN =
  'pk.eyJ1Ijoic2l0YW5zaDE0NCIsImEiOiJjbWhvNTMzMWUwN3I5MmpvaHMzN3d0aDdwIn0.FWciqdZ1wqFFzs5u2dwrpw';

export function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    const userLocation = { lng: -79.3800, lat: 43.6550 };
    
    useEffect(() => {
        if (mapRef.current) return;

        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/light-v11', 
            center: [-79.3832, 43.6532],
            zoom: 13,
        });

        mapRef.current = map;

        const marker = new Marker({ color: "#1E90FF" })
            .setLngLat([userLocation.lng, userLocation.lat])
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setText("User in Need (SL) - Live Location"))
            .addTo(map);
        markerRef.current = marker;
        
        map.addControl(new NavigationControl(), 'top-right');

        return () => mapRef.current?.remove();
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
        </div>
    )
}