import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function DriverProfileScreen() {
    const navigate = useNavigate();
    const { setUserRole } = useApp();
    const [activeModal, setActiveModal] = useState(null);

    // Driver data
    const driverData = {
        name: 'Thabo Mthembu',
        initials: 'TM',
        email: 'nathi@gmail.com',
        phone: '+27 82 123 4567',
        rating: 4.9,
        totalTrips: 342,
        totalEarnings: 28500.75,
        acceptanceRate: 95
    };

    const closeModal = () => setActiveModal(null);

    const handleSwitchRole = () => {
        if (confirm('Switch to Rider mode? You can switch back anytime from your profile.')) {
            setUserRole('rider');
            navigate('/home');
        }
    };

    const menuItems = [
        { id: 'earnings', icon: '💰', text: 'Earnings & Payments', subtext: `R ${driverData.totalEarnings.toLocaleString()}`, action: () => navigate('/driver/earnings') },
        { id: 'history', icon: '📋', text: 'Trip History', subtext: `${driverData.totalTrips} trips completed`, action: () => navigate('/driver/history') },
        { id: 'settings', icon: '⚙️', text: 'Settings', subtext: 'App preferences', action: () => navigate('/driver/settings') },
        { id: 'support', icon: '🆘', text: 'Help & Support', subtext: 'FAQs, Contact Us', action: () => navigate('/driver/support') },
        { id: 'documents', icon: '📄', text: 'Documents', subtext: 'License, Vehicle docs', action: () => setActiveModal('documents') },
        { id: 'switchRole', icon: '🚗', text: 'Switch to Rider', subtext: 'Book rides as a passenger', action: handleSwitchRole, highlight: true }
    ];

    const Modal = ({ title, children }) => (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content slide-up" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={closeModal}>✕</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <section className="screen active profile-screen">
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '16px',
                minHeight: '240px',
                maxHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
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
                        onClick={() => navigate('/driver/home')}
                    >
                        ←
                    </button>
                    <button 
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '16px',
                            cursor: 'pointer',
                            padding: '8px',
                            fontWeight: 600
                        }}
                        onClick={() => setActiveModal('edit')}
                    >
                        ✏️ Edit
                    </button>
                </div>
                <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: 'white',
                        color: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '36px',
                        fontWeight: 700,
                        margin: '0 auto 12px',
                        border: '4px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                        {driverData.initials}
                    </div>
                    <h2 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>
                        {driverData.name}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '14px' }}>
                        {driverData.email}
                    </p>
                </div>
            </div>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '-30px 16px 16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>
                        R {driverData.totalEarnings.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Earnings</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>
                        {driverData.totalTrips}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Trips</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>
                        {driverData.rating} ⭐
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Rating</div>
                </div>
            </div>

            <div style={{ padding: '0 16px' }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px',
                                backgroundColor: item.highlight ? 'rgba(16, 185, 129, 0.05)' : 'white',
                                border: 'none',
                                borderBottom: index < menuItems.length - 1 ? '1px solid #e0e0e0' : 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = item.highlight ? 'rgba(16, 185, 129, 0.05)' : 'white'}
                        >
                            <div style={{ fontSize: '24px', width: '32px', textAlign: 'center' }}>
                                {item.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px', color: '#1a1a1a' }}>
                                    {item.text}
                                </div>
                                <div style={{ fontSize: '13px', color: '#666' }}>
                                    {item.subtext}
                                </div>
                            </div>
                            <div style={{ fontSize: '18px', color: '#666' }}>›</div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to sign out?')) {
                            navigate('/login');
                        }
                    }}
                    style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: 'transparent',
                        border: '2px solid #dc2626',
                        color: '#dc2626',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        marginBottom: '16px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#dc2626';
                    }}
                >
                    Sign Out
                </button>
            </div>

            {/* Edit Profile Modal */}
            {activeModal === 'edit' && (
                <Modal title="✏️ Edit Profile">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="input" defaultValue={driverData.name} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="input" defaultValue={driverData.email} />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" className="input" defaultValue={driverData.phone} />
                    </div>
                    <button className="btn btn-primary btn-block mt-4">Save Changes</button>
                </Modal>
            )}

            {/* Documents Modal */}
            {activeModal === 'documents' && (
                <Modal title="📄 Documents">
                    <div className="document-list">
                        <div className="document-item-view">
                            <span className="doc-icon">📷</span>
                            <div className="doc-info">
                                <div className="doc-name">Profile Photo</div>
                                <div className="doc-status verified">✓ Verified</div>
                            </div>
                        </div>
                        <div className="document-item-view">
                            <span className="doc-icon">📄</span>
                            <div className="doc-info">
                                <div className="doc-name">Driver's License</div>
                                <div className="doc-status verified">✓ Verified</div>
                            </div>
                        </div>
                        <div className="document-item-view">
                            <span className="doc-icon">🚗</span>
                            <div className="doc-info">
                                <div className="doc-name">Vehicle Registration</div>
                                <div className="doc-status verified">✓ Verified</div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-secondary btn-block mt-4">Upload New Document</button>
                </Modal>
            )}
        </section>
    );
}
