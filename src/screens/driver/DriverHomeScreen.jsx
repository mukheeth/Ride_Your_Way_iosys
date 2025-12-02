import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function DriverHomeScreen() {
    const navigate = useNavigate();
    const { driver, setDriver, rideRequests, dummyCustomers } = useApp();
    const [isOnline, setIsOnline] = useState(driver.isOnline);
    
    // Dummy data
    const driverData = {
        name: 'Thabo Mthembu',
        initials: 'TM',
        earnings: 1250.50,
        todayTrips: 8,
        rating: 4.9,
        acceptanceRate: 95,
        totalTrips: 342,
        totalEarnings: 28500.75
    };

    useEffect(() => {
        if (isOnline) {
            setDriver(prev => ({ ...prev, isOnline: true }));
        } else {
            setDriver(prev => ({ ...prev, isOnline: false }));
        }
    }, [isOnline, setDriver]);

    const toggleOnline = () => {
        setIsOnline(!isOnline);
    };

    return (
        <section className="screen active driver-home-screen">
            {/* Map Background */}
            <div className="driver-map-container">
                <SimpleMap center={[-26.2041, 28.0473]} zoom={14} />
            </div>

            {/* Header Overlay */}
            <div className="driver-header-overlay">
                <div className="driver-profile-pill">
                    <div className="driver-avatar-small">{driverData.initials}</div>
                    <div className="driver-earnings-display">
                        <span className="earnings-label">Today</span>
                        <span className="earnings-amount">R {driverData.earnings.toFixed(2)}</span>
                    </div>
                </div>
                <button className="btn-icon-glass" onClick={() => navigate('/driver/profile')}>
                    ⚙️
                </button>
            </div>

            {/* Bottom Panel */}
            <div className="driver-bottom-panel">
                <div className="driver-stats-grid">
                    <div className="driver-stat-item">
                        <div className="stat-value">{driverData.todayTrips}</div>
                        <div className="stat-label">Trips Today</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="driver-stat-item">
                        <div className="stat-value">⭐ {driverData.rating}</div>
                        <div className="stat-label">Rating</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="driver-stat-item">
                        <div className="stat-value success">{driverData.acceptanceRate}%</div>
                        <div className="stat-label">Acceptance</div>
                    </div>
                </div>

                <div className="driver-actions-section">
                    {!isOnline ? (
                        <button
                            className="btn-go-online"
                            onClick={toggleOnline}
                        >
                            Go Online
                        </button>
                    ) : (
                        <>
                            <button
                                className="btn-go-online online"
                                onClick={toggleOnline}
                            >
                                Go Offline
                            </button>
                            <button
                                className="btn-view-customers"
                                onClick={() => navigate('/driver/customers')}
                            >
                                View Available Rides ({rideRequests.length > 0 ? rideRequests.length : dummyCustomers.length})
                            </button>
                            <div className="driver-status-message">
                                <span className="pulse-dot"></span>
                                {rideRequests.length > 0 ? `${rideRequests.length} new requests` : `${dummyCustomers.length} rides available`}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
