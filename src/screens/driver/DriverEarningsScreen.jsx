import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverEarningsScreen() {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // Dummy earnings data
    const earningsData = {
        today: {
            amount: 1250.50,
            trips: 8,
            hours: 6.5
        },
        week: {
            amount: 8750.25,
            trips: 52,
            hours: 42
        },
        month: {
            amount: 28500.75,
            trips: 180,
            hours: 165
        },
        total: {
            amount: 125000.50,
            trips: 850,
            hours: 720
        }
    };

    const currentEarnings = earningsData[selectedPeriod];

    // Dummy transaction history
    const transactions = [
        { id: 1, date: '2024-12-01', type: 'trip', amount: 85.00, description: 'Sandton → OR Tambo', status: 'completed' },
        { id: 2, date: '2024-12-01', type: 'trip', amount: 120.50, description: 'Rosebank → Sandton', status: 'completed' },
        { id: 3, date: '2024-11-30', type: 'trip', amount: 95.00, description: 'Sandton → Midrand', status: 'completed' },
        { id: 4, date: '2024-11-30', type: 'trip', amount: 150.75, description: 'Johannesburg → Pretoria', status: 'completed' },
        { id: 5, date: '2024-11-29', type: 'payout', amount: 5000.00, description: 'Weekly Payout', status: 'paid' },
        { id: 6, date: '2024-11-28', type: 'trip', amount: 65.00, description: 'Sandton → Fourways', status: 'completed' },
        { id: 7, date: '2024-11-28', type: 'trip', amount: 110.25, description: 'Rosebank → Sandton', status: 'completed' },
        { id: 8, date: '2024-11-27', type: 'trip', amount: 200.00, description: 'Sandton → OR Tambo', status: 'completed' }
    ];

    const paymentInfo = {
        bankName: 'First National Bank',
        accountNumber: '****1234',
        nextPayout: '2024-12-08',
        payoutFrequency: 'Weekly'
    };

    const periods = [
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'total', label: 'All Time' }
    ];

    return (
        <section className="screen active driver-earnings-screen">
            {/* Header */}
            <div className="driver-screen-header">
                <button className="btn-back" onClick={() => navigate('/driver/home')}>
                    ← Back
                </button>
                <h2>Earnings</h2>
                <div style={{ width: '60px' }}></div>
            </div>

            <div className="earnings-content">
                {/* Period Selector */}
                <div className="period-selector">
                    {periods.map(period => (
                        <button
                            key={period.id}
                            className={`period-btn ${selectedPeriod === period.id ? 'active' : ''}`}
                            onClick={() => setSelectedPeriod(period.id)}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>

                {/* Earnings Summary Card */}
                <div className="earnings-summary-card">
                    <div className="earnings-amount-large">
                        R {currentEarnings.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="earnings-stats">
                        <div className="earnings-stat-item">
                            <span className="stat-icon">🚗</span>
                            <div>
                                <div className="stat-value">{currentEarnings.trips}</div>
                                <div className="stat-label">Trips</div>
                            </div>
                        </div>
                        <div className="earnings-stat-item">
                            <span className="stat-icon">⏱️</span>
                            <div>
                                <div className="stat-value">{currentEarnings.hours}h</div>
                                <div className="stat-label">Hours</div>
                            </div>
                        </div>
                        <div className="earnings-stat-item">
                            <span className="stat-icon">💰</span>
                            <div>
                                <div className="stat-value">R {(currentEarnings.amount / currentEarnings.trips).toFixed(2)}</div>
                                <div className="stat-label">Avg/Trip</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div className="payment-info-card">
                    <h4 className="card-title">Payment Information</h4>
                    <div className="payment-details">
                        <div className="payment-detail-item">
                            <span className="detail-label">Bank</span>
                            <span className="detail-value">{paymentInfo.bankName}</span>
                        </div>
                        <div className="payment-detail-item">
                            <span className="detail-label">Account</span>
                            <span className="detail-value">{paymentInfo.accountNumber}</span>
                        </div>
                        <div className="payment-detail-item">
                            <span className="detail-label">Next Payout</span>
                            <span className="detail-value">{new Date(paymentInfo.nextPayout).toLocaleDateString()}</span>
                        </div>
                        <div className="payment-detail-item">
                            <span className="detail-label">Frequency</span>
                            <span className="detail-value">{paymentInfo.payoutFrequency}</span>
                        </div>
                    </div>
                    <button className="btn-edit-payment" onClick={() => alert('Edit payment information')}>
                        Edit Payment Details
                    </button>
                </div>

                {/* Transaction History */}
                <div className="transactions-section">
                    <h4 className="section-title">Recent Transactions</h4>
                    <div className="transactions-list">
                        {transactions.map(transaction => (
                            <div key={transaction.id} className="transaction-item-earnings">
                                <div className="transaction-icon">
                                    {transaction.type === 'trip' ? '🚗' : '💰'}
                                </div>
                                <div className="transaction-details">
                                    <div className="transaction-description">{transaction.description}</div>
                                    <div className="transaction-date">
                                        {new Date(transaction.date).toLocaleDateString('en-ZA', { 
                                            weekday: 'short', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </div>
                                </div>
                                <div className={`transaction-amount ${transaction.type === 'payout' ? 'negative' : 'positive'}`}>
                                    {transaction.type === 'payout' ? '-' : '+'}R {transaction.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-view-all" onClick={() => alert('View all transactions')}>
                        View All Transactions
                    </button>
                </div>
            </div>
        </section>
    );
}

