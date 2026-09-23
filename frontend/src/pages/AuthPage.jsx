import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authApi } from '../services/api';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'signup'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup' || modeParam === 'login') {
      setAuthMode(modeParam);
    }
  }, [searchParams]);

  // Form states - ALWAYS start completely empty with no pre-filled values
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [mockOtp, setMockOtp] = useState('');
  
  // Step states
  const [signupStep, setSignupStep] = useState(1);
  const [loginStep, setLoginStep] = useState(1);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Explicitly clear all field inputs and pre-fills on mount, mode change, or method change
  useEffect(() => {
    setContact('');
    setPassword('');
    setName('');
    setOtp('');
    setMockOtp('');
    setError('');
    setSuccess('');
    setSignupStep(1);
    setLoginStep(1);
    setShowPassword(false);
  }, [authMode, loginMethod]);

  // Password Login Handler
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authApi.login(contact, password);
      login(data.token, data.user);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  // Send OTP Handler
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authApi.sendOtp(contact);
      setMockOtp(data.mockOtp);
      setSuccess(`OTP sent to ${contact}`);
      if (authMode === 'signup') {
        setSignupStep(2);
      } else {
        setLoginStep(2);
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  // Verify OTP Handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authApi.verifyOtp(contact, otp, password, name);
      login(data.token, data.user);
      if (data.isNewUser || authMode === 'signup') {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.');
    }
    setLoading(false);
  };

  // Instant Guest Login
  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await authApi.guestLogin();
      login(data.token, data.user);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Guest access failed.');
    }
    setLoading(false);
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await authApi.googleLogin();
      login(data.token, data.user);
      if (data.isNewUser) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] py-6 px-4">
      <div className="glass-panel p-6 sm:p-10 w-full max-w-lg shadow-2xl relative overflow-hidden">
        
        {/* Glow decorative background elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold-champagne/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-velvet-purple/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl font-bold tracking-wider text-gold-champagne mb-1">
            VELOURA
          </h2>
          <p className="text-xs text-gray-300 italic font-serif">
            {authMode === 'login' ? 'Welcome Back to Modern Elegance' : 'Create Your Personal Style Account'}
          </p>
        </div>

        {/* Main Tab Switcher: Log In vs Sign Up */}
        <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/10">
          <button
            type="button"
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              authMode === 'login' 
                ? 'bg-gold-champagne text-black shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setAuthMode('login')}
          >
            Log In
          </button>
          <button
            type="button"
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              authMode === 'signup' 
                ? 'bg-gold-champagne text-black shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setAuthMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2 animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
            <span>{error}</span>
          </div>
        )}
        {success && !error && (
          <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* LOG IN MODE */}
        {/* ======================================================== */}
        {authMode === 'login' && (
          <div>
            {/* Sub-toggle: Password Login vs OTP Quick Login */}
            <div className="flex justify-center gap-4 mb-5 text-xs text-gray-400">
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                className={`pb-1 border-b-2 transition-colors ${
                  loginMethod === 'password' ? 'border-gold-champagne text-gold-champagne font-medium' : 'border-transparent hover:text-gray-200'
                }`}
              >
                Password Login
              </button>
              <span className="text-gray-600">|</span>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`pb-1 border-b-2 transition-colors ${
                  loginMethod === 'otp' ? 'border-gold-champagne text-gold-champagne font-medium' : 'border-transparent hover:text-gray-200'
                }`}
              >
                OTP Quick Login
              </button>
            </div>

            {/* PASSWORD LOGIN FORM */}
            {loginMethod === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Email or Mobile Number</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all text-sm"
                      placeholder="name@domain.com or +1234567890"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-medium text-gray-300">Password</label>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('otp')}
                      className="text-xs text-gold-champagne/80 hover:text-gold-champagne transition-colors"
                    >
                      Login via OTP instead
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all text-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title={showPassword ? "Hide password" : "Show password"}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-3 rounded-xl font-semibold shadow-md hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
              </form>
            )}

            {/* OTP LOGIN STEP 1 */}
            {loginMethod === 'otp' && loginStep === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Email or Mobile Number</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all text-sm"
                      placeholder="Enter mobile or email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-3 rounded-xl font-semibold shadow-md transition-all"
                >
                  {loading ? 'Sending OTP...' : 'Send Login OTP'}
                </button>
              </form>
            )}

            {/* OTP LOGIN STEP 2 */}
            {loginMethod === 'otp' && loginStep === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn" autoComplete="off">
                {mockOtp && (
                  <div className="p-3.5 border border-gold-champagne/40 bg-gold-champagne/10 rounded-xl text-center">
                    <span className="text-xs text-gray-300 block mb-0.5 font-medium">Demo Mock Verification Code:</span>
                    <span className="text-2xl font-bold tracking-widest text-gold-champagne">{mockOtp}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 text-center">Enter 6-digit OTP Code</label>
                  <input
                    type="text"
                    required
                    maxLength="6"
                    autoComplete="off"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center tracking-[0.4em] font-mono text-xl focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all"
                    placeholder="------"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-3 rounded-xl font-semibold shadow-md transition-all"
                >
                  {loading ? 'Verifying...' : 'Verify OTP & Log In'}
                </button>

                <button
                  type="button"
                  onClick={() => setLoginStep(1)}
                  className="w-full text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 py-1"
                >
                  <ArrowLeft size={14} /> Back to contact info
                </button>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SIGN UP MODE */}
        {/* ======================================================== */}
        {authMode === 'signup' && (
          <div>
            {/* SIGN UP STEP 1 */}
            {signupStep === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name (Optional)</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="off"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all text-sm"
                      placeholder="e.g. Alex Morgan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Email or Mobile Number *</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      autoComplete="off"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all text-sm"
                      placeholder="name@domain.com or +1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Create Password (Optional)</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all text-sm"
                      placeholder="Set a password for direct logins"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title={showPassword ? "Hide password" : "Show password"}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-3 rounded-xl font-semibold shadow-md hover:brightness-110 transition-all"
                >
                  {loading ? 'Sending OTP...' : 'Send Verification OTP'}
                </button>
              </form>
            )}

            {/* SIGN UP STEP 2 */}
            {signupStep === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn" autoComplete="off">
                {mockOtp && (
                  <div className="p-3.5 border border-gold-champagne/40 bg-gold-champagne/10 rounded-xl text-center">
                    <span className="text-xs text-gray-300 block mb-0.5 font-medium">Demo Mock Verification Code:</span>
                    <span className="text-2xl font-bold tracking-widest text-gold-champagne">{mockOtp}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 text-center">Enter 6-digit OTP Code</label>
                  <input
                    type="text"
                    required
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoComplete="off"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center tracking-[0.4em] font-mono text-xl focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all"
                    placeholder="------"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-3 rounded-xl font-semibold shadow-md transition-all"
                >
                  {loading ? 'Verifying & Creating Account...' : 'Verify OTP & Complete Sign Up'}
                </button>

                <button
                  type="button"
                  onClick={() => setSignupStep(1)}
                  className="w-full text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 py-1"
                >
                  <ArrowLeft size={14} /> Back to details
                </button>
              </form>
            )}
          </div>
        )}

        {/* SOCIAL & QUICK ACCESS */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-3 text-[11px] text-gray-400 uppercase tracking-widest font-mono">Quick Access</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Instant VIP Guest Entry */}
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gold-champagne/10 hover:bg-gold-champagne/20 border border-gold-champagne/30 text-gold-champagne text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={14} className="text-gold-champagne" />
            <span>⚡ Instant VIP Demo Login (No Password Required)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
