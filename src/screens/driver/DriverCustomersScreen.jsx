import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SimpleMap from '../../components/SimpleMap';

export default function DriverCustomersScreen() {
    const navigate = useNavigate();
    const { dummyCustomers, acceptRideRequest, setCurrentRequest } = useApp();
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Combine dummy customers with actual ride requests
    const availableCustomers = [...dummyCustomers];

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
        // Create a ride request from customer data
        const rideRequest = {
            id: customer.id,
            pickup: customer.pickup.name,
            dropoff: customer.dropoff.name,
            fare: customer.fare,
            distance: customer.distance,
            duration: customer.duration,
            rideType: customer.rideType,
            paymentMethod: customer.paymentMethod,
            pickupLocation: [customer.pickup.lat, customer.pickup.lng],
            dropoffLocation: [customer.dropoff.lat, customer.dropoff.lng],
            rider: customer.rider,
            status: 'pending'
        };
        
        // Set as current request and navigate
        setCurrentRequest(rideRequest);
        navigate('/driver/request');
    };

    return (
        <section className="screen active driver-customers-screen">
            {/* Map Background */}
            <div className="driver-map-container">
                <SimpleMap 
                    center={[-26.2041, 28.0473]} 
                    zoom={12}
                    showRoute={false}
                />
            </div>

            {/* Header */}
            <div className="driver-header-overlay">
                <button className="btn-back-white" onClick={() => navigate('/driver/home')}>
                    ← Back
                </button>
                <h2 className="header-title-white">Available Rides</h2>
                <div style={{ width: '60px' }}></div>
            </div>

            {/* Customers List */}
            <div className="customers-list-panel">
                <div className="customers-list-header">
                    <h3>{availableCustomers.length} Rides Available</h3>
                    <span className="online-badge">🟢 Online</span>
                </div>

                <div className="customers-list">
                    {availableCustomers.length === 0 ? (
                        <div className="empty-customers">
                            <div className="empty-icon">🚗</div>
                            <p>No rides available at the moment</p>
                            <p className="empty-hint">Keep this screen open to receive new requests</p>
                        </div>
                    ) : (
                        availableCustomers.map((customer) => (
                            <div 
                                key={customer.id} 
                                className="customer-card"
                                onClick={() => handleSelectCustomer(customer)}
                            >
                                <div className="customer-header">
                                    <div className="customer-avatar">
                                        {customer.rider.initials}
                                    </div>
                                    <div className="customer-info">
                                        <div className="customer-name">{customer.rider.name}</div>
                                        <div className="customer-rating">⭐ {customer.rider.rating}</div>
                                    </div>
                                    <div className="customer-fare">
                                        R {customer.fare.toFixed(2)}
                                    </div>
                                </div>

                                <div className="customer-route">
                                    <div className="route-point-customer">
                                        <div className="route-marker-customer pickup"></div>
                                        <div className="route-text-customer">
                                            <span className="route-label">From:</span>
                                            <span className="route-name">{customer.pickup.name}</span>
                                        </div>
                                    </div>
                                    <div className="route-line-customer"></div>
                                    <div className="route-point-customer">
                                        <div className="route-marker-customer dropoff"></div>
                                        <div className="route-text-customer">
                                            <span className="route-label">To:</span>
                                            <span className="route-name">{customer.dropoff.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="customer-meta">
                                    <span className="meta-item">🚗 {customer.rideType}</span>
                                    <span className="meta-item">📍 {customer.distance}</span>
                                    <span className="meta-item">⏱️ {customer.duration}</span>
                                    <span className="meta-item">💳 {customer.paymentMethod}</span>
                                </div>

                                <button className="btn-accept-customer">
                                    Accept Ride
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

