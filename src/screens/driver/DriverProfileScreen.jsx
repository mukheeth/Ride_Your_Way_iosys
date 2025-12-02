import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function DriverProfileScreen() {
    const navigate = useNavigate();
    const { setUserRole } = useApp();
    const [activeModal, setActiveModal] = useState(null);

    // Dummy driver data
    const driverData = {
        name: 'Thabo Mthembu',
        initials: 'TM',
        email: 'thabo.mthembu@example.com',
        phone: '+27 82 123 4567',
        idNumber: '850101 5800 08 5',
        licenseNumber: 'DL123456789',
        licenseExpiry: '2025-12-31',
        rating: 4.9,
        totalTrips: 342,
        totalEarnings: 28500.75,
        acceptanceRate: 95,
        memberSince: '2023-01-15'
    };

    const vehicleData = {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        color: 'White',
        registration: 'ABC 123 GP',
        type: 'Sedan'
    };

    const [settings, setSettings] = useState({
        notifications: true,
        soundAlerts: true,
        autoAccept: false,
        shareLocation: true,
        darkMode: false
    });

    const closeModal = () => setActiveModal(null);

    const handleSettingToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

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
        <section className="screen active driver-profile-screen">
            {/* Header */}
            <div className="driver-profile-header">
                <button className="btn-back-white" onClick={() => navigate('/driver/home')}>
                    ← Back
                </button>
                <h2>Profile</h2>
                <button className="btn-edit-white" onClick={() => setActiveModal('edit')}>
                    Edit
                </button>
            </div>

            <div className="driver-profile-content">
                {/* Profile Card */}
                <div className="driver-profile-card">
                    <div className="driver-avatar-large-profile">
                        {driverData.initials}
                    </div>
                    <h3 className="driver-name-large">{driverData.name}</h3>
                    <p className="driver-email">{driverData.email}</p>
                    <div className="driver-rating-badge">
                        ⭐ {driverData.rating} • {driverData.totalTrips} trips
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="driver-stats-card">
                    <div className="driver-stat-box">
                        <div className="stat-value-large">R {driverData.totalEarnings.toLocaleString()}</div>
                        <div className="stat-label-small">Total Earnings</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="driver-stat-box">
                        <div className="stat-value-large">{driverData.totalTrips}</div>
                        <div className="stat-label-small">Total Trips</div>
                    </div>
                    <div className="stat-divider-vertical"></div>
                    <div className="driver-stat-box">
                        <div className="stat-value-large">{driverData.acceptanceRate}%</div>
                        <div className="stat-label-small">Acceptance</div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="driver-info-section">
                    <h4 className="section-title">Personal Information</h4>
                    <div className="info-item">
                        <span className="info-label">Phone</span>
                        <span className="info-value">{driverData.phone}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">ID Number</span>
                        <span className="info-value">{driverData.idNumber}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Member Since</span>
                        <span className="info-value">{new Date(driverData.memberSince).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* License Information */}
                <div className="driver-info-section">
                    <h4 className="section-title">License Information</h4>
                    <div className="info-item">
                        <span className="info-label">License Number</span>
                        <span className="info-value">{driverData.licenseNumber}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Expiry Date</span>
                        <span className="info-value">{new Date(driverData.licenseExpiry).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Vehicle Information */}
                <div className="driver-info-section">
                    <h4 className="section-title">Vehicle Information</h4>
                    <div className="vehicle-card">
                        <div className="vehicle-icon">🚗</div>
                        <div className="vehicle-details">
                            <div className="vehicle-name">{vehicleData.make} {vehicleData.model}</div>
                            <div className="vehicle-specs">
                                {vehicleData.year} • {vehicleData.color} • {vehicleData.registration}
                            </div>
                        </div>
                        <button className="btn-edit-small" onClick={() => setActiveModal('vehicle')}>
                            Edit
                        </button>
                    </div>
                </div>

                {/* Settings */}
                <div className="driver-info-section">
                    <h4 className="section-title">Settings</h4>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-name">Push Notifications</span>
                            <span className="setting-desc">Receive ride request alerts</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={() => handleSettingToggle('notifications')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-name">Sound Alerts</span>
                            <span className="setting-desc">Play sound for new requests</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.soundAlerts}
                                onChange={() => handleSettingToggle('soundAlerts')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-name">Auto Accept Rides</span>
                            <span className="setting-desc">Automatically accept ride requests</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.autoAccept}
                                onChange={() => handleSettingToggle('autoAccept')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-name">Share Location</span>
                            <span className="setting-desc">Share location with riders</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.shareLocation}
                                onChange={() => handleSettingToggle('shareLocation')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="driver-menu-section">
                    <button className="menu-item-driver" onClick={() => navigate('/driver/earnings')}>
                        <span className="menu-icon">💰</span>
                        <span className="menu-text">Earnings & Payments</span>
                        <span className="menu-arrow">→</span>
                    </button>
                    <button className="menu-item-driver" onClick={() => navigate('/driver/history')}>
                        <span className="menu-icon">📋</span>
                        <span className="menu-text">Trip History</span>
                        <span className="menu-arrow">→</span>
                    </button>
                    <button className="menu-item-driver" onClick={() => navigate('/driver/support')}>
                        <span className="menu-icon">🆘</span>
                        <span className="menu-text">Help & Support</span>
                        <span className="menu-arrow">→</span>
                    </button>
                    <button className="menu-item-driver" onClick={() => setActiveModal('documents')}>
                        <span className="menu-icon">📄</span>
                        <span className="menu-text">Documents</span>
                        <span className="menu-arrow">→</span>
                    </button>
                    <button 
                        className="menu-item-driver highlight" 
                        onClick={() => {
                            if (confirm('Switch to Rider mode? You can switch back anytime from your profile.')) {
                                setUserRole('rider');
                                navigate('/home');
                            }
                        }}
                    >
                        <span className="menu-icon">🚗</span>
                        <span className="menu-text">Switch to Rider</span>
                        <span className="menu-arrow">→</span>
                    </button>
                </div>

                {/* Sign Out Button */}
                <button className="btn-signout-driver" onClick={() => {
                    if (confirm('Are you sure you want to sign out?')) {
                        navigate('/login');
                    }
                }}>
                    Sign Out
                </button>
            </div>

            {/* Modals */}
            {activeModal === 'edit' && (
                <Modal title="Edit Profile">
                    <div className="form-group">
                        <label className="label-l">Full Name</label>
                        <input type="text" defaultValue={driverData.name} />
                    </div>
                    <div className="form-group">
                        <label className="label-l">Email</label>
                        <input type="email" defaultValue={driverData.email} />
                    </div>
                    <div className="form-group">
                        <label className="label-l">Phone</label>
                        <input type="tel" defaultValue={driverData.phone} />
                    </div>
                    <button className="btn btn-primary btn-block mt-4">Save Changes</button>
                </Modal>
            )}

            {activeModal === 'vehicle' && (
                <Modal title="Vehicle Information">
                    <div className="form-group">
                        <label className="label-l">Make</label>
                        <input type="text" defaultValue={vehicleData.make} />
                    </div>
                    <div className="form-group">
                        <label className="label-l">Model</label>
                        <input type="text" defaultValue={vehicleData.model} />
                    </div>
                    <div className="form-group">
                        <label className="label-l">Year</label>
                        <input type="number" defaultValue={vehicleData.year} />
                    </div>
                    <div className="form-group">
                        <label className="label-l">Registration</label>
                        <input type="text" defaultValue={vehicleData.registration} />
                    </div>
                    <button className="btn btn-primary btn-block mt-4">Update Vehicle</button>
                </Modal>
            )}

            {activeModal === 'documents' && (
                <Modal title="Documents">
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

