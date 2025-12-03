import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverEarningsScreen() {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const earningsData = {
        week: {
            total: 2850.50,
            trips: 45,
            hours: 28,
            breakdown: [
                { day: 'Monday', amount: 450.00, trips: 8 },
                { day: 'Tuesday', amount: 520.50, trips: 9 },
                { day: 'Wednesday', amount: 380.00, trips: 6 },
                { day: 'Thursday', amount: 490.00, trips: 7 },
                { day: 'Friday', amount: 610.00, trips: 10 },
                { day: 'Saturday', amount: 400.00, trips: 5 }
            ]
        },
        month: {
            total: 12450.75,
            trips: 198,
            hours: 124
        },
        year: {
            total: 145680.00,
            trips: 2340,
            hours: 1456
        }
    };

    const currentData = earningsData[selectedPeriod];

    const transactions = [
        { id: 1, date: '2025-12-02', type: 'Trip Earnings', amount: 85.50, status: 'completed' },
        { id: 2, date: '2025-12-02', type: 'Trip Earnings', amount: 120.00, status: 'completed' },
        { id: 3, date: '2025-12-01', type: 'Withdrawal', amount: -500.00, status: 'processed' },
        { id: 4, date: '2025-12-01', type: 'Trip Earnings', amount: 95.00, status: 'completed' },
        { id: 5, date: '2025-11-30', type: 'Bonus', amount: 50.00, status: 'completed' }
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
                        Earnings
                    </h2>
                    <div style={{ width: '60px' }}></div>
                </div>
            </div>

            <div style={{ padding: '20px', marginTop: '-50px', position: 'relative', zIndex: 10 }}>
                {/* Period Selector */}
                <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '24px', 
                    backgroundColor: 'white', 
                    padding: '4px', 
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <button 
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: selectedPeriod === 'week' ? '#10b981' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: selectedPeriod === 'week' ? 'white' : '#666',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedPeriod('week')}
                    >
                        Week
                    </button>
                    <button 
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: selectedPeriod === 'month' ? '#10b981' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: selectedPeriod === 'month' ? 'white' : '#666',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedPeriod('month')}
                    >
                        Month
                    </button>
                    <button 
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: selectedPeriod === 'year' ? '#10b981' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: selectedPeriod === 'year' ? 'white' : '#666',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedPeriod('year')}
                    >
                        Year
                    </button>
                </div>

                {/* Earnings Summary */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        fontSize: '36px',
                        fontWeight: 700,
                        color: '#10b981',
                        marginBottom: '8px'
                    }}>
                        R {currentData.total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '24px'
                    }}>
                        Total Earnings
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>{currentData.trips}</span>
                            <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Trips</span>
                        </div>
                        <div style={{ width: '1px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>{currentData.hours}h</span>
                            <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Hours</span>
                        </div>
                        <div style={{ width: '1px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>R {(currentData.total / currentData.trips).toFixed(2)}</span>
                            <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Per Trip</span>
                        </div>
                    </div>
                </div>

                {/* Weekly Breakdown */}
                {selectedPeriod === 'week' && currentData.breakdown && (
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            📊 Daily Breakdown
                        </h3>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            overflow: 'hidden'
                        }}>
                            {currentData.breakdown.map((day, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    borderBottom: index < currentData.breakdown.length - 1 ? '1px solid #e0e0e0' : 'none'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{day.day}</div>
                                        <div style={{ fontSize: '13px', color: '#666' }}>{day.trips} trips</div>
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#10b981' }}>
                                        R {day.amount.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Transactions */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        💳 Recent Transactions
                    </h3>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        {transactions.map((transaction, index) => (
                            <div key={transaction.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                borderBottom: index < transactions.length - 1 ? '1px solid #e0e0e0' : 'none'
                            }}>
                                <div>
                                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{transaction.type}</div>
                                    <div style={{ fontSize: '13px', color: '#666' }}>{transaction.date}</div>
                                </div>
                                <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: 600, 
                                    color: transaction.amount < 0 ? '#dc2626' : '#10b981' 
                                }}>
                                    {transaction.amount > 0 ? '+' : ''}R {Math.abs(transaction.amount).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Withdraw Button */}
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
                        cursor: 'pointer'
                    }}
                    onClick={() => alert('Withdrawal request submitted!')}
                >
                    Withdraw Earnings
                </button>
            </div>
        </section>
    );
}
