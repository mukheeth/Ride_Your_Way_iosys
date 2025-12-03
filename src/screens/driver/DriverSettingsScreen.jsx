import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverSettingsScreen() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        notifications: true,
        soundAlerts: true,
        vibration: true,
        autoAccept: false,
        darkMode: false,
        language: 'en',
        distanceUnit: 'km',
        currency: 'ZAR'
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
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
                        Settings
                    </h2>
                    <div style={{ width: '60px' }}></div>
                </div>
            </div>

            <div style={{ padding: '20px', marginTop: '-50px', position: 'relative', zIndex: 10 }}>
                {/* Notifications Section */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🔔 Notifications
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Push Notifications</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Receive ride requests</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                                <input 
                                    type="checkbox" 
                                    checked={settings.notifications}
                                    onChange={() => toggleSetting('notifications')}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.notifications ? '#10b981' : '#ccc',
                                    transition: '0.4s',
                                    borderRadius: '28px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        content: '',
                                        height: '20px',
                                        width: '20px',
                                        left: settings.notifications ? '26px' : '4px',
                                        bottom: '4px',
                                        backgroundColor: 'white',
                                        transition: '0.4s',
                                        borderRadius: '50%'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Sound Alerts</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Play sound for new rides</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                                <input 
                                    type="checkbox" 
                                    checked={settings.soundAlerts}
                                    onChange={() => toggleSetting('soundAlerts')}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.soundAlerts ? '#10b981' : '#ccc',
                                    transition: '0.4s',
                                    borderRadius: '28px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        content: '',
                                        height: '20px',
                                        width: '20px',
                                        left: settings.soundAlerts ? '26px' : '4px',
                                        bottom: '4px',
                                        backgroundColor: 'white',
                                        transition: '0.4s',
                                        borderRadius: '50%'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Vibration</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Vibrate on new rides</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                                <input 
                                    type="checkbox" 
                                    checked={settings.vibration}
                                    onChange={() => toggleSetting('vibration')}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.vibration ? '#10b981' : '#ccc',
                                    transition: '0.4s',
                                    borderRadius: '28px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        content: '',
                                        height: '20px',
                                        width: '20px',
                                        left: settings.vibration ? '26px' : '4px',
                                        bottom: '4px',
                                        backgroundColor: 'white',
                                        transition: '0.4s',
                                        borderRadius: '50%'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Ride Preferences */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🚗 Ride Preferences
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Auto-Accept Rides</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Automatically accept ride requests</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                                <input 
                                    type="checkbox" 
                                    checked={settings.autoAccept}
                                    onChange={() => toggleSetting('autoAccept')}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.autoAccept ? '#10b981' : '#ccc',
                                    transition: '0.4s',
                                    borderRadius: '28px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        content: '',
                                        height: '20px',
                                        width: '20px',
                                        left: settings.autoAccept ? '26px' : '4px',
                                        bottom: '4px',
                                        backgroundColor: 'white',
                                        transition: '0.4s',
                                        borderRadius: '50%'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* App Preferences */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ⚙️ App Preferences
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Dark Mode</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Use dark theme</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                                <input 
                                    type="checkbox" 
                                    checked={settings.darkMode}
                                    onChange={() => toggleSetting('darkMode')}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.darkMode ? '#10b981' : '#ccc',
                                    transition: '0.4s',
                                    borderRadius: '28px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        content: '',
                                        height: '20px',
                                        width: '20px',
                                        left: settings.darkMode ? '26px' : '4px',
                                        bottom: '4px',
                                        backgroundColor: 'white',
                                        transition: '0.4s',
                                        borderRadius: '50%'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Language</div>
                            <select 
                                value={settings.language}
                                onChange={(e) => updateSetting('language', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="en">English</option>
                                <option value="af">Afrikaans</option>
                                <option value="zu">Zulu</option>
                                <option value="xh">Xhosa</option>
                            </select>
                        </div>
                        <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Distance Unit</div>
                            <select 
                                value={settings.distanceUnit}
                                onChange={(e) => updateSetting('distanceUnit', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="km">Kilometers (km)</option>
                                <option value="mi">Miles (mi)</option>
                            </select>
                        </div>
                        <div style={{ padding: '16px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Currency</div>
                            <select 
                                value={settings.currency}
                                onChange={(e) => updateSetting('currency', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="ZAR">South African Rand (R)</option>
                                <option value="USD">US Dollar ($)</option>
                                <option value="EUR">Euro (€)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Privacy & Security */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🔒 Privacy & Security
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        <button
                            onClick={() => alert('Change password feature')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: 'white',
                                border: 'none',
                                borderBottom: '1px solid #e0e0e0',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Change Password</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Update your password</div>
                            </div>
                            <span style={{ fontSize: '18px', color: '#666' }}>›</span>
                        </button>
                        <button
                            onClick={() => alert('Privacy settings feature')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: 'white',
                                border: 'none',
                                borderBottom: '1px solid #e0e0e0',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Privacy Settings</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Manage your privacy</div>
                            </div>
                            <span style={{ fontSize: '18px', color: '#666' }}>›</span>
                        </button>
                        <button
                            onClick={() => alert('Two-factor authentication feature')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Two-Factor Authentication</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Add extra security</div>
                            </div>
                            <span style={{ fontSize: '18px', color: '#666' }}>›</span>
                        </button>
                    </div>
                </div>

                {/* About */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ℹ️ About
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div style={{ fontSize: '16px', fontWeight: 600 }}>App Version</div>
                            <div style={{ fontSize: '14px', color: '#666' }}>1.0.0</div>
                        </div>
                        <button
                            onClick={() => alert('Terms of Service')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: 'white',
                                border: 'none',
                                borderBottom: '1px solid #e0e0e0',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ fontSize: '16px', fontWeight: 600 }}>Terms of Service</div>
                            <span style={{ fontSize: '18px', color: '#666' }}>›</span>
                        </button>
                        <button
                            onClick={() => alert('Privacy Policy')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ fontSize: '16px', fontWeight: 600 }}>Privacy Policy</div>
                            <span style={{ fontSize: '18px', color: '#666' }}>›</span>
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <button 
                    style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginBottom: '16px'
                    }}
                    onClick={() => alert('Settings saved successfully!')}
                >
                    Save Settings
                </button>
            </div>
        </section>
    );
}
