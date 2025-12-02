import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function DriverTripScreen() {
    const navigate = useNavigate();
    const { currentRequest, completeRide } = useApp();
    const [tripTime, setTripTime] = useState(0);
    const [tripDistance, setTripDistance] = useState(0);
    const [currentLocation, setCurrentLocation] = useState([-26.1076, 28.0567]); // Start at pickup

    // Use current request data or fallback to dummy data
    const tripData = currentRequest ? {
        destination: {
            name: currentRequest.dropoff || 'OR Tambo Int. Airport',
            address: currentRequest.dropoff || 'Kempton Park, Johannesburg',
            lat: currentRequest.dropoffLocation ? currentRequest.dropoffLocation[0] : -26.1367,
            lng: currentRequest.dropoffLocation ? currentRequest.dropoffLocation[1] : 28.2411
        },
        pickup: {
            lat: currentRequest.pickupLocation ? currentRequest.pickupLocation[0] : -26.1076,
            lng: currentRequest.pickupLocation ? currentRequest.pickupLocation[1] : 28.0567
        },
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
        pickup: {
            lat: -26.1076,
            lng: 28.0567
        },
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

    // Simulate driver moving from pickup to dropoff
    useEffect(() => {
        // Initialize current location at pickup
        const pickupLat = tripData.pickup?.lat || -26.1076;
        const pickupLng = tripData.pickup?.lng || 28.0567;
        setCurrentLocation([pickupLat, pickupLng]);

        const targetLat = tripData.destination.lat;
        const targetLng = tripData.destination.lng;

        const interval = setInterval(() => {
            setCurrentLocation(prev => {
                const latDiff = targetLat - prev[0];
                const lngDiff = targetLng - prev[1];
                
                // Move 5% closer each interval
                const newLat = prev[0] + latDiff * 0.05;
                const newLng = prev[1] + lngDiff * 0.05;
                
                // Check if we've reached destination
                if (Math.abs(latDiff) < 0.001 && Math.abs(lngDiff) < 0.001) {
                    return [targetLat, targetLng];
                }
                
                return [newLat, newLng];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [tripData.destination.lat, tripData.destination.lng, tripData.pickup?.lat, tripData.pickup?.lng]);

    useEffect(() => {
        // Simulate trip progress
        const timeInterval = setInterval(() => {
            setTripTime(prev => {
                if (prev >= tripData.estimated.time) return tripData.estimated.time;
                return prev + 0.1;
            });
        }, 6000); // Update every 6 seconds

        const distanceInterval = setInterval(() => {
            setTripDistance(prev => {
                if (prev >= tripData.estimated.distance) return tripData.estimated.distance;
                return prev + 0.1;
            });
        }, 5000); // Update every 5 seconds

        return () => {
            clearInterval(timeInterval);
            clearInterval(distanceInterval);
        };
    }, [tripData.estimated.time, tripData.estimated.distance]);

    const handleComplete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            // Store trip data in sessionStorage BEFORE any state changes
            const tripDataToStore = {
                fare: currentRequest?.fare || tripData.fare.current,
                rider: currentRequest?.rider || tripData.rider,
                paymentMethod: currentRequest?.paymentMethod || tripData.rider.paymentMethod || 'Cash',
                id: currentRequest?.id
            };
            sessionStorage.setItem('completedTripData', JSON.stringify(tripDataToStore));
            
            console.log('Navigating to congratulations screen...');
            
            // Navigate immediately - don't wait for state updates
            navigate('/driver/congratulations', { replace: true });
            
            // Complete the ride after navigation (non-blocking)
            if (currentRequest) {
                setTimeout(() => {
                    completeRide(currentRequest.id);
                }, 100);
            }
        } catch (error) {
            console.error('Error completing trip:', error);
            // Still try to navigate even if there's an error
            navigate('/driver/congratulations', { replace: true });
        }
    };

    const handleCall = () => {
        alert('Calling rider...');
    };

    const handleMessage = () => {
        alert('Messaging feature coming soon!');
    };

    return (
        <section className="screen active driver-trip-screen">
            {/* Map Background */}
            <div className="driver-map-container">
                <SimpleMap 
                    center={currentLocation} 
                    zoom={15}
                    showRoute={true}
                    pickup={tripData.pickup ? [tripData.pickup.lat, tripData.pickup.lng] : null}
                    dropoff={[tripData.destination.lat, tripData.destination.lng]}
                />
            </div>

            {/* Top Navigation Bar */}
            <div className="driver-top-nav">
                <div className="nav-location-info">
                    <div className="nav-status-label">Arrived at destination</div>
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
                        {tripData.rider.initials}
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

                {/* Trip Stats */}
                <div className="trip-stats-card">
                    <div className="trip-stat-item">
                        <div className="trip-stat-value">{Math.floor(tripTime)} min</div>
                        <div className="trip-stat-label">Time</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="trip-stat-item">
                        <div className="trip-stat-value">{tripDistance.toFixed(1)} km</div>
                        <div className="trip-stat-label">Distance</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="trip-stat-item">
                        <div className="trip-stat-value fare">R {tripData.fare.current.toFixed(2)}</div>
                        <div className="trip-stat-label">Fare</div>
                    </div>
                </div>

                {/* Action Button */}
                <button className="btn-complete-trip" onClick={handleComplete}>
                    Complete Trip
                </button>
            </div>
        </section>
    );
}
