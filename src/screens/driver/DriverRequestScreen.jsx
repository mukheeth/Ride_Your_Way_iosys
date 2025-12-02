import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function DriverRequestScreen() {
    const navigate = useNavigate();
    const { currentRequest, acceptRideRequest, cancelRide } = useApp();
    const [timeLeft, setTimeLeft] = useState(15);

    // Use current request or fallback to dummy data
    const rideRequest = currentRequest ? {
        fare: currentRequest.fare || 85.00,
        rideType: currentRequest.rideType || 'Comfort',
        distance: currentRequest.distance || '4.5 km',
        duration: currentRequest.duration || '22 min',
        riderRating: currentRequest.rider?.rating || 4.8,
        pickup: {
            name: currentRequest.pickup || 'Sandton City Mall',
            address: currentRequest.pickup || 'Rivonia Road, Sandton',
            distance: '2 min away',
            lat: currentRequest.pickupLocation ? currentRequest.pickupLocation[0] : -26.1076,
            lng: currentRequest.pickupLocation ? currentRequest.pickupLocation[1] : 28.0567
        },
        dropoff: {
            name: currentRequest.dropoff || 'OR Tambo Int. Airport',
            address: currentRequest.dropoff || 'Kempton Park, Johannesburg',
            distance: currentRequest.duration || '25 min trip',
            lat: currentRequest.dropoffLocation ? currentRequest.dropoffLocation[0] : -26.1367,
            lng: currentRequest.dropoffLocation ? currentRequest.dropoffLocation[1] : 28.2411
        },
        rider: currentRequest.rider || {
            name: 'John Doe',
            rating: 4.8,
            paymentMethod: currentRequest.paymentMethod || 'Cash'
        }
    } : {
        fare: 85.00,
        rideType: 'Comfort',
        distance: '4.5 km',
        duration: '22 min',
        riderRating: 4.8,
        pickup: {
            name: 'Sandton City Mall',
            address: 'Rivonia Road, Sandton',
            distance: '2 min away',
            lat: -26.1076,
            lng: 28.0567
        },
        dropoff: {
            name: 'OR Tambo Int. Airport',
            address: 'Kempton Park, Johannesburg',
            distance: '25 min trip',
            lat: -26.1367,
            lng: 28.2411
        },
        rider: {
            name: 'John Doe',
            rating: 4.8,
            paymentMethod: 'Cash'
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/driver/home');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    const handleAccept = () => {
        // If currentRequest exists, accept it
        if (currentRequest && currentRequest.id) {
            acceptRideRequest(currentRequest.id);
        }
        // Navigate to pickup screen
        navigate('/driver/pickup');
    };

    const handleDecline = () => {
        if (currentRequest) {
            cancelRide(currentRequest.id);
        }
        navigate('/driver/home');
    };

    const progressPercentage = (timeLeft / 15) * 100;

    return (
        <section className="screen active driver-request-screen">
            {/* Map Background */}
            <div className="driver-map-container">
                <SimpleMap 
                    center={[rideRequest.pickup.lat, rideRequest.pickup.lng]} 
                    zoom={14}
                    showRoute={true}
                    pickup={[rideRequest.pickup.lat, rideRequest.pickup.lng]}
                    dropoff={[rideRequest.dropoff.lat, rideRequest.dropoff.lng]}
                />
            </div>

            {/* Request Card Overlay */}
            <div className="request-card-overlay">
                {/* Timer Bar */}
                <div className="request-timer-container">
                    <div className="request-timer-bar" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                {/* Fare and Rating Header */}
                <div className="request-header">
                    <div className="request-fare-info">
                        <h2 className="request-fare">R {rideRequest.fare.toFixed(2)}</h2>
                        <span className="request-details">{rideRequest.rideType} • {rideRequest.distance}</span>
                    </div>
                    <div className="request-rider-rating">
                        ⭐ {rideRequest.riderRating}
                    </div>
                </div>

                {/* Route Information */}
                <div className="trip-route-card">
                    <div className="route-point pickup">
                        <div className="route-marker pickup-marker"></div>
                        <div className="route-info">
                            <span className="route-name">{rideRequest.pickup.name}</span>
                            <span className="route-address">{rideRequest.pickup.address}</span>
                        </div>
                        <span className="route-distance">{rideRequest.pickup.distance}</span>
                    </div>
                    <div className="route-line"></div>
                    <div className="route-point dropoff">
                        <div className="route-marker dropoff-marker"></div>
                        <div className="route-info">
                            <span className="route-name">{rideRequest.dropoff.name}</span>
                            <span className="route-address">{rideRequest.dropoff.address}</span>
                        </div>
                        <span className="route-distance">{rideRequest.distance}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="request-actions">
                    <button className="btn-decline" onClick={handleDecline}>
                        Decline
                    </button>
                    <button className="btn-accept" onClick={handleAccept}>
                        Accept Ride
                    </button>
                </div>
            </div>
        </section>
    );
}
