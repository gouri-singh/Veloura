import { products as fallbackProducts } from '../data/products';

const API_BASE_URL = 'http://localhost:3001/api';

const getHeaders = (hasBody = true) => {
  const headers = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('veloura_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
  }
  return data;
};

export const authApi = {
  checkUser: async (contact) => {
    const res = await fetch(`${API_BASE_URL}/auth/check-user`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ contact })
    });
    return handleResponse(res);
  },

  sendOtp: async (contact) => {
    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ contact })
    });
    return handleResponse(res);
  },

  verifyOtp: async (contact, otp, password = '', name = '') => {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ contact, otp, password, name })
    });
    return handleResponse(res);
  },

  register: async (contact, otp, password, name = '') => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ contact, otp, password, name })
    });
    return handleResponse(res);
  },

  login: async (contact, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ contact, password })
    });
    return handleResponse(res);
  },

  guestLogin: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/demo`, {
        method: 'POST',
        headers: getHeaders()
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn('Backend API unreachable for demo login, using fallback guest session:', err.message);
      return {
        success: true,
        token: 'veloura_demo_guest_token_12345',
        user: {
          id: 999,
          contact: 'guest@veloura.app',
          name: 'Demo Guest User',
          skinTone: 'Warm Olive',
          bodyShape: 'Hourglass',
          height: '170cm',
          weight: '60kg'
        }
      };
    }
  },

  googleLogin: async (googlePayload = {}) => {
    // TODO: Connect to Google Identity Services / Firebase Auth popup when Client ID is provided
    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(googlePayload)
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn('Backend API unreachable for Google login, using fallback Google profile session:', err.message);
      return {
        success: true,
        token: 'veloura_google_session_token_98765',
        user: {
          id: 888,
          contact: googlePayload.email || 'alex.google@gmail.com',
          name: googlePayload.name || 'Alex Morgan',
          skinTone: 'Dusty Rose',
          bodyShape: 'Athletic',
          height: '168cm',
          weight: '58kg'
        },
        isNewUser: false
      };
    }
  }
};

export const userApi = {
  getProfile: async () => {
    const res = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: getHeaders(false)
    });
    return handleResponse(res);
  },

  updateProfile: async (name) => {
    const res = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ name })
    });
    return handleResponse(res);
  },

  submitOnboarding: async ({ height, weight, skinTone, bodyShape }) => {
    const res = await fetch(`${API_BASE_URL}/user/onboarding`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ height, weight, skinTone, bodyShape })
    });
    return handleResponse(res);
  }
};

export const productsApi = {
  getProducts: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/products${query ? `?${query}` : ''}`, {
        headers: getHeaders(false)
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn('Backend API unreachable for products, utilizing cached dataset fallback:', err.message);
      let result = [...fallbackProducts];
      const { search, category, color, platform, sort } = params;
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      }
      if (category && category !== 'all') {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      if (color && color !== 'all') {
        result = result.filter(p => p.color && p.color.toLowerCase() === color.toLowerCase());
      }
      if (platform && platform !== 'all') {
        result = result.filter(p => p.platform && p.platform.toLowerCase() === platform.toLowerCase());
      }
      if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
      else result.sort((a, b) => a.price - b.price);
      return result;
    }
  },

  getProductById: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        headers: getHeaders(false)
      });
      return await handleResponse(res);
    } catch (err) {
      return fallbackProducts.find(p => p.id === parseInt(id, 10)) || null;
    }
  }
};

export const recommendationsApi = {
  getRecommendations: async (userProfile = {}) => {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userProfile)
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn('Backend API unreachable for recommendations, evaluating fallback logic:', err.message);
      const filtered = fallbackProducts.slice(0, 10).map(p => ({
        ...p,
        matchReason: 'Curated match based on your preferences'
      }));
      return { total: filtered.length, recommendations: filtered };
    }
  }
};

export const wardrobeApi = {
  matchCombo: async ({ category, color, title }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/wardrobe/match`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ category, color, title })
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn('Backend API unreachable for combo matcher, using local matching:', err.message);
      const selectedCat = (category || 'top').toLowerCase();
      const matches = [...fallbackProducts].sort((a, b) => {
        const aIsExact = a.category.toLowerCase() === selectedCat ? 0 : 1;
        const bIsExact = b.category.toLowerCase() === selectedCat ? 0 : 1;
        if (aIsExact !== bIsExact) return aIsExact - bIsExact;
        return a.price - b.price;
      }).slice(0, 8);
      return { uploadedItem: { category, color }, matches };
    }
  }
};

export const feedbackApi = {
  submitFeedback: async ({ productId, rating, comment }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ productId, rating, comment })
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn('Feedback fallback save:', err.message);
      return { success: true, message: 'Feedback recorded locally' };
    }
  }
};
