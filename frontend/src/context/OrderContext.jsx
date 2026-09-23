import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('veloura_orders');
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && parsed.length > 0) return parsed;
    } catch { /* fall through */ }

    // Seed with demo orders so the page is never empty
    const demoOrders = [
      {
        id: 'ORD-DEMO-001',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        items: [
          { id: 101, title: 'Elegant Black Kurti', category: 'top', color: 'Black', image: '/images/top.png', price: 799, quantity: 1 },
          { id: 102, title: 'Classic Blue Jeans', category: 'bottom', color: 'Blue', image: '/images/bottom.png', price: 1299, quantity: 1 },
        ],
        shipping: { fullName: 'Demo User', email: 'demo@veloura.in', phone: '9876543210', address: '12, MG Road', city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
        paymentMethod: 'card',
        subtotal: 2098,
        tax: 378,
        total: 2476,
        status: 'Confirmed'
      },
      {
        id: 'ORD-DEMO-002',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
        items: [
          { id: 201, title: 'Trendy Peach Lehenga', category: 'ethnic', color: 'Peach', image: '/images/ethnic.png', price: 3499, quantity: 1 },
        ],
        shipping: { fullName: 'Demo User', email: 'demo@veloura.in', phone: '9876543210', address: '12, MG Road', city: 'Delhi', state: 'Delhi', pincode: '110001' },
        paymentMethod: 'upi',
        subtotal: 3499,
        tax: 630,
        total: 4129,
        status: 'Delivered'
      }
    ];
    return demoOrders;
  });

  useEffect(() => {
    localStorage.setItem('veloura_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = ({ cartItems, shipping, payment, subtotal, tax, total }) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItems,
      shipping,
      paymentMethod: payment.method,
      subtotal,
      tax,
      total,
      status: 'Confirmed'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
