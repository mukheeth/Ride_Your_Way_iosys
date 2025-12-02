import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupportScreen() {
    const navigate = useNavigate();
    const [expandedFaq, setExpandedFaq] = useState(null);

    const faqs = [
        { question: 'How do I request a ride?', answer: 'Simply enter your pickup and destination, select your ride type, and tap "Request Ride". A driver will be matched to you within seconds!' },
        { question: 'What payment methods are accepted?', answer: 'We accept Credit/Debit cards, Cash, and Wallet balance. You can manage payment methods in your profile.' },
        { question: 'How do I cancel a ride?', answer: 'You can cancel before the driver arrives. Note: Cancellation fees may apply if cancelled after driver acceptance.' },
        { question: 'How is the fare calculated?', answer: 'Fares are based on distance, time, and current demand. You\'ll see the estimated fare before confirming your ride.' }
    ];

    const quickActions = [
        { icon: '💬', text: 'Live Chat', action: () => alert('💬 Connecting to support agent...\n\nEstimated wait time: 2 minutes') },
        { icon: '📞', text: 'Call Support', action: () => alert('Calling support: +27 10 XXX XXXX') },
        { icon: '📧', text: 'Email Us', action: () => alert('Email: support@rideyourway.co.za') },
        { icon: '🔍', text: 'Lost Item', action: () => alert('Lost Item Report\n\nDescribe your lost item and we\'ll contact your recent drivers.') },
        { icon: '🛡️', text: 'Safety Issue', action: () => alert('Safety Issue\n\nPlease describe the safety concern. Our team will investigate immediately.') },
        { icon: '💰', text: 'Fare Dispute', action: () => alert('Fare Dispute\n\nProvide trip details and reason for dispute. We\'ll review within 24 hours.') }
    ];

    return (
        <section className="screen active profile-screen">
            <div className="profile-header-modern" style={{ paddingBottom: 'var(--space-8)' }}>
                <div className="header-top">
                    <button className="back-btn-white" onClick={() => navigate('/profile')}>← Back</button>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>Help & Support</h2>
                    <div style={{ width: '60px' }}></div>
                </div>
                <div className="search-container-modern">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search help articles..." className="search-input-modern" />
                </div>
            </div>

            <div className="support-content-modern">
                <div className="quick-actions-grid">
                    {quickActions.map((action, index) => (
                        <button key={index} onClick={action.action} className="quick-action-card">
                            <div className="action-icon-large">{action.icon}</div>
                            <div className="action-text">{action.text}</div>
                        </button>
                    ))}
                </div>

                <div className="faq-section-modern">
                    <h4 className="section-title">Frequently Asked Questions</h4>
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-card ${expandedFaq === index ? 'expanded' : ''}`}>
                            <button
                                className="faq-header"
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            >
                                <span className="faq-question-text">{faq.question}</span>
                                <span className="faq-toggle-icon">{expandedFaq === index ? '−' : '+'}</span>
                            </button>
                            {expandedFaq === index && (
                                <div className="faq-body">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
