# Ride Your Way - Complete Application Flow

## Overview
This document describes the complete flow of the Ride Your Way application, connecting both Rider and Driver experiences.

## Application Architecture

### Shared State Management (AppContext)
- **User Role**: Tracks if user is 'rider' or 'driver'
- **Ride Requests**: Queue of pending ride requests waiting for drivers
- **Active Rides**: Currently ongoing rides
- **Current Ride**: The active ride for the current user
- **User Data**: Rider and driver profile information

## Complete User Flows

### 1. Initial Setup Flow
```
Splash Screen → Onboarding → Role Selection → Authentication → Home
```

**Splash Screen** (`/`)
- Shows app branding
- Auto-navigates to onboarding after 2.5 seconds

**Onboarding** (`/onboarding`)
- 3 slides explaining app features
- Navigates to role selection

**Role Selection** (`/role-selection`)
- User chooses: Rider or Driver
- Rider → Login screen
- Driver → Registration screen

**Authentication** (`/login`)
- Login/Signup form
- After login:
  - Rider → `/home`
  - Driver → `/driver/home`

---

## Rider Flow

### 2. Rider Booking Flow
```
Home → Request Ride → Matching → Driver Found → In Ride → Rating → Home
```

**Home Screen** (`/home`)
- Select pickup/dropoff locations
- Choose ride type (Economy, Comfort, Premium, XL)
- Choose pricing model (Fixed, Negotiate, Metered)
- Select payment method
- Click "Request Ride"
- Creates ride request in shared state

**Matching Screen** (`/matching`)
- Shows map with searching animation
- Displays trip details
- Waits for driver acceptance
- Auto-navigates when driver accepts

**Driver Found Screen** (`/driver-found`)
- Shows driver information
- Displays pickup code
- Shows ETA
- Call/Message driver buttons
- "I'm Ready" button to start ride

**In Ride Screen** (`/in-ride`)
- Live map showing route
- Trip progress
- SOS button
- Driver information
- Auto-completes when reaching destination

**Rating Screen** (`/rating`)
- Rate driver (1-5 stars)
- Add feedback tags
- Select payment method
- Submit rating and pay
- Returns to home

### 3. Rider Additional Screens
- **Profile** (`/profile`): View/edit profile, settings, switch to driver
- **History** (`/history`): View past trips
- **Support** (`/support`): Help and FAQs

---

## Driver Flow

### 4. Driver Registration Flow
```
Role Selection → Registration (6 steps) → Home
```

**Registration** (`/driver/register`)
- Step 1: Personal Information
- Step 2: License Details
- Step 3: Vehicle Information
- Step 4: Location & Service Area (with map)
- Step 5: Documents Upload
- Step 6: Payment Details
- Completes → Driver Home

### 5. Driver Ride Flow
```
Home → Go Online → Receive Request → Accept → Pickup → Trip → Complete → Home
```

**Driver Home** (`/driver/home`)
- Map view
- Earnings display
- Stats (trips, rating, acceptance rate)
- "Go Online" button
- When online, checks for ride requests
- Auto-navigates to request screen when request available

**Request Screen** (`/driver/request`)
- Shows ride request details
- Pickup and dropoff locations
- Fare amount
- Rider rating
- 15-second timer
- Accept/Decline buttons
- Accept → Pickup screen
- Decline → Home screen

**Pickup Screen** (`/driver/pickup`)
- Map showing pickup location
- Rider information
- Call/Message rider buttons
- Trip preview
- "Arrived at Pickup" button
- Navigates to trip screen

**Trip Screen** (`/driver/trip`)
- Map showing route to destination
- Live trip stats (time, distance, fare)
- Rider information
- "Complete Trip" button
- Completes ride and returns to home

### 6. Driver Additional Screens
- **Profile** (`/driver/profile`): View/edit profile, vehicle info, settings, switch to rider
- **Earnings** (`/driver/earnings`): View earnings by period, payment info, transaction history
- **History** (`/driver/history`): View past trips with filters
- **Support** (`/driver/support`): Help, FAQs, contact support

---

## State Connections

### Ride Request Flow
1. **Rider creates request** (`HomeScreen`)
   - `createRideRequest()` adds to `rideRequests` array
   - Sets `currentRide` for rider

2. **Driver receives request** (`DriverHomeScreen`)
   - When online, checks `rideRequests` array
   - Shows first available request

3. **Driver accepts** (`DriverRequestScreen`)
   - `acceptRideRequest()` moves request from `rideRequests` to `activeRides`
   - Sets `currentRide` and `currentRequest` for driver
   - Updates ride status to 'accepted'

4. **Ride completion** (`DriverTripScreen`)
   - `completeRide()` removes from `activeRides`
   - Clears `currentRide` and `currentRequest`
   - Rider can now rate

### Role Switching
- **From Rider Profile**: "Switch to Driver" → Sets role to 'driver' → Navigates to `/driver/home`
- **From Driver Profile**: "Switch to Rider" → Sets role to 'rider' → Navigates to `/home`
- Role persists in AppContext

---

## Navigation Map

### Common Routes
- `/` - Splash Screen
- `/onboarding` - Onboarding
- `/role-selection` - Choose Rider/Driver

### Rider Routes
- `/login` - Authentication
- `/home` - Book rides
- `/matching` - Finding driver
- `/driver-found` - Driver matched
- `/in-ride` - Active ride
- `/rating` - Rate and pay
- `/profile` - Profile & settings
- `/history` - Trip history
- `/support` - Help & support

### Driver Routes
- `/driver/register` - Registration
- `/driver/home` - Driver dashboard
- `/driver/request` - Ride request
- `/driver/pickup` - Pickup rider
- `/driver/trip` - Active trip
- `/driver/profile` - Profile & settings
- `/driver/earnings` - Earnings & payments
- `/driver/history` - Trip history
- `/driver/support` - Help & support

---

## Key Features

### Shared Features
- ✅ Role switching between Rider and Driver
- ✅ Shared ride state management
- ✅ Real-time ride matching
- ✅ Consistent design system
- ✅ Map integration throughout

### Rider Features
- ✅ Multiple pricing models (Fixed, Negotiate, Metered)
- ✅ Multiple ride types (Economy, Comfort, Premium, XL)
- ✅ Multiple payment methods (Card, Cash, SNAP, USSD, Wallet)
- ✅ Real-time driver tracking
- ✅ Rating and feedback system

### Driver Features
- ✅ Online/Offline status
- ✅ Ride request notifications
- ✅ Earnings tracking
- ✅ Trip history
- ✅ Profile and vehicle management

---

## Data Flow Example

### Complete Ride Example

1. **Rider**: Opens app → Selects locations → Requests ride
   - `createRideRequest()` called
   - Request added to `rideRequests: [{ id: 'REQ-123', pickup: 'Sandton', dropoff: 'Airport', ... }]`

2. **Driver**: Goes online → Receives request
   - Sees request in `rideRequests` array
   - Views request details

3. **Driver**: Accepts request
   - `acceptRideRequest('REQ-123')` called
   - Request moved to `activeRides`
   - `currentRide` set for both rider and driver

4. **Rider**: Sees driver found → Starts ride
   - `currentRide.driver` populated
   - Navigates to in-ride screen

5. **Driver**: Completes trip
   - `completeRide('REQ-123')` called
   - Removed from `activeRides`
   - `currentRide` cleared

6. **Rider**: Rates driver
   - Views completed ride details
   - Submits rating
   - `currentRide` cleared
   - Returns to home

---

## Technical Implementation

### Context API Structure
```javascript
{
  userRole: 'rider' | 'driver',
  user: { name, phone, rating, trips },
  driver: { name, phone, rating, earnings, isOnline },
  rideRequests: [], // Pending requests
  activeRides: [], // Ongoing rides
  currentRide: {}, // Current user's active ride
  createRideRequest(),
  acceptRideRequest(),
  completeRide(),
  cancelRide()
}
```

### Key Functions
- `createRideRequest(rideData)` - Creates new ride request
- `acceptRideRequest(requestId)` - Driver accepts request
- `completeRide(rideId)` - Driver completes ride
- `cancelRide(rideId)` - Cancel ride (rider or driver)

---

## Future Enhancements
- Real-time WebSocket connections for live updates
- Push notifications for ride requests
- GPS tracking integration
- Payment gateway integration
- Chat functionality between rider and driver
- Advanced matching algorithms
- Multi-stop rides
- Scheduled rides

