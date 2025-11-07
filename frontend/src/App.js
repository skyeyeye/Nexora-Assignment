import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCart, addToCart, removeFromCart, checkout } from './api';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const load = async () => {
    setLoading(true);
    try {
      const p = await fetchProducts();
      setProducts(p);
      const c = await fetchCart();
      setCart(c);
    } catch (e) {
      console.error(e);
      alert('Failed to load data');
    } finally { setLoading(false); }
  };

  useEffect(()=> { load(); }, []);

  const handleAdd = async (productId) => {
    setLoading(true);
    try {
      await addToCart(productId, 1);
      const c = await fetchCart();
      setCart(c);
    } catch (e) {
      console.error(e);
      alert('Failed to add to cart');
    } finally { setLoading(false); }
  };

  const handleRemove = async (cartItemId) => {
    setLoading(true);
    try {
      await removeFromCart(cartItemId);
      const c = await fetchCart();
      setCart(c);
    } catch (e) {
      console.error(e);
      alert('Failed to remove item');
    } finally { setLoading(false); }
  };

  const handleCheckout = async (name, email) => {
    setLoading(true);
    try {
      const res = await checkout(cart.items, name, email);
      setReceipt(res.receipt);
      setCheckoutOpen(false);
      // refresh cart
      const c = await fetchCart();
      setCart(c);
    } catch (e) {
      console.error(e);
      alert('Checkout failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="container">
      <h1>Vibe Commerce — Mock Cart</h1>
      <div className="main">
        <div className="left">
          <h2>Products</h2>
          <ProductList products={products} onAdd={handleAdd} loading={loading} />
        </div>

        <div className="right">
          <h2>Your Cart</h2>
          <CartView cart={cart} onRemove={handleRemove} onOpenCheckout={()=>setCheckoutOpen(true)} />
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart.items}
        total={cart.total}
        onClose={()=>setCheckoutOpen(false)}
        onCheckout={handleCheckout}
      />

      {receipt && (
        <div className="receipt">
          <h3>Receipt</h3>
          <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
          <p><strong>Buyer:</strong> {receipt.buyer.name} ({receipt.buyer.email})</p>
          <p><strong>Total:</strong> ₹{receipt.total}</p>
          <p><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={()=>setReceipt(null)}>Close Receipt</button>
        </div>
      )}
    </div>
  );
}
