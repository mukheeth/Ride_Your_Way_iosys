import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverHistoryScreen() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    const trips = [
        { id: 1, date: '2025-12-03', time: '14:30', pickup: 'Sandton City', dropoff: 'OR Tambo Airport', fare: 285.00, distance: '28 km', duration: '35 min', status: 'completed', rating: 5 },
        { id: 2, date: '2025-12-03', time: '12:15', pickup: 'Rosebank Mall', dropoff: 'Sandton', fare: 120.50, distance: '8 km', duration: '18 min', status: 'completed', rating: 5 },
        { id: 3, date: '2025-12-03', time: '10:45', pickup: 'Melrose Arch', dropoff: 'Fourways', fare: 195.00, distance: '15 km', duration: '25 min', status: 'completed', rating: 4 },
        { id: 4, date: '2025-12-02', time: '18:20', pickup: 'Hyde Park', dropoff: 'Midrand', fare: 210.00, distance: '22 km', duration: '32 min', status: 'completed', rating: 5 },
        { id: 5, date: '2025-12-02', time: '16:00', pickup: 'Sandton', dropoff: 'Randburg', fare: 145.50, distance: '12 km', duration: '20 min', status: 'completed', rating: 4 },
        { id: 6, date: '2025-12-02', time: '14:30', pickup: 'Woodmead', dropoff: 'Sandton City', fare: 95.00, distance: '6 km', duration: '15 min', status: 'completed', rating: 5 },
        { id: 7, date: '2025-12-01', time: '20:15', pickup: 'Rivonia', dropoff: 'Centurion', fare: 320.00, distance: '35 km', duration: '45 min', status: 'completed', rating: 5 },
        { id: 8, date: '2025-12-01', time: '17:45', pickup: 'Bryanston', dropoff: 'Sandton', fare: 85.00, distance: '5 km', duration: '12 min', status: 'completed', rating: 3 },
        { id: 9, date: '2025-12-01', time: '15:30', pickup: 'Morningside', dropoff: 'Rosebank', fare: 75.00, distance: '4 km', duration: '10 min', status: 'cancelled', rating: null },
        { id: 10, date: '2025-11-30', time: '19:00', pickup: 'Sandton', dropoff: 'Pretoria', fare: 450.00, distance: '55 km', duration: '65 min', status: 'completed', rating: 5 }
    ];

    const filteredTrips = filter === 'all' ? trips : trips.filter(trip => trip.status === filter);

    const stats = {
        total: trips.length,
        completed: trips.filter(t => t.status === 'completed').length,
        cancelled: trips.filter(t => t.status === 'cancelled').length,
        totalEarnings: trips.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.fare, 0)
    };

    return (
        <section className="screen active profile-screen">
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '16px',
                minHeight: '120px',
                maxHeight: '120px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '24px',
                            cursor: 'pointer',
                            padding: '8px',
                            minWidth: '60px'
                        }}
                        onClick={() => navigate('/driver/profile')}
                    >
                        ←
                    </button>
                    <h2 style={{ color: 'white', margin: 0, flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 700 }}>
                        Trip History
                    </h2>
                    <div style={{ width: '60px' }}></div>
                </div>
            </div>

            <div style={{ padding: '20px', marginTop: '-50px', position: 'relative', zIndex: 10 }}>
                {/* Stats Summary */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>{stats.completed}</span>
                            <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Completed</span>
                        </div>
                        <div style={{ width: '1px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: '#dc2626' }}>{stats.cancelled}</span>
                            <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Cancelled</span>
                        </div>
                        <div style={{ width: '1px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>R {stats.totalEarnings.toFixed(2)}</span>
                            <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Total</span>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '24px', 
                    backgroundColor: 'white', 
                    padding: '4px', 
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <button 
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: filter === 'all' ? '#10b981' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: filter === 'all' ? 'white' : '#666',
                            cursor: 'pointer'
                        }}
                        onClick={() => setFilter('all')}
                    >
                        All ({stats.total})
                    </button>
                    <button 
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: filter === 'completed' ? '#10b981' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: filter === 'completed' ? 'white' : '#666',
                            cursor: 'pointer'
                        }}
                        onClick={() => setFilter('completed')}
                    >
                        Completed ({stats.completed})
                    </button>
                    <button 
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: filter === 'cancelled' ? '#10b981' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: filter === 'cancelled' ? 'white' : '#666',
                            cursor: 'pointer'
                        }}
                        onClick={() => setFilter('cancelled')}
                    >
                        Cancelled ({stats.cancelled})
                    </button>
                </div>

                {/* Trip List */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📋 Recent Trips
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        {filteredTrips.map((trip, index) => (
                            <div key={trip.id} style={{
                                padding: '16px',
                                borderBottom: index < filteredTrips.length - 1 ? '1px solid #e0e0e0' : 'none'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                                            {trip.pickup} → {trip.dropoff}
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#666' }}>
                                            {trip.date} • {trip.time} • {trip.distance} • {trip.duration}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#10b981' }}>
                                        R {trip.fare.toFixed(2)}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ 
                                        fontSize: '11px', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px',
                                        backgroundColor: trip.status === 'completed' ? '#dcfce7' : '#fee2e2',
                                        color: trip.status === 'completed' ? '#166534' : '#991b1b'
                                    }}>
                                        {trip.status === 'completed' ? '✓ Completed' : '✕ Cancelled'}
                                    </span>
                                    {trip.rating && (
                                        <span style={{ fontSize: '12px' }}>
                                            {'⭐'.repeat(trip.rating)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
