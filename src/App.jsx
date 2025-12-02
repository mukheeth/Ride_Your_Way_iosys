import './styles/variables.css';
import './styles/base.css';
import './styles/splash.css';
import './styles/components.css';
import './styles/screens.css';
import './styles/role-selection.css';
import './styles/mobile.css';
import './styles/mobile-fixes.css';
import './styles/layout-fixes.css';
import 'leaflet/dist/leaflet.css';
import './styles/map.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Common Screens
import RoleSelectionScreen from './screens/common/RoleSelectionScreen';

// Rider Screens
import SplashScreen from './screens/rider/SplashScreen';
import OnboardingScreen from './screens/rider/OnboardingScreen';
import AuthScreen from './screens/rider/AuthScreen';
import HomeScreen from './screens/rider/HomeScreen';
import MatchingScreen from './screens/rider/MatchingScreen';
import DriverFoundScreen from './screens/rider/DriverFoundScreen';
import InRideScreen from './screens/rider/InRideScreen';
import RatingScreen from './screens/rider/RatingScreen';
import ProfileScreen from './screens/rider/ProfileScreen';
import HistoryScreen from './screens/rider/HistoryScreen';
import SupportScreen from './screens/rider/SupportScreen';

// Driver Screens
import DriverRegistrationScreen from './screens/driver/DriverRegistrationScreen';
import DriverHomeScreen from './screens/driver/DriverHomeScreen';
import DriverRequestScreen from './screens/driver/DriverRequestScreen';
import DriverPickupScreen from './screens/driver/DriverPickupScreen';
import DriverDrivingScreen from './screens/driver/DriverDrivingScreen';
import DriverTripScreen from './screens/driver/DriverTripScreen';
import DriverCongratulationsScreen from './screens/driver/DriverCongratulationsScreen';
import DriverProfileScreen from './screens/driver/DriverProfileScreen';
import DriverEarningsScreen from './screens/driver/DriverEarningsScreen';
import DriverHistoryScreen from './screens/driver/DriverHistoryScreen';
import DriverSupportScreen from './screens/driver/DriverSupportScreen';
import DriverCustomersScreen from './screens/driver/DriverCustomersScreen';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/role-selection" element={<RoleSelectionScreen />} />
          
          {/* Rider Routes */}
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/matching" element={<MatchingScreen />} />
          <Route path="/driver-found" element={<DriverFoundScreen />} />
          <Route path="/in-ride" element={<InRideScreen />} />
          <Route path="/rating" element={<RatingScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/support" element={<SupportScreen />} />

          {/* Driver Routes */}
          <Route path="/driver/register" element={<DriverRegistrationScreen />} />
          <Route path="/driver/home" element={<DriverHomeScreen />} />
          <Route path="/driver/customers" element={<DriverCustomersScreen />} />
          <Route path="/driver/request" element={<DriverRequestScreen />} />
          <Route path="/driver/pickup" element={<DriverPickupScreen />} />
          <Route path="/driver/driving" element={<DriverDrivingScreen />} />
          <Route path="/driver/trip" element={<DriverTripScreen />} />
          <Route path="/driver/congratulations" element={<DriverCongratulationsScreen />} />
          <Route path="/driver/profile" element={<DriverProfileScreen />} />
          <Route path="/driver/earnings" element={<DriverEarningsScreen />} />
          <Route path="/driver/history" element={<DriverHistoryScreen />} />
          <Route path="/driver/support" element={<DriverSupportScreen />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
