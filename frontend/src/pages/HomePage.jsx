import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recommended'); // 'recommended' | 'all'
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  // Simple scoring function for AI recommendations
  const getScore = (product) => {
    let score = 0;
    if (!user) return score;

    // Mock Logic 1: Skin tone matching
    if (user.skinTone === 'fair' || user.skinTone === 'light') {
      if (['Pink', 'Blue', 'Emerald', 'Maroon'].includes(product.color)) score += 2;
    } else if (user.skinTone === 'deep' || user.skinTone === 'tan') {
      if (['Yellow', 'Gold', 'Orange', 'White'].includes(product.color)) score += 2;
    }

    // Mock Logic 2: Body shape matching
    if (user.bodyShape === 'pear' && product.category === 'top') score += 1;
    if (user.bodyShape === 'hourglass' && product.tags.includes('dress')) score += 1;

    return score;
  };

  const recommendedProducts = useMemo(() => {
    return [...products]
      .map(p => ({ ...p, score: getScore(p) }))
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score || a.price - b.price); // Sort by score desc, then price asc
  }, [user]);

  const filteredProducts = useMemo(() => {
    let list = activeTab === 'recommended' && recommendedProducts.length > 0 ? recommendedProducts : products;
    
    if (filterCategory !== 'all') {
      list = list.filter(p => p.category === filterCategory);
    }

    list = [...list].sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    
    return list;
  }, [activeTab, recommendedProducts, filterCategory, sortOrder]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Welcome{user?.contact ? `, ${user.contact}` : ''}</h1>
          <p className="text-gold-champagne font-medium">Discover your perfect style.</p>
        </div>
        
        <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setActiveTab('recommended')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'recommended' ? 'bg-gold-champagne text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Sparkles size={16} /> Recommended
          </button>
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-gold-champagne text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            All Products
          </button>
        </div>
      </div>

      <div className="glass-panel p-4 mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-300">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gold-champagne text-gray-200"
        >
          <option value="all">All Categories</option>
          <option value="top">Tops</option>
          <option value="bottom">Bottoms</option>
          <option value="ethnic">Ethnic Wear</option>
          <option value="western">Western Wear</option>
        </select>

        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gold-champagne text-gray-200"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {activeTab === 'recommended' && recommendedProducts.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-gold-champagne/20 to-transparent p-4 rounded-lg border-l-4 border-gold-champagne">
          <p className="text-sm text-gold-champagne font-medium flex items-center gap-2">
            <Sparkles size={16} />
            These items were selected based on your profile (Skin Tone: {user?.skinTone || 'Not set'}, Body Shape: {user?.bodyShape || 'Not set'})
          </p>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center p-12 glass-panel">
          <p className="text-gray-400">No products found for the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
