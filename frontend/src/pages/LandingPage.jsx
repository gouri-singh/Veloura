import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const data = await authApi.googleLogin();
      login(data.token, data.user);
      if (data.isNewUser) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Google sign-in failed:', err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-3xl glass-panel p-10 md:p-16 relative overflow-hidden w-full">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gold-champagne/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-velvet-purple/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Veloura App Logo */}
          <div className="relative mb-5 group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-champagne/50 via-amber-300/40 to-gold-champagne/50 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative flex items-center justify-center p-3 rounded-2xl bg-black/40 border border-gold-champagne/40 backdrop-blur-md shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              <img 
                src="/images/logo.png" 
                alt="Veloura Logo" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  document.getElementById('veloura-logo-svg-fallback').style.display = 'flex';
                }}
                className="h-28 md:h-36 w-auto object-contain rounded-xl" 
              />
              <div 
                id="veloura-logo-svg-fallback" 
                style={{ display: 'none' }}
                className="w-24 h-24 rounded-xl bg-gradient-to-br from-velvet-purple to-amber-900 border border-gold-champagne/50 items-center justify-center text-gold-champagne font-serif text-5xl font-bold shadow-inner"
              >
                V
              </div>
            </div>
          </div>
          
          {/* App Name */}
          <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-champagne to-amber-200 mb-2 drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
            VELOURA
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gold-champagne font-serif italic tracking-wide mb-6 font-semibold drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
            "Wear What Truly Fits You."
          </p>
          
          <p className="text-gray-300 mb-8 max-w-lg mx-auto font-light leading-relaxed text-sm md:text-base">
            Experience AI-powered personal styling. We curate the best fashion from across the web, tailored perfectly to your unique body, skin tone, and style.
          </p>
          
          <div className="w-full max-w-xs sm:max-w-md mx-auto space-y-4">
            {/* Login & Sign Up buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth?mode=login" 
                className="btn-gold text-lg px-8 py-3 rounded-xl flex-1 text-center font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:brightness-110 transition-all"
              >
                Login
              </Link>
              <Link 
                to="/auth?mode=signup" 
                className="px-8 py-3 rounded-xl border border-gold-champagne/50 text-gold-champagne font-semibold hover:bg-gold-champagne/10 transition-all text-lg flex-1 text-center"
              >
                Sign Up
              </Link>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/15"></div>
              <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider">Or</span>
              <div className="flex-grow border-t border-white/15"></div>
            </div>

            {/* Continue with Google button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span className="font-semibold">{loading ? 'Connecting...' : 'Continue with Google'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
