import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Save, CheckCircle, LogOut } from 'lucide-react';
import { userApi } from '../services/api';

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await userApi.updateProfile(name);
      setUser(prev => ({ ...prev, name }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth?mode=login');
  };

  const contact = user?.contact || '';
  const isEmail = contact.includes('@');

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-serif text-white mb-2">My Account</h1>
      <p className="text-gray-400 mb-8">Manage your profile and personal details.</p>

      {/* Avatar */}
      <div className="glass-panel p-8 mb-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-velvet-purple to-velvet-maroon flex items-center justify-center border-2 border-gold-champagne/40 shadow-lg shadow-gold-champagne/10">
          <span className="text-3xl font-serif text-gold-champagne font-bold">
            {(user?.name || user?.contact || 'U').charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-serif text-white">{user?.name || 'Veloura User'}</h2>
          <p className="text-gray-400 text-sm mt-1">
            {isEmail ? <><Mail size={13} className="inline mr-1" />{contact}</> : <><Phone size={13} className="inline mr-1" />{contact}</>}
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="glass-panel p-6 mb-6">
        <h3 className="text-lg font-serif text-gold-champagne mb-5 flex items-center gap-2">
          <User size={18} /> Edit Profile
        </h3>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              {isEmail ? 'Email Address' : 'Mobile Number'} (cannot change)
            </label>
            <input
              type="text"
              value={contact}
              disabled
              className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading || saved}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'btn-gold'}`}
          >
            {saved
              ? <><CheckCircle size={18} /> Changes Saved!</>
              : loading
              ? 'Saving...'
              : <><Save size={18} /> Save Changes</>
            }
          </button>
        </form>
      </div>

      {/* Logout Card */}
      <div className="glass-panel p-6 border border-red-500/20 bg-red-500/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-serif text-red-400 font-medium">Log Out</h3>
            <p className="text-xs text-gray-400 mt-1">Safely sign out of your Veloura account on this device.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-xl transition-all text-sm font-semibold cursor-pointer"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
