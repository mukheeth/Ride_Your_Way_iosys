import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    // User state
    const [userRole, setUserRole] = useState(null); // 'rider' or 'driver'
    const [user, setUser] = useState({
        name: 'Nathi',
        phone: '+27 82 XXX XXXX',
        rating: 4.8,
        trips: 42,
        role: 'rider'
    });

    // Driver state
    const [driver, setDriver] = useState({
        name: 'Thabo Mthembu',
        phone: '+27 82 123 4567',
        rating: 4.9,
        trips: 342,
        earnings: 28500.75,
        isOnline: false
    });

    // Ride state (shared between rider and driver)
    const [currentRide, setCurrentRide] = useState(null);
    const [activeRides, setActiveRides] = useState([]); // All active rides in the system
    const [rideRequests, setRideRequests] = useState([]); // Pending ride requests for drivers

    // Dummy customer/ride requests data (static for demo)
    const dummyCustomers = [
        {
            id: 'CUST-001',
            rider: {
                name: 'John Doe',
                phone: '+27 82 111 2222',
                rating: 4.8,
                initials: 'JD'
            },
            pickup: {
                name: 'Sandton City Mall',
                address: 'Rivonia Road, Sandton',
                lat: -26.1076,
                lng: 28.0567
            },
            dropoff: {
                name: 'OR Tambo Int. Airport',
                address: 'Kempton Park, Johannesburg',
                lat: -26.1367,
                lng: 28.2411
            },
            fare: 85.00,
            distance: '12 km',
            duration: '22 min',
            rideType: 'Comfort',
            paymentMethod: 'Cash',
            createdAt: new Date().toISOString()
        },
        {
            id: 'CUST-002',
            rider: {
                name: 'Sarah Smith',
                phone: '+27 83 222 3333',
                rating: 5.0,
                initials: 'SS'
            },
            pickup: {
                name: 'Rosebank Mall',
                address: 'Cradock Ave, Rosebank',
                lat: -26.1465,
                lng: 28.0432
            },
            dropoff: {
                name: 'Sandton',
                address: 'Sandton CBD',
                lat: -26.1076,
                lng: 28.0567
            },
            fare: 120.50,
            distance: '8 km',
            duration: '18 min',
            rideType: 'Economy',
            paymentMethod: 'Card',
            createdAt: new Date(Date.now() - 300000).toISOString()
        },
        {
            id: 'CUST-003',
            rider: {
                name: 'Mike Johnson',
                phone: '+27 84 333 4444',
                rating: 4.5,
                initials: 'MJ'
            },
            pickup: {
                name: 'Fourways Mall',
                address: 'Fourways, Johannesburg',
                lat: -26.0123,
                lng: 28.0123
            },
            dropoff: {
                name: 'Midrand',
                address: 'Midrand, Johannesburg',
                lat: -25.9876,
                lng: 28.1234
            },
            fare: 95.00,
            distance: '15 km',
            duration: '25 min',
            rideType: 'Premium',
            paymentMethod: 'Wallet',
            createdAt: new Date(Date.now() - 600000).toISOString()
        },
        {
            id: 'CUST-004',
            rider: {
                name: 'Lisa Brown',
                phone: '+27 85 444 5555',
                rating: 4.9,
                initials: 'LB'
            },
            pickup: {
                name: 'Johannesburg CBD',
                address: 'Main Street, Johannesburg',
                lat: -26.2041,
                lng: 28.0473
            },
            dropoff: {
                name: 'Pretoria',
                address: 'Pretoria CBD',
                lat: -25.7479,
                lng: 28.2293
            },
            fare: 150.75,
            distance: '35 km',
            duration: '45 min',
            rideType: 'Comfort',
            paymentMethod: 'Card',
            createdAt: new Date(Date.now() - 900000).toISOString()
        },
        {
            id: 'CUST-005',
            rider: {
                name: 'David Wilson',
                phone: '+27 86 555 6666',
                rating: 4.7,
                initials: 'DW'
            },
            pickup: {
                name: 'Sandton',
                address: 'Sandton CBD',
                lat: -26.1076,
                lng: 28.0567
            },
            dropoff: {
                name: 'Fourways',
                address: 'Fourways, Johannesburg',
                lat: -26.0123,
                lng: 28.0123
            },
            fare: 65.00,
            distance: '7 km',
            duration: '15 min',
            rideType: 'Economy',
            paymentMethod: 'Cash',
            createdAt: new Date(Date.now() - 1200000).toISOString()
        }
    ];

    // Rider-specific state
    const [rideType, setRideType] = useState('economy');
    const [pricingModel, setPricingModel] = useState('fixed');
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('card');

    // Driver-specific state
    const [currentRequest, setCurrentRequest] = useState(null);

    // Create a new ride request (called by rider)
    const createRideRequest = (rideData) => {
        const newRequest = {
            id: 'REQ-' + Date.now(),
            ...rideData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            rider: {
                name: user.name,
                phone: user.phone,
                rating: user.rating
            }
        };
        
        setRideRequests(prev => [...prev, newRequest]);
        setCurrentRide(newRequest);
        return newRequest;
    };

    // Accept a ride request (called by driver)
    const acceptRideRequest = (requestId) => {
        const request = rideRequests.find(r => r.id === requestId);
        if (request) {
            const acceptedRide = {
                ...request,
                status: 'accepted',
                driver: {
                    name: driver.name,
                    phone: driver.phone,
                    rating: driver.rating
                },
                acceptedAt: new Date().toISOString()
            };
            
            setRideRequests(prev => prev.filter(r => r.id !== requestId));
            setActiveRides(prev => [...prev, acceptedRide]);
            setCurrentRide(acceptedRide);
            setCurrentRequest(acceptedRide);
            return acceptedRide;
        }
    };

    // Complete a ride (called by driver)
    const completeRide = (rideId) => {
        setActiveRides(prev => prev.filter(r => r.id !== rideId));
        setCurrentRide(null);
        setCurrentRequest(null);
    };

    // Cancel a ride (called by rider or driver)
    const cancelRide = (rideId) => {
        setActiveRides(prev => prev.filter(r => r.id !== rideId));
        setRideRequests(prev => prev.filter(r => r.id !== rideId));
        setCurrentRide(null);
        setCurrentRequest(null);
    };

    const value = {
        // User management
        userRole,
        setUserRole,
        user,
        setUser,
        driver,
        setDriver,
        
        // Ride management
        currentRide,
        setCurrentRide,
        activeRides,
        setActiveRides,
        rideRequests,
        setRideRequests,
        currentRequest,
        setCurrentRequest,
        dummyCustomers,
        
        // Ride actions
        createRideRequest,
        acceptRideRequest,
        completeRide,
        cancelRide,
        
        // Rider-specific
        rideType,
        setRideType,
        pricingModel,
        setPricingModel,
        pickup,
        setPickup,
        dropoff,
        setDropoff,
        selectedPayment,
        setSelectedPayment
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
