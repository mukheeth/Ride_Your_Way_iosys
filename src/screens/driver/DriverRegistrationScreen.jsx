import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleMap from '../../components/SimpleMap';

export default function DriverRegistrationScreen() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        // Step 1: Personal Information
        fullName: '',
        phone: '',
        email: '',
        idNumber: '',
        
        // Step 2: License Information
        licenseNumber: '',
        licenseExpiry: '',
        licenseClass: 'Code 8',
        
        // Step 3: Vehicle Information
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        vehicleColor: '',
        registrationNumber: '',
        vehicleType: 'Sedan',
        
        // Step 4: Location & Service Area
        homeAddress: '',
        serviceArea: 'Johannesburg',
        homeLocation: [-26.2041, 28.0473], // Default to Johannesburg
        
        // Step 5: Documents & Verification
        profilePhoto: null,
        licensePhoto: null,
        vehiclePhoto: null,
        
        // Step 6: Payment & Bank Details
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        branchCode: ''
    });

    const totalSteps = 6;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLocationSelect = (lat, lng) => {
        setFormData(prev => ({
            ...prev,
            homeLocation: [lat, lng]
        }));
        // Optionally update address based on coordinates (reverse geocoding would go here)
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('Registration successful! Your application is under review.');
            navigate('/driver/home');
        }, 2000);
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.fullName && formData.phone && formData.email && formData.idNumber;
            case 2:
                return formData.licenseNumber && formData.licenseExpiry && formData.licenseClass;
            case 3:
                return formData.vehicleMake && formData.vehicleModel && formData.registrationNumber;
            case 4:
                return formData.homeAddress && formData.serviceArea;
            case 5:
                return true; // Documents are optional for now
            case 6:
                return formData.bankName && formData.accountNumber && formData.accountHolder;
            default:
                return false;
        }
    };

    return (
        <section className="screen active driver-registration-screen">
            <div className="registration-container">
                {/* Progress Bar */}
                <div className="registration-progress">
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        Step {currentStep} of {totalSteps}
                    </div>
                </div>

                {/* Step Header */}
                <div className="registration-header">
                    <button 
                        className="btn-back" 
                        onClick={handleBack}
                        disabled={currentStep === 1}
                    >
                        ← Back
                    </button>
                    <h2 className="step-title">
                        {currentStep === 1 && 'Personal Information'}
                        {currentStep === 2 && 'License Details'}
                        {currentStep === 3 && 'Vehicle Information'}
                        {currentStep === 4 && 'Location & Service Area'}
                        {currentStep === 5 && 'Documents & Verification'}
                        {currentStep === 6 && 'Payment Details'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="registration-form">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="registration-step">
                            <div className="input-group">
                                <label className="label-l">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">Phone Number</label>
                                <div className="phone-input">
                                    <span className="prefix">+27</span>
                                    <input
                                        type="tel"
                                        placeholder="7XX XXX XXXX"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="label-l">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">ID Number</label>
                                <input
                                    type="text"
                                    placeholder="13-digit ID number"
                                    value={formData.idNumber}
                                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: License Information */}
                    {currentStep === 2 && (
                        <div className="registration-step">
                            <div className="input-group">
                                <label className="label-l">License Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter license number"
                                    value={formData.licenseNumber}
                                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">License Expiry Date</label>
                                <input
                                    type="date"
                                    value={formData.licenseExpiry}
                                    onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">License Class</label>
                                <select
                                    value={formData.licenseClass}
                                    onChange={(e) => handleInputChange('licenseClass', e.target.value)}
                                    className="select-input"
                                    required
                                >
                                    <option value="Code 8">Code 8 (Light Motor Vehicle)</option>
                                    <option value="Code 10">Code 10 (Heavy Motor Vehicle)</option>
                                    <option value="Code 14">Code 14 (Heavy Combination)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Vehicle Information */}
                    {currentStep === 3 && (
                        <div className="registration-step">
                            <div className="input-row-2">
                                <div className="input-group">
                                    <label className="label-l">Vehicle Make</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Toyota"
                                        value={formData.vehicleMake}
                                        onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="label-l">Vehicle Model</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Corolla"
                                        value={formData.vehicleModel}
                                        onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-row-2">
                                <div className="input-group">
                                    <label className="label-l">Year</label>
                                    <input
                                        type="number"
                                        placeholder="2020"
                                        value={formData.vehicleYear}
                                        onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                                        min="2000"
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="label-l">Color</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., White"
                                        value={formData.vehicleColor}
                                        onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="label-l">Registration Number</label>
                                <input
                                    type="text"
                                    placeholder="e.g., ABC 123 GP"
                                    value={formData.registrationNumber}
                                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">Vehicle Type</label>
                                <select
                                    value={formData.vehicleType}
                                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                                    className="select-input"
                                >
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Van">Van</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Location & Service Area with Map */}
                    {currentStep === 4 && (
                        <div className="registration-step">
                            <div className="input-group">
                                <label className="label-l">Home Address</label>
                                <input
                                    type="text"
                                    placeholder="Enter your home address"
                                    value={formData.homeAddress}
                                    onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">Service Area</label>
                                <select
                                    value={formData.serviceArea}
                                    onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                                    className="select-input"
                                    required
                                >
                                    <option value="Johannesburg">Johannesburg</option>
                                    <option value="Pretoria">Pretoria</option>
                                    <option value="Cape Town">Cape Town</option>
                                    <option value="Durban">Durban</option>
                                    <option value="Port Elizabeth">Port Elizabeth</option>
                                </select>
                            </div>
                            <div className="map-section">
                                <label className="label-l">Select Your Home Location on Map</label>
                                <div className="map-container-registration">
                                    <SimpleMap 
                                        center={formData.homeLocation} 
                                        zoom={13}
                                        onLocationSelect={(lat, lng) => handleLocationSelect(lat, lng)}
                                    />
                                </div>
                                <p className="map-hint">
                                    📍 Click on the map or drag the marker to set your home location. This helps us match you with nearby riders.
                                </p>
                                <div className="location-coords">
                                    <span>📍 Coordinates: {formData.homeLocation[0].toFixed(4)}, {formData.homeLocation[1].toFixed(4)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Documents */}
                    {currentStep === 5 && (
                        <div className="registration-step">
                            <div className="document-upload-section">
                                <div className="document-item">
                                    <label className="label-l">Profile Photo</label>
                                    <div className="file-upload-area">
                                        <span className="upload-icon">📷</span>
                                        <p>Upload your profile photo</p>
                                        <input type="file" accept="image/*" className="file-input" />
                                    </div>
                                </div>
                                <div className="document-item">
                                    <label className="label-l">Driver's License Photo</label>
                                    <div className="file-upload-area">
                                        <span className="upload-icon">📄</span>
                                        <p>Upload front of license</p>
                                        <input type="file" accept="image/*" className="file-input" />
                                    </div>
                                </div>
                                <div className="document-item">
                                    <label className="label-l">Vehicle Photo</label>
                                    <div className="file-upload-area">
                                        <span className="upload-icon">🚗</span>
                                        <p>Upload vehicle photo</p>
                                        <input type="file" accept="image/*" className="file-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="info-box">
                                <p>📋 <strong>Note:</strong> All documents will be verified before your account is activated. This usually takes 24-48 hours.</p>
                            </div>
                        </div>
                    )}

                    {/* Step 6: Payment Details */}
                    {currentStep === 6 && (
                        <div className="registration-step">
                            <div className="input-group">
                                <label className="label-l">Bank Name</label>
                                <select
                                    value={formData.bankName}
                                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                                    className="select-input"
                                    required
                                >
                                    <option value="">Select Bank</option>
                                    <option value="FNB">First National Bank (FNB)</option>
                                    <option value="Standard Bank">Standard Bank</option>
                                    <option value="Absa">Absa</option>
                                    <option value="Nedbank">Nedbank</option>
                                    <option value="Capitec">Capitec</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="label-l">Account Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter account number"
                                    value={formData.accountNumber}
                                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">Account Holder Name</label>
                                <input
                                    type="text"
                                    placeholder="Name as it appears on account"
                                    value={formData.accountHolder}
                                    onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label-l">Branch Code</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 250655"
                                    value={formData.branchCode}
                                    onChange={(e) => handleInputChange('branchCode', e.target.value)}
                                />
                            </div>
                            <div className="info-box">
                                <p>💳 Your earnings will be deposited directly into this account weekly.</p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="registration-actions">
                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={handleNext}
                                disabled={!isStepValid()}
                            >
                                Continue →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={!isStepValid() || loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Registration'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

