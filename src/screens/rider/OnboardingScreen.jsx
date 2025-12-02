import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingScreen() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(1);

    const slides = [
        {
            id: 1,
            icon: '🗺️',
            title: 'Welcome to RIDE YOUR WAY',
            description: 'Choose from 3 pricing models: Fixed, Negotiate, or Metered.'
        },
        {
            id: 2,
            icon: '💳',
            title: 'Multiple Payment Options',
            description: 'Card, Cash, SNAP, USSD, or Wallet.'
        },
        {
            id: 3,
            icon: '🛡️',
            title: 'Your Safety, Our Priority',
            description: 'Verified drivers, SOS button, 24/7 support.'
        }
    ];

    const handleNext = () => {
        if (currentSlide < 3) {
            setCurrentSlide(currentSlide + 1);
        } else {
            navigate('/role-selection');
        }
    };

    const handlePrevious = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <section className="screen active onboarding-screen">
            <div className="onboarding-container">
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className={`onboarding-slide ${currentSlide === slide.id ? 'active' : ''}`}
                        style={{ 
                            display: currentSlide === slide.id ? 'flex' : 'none'
                        }}
                    >
                        {/* Left Arrow - Show on slides 2 and 3 */}
                        {currentSlide > 1 && (
                            <button 
                                className="onboarding-arrow onboarding-arrow-left"
                                onClick={handlePrevious}
                                aria-label="Previous"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        )}

                        <div className="onboarding-slide-content">
                            <div className="illustration-placeholder">{slide.icon}</div>
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                        </div>

                        {/* Right Arrow - Show on all slides */}
                        <button 
                            className="onboarding-arrow onboarding-arrow-right"
                            onClick={handleNext}
                            aria-label={currentSlide === 3 ? "Get Started" : "Next"}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                ))}

                <div className="onboarding-controls">
                    <div className="dots">
                        {slides.map((slide) => (
                            <span
                                key={slide.id}
                                className={`dot ${currentSlide === slide.id ? 'active' : ''}`}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
