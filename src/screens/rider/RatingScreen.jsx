import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function RatingScreen() {
    const navigate = useNavigate();
    const { currentRide, setCurrentRide, selectedPayment, setSelectedPayment } = useApp();
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [comment, setComment] = useState('');

    const tags = ['Safe', 'Friendly', 'Clean', 'On Time'];
    const paymentMethods = [
        { id: 'card', label: 'Card', icon: '💳' },
        { id: 'cash', label: 'Cash', icon: '💵' },
        { id: 'snap', label: 'SNAP', icon: '📱' },
        { id: 'ussd', label: 'USSD', icon: '🔢' },
        { id: 'wallet', label: 'Wallet', icon: '👛' }
    ];

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = () => {
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        alert(`Thank you for rating ${rating} stars! Payment will be processed via ${paymentMethods.find(p => p.id === selectedPayment)?.label}.`);
        // Clear current ride after rating
        setCurrentRide(null);
        navigate('/home');
    };

    const handleSkip = () => {
        // Clear current ride
        setCurrentRide(null);
        navigate('/home');
    };

    return (
        <section className="screen active rating-screen-modern">
            <div className="rating-content-modern">
                {/* Trip Summary Card */}
                <div className="trip-summary-card-modern">
                    <div className="trip-complete-badge">
                        <span className="check-icon">✓</span>
                        <h3>Trip Complete!</h3>
                    </div>
                    <div className="trip-details-modern">
                        <div className="route-info">
                            <span className="route-text">{currentRide?.pickup || 'Sandton'} → {currentRide?.dropoff || 'OR Tambo'}</span>
                            <span className="route-duration">{currentRide?.duration || '22 min'}</span>
                        </div>
                        <div className="fare-display">
                            <span className="fare-amount">R {currentRide?.fare || 85}</span>
                        </div>
                    </div>
                    <div className="driver-mini-rating-modern">
                        <div className="avatar-sm-modern">{currentRide?.driver?.name?.charAt(0) || 'TM'}</div>
                        <div className="driver-info">
                            <p className="driver-name">{currentRide?.driver?.name || 'Thabo Mthembu'}</p>
                            <p className="driver-rating">⭐ {currentRide?.driver?.rating || 4.9}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="payment-section-modern">
                    <h4 className="section-title">Select Payment Method</h4>
                    <div className="payment-methods-grid">
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                className={`payment-method-card ${selectedPayment === method.id ? 'active' : ''}`}
                                onClick={() => setSelectedPayment(method.id)}
                            >
                                <span className="payment-icon">{method.icon}</span>
                                <span className="payment-label">{method.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rating Section */}
                <div className="rating-section-modern">
                    <h4 className="section-title">How was your ride?</h4>
                    <div className="stars-large-modern">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <button
                                key={index}
                                type="button"
                                className={`star-btn ${index < rating ? 'active' : ''}`}
                                onClick={() => handleStarClick(index)}
                            >
                                <span className="star-icon">{index < rating ? '⭐' : '☆'}</span>
                            </button>
                        ))}
                    </div>
                    <textarea 
                        className="rating-textarea"
                        placeholder="Share your experience (optional)" 
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="tags-row-modern">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                className={`feedback-tag-modern ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="rating-actions">
                    <button onClick={handleSubmit} className="btn btn-primary btn-block btn-submit-rating">
                        Submit Rating & Pay
                    </button>
                    <button onClick={handleSkip} className="btn btn-ghost btn-block btn-skip">
                        Skip for Now
                    </button>
                </div>
            </div>
        </section>
    );
}
