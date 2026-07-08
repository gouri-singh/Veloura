import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const { token, setUser, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/user/onboarding', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setUser({ ...user, ...formData });
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
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

          {/* TODO: Add selfie upload for skin tone detection AI */}
          <div className="border border-dashed border-white/20 rounded-lg p-6 text-center bg-white/5">
            <p className="text-sm text-gray-400 mb-2">Want better recommendations?</p>
            <button type="button" className="btn-outline-gold py-2 px-4 text-sm" onClick={() => alert("Selfie upload will be available in v2 with AI skin tone detection!")}>
              Upload a Selfie
            </button>
            <p className="text-xs text-gray-500 mt-2">Note: Photos are securely stored and you can delete them anytime.</p>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-gold mt-4">
            {loading ? 'Saving...' : 'Save Profile & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
