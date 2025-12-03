import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProfileScreen() {
    const navigate = useNavigate();
    const { user, setUser, userRole, setUserRole } = useApp();

    // Modal states
    const [activeModal, setActiveModal] = useState(null);

    // Dummy data
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'card', name: 'Visa', last4: '1234', isDefault: true },
        { id: 2, type: 'card', name: 'Mastercard', last4: '5678', isDefault: false },
        { id: 3, type: 'cash', name: 'Cash', isDefault: false },
        { id: 4, type: 'wallet', name: 'Wallet Balance', isDefault: false }
    ]);

    const [emergencyContacts, setEmergencyContacts] = useState([
        { id: 1, name: 'John Doe', phone: '+27 82 123 4567', relationship: 'Brother' },
        { id: 2, name: 'Jane Smith', phone: '+27 83 987 6543', relationship: 'Friend' }
    ]);

    const [walletBalance, setWalletBalance] = useState(250);
    const [loyaltyPoints, setLoyaltyPoints] = useState(420);
    const [loyaltyTier, setLoyaltyTier] = useState('Silver');

    const [ridePreferences, setRidePreferences] = useState([
        { id: 1, type: 'economy', name: 'Economy', icon: '🚗', enabled: true, description: 'Affordable rides' },
        { id: 2, type: 'comfort', name: 'Comfort', icon: '🚙', enabled: true, description: 'More spacious' },
        { id: 3, type: 'premium', name: 'Premium', icon: '🚘', enabled: false, description: 'Luxury vehicles' },
        { id: 4, type: 'xl', name: 'XL', icon: '🚐', enabled: true, description: 'Extra large capacity' }
    ]);

    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: true,
        shareLocation: true,
        autoAcceptRides: false,
        language: 'English'
    });

    const [profileData, setProfileData] = useState({
        name: user.name,
        email: 'nathi@gmail.com',
        phone: user.phone,
        address: '123 Main St, Sandton'
    });

    const closeModal = () => setActiveModal(null);

    // Reusable Modal Component
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

    // Render content based on active modal
    const renderModalContent = () => {
        switch (activeModal) {
            case 'payment':
                return (
                    <Modal title="💳 Payment Methods">
                        {paymentMethods.map(method => (
                            <div key={method.id} className="payment-method-item">
                                <div className="payment-method-info">
                                    <span className="payment-icon">
                                        {method.type === 'card' ? '💳' : method.type === 'cash' ? '💵' : '💰'}
                                    </span>
                                    <div>
                                        <div className="payment-name">{method.name}</div>
                                        {method.last4 && <div className="payment-detail">****{method.last4}</div>}
                                    </div>
                                </div>
                                {method.isDefault && <span className="badge-default">Default</span>}
                            </div>
                        ))}
                        <button className="btn btn-primary btn-block mt-4">+ Add Payment Method</button>
                    </Modal>
                );
            case 'emergency':
                return (
                    <Modal title="🚨 Emergency Contacts">
                        {emergencyContacts.map(contact => (
                            <div key={contact.id} className="emergency-contact-item">
                                <div className="contact-avatar">👤</div>
                                <div className="contact-info">
                                    <div className="contact-name">{contact.name}</div>
                                    <div className="contact-phone">{contact.phone}</div>
                                    <div className="contact-relationship">{contact.relationship}</div>
                                </div>
                                <button className="btn-icon-small">📞</button>
                            </div>
                        ))}
                        <button className="btn btn-primary btn-block mt-4">+ Add Emergency Contact</button>
                    </Modal>
                );
            case 'wallet':
                return (
                    <Modal title="💰 Wallet">
                        <div className="wallet-balance-display">
                            <div className="balance-label">Current Balance</div>
                            <div className="balance-amount">R {walletBalance}</div>
                        </div>
                        <div className="wallet-actions">
                            <button className="btn btn-primary" onClick={() => setWalletBalance(walletBalance + 100)}>+ Add R100</button>
                            <button className="btn btn-primary" onClick={() => setWalletBalance(walletBalance + 500)}>+ Add R500</button>
                        </div>
                        <div className="wallet-history">
                            <h4>Recent Transactions</h4>
                            <div className="transaction-item">
                                <div>
                                    <div className="transaction-desc">Ride to Sandton</div>
                                    <div className="transaction-date">Dec 1, 2025</div>
                                </div>
                                <div className="transaction-amount negative">-R 85</div>
                            </div>
                            <div className="transaction-item">
                                <div>
                                    <div className="transaction-desc">Wallet Top-up</div>
                                    <div className="transaction-date">Nov 28, 2025</div>
                                </div>
                                <div className="transaction-amount positive">+R 200</div>
                            </div>
                        </div>
                    </Modal>
                );
            case 'loyalty':
                return (
                    <Modal title="🏆 Loyalty Program">
                        <div className="loyalty-tier-display">
                            <div className="tier-badge">{loyaltyTier}</div>
                            <div className="tier-points">{loyaltyPoints} Points</div>
                        </div>
                        <div className="loyalty-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${(loyaltyPoints / 1000) * 100}%` }}></div>
                            </div>
                            <div className="progress-label">{1000 - loyaltyPoints} points to Gold tier</div>
                        </div>
                        <div className="loyalty-rewards">
                            <h4>Available Rewards</h4>
                            <div className="reward-item">
                                <div className="reward-info">
                                    <div className="reward-name">10% Off Next Ride</div>
                                    <div className="reward-cost">100 points</div>
                                </div>
                                <button className="btn btn-sm btn-primary">Redeem</button>
                            </div>
                            <div className="reward-item">
                                <div className="reward-info">
                                    <div className="reward-name">Free Economy Ride</div>
                                    <div className="reward-cost">300 points</div>
                                </div>
                                <button className="btn btn-sm btn-primary">Redeem</button>
                            </div>
                        </div>
                    </Modal>
                );
            case 'settings':
                return (
                    <Modal title="⚙️ Settings">
                        <div className="settings-section">
                            <h4>Preferences</h4>
                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-name">🔔 Notifications</div>
                                    <div className="setting-desc">Receive ride updates</div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications}
                                        onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-name">🌙 Dark Mode</div>
                                    <div className="setting-desc">Use dark theme</div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.darkMode}
                                        onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </Modal>
                );
            case 'editProfile':
                return (
                    <Modal title="✏️ Edit Profile">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="input"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="input"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                className="input"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-block mt-4"
                            onClick={() => {
                                setUser({ ...user, name: profileData.name, phone: profileData.phone });
                                closeModal();
                            }}
                        >
                            Save Changes
                        </button>
                    </Modal>
                );
            case 'ridePreferences':
                return (
                    <Modal title="🚗 Ride Preferences">
                        <p className="preference-description">Select which ride types you want to see when booking</p>
                        {ridePreferences.map(ride => (
                            <div key={ride.id} className="ride-preference-item">
                                <div className="ride-preference-info">
                                    <span className="ride-preference-icon">{ride.icon}</span>
                                    <div>
                                        <div className="ride-preference-name">{ride.name}</div>
                                        <div className="ride-preference-desc">{ride.description}</div>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={ride.enabled}
                                        onChange={(e) => {
                                            const updated = ridePreferences.map(r =>
                                                r.id === ride.id ? { ...r, enabled: e.target.checked } : r
                                            );
                                            setRidePreferences(updated);
                                        }}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        ))}
                    </Modal>
                );
            default:
                return null;
        }
    };

    const handleSwitchRole = () => {
        if (confirm('Switch to Driver mode? You can switch back anytime from your profile.')) {
            setUserRole('driver');
            navigate('/driver/home');
        }
    };

    const menuItems = [
        { id: 'payment', icon: '💳', text: 'Payment Methods', subtext: 'Visa, Cash' },
        { id: 'emergency', icon: '🚨', text: 'Emergency Contacts', subtext: '2 contacts added' },
        { id: 'ridePreferences', icon: '🚗', text: 'Ride Preferences', subtext: 'Economy, Comfort' },
        { id: 'wallet', icon: '💰', text: 'Wallet', subtext: `Balance: R ${walletBalance}` },
        { id: 'loyalty', icon: '🏆', text: 'Loyalty Program', subtext: `${loyaltyTier} Tier` },
        { id: 'history', icon: '📜', text: 'Ride History', subtext: 'View past trips', action: () => navigate('/history') },
        { id: 'support', icon: '❓', text: 'Help & Support', subtext: 'FAQs, Contact Us', action: () => navigate('/support') },
        { id: 'switchRole', icon: '🚕', text: 'Switch to Driver', subtext: 'Earn money by driving', action: handleSwitchRole, highlight: true },
        { id: 'settings', icon: '⚙️', text: 'Settings', subtext: 'App preferences' }
    ];

    return (
        <section className="screen active profile-screen">
            <div className="profile-header-modern">
                <div className="header-top">
                    <button className="back-btn-white" onClick={() => navigate('/home')}>←</button>
                    <button className="edit-btn-white" onClick={() => setActiveModal('editProfile')}>✏️ Edit</button>
                </div>
                <div className="profile-info-center">
                    <div className="profile-avatar-large">
                        {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h2 className="profile-name-large">{user.name}</h2>
                    <p className="profile-email-large">{profileData.email}</p>
                </div>
            </div>

            <div className="profile-stats-card">
                <div className="stat-box">
                    <span className="stat-number">{user.trips}</span>
                    <span className="stat-title">Trips</span>
                </div>
                <div className="stat-divider-vertical"></div>
                <div className="stat-box">
                    <span className="stat-number">{user.rating} ⭐</span>
                    <span className="stat-title">Rating</span>
                </div>
                <div className="stat-divider-vertical"></div>
                <div className="stat-box">
                    <span className="stat-number">{loyaltyPoints}</span>
                    <span className="stat-title">Points</span>
                </div>
            </div>

            <div className="profile-menu-list">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => item.action ? item.action() : setActiveModal(item.id)}
                        className={`menu-item-modern ${item.highlight ? 'highlight' : ''}`}
                    >
                        <div className="menu-icon-container">{item.icon}</div>
                        <div className="menu-content">
                            <span className="menu-title">{item.text}</span>
                            <span className="menu-subtitle">{item.subtext}</span>
                        </div>
                        <span className="menu-chevron">›</span>
                    </button>
                ))}
            </div>

            <div className="profile-footer-actions">
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to sign out?')) {
                            navigate('/auth');
                        }
                    }}
                    className="btn-signout"
                >
                    Sign Out
                </button>
            </div>

            {/* Active Modal */}
            {activeModal && renderModalContent()}
        </section>
    );
}
