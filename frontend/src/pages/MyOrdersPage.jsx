import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { ShoppingBag, CheckCircle, Clock, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const statusColor = {
  Confirmed: 'text-green-400 border-green-500/30 bg-green-500/10',
  Processing: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  Shipped: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  Delivered: 'text-gold-champagne border-gold-champagne/30 bg-gold-champagne/10',
};

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="glass-panel overflow-hidden">
      {/* Order Header - always visible */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-5 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div>
          <p className="text-gold-champagne font-mono font-bold">{order.id}</p>
          <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
            <Clock size={11} />
            {new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor[order.status] || 'text-gray-400'}`}>
            <CheckCircle size={11} className="inline mr-1" />{order.status}
          </span>
          <span className="text-lg font-bold text-white">₹{order.total}</span>
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-white/10">
          {/* Items */}
          <div className="space-y-3 mt-4 mb-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="flex-grow">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-gray-400 text-xs capitalize">{item.category} • {item.color} • Qty: {item.quantity}</p>
                </div>
                <p className="text-gold-champagne font-semibold text-sm">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="bg-white/5 rounded-lg p-3 text-xs space-y-1 mb-4 border border-white/5">
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
            <div className="flex justify-between text-gray-400"><span>GST (18%)</span><span>₹{order.tax}</span></div>
            <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-green-400">Free</span></div>
            <div className="flex justify-between text-white font-semibold border-t border-white/10 pt-1 mt-1"><span>Total</span><span className="text-gold-champagne">₹{order.total}</span></div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 gap-2">
            <span className="flex items-center gap-1">
              <Package size={12} /> {order.shipping.fullName} · {order.shipping.city}, {order.shipping.state} – {order.shipping.pincode}
            </span>
            <span>
              {order.paymentMethod === 'card' ? '💳 Card' : order.paymentMethod === 'upi' ? '📲 UPI' : '💰 Cash on Delivery'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, count, color }) {
  return (
    <div className={`flex items-center gap-3 mb-4`}>
      <span className={`text-lg font-serif font-semibold ${color}`}>{title}</span>
      <span className="bg-white/10 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{count}</span>
      <div className="flex-grow h-px bg-white/10"></div>
    </div>
  );
}

export default function MyOrdersPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-black/20 p-8 rounded-full mb-6 border border-white/5">
          <ShoppingBag size={64} className="text-gray-500" />
        </div>
        <h2 className="text-3xl font-serif text-white mb-4">No Orders Yet</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          You haven't placed any orders yet. Start exploring our curated fashion collection!
        </p>
        <Link to="/home" className="btn-gold">Start Shopping</Link>
      </div>
    );
  }

  // Split into recent (last 7 days) and previous
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentOrders = orders.filter(o => new Date(o.date) >= sevenDaysAgo);
  const previousOrders = orders.filter(o => new Date(o.date) < sevenDaysAgo);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-serif text-white">My Orders</h1>
        <span className="text-gray-400 text-sm">{orders.length} total order{orders.length !== 1 ? 's' : ''}</span>
      </div>
      <p className="text-gray-500 text-sm mb-8">Click on any order to expand or collapse its details.</p>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="mb-8">
          <SectionHeader title="🕐 Recent Orders" count={recentOrders.length} color="text-gold-champagne" />
          <div className="space-y-4">
            {recentOrders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        </div>
      )}

      {/* Previous Orders */}
      {previousOrders.length > 0 && (
        <div className="mb-8">
          <SectionHeader title="📦 Previous Orders" count={previousOrders.length} color="text-gray-300" />
          <div className="space-y-4">
            {previousOrders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        </div>
      )}

      {/* If all orders are recent */}
      {recentOrders.length === orders.length && previousOrders.length === 0 && (
        <p className="text-gray-600 text-xs text-center mt-8">Previous orders (older than 7 days) will appear here.</p>
      )}
    </div>
  );
}
