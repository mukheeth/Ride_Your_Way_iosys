import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function HomeScreen() {
    const navigate = useNavigate();
    const { user, rideType, setRideType, pricingModel, setPricingModel, pickup, setPickup, dropoff, setDropoff, selectedPayment, createRideRequest } = useApp();

    const handleRequestRide = () => {
        if (!pickup || !dropoff) {
            alert('Please enter both pickup and dropoff locations');
            return;
        }

        // Create ride request
        const rideData = {
            pickup,
            dropoff,
            rideType,
            pricingModel,
            fare: 85.00,
            distance: '15 km',
            duration: '22 min',
            estimatedFare: 'R 85',
            paymentMethod: selectedPayment
        };

        createRideRequest(rideData);
        navigate('/matching');
    };

    return (
        <section className="screen active home-screen">
            <header className="home-header">
                <div className="status-bar-spacer"></div>
                <div className="header-content">
                    <div className="user-greeting" onClick={() => navigate('/profile')}>
                        <h3>Hi, {user.name}! 👋</h3>
                        <p className="location-text">📍 Sandton, Johannesburg</p>
                    </div>
                    <div className="notification-icon">🔔<span className="badge-dot"></span></div>
                </div>

                <div className="pricing-tabs">
                    {['fixed', 'negotiate', 'metered'].map((model) => (
                        <button
                            key={model}
                            className={`tab ${pricingModel === model ? 'active' : ''}`}
                            onClick={() => setPricingModel(model)}
                        >
                            <span className="icon">{model === 'fixed' ? '💰' : model === 'negotiate' ? '🤝' : '⏱️'}</span>
                            <span className="text">{model.charAt(0).toUpperCase() + model.slice(1)}</span>
                            <span className="badge-mini">{model === 'fixed' ? 'Most Popular' : model === 'negotiate' ? 'Save 20%' : 'Taxi'}</span>
                        </button>
                    ))}
                </div>
            </header>

            <main className="home-content">
                <div className="map-container">
                    <SimpleMap 
                        center={[-26.2041, 28.0473]} 
                        zoom={13}
                    />
                </div>

                <div className="booking-panel">
                    <div className="ride-types-scroll">
                        {['economy', 'comfort', 'premium', 'xl'].map((type) => (
                            <div
                                key={type}
                                className={`ride-card ${rideType === type ? 'selected' : ''}`}
                                onClick={() => setRideType(type)}
                            >
                                <div className="icon">{type === 'economy' ? '🚗' : type === 'comfort' ? '🚙' : type === 'premium' ? '🚘' : '🚐'}</div>
                                <div className="label">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                            </div>
                        ))}
                    </div>

                    <div className="location-inputs">
                        <div className="input-row">
                            <span className="icon">📍</span>
                            <input
                                type="text"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                placeholder="Pickup location"
                            />
                        </div>
                        <div className="swap-btn" onClick={() => { const temp = pickup; setPickup(dropoff); setDropoff(temp); }}>⇅</div>
                        <div className="input-row">
                            <span className="icon">🏁</span>
                            <input
                                type="text"
                                value={dropoff}
                                onChange={(e) => setDropoff(e.target.value)}
                                placeholder="Where to?"
                            />
                        </div>
                    </div>

                    <div className="saved-places">
                        <div className="place-item" onClick={() => setDropoff('123 Main St, Sandton')}>
                            <span className="icon">🏠</span>
                            <div>
                                <div className="place-name">Home</div>
                                <div className="place-address">123 Main St, Sandton</div>
                            </div>
                        </div>
                        <div className="place-item" onClick={() => setDropoff('456 Business Ave')}>
                            <span className="icon">💼</span>
                            <div>
                                <div className="place-name">Work</div>
                                <div className="place-address">456 Business Ave</div>
                            </div>
                        </div>
                    </div>

                    <div className="fare-estimate">
                        <div className="fare-details">
                            <span>Estimated Fare</span>
                            <span className="total-price">R 85</span>
                        </div>
                    </div>

                    <button onClick={handleRequestRide} className="btn btn-primary btn-block btn-lg">
                        Request Ride
                    </button>
                </div>
            </main>
        </section>
    );
}
