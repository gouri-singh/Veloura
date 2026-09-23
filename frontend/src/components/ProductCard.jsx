import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { playPop } from '../utils/sounds';
import { feedbackApi } from '../services/api';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);
  const [added, setAdded] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleBuyClick = () => {
    addToCart(product);
    playPop();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const submitFeedback = async () => {
    if (rating === 0) return;
    
    try {
      await feedbackApi.submitFeedback({
        productId: product.id,
        rating,
        comment
      });
      setFeedbackSubmitted(true);
      setTimeout(() => setShowFeedback(false), 2000);
    } catch (err) {
      console.error("Failed to submit feedback", err);
    }
  };
  return (
    <div className="glass-panel overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300">
      <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{product.category}</span>
        <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-gold-champagne border border-gold-champagne/30">
          {product.platform}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-medium text-white mb-1">{product.title}</h3>
        <p className="text-gray-400 text-sm mb-4 capitalize">{product.category} • {product.color}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-bold text-gold-champagne">₹{product.price}</span>
          <button onClick={handleBuyClick} disabled={added} className={`py-2 px-4 text-sm transition-all duration-300 flex items-center justify-center ${added ? 'bg-green-500/20 text-green-400 rounded-lg border border-green-500/50' : 'btn-gold'}`}>
            {added ? <span className="flex items-center gap-1"><CheckCircle size={16} /> Added</span> : 'Add to Cart'}
          </button>
        </div>
      </div>

      {showFeedback && !feedbackSubmitted && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center p-4 z-20">
          <h4 className="font-serif text-gold-champagne mb-2">How was this suggestion?</h4>
          <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setRating(star)} className={`${rating >= star ? 'text-yellow-400' : 'text-gray-500'} hover:scale-110 transition-transform`}>
                <Star fill={rating >= star ? 'currentColor' : 'none'} size={24} />
              </button>
            ))}
          </div>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional comment..."
            className="w-full bg-white/10 border border-white/20 rounded p-2 text-sm mb-4 focus:outline-none focus:border-gold-champagne"
            rows={2}
          />
          <div className="flex gap-2">
            <button onClick={() => setShowFeedback(false)} className="text-sm text-gray-400 px-3 py-1">Skip</button>
            <button onClick={submitFeedback} className="bg-gold-champagne text-black px-4 py-1 rounded font-medium text-sm">Submit</button>
          </div>
        </div>
      )}
      
      {feedbackSubmitted && showFeedback && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center p-4 z-20">
          <p className="text-gold-champagne font-medium">Thank you for your feedback!</p>
        </div>
      )}
    </div>
  );
}
