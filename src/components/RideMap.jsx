import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom car icon
const carIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <circle cx="12" cy="12" r="11" fill="#208085" stroke="white" stroke-width="2"/>
            <text x="12" y="17" text-anchor="middle" fill="white" font-size="16">🚗</text>
        </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

// Custom pickup icon
const pickupIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <circle cx="12" cy="12" r="11" fill="#10b981" stroke="white" stroke-width="2"/>
            <circle cx="12" cy="12" r="5" fill="white"/>
        </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// Custom dropoff icon
const dropoffIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ef4444" stroke="white" stroke-width="2"/>
            <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export default function RideMap({
    center = [-26.2041, 28.0473], // Johannesburg coordinates
    zoom = 13,
    pickup,
    dropoff,
    driverLocation,
    showRoute = false,
    height = '100%'
}) {
    // Generate route path if pickup and dropoff are provided
    const routePath = pickup && dropoff ? [pickup, dropoff] : [];

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height, width: '100%', background: '#1a1a1a' }}
            zoomControl={true}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
                minZoom={3}
            />

            {/* Pickup marker */}
            {pickup && (
                <Marker position={pickup} icon={pickupIcon}>
                    <Popup>Pickup Location</Popup>
                </Marker>
            )}

            {/* Dropoff marker */}
            {dropoff && (
                <Marker position={dropoff} icon={dropoffIcon}>
                    <Popup>Dropoff Location</Popup>
                </Marker>
            )}

            {/* Driver location marker */}
            {driverLocation && (
                <Marker position={driverLocation} icon={carIcon}>
                    <Popup>Driver Location</Popup>
                </Marker>
            )}

            {/* Route polyline */}
            {showRoute && routePath.length > 0 && (
                <Polyline
                    positions={routePath}
                    color="#208085"
                    weight={4}
                    opacity={0.7}
                />
            )}
        </MapContainer>
    );
}
