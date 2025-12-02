import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function AuthScreen() {
    const navigate = useNavigate();
    const { userRole, setUserRole } = useApp();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            // Navigate based on role, default to rider
            if (userRole === 'driver') {
                navigate('/driver/home');
            } else {
                navigate('/home');
            }
        }, 1500);
    };

    return (
        <section className="screen active">
            {/* Login View */}
            {isLogin ? (
                <div className="auth-view active">
                    <div className="auth-header">
                        <div className="logo-small">RYW</div>
                        <h2>Welcome Back</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="label-l">Phone Number</label>
                            <div className="phone-input">
                                <span className="prefix">+27</span>
                                <input type="tel" placeholder="7XX XXX XXXX" required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="label-l">Password</label>
                            <input type="password" placeholder="••••••••" required />
                            <a href="#" className="forgot-link">Forgot Password?</a>
                        </div>
                        <div className="checkbox-group">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="divider"><span>OR</span></div>
                    <button className="btn btn-secondary btn-block social-btn">Continue with Google</button>
                    <div className="auth-footer">
                        <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>Sign Up</a></p>
                    </div>
                </div>
            ) : (
                /* Signup View */
                <div className="auth-view active">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="label-l">Full Name</label>
                            <input type="text" placeholder="John Doe" required />
                        </div>
                        <div className="input-group">
                            <label className="label-l">Phone Number</label>
                            <div className="phone-input">
                                <span className="prefix">+27</span>
                                <input type="tel" placeholder="7XX XXX XXXX" required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="label-l">Password</label>
                            <input type="password" placeholder="Create password" required />
                        </div>
                        <div className="checkbox-group">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I accept Terms & Privacy</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    <div className="auth-footer">
                        <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Sign In</a></p>
                    </div>
                </div>
            )}
        </section>
    );
}
