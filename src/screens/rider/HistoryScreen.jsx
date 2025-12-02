import { useNavigate } from 'react-router-dom';

export default function HistoryScreen() {
    const navigate = useNavigate();

    const rides = [
        {
            id: 1,
            driver: 'Thabo',
            driverInitial: 'T',
            route: 'Sandton City → OR Tambo Airport',
            date: 'Today, 2:45 PM',
            status: 'Completed',
            fare: 'R 250',
            type: 'Comfort'
        },
        {
            id: 2,
            driver: 'Sipho',
            driverInitial: 'S',
            route: 'Rosebank Mall → Melville',
            date: 'Yesterday, 8:30 PM',
            status: 'Completed',
            fare: 'R 85',
            type: 'Economy'
        },
        {
            id: 3,
            driver: 'Mike',
            driverInitial: 'M',
            route: 'Midrand → Centurion',
            date: 'Nov 28, 10:15 AM',
            status: 'Cancelled',
            fare: 'R 0',
            type: 'Economy'
        },
        {
            id: 4,
            driver: 'Lerato',
            driverInitial: 'L',
            route: 'Braamfontein → Gold Reef City',
            date: 'Nov 25, 1:00 PM',
            status: 'Completed',
            fare: 'R 120',
            type: 'Premium'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'var(--color-success)';
            case 'Cancelled': return 'var(--color-error)';
            default: return 'var(--color-text-secondary)';
        }
    };

    return (
        <section className="screen active profile-screen">
            <div className="profile-header-modern" style={{ paddingBottom: 'var(--space-6)' }}>
                <div className="header-top">
                    <button className="back-btn-white" onClick={() => navigate('/profile')}>← Back</button>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>My Rides</h2>
                    <div style={{ width: '60px' }}></div> {/* Spacer for alignment */}
                </div>
            </div>

            <div className="ride-list-container" style={{ padding: 'var(--space-4)', marginTop: '-20px', zIndex: 2 }}>
                {rides.map((ride) => (
                    <div
                        key={ride.id}
                        className="ride-card-modern"
                        onClick={() => alert(`Trip Details\n\n${ride.route}\nFare: ${ride.fare}\n\nView receipt?`)}
                    >
                        <div className="ride-card-header">
                            <div className="ride-date">{ride.date}</div>
                            <div className="ride-status" style={{ color: getStatusColor(ride.status), background: `${getStatusColor(ride.status)}20` }}>
                                {ride.status}
                            </div>
                        </div>

                        <div className="ride-card-body">
                            <div className="ride-icon-col">
                                <div className="ride-path-line"></div>
                                <div className="ride-dot start"></div>
                                <div className="ride-dot end"></div>
                            </div>
                            <div className="ride-info-col">
                                <div className="ride-route-text">{ride.route}</div>
                                <div className="ride-driver-info">
                                    <span className="driver-avatar-xs">{ride.driverInitial}</span>
                                    <span className="driver-name">{ride.driver} • {ride.type}</span>
                                </div>
                            </div>
                            <div className="ride-fare-col">
                                <div className="ride-fare-amount">{ride.fare}</div>
                                <div className="ride-arrow">›</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
