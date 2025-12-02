import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade out animation
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2000);

        // Navigate after fade out completes
        const navTimer = setTimeout(() => {
            navigate('/onboarding');
        }, 2500);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(navTimer);
        };
    }, [navigate]);

    return (
        <section className={`screen active splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="splash-background">
                {/* Animated gradient circles */}
                <div className="gradient-circle circle-1"></div>
                <div className="gradient-circle circle-2"></div>
                <div className="gradient-circle circle-3"></div>
            </div>

            <div className="splash-content">
                {/* Logo with animation */}
                <div className="logo-animation">
                    <div className="logo-ring ring-1"></div>
                    <div className="logo-ring ring-2"></div>
                    <div className="logo-ring ring-3"></div>
                    <div className="logo-center">
                        <svg viewBox="0 0 100 100" className="logo-icon">
                            <path
                                d="M 30 70 Q 50 20, 70 70"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                            />
                            <circle cx="30" cy="70" r="5" fill="currentColor" />
                            <circle cx="70" cy="70" r="5" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {/* Brand name with stagger animation */}
                <div className="brand-container">
                    <h1 className="brand-name">
                        <span className="word word-1">RIDE</span>
                        <span className="word word-2">YOUR</span>
                        <span className="word word-3">WAY</span>
                    </h1>
                    <p className="tagline">Your Ride • Your Price • Your Way</p>
                </div>

                {/* Loading indicator */}
                <div className="loading-container">
                    <div className="loading-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </div>

            {/* Bottom branding */}
            <div className="splash-footer">
                <p className="powered-by">Powered by Innovation</p>
                <p className="version">v1.0.0</p>
            </div>
        </section>
    );
}
