import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { productsApi, recommendationsApi } from '../services/api';

export default function HomePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recommended'); // 'recommended' | 'all'
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [productsList, setProductsList] = useState([]);
  const [recommendedList, setRecommendedList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalogData = async () => {
    setLoading(true);
    try {
      const [allProds, recData] = await Promise.all([
        productsApi.getProducts({
          category: filterCategory,
          sort: sortOrder === 'asc' ? 'price_asc' : 'price_desc'
        }),
        recommendationsApi.getRecommendations(user || {})
      ]);

      setProductsList(Array.isArray(allProds) ? allProds : []);
      setRecommendedList(recData?.recommendations || recData?.matches || []);
    } catch (err) {
      console.error('Failed to load products/recommendations from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogData();
  }, [filterCategory, sortOrder, user]);

  const displayList = activeTab === 'recommended' && recommendedList.length > 0
    ? recommendedList
    : productsList;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Welcome{user?.name ? `, ${user.name}` : user?.contact ? `, ${user.contact}` : ''}</h1>
          <p className="text-gold-champagne font-medium">Discover your perfect style with AI curated recommendations.</p>
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

      <div className="glass-panel p-4 mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
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

        <button 
          onClick={fetchCatalogData}
          className="text-xs text-gold-champagne hover:underline flex items-center gap-1"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh Catalog
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold-champagne"></div>
        </div>
      ) : displayList.length === 0 ? (
        <div className="glass-panel p-12 text-center text-gray-400">
          <p className="text-lg">No products found matching your active filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
