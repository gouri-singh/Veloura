import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Upload, Tag, RefreshCw } from 'lucide-react';

export default function WardrobeMatcherPage() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [tagCategory, setTagCategory] = useState('');
  const [tagColor, setTagColor] = useState('');
  const [showMatches, setShowMatches] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result);
        setImageUploaded(true);
        setShowMatches(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFindMatches = (e) => {
    e.preventDefault();
    if (tagCategory && tagColor) {
      setShowMatches(true);
    }
  };

  const reset = () => {
    setImageUploaded(false);
    setUploadedImagePreview(null);
    setTagCategory('');
    setTagColor('');
    setShowMatches(false);
  };

  const matchingProducts = useMemo(() => {
    if (!showMatches) return [];
    
    // Logic: If user uploads a top, show bottoms. If bottom, show tops.
    let targetCategory = '';
    if (tagCategory === 'top') targetCategory = 'bottom';
    if (tagCategory === 'bottom') targetCategory = 'top';
    if (tagCategory === 'ethnic' || tagCategory === 'western') {
        // Just show same category accessories or complimentary items, for mock we just show same category
        targetCategory = tagCategory; 
    }

    return products
      .filter(p => targetCategory ? p.category === targetCategory : true)
      // Sort by price
      .sort((a, b) => a.price - b.price);
  }, [showMatches, tagCategory]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif text-white mb-3">Wardrobe Matcher</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Upload an item you own, and we'll find the perfect pieces to complete your outfit.
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
                <p className="text-sm text-gray-300 font-medium">Click or drag to upload</p>
                <p className="text-xs text-gray-500 mt-2 text-center">In production, this photo is processed securely and requires consent.</p>
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
                  {/* TODO: Integrate real image recognition here instead of manual tagging */}
                  <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded text-xs text-blue-200 mb-4">
                    <span className="font-bold">Developer Note:</span> Manual tagging is used for MVP. In the future, a CV model will auto-tag this image.
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                      <Tag size={14} /> Item Category
                    </label>
                    <select 
                      required
                      value={tagCategory}
                      onChange={(e) => setTagCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold-champagne text-sm"
                    >
                      <option value="" className="bg-gray-900">Select...</option>
                      <option value="top" className="bg-gray-900">Top (Shirt, T-Shirt)</option>
                      <option value="bottom" className="bg-gray-900">Bottom (Pants, Skirt)</option>
                      <option value="ethnic" className="bg-gray-900">Ethnic Wear</option>
                      <option value="western" className="bg-gray-900">Western Dress</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Primary Color</label>
                    <input 
                      type="text" 
                      required
                      value={tagColor}
                      onChange={(e) => setTagColor(e.target.value)}
                      placeholder="e.g. Blue, Red"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold-champagne text-sm"
                    />
                  </div>

                  <button type="submit" className="w-full btn-gold py-2.5 mt-2">
                    Find Matches
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {showMatches ? (
            <div>
              <h3 className="text-2xl font-serif text-white mb-6">Suggested Pairings</h3>
              {matchingProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {matchingProducts.slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-10 text-center text-gray-400">
                  No matching items found in the demo catalog.
                </div>
              )}
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center text-gray-500 p-10 text-center">
              Upload an image and tag it to see matching suggestions here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
