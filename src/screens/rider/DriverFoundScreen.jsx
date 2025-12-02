import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function DriverFoundScreen() {
    const navigate = useNavigate();
    const { currentRide } = useApp();

    // Coordinates
    const pickupCoords = [-26.2041, 28.0473]; // Sandton

    const handleCall = () => {
        alert(`Calling driver: ${currentRide?.driver?.phone || '+27 82 XXX XXXX'}`);
    };

    const handleMessage = () => {
        const message = prompt('Send message to driver:');
        if (message) alert(`Message sent: "${message}"`);
    };

    return (
        <section className="screen active driver-found-screen">
            {/* Map Section - Takes up 50% width */}
            <div className="map-half">
                <SimpleMap
                    center={pickupCoords}
                    zoom={14}
                />
            </div>

            {/* Driver Details Section - Takes up 50% width */}
            <div className="driver-card-top">
                <div className="driver-profile" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                    <div className="avatar" style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto var(--space-3)',
                        fontSize: '32px'
                    }}>TM</div>
                    <div className="info">
                        <h3 style={{ fontSize: '24px', marginBottom: 'var(--space-2)' }}>{currentRide?.driver?.name || 'Thabo Mthembu'}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                            {currentRide?.driver?.vehicle || 'Maruti Swift'} • {currentRide?.driver?.plate || 'ZA75ABC'}
                        </p>
                        <div className="rating" style={{
                            display: 'inline-block',
                            background: 'var(--color-primary-very-light)',
                            padding: '4px 12px',
                            borderRadius: '16px',
                            color: 'var(--color-primary)',
                            fontWeight: '600'
                        }}>
                            ⭐ {currentRide?.driver?.rating || 4.9} ({currentRide?.driver?.trips || 248} rides)
                        </div>
                    </div>
                </div>

                <div className="pickup-code" style={{
                    background: 'var(--color-bg-secondary)',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    marginBottom: 'var(--space-4)'
                }}>
                    <span className="code" style={{
                        display: 'block',
                        fontSize: '32px',
                        fontWeight: '700',
                        letterSpacing: '4px',
                        color: 'var(--color-text-primary)'
                    }}>4527</span>
                    <span className="instruction" style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Show code to driver</span>
                </div>

                <div className="arrival-info" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-4)',
                    padding: 'var(--space-3)',
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    <p className="eta" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>🚗 Arriving in 4 min</p>
                    <p className="distance" style={{ color: 'var(--color-text-secondary)' }}>2.3 km away</p>
                </div>

                <div className="driver-actions" style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <button onClick={handleCall} className="btn btn-outline flex-1">📞 Call</button>
                    <button onClick={handleMessage} className="btn btn-outline flex-1">💬 Message</button>
                </div>

                <div className="acceptance-prompt">
                    <p style={{ textAlign: 'center', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>Ready to start your ride?</p>
                    <button onClick={() => navigate('/in-ride')} className="btn btn-primary btn-block">
                        I'm Ready
                    </button>
                </div>
            </div>
        </section>
    );
}
