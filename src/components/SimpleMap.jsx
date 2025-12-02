import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function SimpleMap({ 
    center = [-26.2041, 28.0473], 
    zoom = 13,
    onLocationSelect = null,
    showRoute = false,
    pickup = null,
    dropoff = null,
    useCarIcon = false,
    waypoints = null, // Array of waypoints for road-following route
    minHeight = 400 // Allow screens to override minimum height
}) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);
    const routeLineRef = useRef(null);
    const pickupMarkerRef = useRef(null);
    const dropoffMarkerRef = useRef(null);
    const prevPositionRef = useRef(center);
    const rotationRef = useRef(0);
    const carIconRef = useRef(null);

    // Initialize map
    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            // Create map
            mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19,
            }).addTo(mapInstanceRef.current);

            // Add click handler for location selection
            if (onLocationSelect) {
                mapInstanceRef.current.on('click', (e) => {
                    const { lat, lng } = e.latlng;
                    onLocationSelect(lat, lng);
                });
            }

            // Create car icon if needed
            let markerIcon = null;
            if (useCarIcon) {
                carIconRef.current = L.divIcon({
                    className: 'custom-car-marker',
                    html: `
                        <div style="
                            background: #208085;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            border: 3px solid white;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 20px;
                            transform: rotate(0deg);
                        ">🚗</div>
                    `,
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                });
                markerIcon = carIconRef.current;
            }

            // Initialize previous position for car tracking
            if (useCarIcon) {
                prevPositionRef.current = [center[0], center[1]];
            }

            // Add marker at center
            try {
                markerRef.current = L.marker(center, {
                    draggable: !!onLocationSelect,
                    icon: markerIcon || L.icon({
                        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })
                }).addTo(mapInstanceRef.current);
            } catch (error) {
                console.error('Error creating marker:', error);
                // Create marker without icon as fallback
                markerRef.current = L.marker(center, {
                    draggable: !!onLocationSelect
                }).addTo(mapInstanceRef.current);
            }

            if (onLocationSelect) {
                markerRef.current.bindPopup('Click map or drag marker to set location');
                markerRef.current.on('dragend', (e) => {
                    const { lat, lng } = e.target.getLatLng();
                    onLocationSelect(lat, lng);
                });
            } else {
                markerRef.current.bindPopup(useCarIcon ? 'Car Location' : 'Current Location');
            }

            // Add route line and markers if showRoute is true
            if (showRoute && pickup && dropoff) {
                // Add pickup marker
                pickupMarkerRef.current = L.marker(pickup, {
                    icon: L.divIcon({
                        className: 'custom-marker-pickup',
                        html: '<div style="background: #208085; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    })
                }).addTo(mapInstanceRef.current).bindPopup('Pickup Location');

                // Add dropoff marker
                dropoffMarkerRef.current = L.marker(dropoff, {
                    icon: L.divIcon({
                        className: 'custom-marker-dropoff',
                        html: '<div style="background: #5e5240; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    })
                }).addTo(mapInstanceRef.current).bindPopup('Dropoff Location');

                // Add route line - use waypoints if provided, otherwise straight line
                const routePath = waypoints && waypoints.length > 0 ? waypoints : [pickup, dropoff];
                routeLineRef.current = L.polyline(routePath, {
                    color: '#208085',
                    weight: 4,
                    opacity: 0.7
                }).addTo(mapInstanceRef.current);
            }
        }

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                try {
                    // Check if map is still valid before cleanup
                    if (mapInstanceRef.current._container && !mapInstanceRef.current._removed) {
                        // Remove all layers first
                        if (markerRef.current && mapInstanceRef.current.hasLayer) {
                            try {
                                if (mapInstanceRef.current.hasLayer(markerRef.current)) {
                                    mapInstanceRef.current.removeLayer(markerRef.current);
                                }
                            } catch (e) {
                                // Marker already removed
                            }
                            markerRef.current = null;
                        }
                        if (pickupMarkerRef.current && mapInstanceRef.current.hasLayer) {
                            try {
                                if (mapInstanceRef.current.hasLayer(pickupMarkerRef.current)) {
                                    mapInstanceRef.current.removeLayer(pickupMarkerRef.current);
                                }
                            } catch (e) {
                                // Marker already removed
                            }
                            pickupMarkerRef.current = null;
                        }
                        if (dropoffMarkerRef.current && mapInstanceRef.current.hasLayer) {
                            try {
                                if (mapInstanceRef.current.hasLayer(dropoffMarkerRef.current)) {
                                    mapInstanceRef.current.removeLayer(dropoffMarkerRef.current);
                                }
                            } catch (e) {
                                // Marker already removed
                            }
                            dropoffMarkerRef.current = null;
                        }
                        if (routeLineRef.current && mapInstanceRef.current.hasLayer) {
                            try {
                                if (mapInstanceRef.current.hasLayer(routeLineRef.current)) {
                                    mapInstanceRef.current.removeLayer(routeLineRef.current);
                                }
                            } catch (e) {
                                // Route already removed
                            }
                            routeLineRef.current = null;
                        }
                        // Remove the map
                        if (!mapInstanceRef.current._removed) {
                            mapInstanceRef.current.remove();
                        }
                    }
                } catch (error) {
                    console.warn('Error cleaning up map:', error);
                } finally {
                    mapInstanceRef.current = null;
                }
            }
        };
    }, []); // Empty dependency array ensures run once

    // Update view and marker when center changes
    useEffect(() => {
        if (mapInstanceRef.current && mapInstanceRef.current._container && markerRef.current) {
            try {
                // Initialize previous position if not set
                if (!prevPositionRef.current || prevPositionRef.current.length !== 2) {
                    prevPositionRef.current = [center[0], center[1]];
                }

                // Calculate rotation angle based on movement direction
                if (useCarIcon) {
                    const prevLat = prevPositionRef.current[0];
                    const prevLng = prevPositionRef.current[1];
                    const currLat = center[0];
                    const currLng = center[1];
                    
                    // Only calculate rotation if position actually changed
                    if (prevLat !== currLat || prevLng !== currLng) {
                        // Calculate bearing (angle in degrees)
                        const dLng = currLng - prevLng;
                        const y = Math.sin(dLng) * Math.cos(currLat);
                        const x = Math.cos(prevLat) * Math.sin(currLat) - Math.sin(prevLat) * Math.cos(currLat) * Math.cos(dLng);
                        const bearing = Math.atan2(y, x) * (180 / Math.PI);
                        rotationRef.current = (bearing + 360) % 360;
                        
                        // Update car icon with new rotation
                        const updatedIcon = L.divIcon({
                            className: 'custom-car-marker',
                            html: `
                                <div style="
                                    background: #208085;
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                    border: 3px solid white;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 20px;
                                    transform: rotate(${rotationRef.current}deg);
                                ">🚗</div>
                            `,
                            iconSize: [40, 40],
                            iconAnchor: [20, 20]
                        });
                        carIconRef.current = updatedIcon;
                        markerRef.current.setIcon(updatedIcon);
                        
                        prevPositionRef.current = [currLat, currLng];
                    }
                }

                // Update marker position smoothly
                markerRef.current.setLatLng(center);

                // Smoothly follow the car as it moves (only pan if car is moving significantly)
                if (useCarIcon) {
                    const bounds = mapInstanceRef.current.getBounds();
                    const margin = 0.01; // Small margin in degrees
                    const isNearEdge = 
                        center[0] < bounds.getSouth() + margin ||
                        center[0] > bounds.getNorth() - margin ||
                        center[1] < bounds.getWest() + margin ||
                        center[1] > bounds.getEast() - margin;
                    
                    // Only pan if car is near edge or if it's a significant move
                    const prevPos = prevPositionRef.current;
                    const distance = Math.sqrt(
                        Math.pow(center[0] - prevPos[0], 2) + 
                        Math.pow(center[1] - prevPos[1], 2)
                    );
                    
                    if (isNearEdge || distance > 0.002) {
                        mapInstanceRef.current.panTo(center, { 
                            animate: true, 
                            duration: 0.4,
                            easeLinearity: 0.25
                        });
                    }
                } else {
                    // For non-car markers, pan smoothly
                    mapInstanceRef.current.panTo(center, { animate: true, duration: 0.3 });
                }
            } catch (error) {
                console.warn('Error updating map center:', error);
            }
        }
    }, [center, useCarIcon]);

    // Update route line and markers if showRoute changes
    useEffect(() => {
        if (mapInstanceRef.current && mapInstanceRef.current._container) {
            try {
                if (showRoute && pickup && dropoff) {
                    // Update or create pickup marker
                    if (pickupMarkerRef.current) {
                        pickupMarkerRef.current.setLatLng(pickup);
                    } else {
                        pickupMarkerRef.current = L.marker(pickup, {
                            icon: L.divIcon({
                                className: 'custom-marker-pickup',
                                html: '<div style="background: #208085; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                                iconSize: [20, 20],
                                iconAnchor: [10, 10]
                            })
                        }).addTo(mapInstanceRef.current).bindPopup('Pickup Location');
                    }

                    // Update or create dropoff marker
                    if (dropoffMarkerRef.current) {
                        dropoffMarkerRef.current.setLatLng(dropoff);
                    } else {
                        dropoffMarkerRef.current = L.marker(dropoff, {
                            icon: L.divIcon({
                                className: 'custom-marker-dropoff',
                                html: '<div style="background: #5e5240; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                                iconSize: [20, 20],
                                iconAnchor: [10, 10]
                            })
                        }).addTo(mapInstanceRef.current).bindPopup('Dropoff Location');
                    }

                    // Update or create route line - use waypoints if provided
                    const routePath = waypoints && waypoints.length > 0 ? waypoints : [pickup, dropoff];
                    if (routeLineRef.current) {
                        routeLineRef.current.setLatLngs(routePath);
                    } else {
                        routeLineRef.current = L.polyline(routePath, {
                            color: '#208085',
                            weight: 4,
                            opacity: 0.7
                        }).addTo(mapInstanceRef.current);
                    }
                } else {
                    // Remove markers and route
                    if (pickupMarkerRef.current && mapInstanceRef.current.hasLayer) {
                        try {
                            mapInstanceRef.current.removeLayer(pickupMarkerRef.current);
                        } catch (e) {
                            console.warn('Error removing pickup marker:', e);
                        }
                        pickupMarkerRef.current = null;
                    }
                    if (dropoffMarkerRef.current && mapInstanceRef.current.hasLayer) {
                        try {
                            mapInstanceRef.current.removeLayer(dropoffMarkerRef.current);
                        } catch (e) {
                            console.warn('Error removing dropoff marker:', e);
                        }
                        dropoffMarkerRef.current = null;
                    }
                    if (routeLineRef.current && mapInstanceRef.current.hasLayer) {
                        try {
                            mapInstanceRef.current.removeLayer(routeLineRef.current);
                        } catch (e) {
                            console.warn('Error removing route line:', e);
                        }
                        routeLineRef.current = null;
                    }
                }
            } catch (error) {
                console.warn('Error updating route:', error);
            }
        }
    }, [showRoute, pickup, dropoff, waypoints]);

    return (
        <div
            ref={mapRef}
            style={{
                width: '100%',
                height: '100%',
                minHeight: `${minHeight}px`,
                background: '#e5e7eb'
            }}
        />
    );
}
