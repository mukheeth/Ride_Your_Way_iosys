import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverSupportScreen() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);

    // Dummy FAQ data
    const faqs = [
        {
            id: 1,
            category: 'Getting Started',
            question: 'How do I go online and start receiving rides?',
            answer: 'Tap the "Go Online" button on your home screen. Make sure your vehicle information and documents are verified. Once online, you\'ll start receiving ride requests from nearby riders.'
        },
        {
            id: 2,
            category: 'Getting Started',
            question: 'How do I accept or decline a ride request?',
            answer: 'When you receive a ride request, you\'ll see the pickup location, destination, and fare. Tap "Accept Ride" to accept or "Decline" to reject. You have 15 seconds to respond.'
        },
        {
            id: 3,
            category: 'Earnings',
            question: 'When do I get paid?',
            answer: 'Earnings are automatically deposited to your registered bank account every week. Payouts are processed every Monday for the previous week\'s earnings.'
        },
        {
            id: 4,
            category: 'Earnings',
            question: 'How are fares calculated?',
            answer: 'Fares are calculated based on distance, time, and the pricing model selected by the rider (Fixed, Negotiate, or Metered). You\'ll see the fare amount before accepting the ride.'
        },
        {
            id: 5,
            category: 'Technical',
            question: 'What should I do if the app crashes?',
            answer: 'Try restarting the app. If the problem persists, check your internet connection and ensure you have the latest app version. Contact support if issues continue.'
        },
        {
            id: 6,
            category: 'Technical',
            question: 'How do I update my vehicle information?',
            answer: 'Go to Profile → Vehicle Information → Edit. Update your vehicle details and submit. Changes may require verification before approval.'
        },
        {
            id: 7,
            category: 'Safety',
            question: 'What should I do in case of an emergency?',
            answer: 'If you feel unsafe, you can cancel the ride and contact support immediately. Use the SOS feature if available. Always prioritize your safety.'
        },
        {
            id: 8,
            category: 'Account',
            question: 'How do I update my bank account details?',
            answer: 'Go to Profile → Earnings & Payments → Edit Payment Details. Update your bank information and verify the changes. It may take 24-48 hours to process.'
        }
    ];

    const quickActions = [
        { id: 1, icon: '📞', label: 'Call Support', action: () => window.location.href = 'tel:+27111234567' },
        { id: 2, icon: '💬', label: 'Live Chat', action: () => alert('Live chat feature coming soon!') },
        { id: 3, icon: '📧', label: 'Email Us', action: () => window.location.href = 'mailto:support@rideyourway.com' },
        { id: 4, icon: '📋', label: 'Report Issue', action: () => alert('Report issue feature') }
    ];

    const supportTopics = [
        { id: 1, icon: '🚗', title: 'Ride Issues', description: 'Problems with rides or passengers' },
        { id: 2, icon: '💰', title: 'Payment Help', description: 'Questions about earnings and payouts' },
        { id: 3, icon: '📱', title: 'App Problems', description: 'Technical issues with the app' },
        { id: 4, icon: '📄', title: 'Documents', description: 'License and vehicle verification' },
        { id: 5, icon: '⚙️', title: 'Account Settings', description: 'Profile and preferences' },
        { id: 6, icon: '🆘', title: 'Safety & Emergency', description: 'Safety concerns and emergencies' }
    ];

    const filteredFaqs = searchQuery
        ? faqs.filter(faq => 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : faqs;

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    return (
        <section className="screen active driver-support-screen">
            {/* Header */}
            <div className="driver-screen-header">
                <button className="btn-back" onClick={() => navigate('/driver/home')}>
                    ← Back
                </button>
                <h2>Help & Support</h2>
                <div style={{ width: '60px' }}></div>
            </div>

            <div className="support-content">
                {/* Quick Actions */}
                <div className="quick-actions-grid">
                    {quickActions.map(action => (
                        <button
                            key={action.id}
                            className="quick-action-btn"
                            onClick={action.action}
                        >
                            <span className="action-icon">{action.icon}</span>
                            <span className="action-label">{action.label}</span>
                        </button>
                    ))}
                </div>

                {/* Support Topics */}
                <div className="support-topics-section">
                    <h4 className="section-title">Browse by Topic</h4>
                    <div className="topics-grid">
                        {supportTopics.map(topic => (
                            <button
                                key={topic.id}
                                className="topic-card"
                                onClick={() => {
                                    setSearchQuery('');
                                    setExpandedFaq(null);
                                    // Filter by topic category
                                }}
                            >
                                <span className="topic-icon">{topic.icon}</span>
                                <div className="topic-info">
                                    <div className="topic-title">{topic.title}</div>
                                    <div className="topic-desc">{topic.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="search-section">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchQuery('')}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <h4 className="section-title">
                        Frequently Asked Questions
                        {searchQuery && <span className="results-count"> ({filteredFaqs.length} results)</span>}
                    </h4>
                    <div className="faq-list-driver">
                        {filteredFaqs.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">❓</div>
                                <p>No results found. Try a different search term.</p>
                            </div>
                        ) : (
                            filteredFaqs.map(faq => (
                                <div key={faq.id} className="faq-item-driver">
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleFaq(faq.id)}
                                    >
                                        <span className="faq-category">{faq.category}</span>
                                        <div className="faq-question-text">{faq.question}</div>
                                        <span className="faq-toggle">
                                            {expandedFaq === faq.id ? '−' : '+'}
                                        </span>
                                    </button>
                                    {expandedFaq === faq.id && (
                                        <div className="faq-answer">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="contact-info-card">
                    <h4 className="card-title">Still Need Help?</h4>
                    <div className="contact-methods">
                        <div className="contact-method">
                            <span className="contact-icon">📞</span>
                            <div>
                                <div className="contact-label">Phone</div>
                                <div className="contact-value">+27 11 123 4567</div>
                            </div>
                        </div>
                        <div className="contact-method">
                            <span className="contact-icon">📧</span>
                            <div>
                                <div className="contact-label">Email</div>
                                <div className="contact-value">support@rideyourway.com</div>
                            </div>
                        </div>
                        <div className="contact-method">
                            <span className="contact-icon">🕐</span>
                            <div>
                                <div className="contact-label">Hours</div>
                                <div className="contact-value">24/7 Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

