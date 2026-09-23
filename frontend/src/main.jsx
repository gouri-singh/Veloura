import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { playClick } from './utils/sounds.js'

// Global button/link click sound
document.addEventListener('click', (e) => {
  if (window.__veloura_sound_enabled === false) return;
  const target = e.target.closest('button, a, [role="button"]');
  if (target) playClick();
}, { passive: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
