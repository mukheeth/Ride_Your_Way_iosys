import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverHistoryScreen() {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Dummy trip history data
    const tripHistory = [
        {
            id: 1,
            date: '2024-12-01',
            time: '14:30',
            pickup: 'Sandton City Mall',
            dropoff: 'OR Tambo Int. Airport',
            fare: 85.00,
            duration: '22 min',
            distance: '12 km',
            rider: { name: 'John Doe', rating: 4.8 },
            paymentMethod: 'Cash',
            status: 'completed'
        },
        {
            id: 2,
            date: '2024-12-01',
            time: '12:15',
            pickup: 'Rosebank',
            dropoff: 'Sandton',
            fare: 120.50,
            duration: '18 min',
            distance: '8 km',
            rider: { name: 'Sarah Smith', rating: 5.0 },
            paymentMethod: 'Card',
            status: 'completed'
        },
        {
            id: 3,
            date: '2024-11-30',
            time: '16:45',
            pickup: 'Sandton',
            dropoff: 'Midrand',
            fare: 95.00,
            duration: '25 min',
            distance: '15 km',
            rider: { name: 'Mike Johnson', rating: 4.5 },
            paymentMethod: 'Wallet',
            status: 'completed'
        },
        {
            id: 4,
            date: '2024-11-30',
            time: '10:20',
            pickup: 'Johannesburg CBD',
            dropoff: 'Pretoria',
            fare: 150.75,
            duration: '45 min',
            distance: '35 km',
            rider: { name: 'Lisa Brown', rating: 4.9 },
            paymentMethod: 'Card',
            status: 'completed'
        },
        {
            id: 5,
            date: '2024-11-29',
            time: '09:00',
            pickup: 'Sandton',
            dropoff: 'Fourways',
            fare: 65.00,
            duration: '15 min',
            distance: '7 km',
            rider: { name: 'David Wilson', rating: 4.7 },
            paymentMethod: 'Cash',
            status: 'completed'
        },
        {
            id: 6,
            date: '2024-11-28',
            time: '18:30',
            pickup: 'Rosebank',
            dropoff: 'Sandton',
            fare: 110.25,
            duration: '20 min',
            distance: '9 km',
            rider: { name: 'Emma Davis', rating: 5.0 },
            paymentMethod: 'Card',
            status: 'completed'
        }
    ];

    const filters = [
        { id: 'all', label: 'All Trips' },
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' }
    ];

    const filteredTrips = selectedFilter === 'all' 
        ? tripHistory 
        : tripHistory.filter(trip => {
            const tripDate = new Date(trip.date);
            const now = new Date();
            switch(selectedFilter) {
                case 'today':
                    return tripDate.toDateString() === now.toDateString();
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return tripDate >= weekAgo;
                case 'month':
                    return tripDate.getMonth() === now.getMonth() && tripDate.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
        });

    const totalEarnings = filteredTrips.reduce((sum, trip) => sum + trip.fare, 0);
    const totalTrips = filteredTrips.length;

    return (
        <section className="screen active driver-history-screen">
            {/* Header */}
            <div className="driver-screen-header">
                <button className="btn-back" onClick={() => navigate('/driver/home')}>
                    ← Back
                </button>
                <h2>Trip History</h2>
                <button className="btn-filter" onClick={() => alert('Filter options')}>
                    🔍
                </button>
            </div>

            <div className="history-content">
                {/* Filter Tabs */}
                <div className="filter-tabs">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`filter-tab ${selectedFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="history-summary-card">
                    <div className="summary-item">
                        <div className="summary-value">{totalTrips}</div>
                        <div className="summary-label">Trips</div>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-item">
                        <div className="summary-value">R {totalEarnings.toFixed(2)}</div>
                        <div className="summary-label">Total Earnings</div>
                    </div>
                </div>

                {/* Trip List */}
                <div className="trip-history-list">
                    {filteredTrips.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📋</div>
                            <p>No trips found for this period</p>
                        </div>
                    ) : (
                        filteredTrips.map(trip => (
                            <div key={trip.id} className="trip-history-item">
                                <div className="trip-header">
                                    <div className="trip-date-time">
                                        <span className="trip-date">{new Date(trip.date).toLocaleDateString('en-ZA', { 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}</span>
                                        <span className="trip-time">{trip.time}</span>
                                    </div>
                                    <div className="trip-fare">R {trip.fare.toFixed(2)}</div>
                                </div>
                                
                                <div className="trip-route">
                                    <div className="route-point-history">
                                        <div className="route-marker-small pickup"></div>
                                        <span className="route-text">{trip.pickup}</span>
                                    </div>
                                    <div className="route-line-small"></div>
                                    <div className="route-point-history">
                                        <div className="route-marker-small dropoff"></div>
                                        <span className="route-text">{trip.dropoff}</span>
                                    </div>
                                </div>

                                <div className="trip-footer">
                                    <div className="trip-rider-info">
                                        <span className="rider-avatar-mini">{trip.rider.name.charAt(0)}</span>
                                        <div>
                                            <span className="rider-name">{trip.rider.name}</span>
                                            <span className="rider-rating">⭐ {trip.rider.rating}</span>
                                        </div>
                                    </div>
                                    <div className="trip-meta">
                                        <span className="trip-duration">{trip.duration}</span>
                                        <span className="trip-distance">{trip.distance}</span>
                                        <span className="trip-payment">{trip.paymentMethod}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

