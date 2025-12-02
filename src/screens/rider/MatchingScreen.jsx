import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function MatchingScreen() {
    const navigate = useNavigate();
    const { pickup, dropoff, currentRide, activeRides } = useApp();

    // Johannesburg area coordinates
    const pickupCoords = [-26.2041, 28.0473]; // Sandton
    const dropoffCoords = [-26.1367, 28.2411]; // OR Tambo Airport

    // Simulated nearby driver locations
    const [nearbyDrivers] = useState([
        [-26.1950, 28.0550],
        [-26.2100, 28.0600],
        [-26.2000, 28.0400]
    ]);

    useEffect(() => {
        // Check if ride has been accepted by a driver
        if (currentRide && currentRide.status === 'accepted') {
            navigate('/driver-found');
            return;
        }

        // Check active rides for this user
        const acceptedRide = activeRides.find(r => r.id === currentRide?.id);
        if (acceptedRide) {
            navigate('/driver-found');
            return;
        }

        // Simulate matching process
        const timer = setTimeout(() => {
            // In real app, this would check for driver acceptance
            // For demo, navigate after 3 seconds
            navigate('/driver-found');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate, currentRide, activeRides]);

    return (
        <section className="screen active">
            <div className="map-full">
                <SimpleMap
                    center={pickupCoords}
                    zoom={12}
                />

                {/* Pulsating effect overlay */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 1000
                }}>
                    <div className="pulsating-circle"></div>
                </div>
            </div>

            <div className="bottom-sheet">
                <div className="sheet-header">
                    <h3>Finding Available Drivers</h3>
                    <div className="loading-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                </div>
                <div className="sheet-content">
                    <div className="trip-summary">
                        <div className="trip-row">
                            <span className="icon">📍</span>
                            <span>{pickup || 'Sandton, Johannesburg'}</span>
                        </div>
                        <div className="trip-row">
                            <span className="icon">🏁</span>
                            <span>{dropoff || 'OR Tambo Airport'}</span>
                        </div>
                    </div>
                    <div className="trip-stats">
                        <span>15 km</span> • <span>22 min</span> • <span>R 85</span>
                    </div>
                    <div className="actions">
                        <button onClick={() => navigate('/home')} className="btn btn-secondary btn-block">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
