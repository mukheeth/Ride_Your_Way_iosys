import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function RoleSelectionScreen() {
    const navigate = useNavigate();
    const { setUserRole } = useApp();
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setTimeout(() => {
            setUserRole(role);
            if (role === 'rider') {
                navigate('/login');
            } else {
                navigate('/driver/register');
            }
        }, 300);
    };

    return (
        <section className="screen active role-selection-screen">
            <div className="role-selection-container">
                <div className="role-selection-header">
                    <div className="logo-large">RYW</div>
                    <h2>Choose Your Role</h2>
                    <p>Select how you want to use Ride Your Way</p>
                </div>

                <div className="role-cards">
                    <div 
                        className={`role-card ${selectedRole === 'rider' ? 'selected' : ''}`}
                        onClick={() => handleRoleSelect('rider')}
                    >
                        <div className="role-icon">🚗</div>
                        <h3>Rider</h3>
                        <p>Book rides and get where you need to go</p>
                        <div className="role-features">
                            <span>✓ Book rides</span>
                            <span>✓ Track driver</span>
                            <span>✓ Multiple payment options</span>
                        </div>
                        <button className="btn-role-select">Continue as Rider</button>
                    </div>

                    <div 
                        className={`role-card ${selectedRole === 'driver' ? 'selected' : ''}`}
                        onClick={() => handleRoleSelect('driver')}
                    >
                        <div className="role-icon">🚕</div>
                        <h3>Driver</h3>
                        <p>Earn money by providing rides</p>
                        <div className="role-features">
                            <span>✓ Accept ride requests</span>
                            <span>✓ Earn money</span>
                            <span>✓ Flexible schedule</span>
                        </div>
                        <button className="btn-role-select">Continue as Driver</button>
                    </div>
                </div>

                <div className="role-selection-footer">
                    <p>You can switch roles anytime from your profile</p>
                </div>
            </div>
        </section>
    );
}

