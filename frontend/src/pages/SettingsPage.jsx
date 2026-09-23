import { useState } from 'react';
import { Bell, Volume2, Moon, Trash2, ShieldCheck, ChevronRight } from 'lucide-react';

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${enabled ? 'bg-gold-champagne' : 'bg-white/10'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('veloura_settings');
    try {
      return saved ? JSON.parse(saved) : {
        soundEffects: true,
        notifications: true,
        emailUpdates: true,
        darkMode: true,
      };
    } catch { return { soundEffects: true, notifications: true, emailUpdates: true, darkMode: true }; }
  });

  const [cleared, setCleared] = useState(false);

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem('veloura_settings', JSON.stringify(updated));

    // Apply sound toggle globally
    if (key === 'soundEffects') {
      window.__veloura_sound_enabled = value;
    }
  };

  const handleClearData = () => {
    if (window.confirm('This will clear your cart and order history. Are you sure?')) {
      localStorage.removeItem('veloura_cart');
      localStorage.removeItem('veloura_orders');
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  };

  const settingsGroups = [
    {
      title: 'Preferences',
      icon: <Bell size={18} />,
      items: [
        { key: 'soundEffects', label: 'Sound Effects', desc: 'Play sounds on button clicks and actions', icon: <Volume2 size={16} /> },
        { key: 'notifications', label: 'Push Notifications', desc: 'Receive order and offer notifications', icon: <Bell size={16} /> },
        { key: 'emailUpdates', label: 'Email Updates', desc: 'Receive style tips and new arrivals by email', icon: <Bell size={16} /> },
        { key: 'darkMode', label: 'Dark Mode', desc: 'Velvet dark theme (recommended)', icon: <Moon size={16} /> },
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-serif text-white mb-2">Settings</h1>
      <p className="text-gray-400 mb-8">Customize your Veloura experience.</p>

      {settingsGroups.map(group => (
        <div key={group.title} className="glass-panel p-6 mb-6">
          <h3 className="text-lg font-serif text-gold-champagne mb-5 flex items-center gap-2">
            {group.icon} {group.title}
          </h3>
          <div className="space-y-5">
            {group.items.map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
                <Toggle enabled={settings[item.key]} onChange={v => updateSetting(item.key, v)} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Privacy & Data */}
      <div className="glass-panel p-6 mb-6">
        <h3 className="text-lg font-serif text-gold-champagne mb-5 flex items-center gap-2">
          <ShieldCheck size={18} /> Privacy & Data
        </h3>
        <div className="space-y-3">
          <button
            onClick={handleClearData}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={16} className="text-red-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-red-400">Clear App Data</p>
                <p className="text-xs text-gray-500">Remove cart and order history from this device</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-red-400/50 group-hover:text-red-400 transition-colors" />
          </button>
          {cleared && <p className="text-green-400 text-sm text-center">✓ Data cleared successfully</p>}
        </div>
      </div>

      {/* App Info */}
      <div className="glass-panel p-4 text-center">
        <p className="text-gray-500 text-xs">Veloura v1.0.0 · Fashion Recommendation Engine</p>
        <p className="text-gray-600 text-xs mt-1">Made with ♥ for every body</p>
      </div>
    </div>
  );
}
