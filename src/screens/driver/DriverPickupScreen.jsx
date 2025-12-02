import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function DriverPickupScreen() {
    const navigate = useNavigate();
    const { currentRequest } = useApp();
    const [hasArrived, setHasArrived] = useState(false);
    const [currentLocation, setCurrentLocation] = useState([-26.1076, 28.0567]); // Driver's current location
    const [countdown, setCountdown] = useState(10);
    const timeoutRef = useRef(null);
    const countdownIntervalRef = useRef(null);

    // Use current request data or fallback to dummy data
    const pickupData = currentRequest ? {
        location: {
            name: currentRequest.pickup || 'Sandton City Mall',
            address: currentRequest.pickup || 'Rivonia Road, Sandton, Johannesburg',
            lat: currentRequest.pickupLocation ? currentRequest.pickupLocation[0] : -26.1076,
            lng: currentRequest.pickupLocation ? currentRequest.pickupLocation[1] : 28.0567
        },
        rider: currentRequest.rider || {
            name: 'John Doe',
            initials: 'JD',
            rating: 4.8,
            paymentMethod: 'Cash',
            phone: '+27 82 123 4567'
        },
        trip: {
            destination: currentRequest.dropoff || 'OR Tambo Int. Airport',
            estimatedFare: currentRequest.fare || 85.00,
            estimatedTime: currentRequest.duration || '25 min',
            estimatedDistance: currentRequest.distance || '12 km',
            dropoffLocation: currentRequest.dropoffLocation || [-26.1367, 28.2411]
        }
    } : {
        location: {
            name: 'Sandton City Mall',
            address: 'Rivonia Road, Sandton, Johannesburg',
            lat: -26.1076,
            lng: 28.0567
        },
        rider: {
            name: 'John Doe',
            initials: 'JD',
            rating: 4.8,
            paymentMethod: 'Cash',
            phone: '+27 82 123 4567'
        },
        trip: {
            destination: 'OR Tambo Int. Airport',
            estimatedFare: 85.00,
            estimatedTime: '25 min',
            estimatedDistance: '12 km',
            dropoffLocation: [-26.1367, 28.2411]
        }
    };

    // Simulate driver moving towards pickup location
    useEffect(() => {
        if (!hasArrived) {
            const interval = setInterval(() => {
                setCurrentLocation(prev => {
                    const targetLat = pickupData.location.lat;
                    const targetLng = pickupData.location.lng;
                    const latDiff = targetLat - prev[0];
                    const lngDiff = targetLng - prev[1];
                    
                    // Move 10% closer each interval
                    return [
                        prev[0] + latDiff * 0.1,
                        prev[1] + lngDiff * 0.1
                    ];
                });
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [hasArrived, pickupData.location.lat, pickupData.location.lng]);

    // Check if arrived at pickup
    useEffect(() => {
        const distance = Math.sqrt(
            Math.pow(currentLocation[0] - pickupData.location.lat, 2) +
            Math.pow(currentLocation[1] - pickupData.location.lng, 2)
        );
        
        if (distance < 0.001 && !hasArrived) {
            setHasArrived(true);
        }
    }, [currentLocation, pickupData.location, hasArrived]);

    // Auto-navigate to driving screen 10 seconds after arriving
    useEffect(() => {
        if (hasArrived) {
            // Reset countdown
            setCountdown(10);
            
            // Start countdown timer
            countdownIntervalRef.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownIntervalRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            // Set new timeout to navigate after 10 seconds
            timeoutRef.current = setTimeout(() => {
                console.log('Navigating to driving screen...');
                navigate('/driver/driving');
            }, 10000);
            
            // Cleanup on unmount or when hasArrived changes
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                if (countdownIntervalRef.current) {
                    clearInterval(countdownIntervalRef.current);
                }
            };
        } else {
            // Reset countdown when not arrived
            setCountdown(10);
        }
    }, [hasArrived, navigate]);

    const handleArrived = () => {
        setHasArrived(true);
    };

    const handleCall = () => {
        window.location.href = `tel:${pickupData.rider.phone}`;
    };

    const handleMessage = () => {
        // In a real app, this would open a messaging interface
        alert('Messaging feature coming soon!');
    };

    return (
        <section className="screen active driver-pickup-screen">
            {/* Map Background */}
            <div className="driver-map-container">
                <SimpleMap 
                    center={currentLocation} 
                    zoom={15}
                    showRoute={true}
                    pickup={currentLocation}
                    dropoff={[pickupData.location.lat, pickupData.location.lng]}
                />
            </div>

            {/* Top Navigation Bar */}
            <div className="driver-top-nav">
                <div className="nav-location-info">
                    <div className="nav-status-label">Picking up</div>
                    <div className="nav-location-name">{pickupData.location.name}</div>
                </div>
                <button className="btn-nav-action" onClick={() => window.open(`https://maps.google.com/?q=${pickupData.location.lat},${pickupData.location.lng}`, '_blank')}>
                    ➤
                </button>
            </div>

            {/* Bottom Panel */}
            <div className="driver-bottom-panel">
                {/* Rider Information */}
                <div className="rider-info-card">
                    <div className="rider-avatar-large">
                        {pickupData.rider.initials}
                    </div>
                    <div className="rider-details">
                        <div className="rider-name">{pickupData.rider.name}</div>
                        <div className="rider-meta">
                            ⭐ {pickupData.rider.rating} • {pickupData.rider.paymentMethod} Trip
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

                {/* Trip Preview */}
                <div className="trip-preview-card">
                    <div className="trip-preview-item">
                        <span className="trip-preview-icon">📍</span>
                        <div className="trip-preview-info">
                            <div className="trip-preview-label">Destination</div>
                            <div className="trip-preview-value">{pickupData.trip.destination}</div>
                        </div>
                    </div>
                    <div className="trip-preview-stats">
                        <div className="trip-stat-mini">
                            <span className="stat-mini-value">{pickupData.trip.estimatedTime}</span>
                            <span className="stat-mini-label">Est. Time</span>
                        </div>
                        <div className="trip-stat-mini">
                            <span className="stat-mini-value">R {pickupData.trip.estimatedFare.toFixed(2)}</span>
                            <span className="stat-mini-label">Est. Fare</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pickup-distance-info">
                    <span>📍 {Math.round(
                        Math.sqrt(
                            Math.pow(currentLocation[0] - pickupData.location.lat, 2) * 111 +
                            Math.pow(currentLocation[1] - pickupData.location.lng, 2) * 111
                        ) * 1000
                    )}m away</span>
                </div>
                <button
                    className={`btn-arrived ${hasArrived ? 'arrived' : ''}`}
                    onClick={handleArrived}
                    disabled={hasArrived}
                >
                    {hasArrived ? (
                        <>
                            ✓ Arrived - Starting trip in {countdown}s
                        </>
                    ) : (
                        'Arrived at Pickup'
                    )}
                </button>
            </div>
        </section>
    );
}
