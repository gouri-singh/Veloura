import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatWidget from './ChatWidget';
import { LogOut, ShoppingCart, User, Package, Settings, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Layout() {
  const auth = useAuth() || {};
  const user = auth.user;
  const logout = auth.logout || (() => {});
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/auth?mode=login');
  };

  const menuItems = [
    { to: '/account', icon: <User size={15} />, label: 'My Account' },
    { to: '/orders', icon: <Package size={15} />, label: 'My Orders' },
    { to: '/settings', icon: <Settings size={15} />, label: 'Settings' },
  ];

  const isFrontCover = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div className="velvet-bg min-h-screen text-gray-100 flex flex-col">
      {!isFrontCover && (
        <nav className="velvet-content relative z-[999999] border-b border-white/10 glass-panel rounded-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">

              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img src="/images/logo.png" alt="Veloura Logo" className="h-10 w-auto rounded-md shadow-sm border border-gold-champagne/20" />
                  <span className="font-serif text-2xl font-bold text-gold-champagne tracking-wider">
                    VELOURA
                  </span>
                </Link>
              </div>

              {/* Nav Items */}
              <div className="flex space-x-5 items-center">
                {user ? (
                  <>
                    <Link to="/home" className="text-sm font-medium hover:text-gold-champagne transition-colors hidden sm:block">Home</Link>
                    <Link to="/wardrobe-matcher" className="text-sm font-medium hover:text-gold-champagne transition-colors hidden sm:block">Matcher</Link>

                    {/* Cart */}
                    <Link to="/cart" className="relative text-gray-300 hover:text-gold-champagne transition-colors flex items-center">
                      <ShoppingCart size={20} />
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {getCartCount()}
                        </span>
                      )}
                    </Link>

                    {/* User Dropdown */}
                    <div className="relative z-[9999]" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className="flex items-center gap-2 text-sm font-medium hover:text-gold-champagne transition-colors p-1 rounded-lg hover:bg-white/5"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-velvet-purple to-velvet-maroon border border-gold-champagne/40 flex items-center justify-center text-gold-champagne font-bold text-sm shadow-md">
                          {(user?.name || user?.contact || 'U').charAt(0).toUpperCase()}
                        </div>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {dropdownOpen && (
                        <div className="fixed right-4 top-[4.5rem] w-52 glass-panel border border-white/15 rounded-xl shadow-2xl z-[2147483647] overflow-hidden backdrop-blur-xl bg-black/80">
                          <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                            <p className="text-white text-sm font-medium truncate">{user?.name || 'Veloura User'}</p>
                            <p className="text-gold-champagne/80 text-xs truncate mt-0.5">{user?.contact}</p>
                          </div>
                          <div className="py-1">
                            {menuItems.map(item => (
                              <button
                                key={item.to}
                                type="button"
                                onClick={() => {
                                  setDropdownOpen(false);
                                  navigate(item.to);
                                }}
                                className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:text-gold-champagne hover:bg-white/10 transition-all font-medium"
                              >
                                {item.icon} {item.label}
                              </button>
                            ))}
                          </div>
                          <div className="py-1 border-t border-white/10">
                            <button
                              type="button"
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium"
                            >
                              <LogOut size={15} /> Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/auth?mode=login" className="px-4 py-1.5 rounded-lg border border-gold-champagne/50 text-gold-champagne hover:bg-gold-champagne/10 text-xs font-semibold transition-all">
                      Log In
                    </Link>
                    <Link to="/auth?mode=signup" className="btn-gold py-1.5 px-4 text-xs font-semibold shadow-md">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="velvet-content flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <ChatWidget />
    </div>
  );
}








