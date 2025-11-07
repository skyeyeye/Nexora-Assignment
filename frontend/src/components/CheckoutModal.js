import React, { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, items, total, onCheckout }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-inner">
        <h3>Checkout</h3>
        <div>
          <p>Items: {items.length}</p>
          <p>Total: ₹{total}</p>
        </div>
        <div>
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} />
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div style={{marginTop:10}}>
          <button onClick={()=> onCheckout(name, email)}>Confirm (Mock)</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
