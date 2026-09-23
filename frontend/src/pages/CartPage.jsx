import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-black/20 p-8 rounded-full mb-6 border border-white/5">
          <ShoppingBag size={64} className="text-gray-500" />
        </div>
        <h2 className="text-3xl font-serif text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Looks like you haven't added any of our curated fashion pieces to your cart yet.</p>
        <Link to="/home" className="btn-gold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl font-serif text-white">Shopping Cart</h1>
        <button 
          onClick={clearCart}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl transition-all"
        >
          <Trash2 size={16} /> Clear Everything
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="glass-panel p-5 flex flex-col sm:flex-row gap-6 items-center sm:items-start relative">
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-serif text-xl text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-2 capitalize">{item.category} • {item.color}</p>
                <p className="text-gold-champagne font-bold text-lg mb-4">₹{item.price}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center bg-black/40 rounded-lg border border-white/10 overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-medium text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-400 flex items-center gap-1 text-sm transition-colors"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sticky top-24">
            <h3 className="text-xl font-serif text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-gray-200 font-medium">Total</span>
                <span className="text-2xl font-bold text-gold-champagne">₹{getCartTotal()}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full btn-gold flex items-center justify-center gap-2 text-lg py-4"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
