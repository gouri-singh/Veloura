import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../services/api';

const SKIN_TONES = [
  { id: 'fair', color: '#FAD6B1', label: 'Fair' },
  { id: 'light', color: '#E4B98E', label: 'Light' },
  { id: 'medium', color: '#D2996C', label: 'Medium' },
  { id: 'tan', color: '#9C6B42', label: 'Tan' },
  { id: 'deep', color: '#684027', label: 'Deep' }
];

const BODY_SHAPES = ['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle'];

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    skinTone: '',
    bodyShape: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.submitOnboarding(formData);
      await refreshProfile();
      navigate('/home');
    } catch (err) {
      console.error('Onboarding submission error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-panel p-8">
        <h2 className="text-3xl font-serif text-white mb-2 text-center">Complete Your Profile</h2>
        <p className="text-gray-400 text-center mb-8">This helps Veloura suggest the best styles for you.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Height (cm)</label>
              <input 
                type="number" 
                required
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne"
                placeholder="e.g. 170"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
              <input 
                type="number" 
                required
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne"
                placeholder="e.g. 65"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Skin Tone</label>
            <div className="flex gap-4">
              {SKIN_TONES.map(tone => (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setFormData({...formData, skinTone: tone.id})}
                  className={`w-12 h-12 rounded-full transition-all duration-300 ${formData.skinTone === tone.id ? 'ring-2 ring-gold-champagne ring-offset-2 ring-offset-gray-900 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
                  style={{ backgroundColor: tone.color }}
                  title={tone.label}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Body Shape (Optional)</label>
            <select 
              value={formData.bodyShape}
              onChange={(e) => setFormData({...formData, bodyShape: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne appearance-none"
            >
              <option value="" className="bg-gray-900">Select Shape</option>
              {BODY_SHAPES.map(shape => (
                <option key={shape} value={shape.toLowerCase()} className="bg-gray-900">{shape}</option>
              ))}
            </select>
          </div>


          <button type="submit" disabled={loading} className="w-full btn-gold mt-4">
            {loading ? 'Saving...' : 'Save Profile & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
