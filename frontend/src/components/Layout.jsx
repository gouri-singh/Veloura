import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatWidget from './ChatWidget';
import { LogOut, User } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="velvet-bg min-h-screen text-gray-100 flex flex-col">
      <nav className="velvet-content border-b border-white/10 glass-panel rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to={user ? "/home" : "/"} className="font-serif text-2xl font-bold text-gold-champagne tracking-wider">
                VELOURA
              </Link>
            </div>
            <div className="flex space-x-4 items-center">
              {user ? (
                <>
                  <Link to="/home" className="text-sm font-medium hover:text-gold-champagne transition-colors">Home</Link>
                  <Link to="/wardrobe-matcher" className="text-sm font-medium hover:text-gold-champagne transition-colors">Matcher</Link>
                  <button onClick={handleLogout} className="text-sm flex items-center gap-1 hover:text-gold-champagne transition-colors">
                    <LogOut size={16}/> Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" className="btn-outline-gold py-1 px-4 text-sm">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="velvet-content flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <ChatWidget />
    </div>
  );
}
