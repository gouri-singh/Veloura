import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Upload, Tag, RefreshCw, Sparkles } from 'lucide-react';
import { wardrobeApi } from '../services/api';

export default function WardrobeMatcherPage() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [tagCategory, setTagCategory] = useState('');
  const [tagColor, setTagColor] = useState('');
  const [showMatches, setShowMatches] = useState(false);
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result);
        setImageUploaded(true);
        setShowMatches(false);
        setMatchingProducts([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFindMatches = async (e) => {
    e.preventDefault();
    if (tagCategory && tagColor) {
      setLoading(true);
      try {
        const response = await wardrobeApi.matchCombo({
          category: tagCategory,
          color: tagColor,
          image: uploadedImagePreview
        });
        setMatchingProducts(response.matches || []);
        setShowMatches(true);
      } catch (err) {
        console.error('Error matching wardrobe combo:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const reset = () => {
    setImageUploaded(false);
    setUploadedImagePreview(null);
    setTagCategory('');
    setTagColor('');
    setShowMatches(false);
    setMatchingProducts([]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif text-white mb-3">Wardrobe Matcher</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Upload an item you own, tag its category and color, and our AI matcher will curate perfect style combinations from our catalog.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-xl font-serif text-gold-champagne mb-4 flex items-center gap-2">
              <Upload size={20} /> Your Item
            </h3>
            
            {!imageUploaded ? (
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center flex-grow bg-black/20 hover:bg-black/40 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload size={40} className="text-gray-500 mb-4" />
                <p className="text-sm text-gray-300 font-medium">Click or drag to upload photo</p>
                <p className="text-xs text-gray-500 mt-2 text-center">In production, user upload requires consent + deletion option (TODO: Image Recognition AI module).</p>
              </div>
            ) : (
              <div className="flex flex-col flex-grow">
                <div className="relative rounded-xl overflow-hidden mb-6 bg-black/50 h-64">
                  <img src={uploadedImagePreview} alt="Uploaded item" className="w-full h-full object-contain" />
                  <button 
                    onClick={reset}
                    className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white hover:text-gold-champagne"
                    title="Start over"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>

                <form onSubmit={handleFindMatches} className="space-y-4 mt-auto">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1">
                      <Tag size={12} /> Category
                    </label>
                    <select
                      required
                      value={tagCategory}
                      onChange={(e) => setTagCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-champagne"
                    >
                      <option value="" className="bg-gray-900">Select Category</option>
                      <option value="top" className="bg-gray-900">Top / Shirt / Sweater</option>
                      <option value="bottom" className="bg-gray-900">Bottom / Jeans / Trousers</option>
                      <option value="ethnic" className="bg-gray-900">Ethnic Wear</option>
                      <option value="western" className="bg-gray-900">Western Wear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Color</label>
                    <select
                      required
                      value={tagColor}
                      onChange={(e) => setTagColor(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-champagne"
                    >
                      <option value="" className="bg-gray-900">Select Color</option>
                      {['Blue', 'White', 'Black', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Brown', 'Olive', 'Burgundy', 'Teal', 'Gold', 'Silver', 'Peach', 'Beige'].map(color => (
                        <option key={color} value={color} className="bg-gray-900">{color}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full btn-gold text-sm flex items-center justify-center gap-2">
                    {loading ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    {loading ? 'Finding Combinations...' : 'Find Matching Outfits'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {!showMatches ? (
            <div className="glass-panel p-12 h-full flex flex-col items-center justify-center text-center">
              <Sparkles size={48} className="text-gold-champagne/40 mb-4" />
              <h3 className="text-xl font-serif text-white mb-2">Upload & Tag to View Combos</h3>
              <p className="text-gray-400 max-w-md">
                Upload your garment on the left, tag its category & color, and click "Find Matching Outfits" to see live recommendations sorted by price.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif text-white">Suggested Matchings</h3>
                <span className="text-xs text-gold-champagne bg-gold-champagne/10 px-3 py-1 rounded-full border border-gold-champagne/20">
                  Sorted Price: Low → High
                </span>
              </div>

              {matchingProducts.length === 0 ? (
                <div className="glass-panel p-8 text-center text-gray-400">
                  No direct combinations found for this color/category pair. Try choosing a different tag!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {matchingProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
