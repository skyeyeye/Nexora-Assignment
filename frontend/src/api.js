import axios from 'axios';
const base = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const fetchProducts = () => axios.get(`${base}/products`).then(r => r.data);
export const fetchCart = () => axios.get(`${base}/cart`).then(r => r.data);
export const addToCart = (productId, qty = 1) => axios.post(`${base}/cart`, { productId, qty }).then(r => r.data);
export const removeFromCart = (cartItemId) => axios.delete(`${base}/cart/${cartItemId}`).then(r => r.data);
export const checkout = (cartItems, name, email) => axios.post(`${base}/cart/checkout`, { cartItems, name, email }).then(r => r.data);
