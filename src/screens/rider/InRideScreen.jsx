import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function InRideScreen() {
    const navigate = useNavigate();
    const { currentRide } = useApp();

    // Coordinates
    const pickupCoords = [-26.2041, 28.0473]; // Sandton
    const dropoffCoords = [-26.1367, 28.2411]; // OR Tambo Airport
    const [progress, setProgress] = useState(0);

    // Calculate current position based on progress
    const currentLat = pickupCoords[0] + (dropoffCoords[0] - pickupCoords[0]) * progress;
    const currentLng = pickupCoords[1] + (dropoffCoords[1] - pickupCoords[1]) * progress;
    const currentPosition = [currentLat, currentLng];

    // Simulate driver moving along route
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 1) return prev;
                return prev + 0.01; // Move 1% closer every interval
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    // Auto-complete ride when reaching destination
    useEffect(() => {
        if (progress >= 0.95) {
            setTimeout(() => {
                navigate('/rating');
            }, 2000);
        }
    }, [progress, navigate]);

    const handleSOS = () => {
        if (confirm('Send SOS Alert? This will notify emergency contacts and support.')) {
            alert('🆘 SOS Alert Sent!\n\nEmergency contacts notified.\nSupport team alerted.\nLocation shared with authorities.');
        }
    };

    const handleEndRide = () => {
        if (confirm('Simulate trip completion?')) {
            navigate('/rating');
        }
    };

    return (
        <section className="screen active in-ride-screen">
            {/* Map Section - Left Half */}
            <div className="map-section map-half">
                <SimpleMap
                    center={currentPosition}
                    zoom={13}
                    useCarIcon={true}
                />

                {/* Overlay Status Bar on Map */}
                <div className="status-bar-sticky" onClick={handleEndRide}>
                    <div className="status-text">🟢 In Progress</div>
                    <div className="eta-timer">{Math.max(1, Math.round(22 * (1 - progress)))} min remaining</div>
                </div>

                <div className="sos-fab" onClick={handleSOS}>🆘</div>
            </div>

            {/* Ride Details Section - Right Half */}
            <div className="ride-controls-section ride-summary-card">
                <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Ride in Progress</h2>

                <div className="driver-mini" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 'var(--space-4)'
                }}>
                    <div className="avatar" style={{
                        width: '80px',
                        height: '80px',
                        fontSize: '32px',
                        marginBottom: 'var(--space-2)'
                    }}>TM</div>
                    <span style={{ fontSize: '20px', fontWeight: '600' }}>{currentRide?.driver?.name || 'Thabo Mthembu'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>⭐ {currentRide?.driver?.rating || 4.9}</span>
                </div>

                <div className="trip-details-row" style={{
                    background: 'var(--color-bg-secondary)',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--space-4)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Total Fare</div>
                        <span className="fare-large" style={{ fontSize: '24px' }}>{currentRide?.fare || 'R 85'}</span>
                    </div>
                    <span className="fare-type" style={{
                        background: 'var(--color-success)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                    }}>Fixed Price</span>
                </div>

                <div className="live-metrics" style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginBottom: 'var(--space-6)',
                    padding: 'var(--space-3)',
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.round(45 + Math.random() * 10)}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>km/h</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>M1</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Route</div>
                    </div>
                </div>

                <div className="action-row" style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <button className="btn btn-outline flex-1">💬 Chat</button>
                    <button className="btn btn-outline flex-1">📞 Call Driver</button>
                </div>
            </div>
        </section>
    );
}
