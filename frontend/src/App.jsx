import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import WardrobeMatcherPage from './pages/WardrobeMatcherPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, token } = useAuth();
  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!token) return <Navigate to="/auth" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="wardrobe-matcher" element={<ProtectedRoute><WardrobeMatcherPage /></ProtectedRoute>} />
        <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
        <Route path="account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
