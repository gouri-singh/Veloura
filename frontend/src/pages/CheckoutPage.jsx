import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { CheckCircle, ChevronRight, ShoppingBag, MapPin, CreditCard, Lock } from 'lucide-react';
import { playCelebration } from '../utils/sounds';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  });
  const [payment, setPayment] = useState({
    method: 'card', cardNumber: '', cardName: '', expiry: '', cvv: ''
  });

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 2000));
    placeOrder({ cartItems, shipping, payment, subtotal, tax, total });
    setLoading(false);
    playCelebration();
    setOrderPlaced(true);
    clearCart();
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingBag size={64} className="text-gray-500 mb-4" />
        <h2 className="text-3xl font-serif text-white mb-4">Your Cart is Empty</h2>
        <Link to="/home" className="btn-gold">Start Shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="glass-panel p-12 max-w-lg w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/20 p-5 rounded-full border border-green-500/30">
              <CheckCircle size={64} className="text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl font-serif text-white mb-3">Order Placed!</h2>
          <p className="text-gray-400 mb-2">Thank you, <span className="text-gold-champagne font-medium">{shipping.fullName}</span>!</p>
          <p className="text-gray-400 mb-8 text-sm">Your order has been confirmed. You'll receive a confirmation at <span className="text-white">{shipping.email}</span>.</p>
          <div className="bg-white/5 rounded-lg p-4 mb-8 text-sm text-left space-y-2 border border-white/10">
            <div className="flex justify-between"><span className="text-gray-400">Order Total</span><span className="text-gold-champagne font-bold">₹{total}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Delivery to</span><span className="text-white">{shipping.city}, {shipping.state}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Est. Delivery</span><span className="text-white">3–5 Business Days</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/orders" className="btn-gold flex-1 flex justify-center items-center gap-2">📦 View My Orders</Link>
            <Link to="/home" className="btn-outline-gold flex-1 flex justify-center items-center">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-serif text-white mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${i === step ? 'text-gold-champagne' : i < step ? 'text-green-400 cursor-pointer' : 'text-gray-500'}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 ${i === step ? 'border-gold-champagne text-gold-champagne' : i < step ? 'border-green-400 bg-green-400/20 text-green-400' : 'border-gray-600 text-gray-500'}`}>
                {i < step ? '✓' : i + 1}
              </span>
              {s}
            </button>
            {i < steps.length - 1 && <ChevronRight size={16} className="mx-3 text-gray-600" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">

          {/* Step 0: Shipping */}
          {step === 0 && (
            <form onSubmit={handleShippingSubmit} className="glass-panel p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2 text-gold-champagne">
                <MapPin size={20} /> <h2 className="text-xl font-serif">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['fullName','Full Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['pincode','PIN Code','text']].map(([field, label, type]) => (
                  <div key={field}>
                    <label className="block text-xs text-gray-400 mb-1">{label} *</label>
                    <input
                      type={type} required value={shipping[field]}
                      onChange={e => setShipping({...shipping, [field]: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm"
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Street Address *</label>
                <input type="text" required value={shipping.address}
                  onChange={e => setShipping({...shipping, address: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm"
                  placeholder="House No., Street, Area"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[['city','City'],['state','State']].map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-xs text-gray-400 mb-1">{label} *</label>
                    <input type="text" required value={shipping[field]}
                      onChange={e => setShipping({...shipping, [field]: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm"
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="w-full btn-gold mt-2 flex items-center justify-center gap-2">
                Continue to Payment <ChevronRight size={18} />
              </button>
            </form>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <form onSubmit={handlePaymentSubmit} className="glass-panel p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2 text-gold-champagne">
                <CreditCard size={20} /> <h2 className="text-xl font-serif">Payment Details</h2>
              </div>
              {/* Payment Method Tabs */}
              <div className="flex gap-3">
                {[['card','Credit / Debit Card'],['upi','UPI'],['cod','Cash on Delivery']].map(([m, label]) => (
                  <button
                    type="button" key={m}
                    onClick={() => setPayment({...payment, method: m})}
                    className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${payment.method === m ? 'border-gold-champagne bg-gold-champagne/10 text-gold-champagne' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {payment.method === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Card Number *</label>
                    <input type="text" required maxLength="19" value={payment.cardNumber}
                      onChange={e => setPayment({...payment, cardNumber: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim()})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm tracking-widest"
                      placeholder="0000 0000 0000 0000" autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Name on Card *</label>
                    <input type="text" required value={payment.cardName}
                      onChange={e => setPayment({...payment, cardName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Expiry *</label>
                      <input type="text" required maxLength="5" value={payment.expiry}
                        onChange={e => setPayment({...payment, expiry: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">CVV *</label>
                      <input type="password" required maxLength="4" value={payment.cvv}
                        onChange={e => setPayment({...payment, cvv: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm"
                        placeholder="•••" autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              )}
              {payment.method === 'upi' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1">UPI ID *</label>
                  <input type="text" required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-champagne transition-colors text-sm"
                    placeholder="yourname@upi"
                  />
                </div>
              )}
              {payment.method === 'cod' && (
                <p className="text-gray-400 text-sm bg-white/5 rounded-lg p-4 border border-white/10">
                  💰 Pay in cash when your order is delivered to your doorstep. No advance payment required.
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <Lock size={12} /> Your payment info is encrypted and secure.
              </div>
              <button type="submit" className="w-full btn-gold flex items-center justify-center gap-2">
                Review Order <ChevronRight size={18} />
              </button>
            </form>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="glass-panel p-6 space-y-5">
              <h2 className="text-xl font-serif text-gold-champagne mb-2">Review Your Order</h2>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 items-center py-2 border-b border-white/5">
                    <img src={item.image} alt={item.title} className="w-14 h-16 object-cover rounded-lg" />
                    <div className="flex-grow">
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-gray-400 text-xs capitalize">{item.category} • Qty: {item.quantity}</p>
                    </div>
                    <span className="text-gold-champagne font-semibold text-sm">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-sm space-y-2 border border-white/10">
                <p className="text-gray-400 font-medium mb-2">Shipping to:</p>
                <p className="text-white text-sm">{shipping.fullName} • {shipping.phone}</p>
                <p className="text-gray-300 text-sm">{shipping.address}, {shipping.city}, {shipping.state} – {shipping.pincode}</p>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full btn-gold flex items-center justify-center gap-2 py-4 text-lg"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                    Placing Order...
                  </span>
                ) : (
                  <><Lock size={18} /> Place Order · ₹{total}</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-5 sticky top-24">
            <h3 className="text-lg font-serif text-white mb-4 border-b border-white/10 pb-3">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-300"><span>Subtotal ({cartItems.length} items)</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-gray-300"><span>Shipping</span><span className="text-green-400">Free</span></div>
              <div className="flex justify-between text-gray-300"><span>GST (18%)</span><span>₹{tax}</span></div>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Total</span>
                <span className="text-xl font-bold text-gold-champagne">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
