import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function DriverCongratulationsScreen() {
    const navigate = useNavigate();
    const { currentRequest } = useApp();
    const [tripData, setTripData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('checking');

    // Get trip data from sessionStorage or currentRequest - run immediately
    useEffect(() => {
        const loadTripData = () => {
            const storedData = sessionStorage.getItem('completedTripData');
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData);
                    setTripData(parsed);
                    // Simulate payment check
                    checkPaymentStatus(parsed);
                    // Clear stored data after a delay to ensure it's read
                    setTimeout(() => {
                        sessionStorage.removeItem('completedTripData');
                    }, 100);
                } catch (e) {
                    console.error('Error parsing trip data:', e);
                    setTripData({
                        fare: 85.00,
                        rider: { name: 'John Doe' },
                        paymentMethod: 'Cash'
                    });
                    checkPaymentStatus({ paymentMethod: 'Cash' });
                }
            } else if (currentRequest) {
                setTripData({
                    fare: currentRequest.fare || 85.00,
                    rider: currentRequest.rider || { name: 'John Doe' },
                    paymentMethod: currentRequest.paymentMethod || 'Cash'
                });
                checkPaymentStatus({
                    paymentMethod: currentRequest.paymentMethod || 'Cash'
                });
            } else {
                // Fallback data - show immediately
                setTripData({
                    fare: 85.00,
                    rider: { name: 'John Doe' },
                    paymentMethod: 'Cash'
                });
                checkPaymentStatus({ paymentMethod: 'Cash' });
            }
        };
        
        // Load data immediately
        loadTripData();
    }, [currentRequest]);

    // Simulate payment verification
    const checkPaymentStatus = (data) => {
        // Simulate checking payment (for demo, always succeeds after 1 second)
        setTimeout(() => {
            // In real app, this would check with payment gateway
            // For now, simulate success for all payment methods
            if (data.paymentMethod === 'Cash') {
                // Cash payments are always successful (driver received cash)
                setPaymentStatus('success');
            } else {
                // Card/other payments - simulate verification
                setPaymentStatus('success');
            }
        }, 1000);
    };

    // Auto-navigate to customers page after 4 seconds (gives time for payment check)
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/driver/customers');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <section className="screen active driver-congratulations-screen">
            <div className="congratulations-container">
                <div className="congratulations-content">
                    {/* Success Icon */}
                    <div className="success-icon-wrapper">
                        <div className="success-icon">
                            <svg 
                                viewBox="0 0 100 100" 
                                className="checkmark-svg"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke="#22c55e" 
                                    strokeWidth="4"
                                    className="checkmark-circle"
                                />
                                <path 
                                    d="M 30 50 L 45 65 L 70 35" 
                                    fill="none" 
                                    stroke="#22c55e" 
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="checkmark-path"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Congratulations Message */}
                    <h1 className="congratulations-title">Congratulations!</h1>
                    <p className="congratulations-subtitle">
                        Trip completed successfully
                    </p>

                    {/* Payment Status */}
                    <div className={`payment-status-card ${paymentStatus}`}>
                        {paymentStatus === 'checking' ? (
                            <>
                                <div className="payment-status-icon checking">
                                    <div className="spinner"></div>
                                </div>
                                <div className="payment-status-text">
                                    <span className="status-label">Checking Payment...</span>
                                    <span className="status-message">Verifying transaction</span>
                                </div>
                            </>
                        ) : paymentStatus === 'success' ? (
                            <>
                                <div className="payment-status-icon success">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="payment-status-text">
                                    <span className="status-label">Payment Successful</span>
                                    <span className="status-message">
                                        {tripData?.paymentMethod === 'Cash' 
                                            ? 'Cash received' 
                                            : 'Payment processed successfully'}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="payment-status-icon failed">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="payment-status-text">
                                    <span className="status-label">Payment Failed</span>
                                    <span className="status-message">Please contact support</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Trip Summary */}
                    <div className="trip-summary-card">
                        <div className="summary-item">
                            <span className="summary-label">Rider</span>
                            <span className="summary-value">
                                {tripData?.rider?.name || 'John Doe'}
                            </span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-item">
                            <span className="summary-label">Earnings</span>
                            <span className="summary-value earnings">
                                R {(tripData?.fare || 85.00).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Thank You Message */}
                    <p className="thank-you-message">
                        Thank you for providing excellent service!
                    </p>

                    {/* Loading indicator */}
                    <div className="redirect-indicator">
                        <span>Redirecting to find new riders...</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

