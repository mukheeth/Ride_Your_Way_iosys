import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverSupportScreen() {
    const navigate = useNavigate();
    const [expandedFaq, setExpandedFaq] = useState(null);

    const quickActions = [
        { id: 1, icon: '📞', label: 'Call Support', action: () => window.location.href = 'tel:+27111234567' },
        { id: 2, icon: '💬', label: 'Live Chat', action: () => alert('Live chat feature coming soon!') },
        { id: 3, icon: '📧', label: 'Email Us', action: () => window.location.href = 'mailto:support@rideyourway.com' },
        { id: 4, icon: '📋', label: 'Report Issue', action: () => alert('Report issue feature') }
    ];

    const faqs = [
        {
            id: 1,
            question: 'How do I get paid?',
            answer: 'Earnings are automatically deposited to your bank account weekly. You can also request instant withdrawals for a small fee.'
        },
        {
            id: 2,
            question: 'What if a rider cancels?',
            answer: 'If a rider cancels after you\'ve started driving to the pickup location, you\'ll receive a cancellation fee.'
        },
        {
            id: 3,
            question: 'How is my rating calculated?',
            answer: 'Your rating is the average of all ratings you\'ve received from riders over your last 500 trips.'
        },
        {
            id: 4,
            question: 'Can I drive in multiple cities?',
            answer: 'Yes! Once you\'re approved, you can drive in any city where Ride Your Way operates.'
        },
        {
            id: 5,
            question: 'What insurance do I need?',
            answer: 'You need comprehensive insurance that covers ride-sharing. We also provide additional coverage during trips.'
        },
        {
            id: 6,
            question: 'How do I update my vehicle?',
            answer: 'Go to Profile → Documents and upload your new vehicle registration and insurance documents.'
        },
        {
            id: 7,
            question: 'What happens if I get into an accident?',
            answer: 'Contact support immediately. Our insurance covers you during active trips. Follow the in-app accident reporting process.'
        },
        {
            id: 8,
            question: 'Can I reject ride requests?',
            answer: 'Yes, but maintaining a high acceptance rate helps you get more ride requests and bonuses.'
        }
    ];

    const topics = [
        { id: 1, icon: '💰', title: 'Earnings', subtitle: 'Payment & withdrawals' },
        { id: 2, icon: '🚗', title: 'Vehicle', subtitle: 'Requirements & updates' },
        { id: 3, icon: '📄', title: 'Documents', subtitle: 'License & registration' },
        { id: 4, icon: '⭐', title: 'Ratings', subtitle: 'How ratings work' },
        { id: 5, icon: '🛡️', title: 'Safety', subtitle: 'Safety features & tips' },
        { id: 6, icon: '📱', title: 'App Issues', subtitle: 'Technical support' }
    ];

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
                        Help & Support
                    </h2>
                    <div style={{ width: '60px' }}></div>
                </div>
            </div>

            <div style={{ padding: '20px', marginTop: '-50px', position: 'relative', zIndex: 10 }}>
                {/* Quick Actions */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🚀 Quick Actions
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {quickActions.map((action) => (
                            <button
                                key={action.id}
                                onClick={action.action}
                                style={{
                                    padding: '20px',
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                }}
                            >
                                <span style={{ fontSize: '32px' }}>{action.icon}</span>
                                <span style={{ fontSize: '14px', fontWeight: 600 }}>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Browse Topics */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📚 Browse Topics
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {topics.map((topic) => (
                            <button
                                key={topic.id}
                                onClick={() => alert(`Opening ${topic.title} help section`)}
                                style={{
                                    padding: '16px',
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                }}
                            >
                                <span style={{ fontSize: '24px' }}>{topic.icon}</span>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                                        {topic.title}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#666' }}>
                                        {topic.subtitle}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ❓ Frequently Asked Questions
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        {faqs.map((faq, index) => (
                            <div key={faq.id} style={{ borderBottom: index < faqs.length - 1 ? '1px solid #e5e7eb' : 'none', padding: '16px' }}>
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        padding: 0
                                    }}
                                >
                                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{faq.question}</span>
                                    <span style={{ fontSize: '18px' }}>{expandedFaq === faq.id ? '−' : '+'}</span>
                                </button>
                                {expandedFaq === faq.id && (
                                    <div style={{ 
                                        marginTop: '12px', 
                                        fontSize: '13px', 
                                        color: '#666',
                                        lineHeight: '1.6'
                                    }}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📞 Contact Information
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Phone</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>24/7 Support</div>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600 }}>+27 11 123 4567</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Email</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Response within 24h</div>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600 }}>support@rideyourway.com</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Hours</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Support availability</div>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600 }}>24/7</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
