import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';
import { generateRoadWaypoints, interpolateWaypoints, calculateDistance } from '../../utils/routeUtils';

export default function DriverDrivingScreen() {
    const navigate = useNavigate();
    const { currentRequest } = useApp();
    const [tripTime, setTripTime] = useState(0);
    const [tripDistance, setTripDistance] = useState(0);
    const [currentLocation, setCurrentLocation] = useState([-26.1076, 28.0567]); // Start at pickup
    const animationFrameRef = useRef(null);
    const startTimeRef = useRef(Date.now());
    const isCompletedRef = useRef(false);

    // Use current request data or fallback to dummy data
    const tripData = currentRequest ? {
        destination: {
            name: currentRequest.dropoff || 'OR Tambo Int. Airport',
            address: currentRequest.dropoff || 'Kempton Park, Johannesburg',
            lat: currentRequest.dropoffCoords ? currentRequest.dropoffCoords[0] : -26.1367,
            lng: currentRequest.dropoffCoords ? currentRequest.dropoffCoords[1] : 28.2411
        },
        pickup: currentRequest.pickupCoords || [-26.1076, 28.0567],
        rider: currentRequest.rider || {
            name: 'John Doe',
            initials: 'JD',
            rating: 4.8,
            paymentMethod: currentRequest.paymentMethod || 'Cash'
        },
        fare: {
            base: currentRequest.fare || 85.00,
            current: currentRequest.fare || 85.00
        },
        estimated: {
            time: parseInt(currentRequest.duration?.replace(' min', '')) || 15,
            distance: parseFloat(currentRequest.distance?.replace(' km', '')) || 12
        }
    } : {
        destination: {
            name: 'OR Tambo Int. Airport',
            address: 'Kempton Park, Johannesburg',
            lat: -26.1367,
            lng: 28.2411
        },
        pickup: [-26.1076, 28.0567],
        rider: {
            name: 'John Doe',
            initials: 'JD',
            rating: 4.8,
            paymentMethod: 'Cash'
        },
        fare: {
            base: 85.00,
            current: 85.00
        },
        estimated: {
            time: 15,
            distance: 12
        }
    };

    // Trip completion time: 10 seconds
    const TRIP_DURATION_MS = 10000; // 10 seconds in milliseconds
    const TRIP_DURATION_MINUTES = tripData.estimated.time; // Display in minutes

    // Generate road-following waypoints
    const waypointsRef = useRef(null);
    const [routeWaypoints, setRouteWaypoints] = useState(null);
    
    // Smooth animation using requestAnimationFrame - starts immediately
    useEffect(() => {
        // Reset completion flag
        isCompletedRef.current = false;
        
        // Get trip coordinates - ensure pickup is an array
        const pickup = Array.isArray(tripData.pickup) 
            ? [...tripData.pickup] 
            : [tripData.pickup?.lat || -26.1076, tripData.pickup?.lng || 28.0567];
        const dropoff = [tripData.destination.lat, tripData.destination.lng];
        const totalDistance = tripData.estimated.distance;
        const estimatedTime = tripData.estimated.time;

        console.log('Starting trip animation:', { pickup, dropoff, totalDistance, estimatedTime });

        // Generate road-following waypoints
        const generatedWaypoints = generateRoadWaypoints(pickup, dropoff, 30);
        waypointsRef.current = generatedWaypoints;
        setRouteWaypoints(generatedWaypoints);

        // Initialize location at pickup
        setCurrentLocation(pickup);
        setTripDistance(0);
        setTripTime(0);
        
        // Start animation timer
        startTimeRef.current = Date.now();

        const animate = () => {
            if (isCompletedRef.current) return;

            const elapsed = Date.now() - startTimeRef.current;
            const progress = Math.min(elapsed / TRIP_DURATION_MS, 1);

            // Get current location from waypoints (road-following)
            if (waypointsRef.current && waypointsRef.current.length > 0) {
                const currentPos = interpolateWaypoints(waypointsRef.current, progress);
                if (currentPos) {
                    setCurrentLocation(currentPos);
                }
            } else {
                // Fallback to linear interpolation
                const newLat = pickup[0] + (dropoff[0] - pickup[0]) * progress;
                const newLng = pickup[1] + (dropoff[1] - pickup[1]) * progress;
                setCurrentLocation([newLat, newLng]);
            }

            // Calculate actual distance traveled along waypoints
            let traveledDistance = 0;
            if (waypointsRef.current && waypointsRef.current.length > 1) {
                const currentIndex = Math.floor(progress * (waypointsRef.current.length - 1));
                for (let i = 0; i < currentIndex; i++) {
                    traveledDistance += calculateDistance(
                        waypointsRef.current[i],
                        waypointsRef.current[i + 1]
                    );
                }
                // Add partial distance for current segment
                if (currentIndex < waypointsRef.current.length - 1) {
                    const segmentProgress = (progress * (waypointsRef.current.length - 1)) - currentIndex;
                    traveledDistance += calculateDistance(
                        waypointsRef.current[currentIndex],
                        waypointsRef.current[currentIndex + 1]
                    ) * segmentProgress;
                }
            } else {
                // Fallback to linear progress
                traveledDistance = totalDistance * progress;
            }
            
            setTripDistance(Math.min(traveledDistance, totalDistance));

            // Update time (in minutes, but based on 10 second completion)
            const remainingMinutes = estimatedTime * (1 - progress);
            setTripTime(estimatedTime - remainingMinutes);

            if (progress >= 1) {
                isCompletedRef.current = true;
                // Ensure final values
                setCurrentLocation(dropoff);
                setTripDistance(totalDistance);
                setTripTime(estimatedTime);
                console.log('Trip completed, navigating to trip screen...');
                // Navigate to trip completion screen after a brief delay
                setTimeout(() => {
                    navigate('/driver/trip');
                }, 500);
            } else {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        // Start animation immediately
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [
        tripData.destination.lat,
        tripData.destination.lng,
        tripData.estimated.distance,
        tripData.estimated.time
    ]);

    const handleCall = () => {
        alert('Calling rider...');
    };

    const handleMessage = () => {
        alert('Messaging feature coming soon!');
    };

    // Calculate progress percentage
    const progress = Math.min((tripDistance / tripData.estimated.distance) * 100, 100);
    // Calculate remaining time in minutes (but show as if it's a real journey)
    const remainingTime = Math.max(0, Math.ceil((tripData.estimated.time - tripTime)));

    return (
        <section className="screen active driver-driving-screen">
            {/* Map Background */}
            <div className="driver-map-container">
                <SimpleMap
                    center={currentLocation}
                    zoom={15}
                    showRoute={true}
                    pickup={tripData.pickup}
                    dropoff={[tripData.destination.lat, tripData.destination.lng]}
                    useCarIcon={true} // Use car icon for current position
                    waypoints={routeWaypoints} // Road-following waypoints
                />
            </div>

            {/* Top Navigation Bar */}
            <div className="driver-top-nav">
                <div className="nav-location-info">
                    <div className="nav-status-label">Driving to destination</div>
                    <div className="nav-location-name">{tripData.destination.name}</div>
                </div>
                <button className="btn-nav-action" onClick={() => window.open(`https://maps.google.com/?q=${tripData.destination.lat},${tripData.destination.lng}`, '_blank')}>
                    ➤
                </button>
            </div>

            {/* Bottom Panel */}
            <div className="driver-bottom-panel">
                {/* Rider Information */}
                <div className="rider-info-card">
                    <div className="rider-avatar-large">
                        {tripData.rider.initials || tripData.rider.name.charAt(0)}
                    </div>
                    <div className="rider-details">
                        <div className="rider-name">{tripData.rider.name}</div>
                        <div className="rider-meta">
                            ⭐ {tripData.rider.rating} • {tripData.rider.paymentMethod}
                        </div>
                    </div>
                    <div className="rider-actions">
                        <button className="btn-rider-action" onClick={handleCall} title="Call Rider">
                            📞
                        </button>
                        <button className="btn-rider-action" onClick={handleMessage} title="Message Rider">
                            💬
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="trip-progress-card">
                    <div className="progress-bar-wrapper">
                        <div className="progress-bar-bg">
                            <div 
                                className="progress-bar-fill-driving" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="progress-text-driving">
                            {progress.toFixed(0)}% Complete
                        </div>
                    </div>
                </div>

                {/* Trip Stats */}
                <div className="trip-stats-card">
                    <div className="trip-stat-item">
                        <div className="trip-stat-value">{remainingTime} min</div>
                        <div className="trip-stat-label">REMAINING</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="trip-stat-item">
                        <div className="trip-stat-value">{(tripData.estimated.distance - tripDistance).toFixed(1)} km</div>
                        <div className="trip-stat-label">DISTANCE</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="trip-stat-item">
                        <div className="trip-stat-value fare">R {tripData.fare.current.toFixed(2)}</div>
                        <div className="trip-stat-label">FARE</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

