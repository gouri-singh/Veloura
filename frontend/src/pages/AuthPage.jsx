import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [step, setStep] = useState(1); // 1: contact, 2: OTP
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [mockOtp, setMockOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact })
      });
      const data = await res.json();
      if (res.ok) {
        setMockOtp(data.mockOtp);
        setStep(2);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, otp })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        if (data.isNewUser) {
          navigate('/onboarding');
        } else {
          navigate('/home');
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="glass-panel p-8 w-full max-w-md">
        <h2 className="text-3xl font-serif text-white mb-6 text-center">
          {step === 1 ? 'Welcome to Veloura' : 'Verify OTP'}
        </h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}
        
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email or Mobile Number</label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-colors"
                placeholder="Enter your contact info"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-gold">
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center p-3 mb-4 border border-gold-champagne/30 bg-gold-champagne/10 rounded-lg">
              <span className="text-sm text-gray-300 block mb-1">MOCK OTP (For Testing)</span>
              <span className="text-xl font-bold tracking-widest text-gold-champagne">{mockOtp}</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Enter 6-digit OTP</label>
              <input
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-colors text-center tracking-widest text-xl"
                placeholder="------"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-gold">
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-400 hover:text-white mt-2">
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
