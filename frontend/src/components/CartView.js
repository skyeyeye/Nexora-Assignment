import React from 'react';

export default function CartView({ cart, onRemove, onOpenCheckout }) {
  const items = cart.items || [];
  if (!items.length) return <div>Your cart is empty</div>;

  return (
    <div>
      <ul>
        {items.map(it => (
          <li key={it._id}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <strong>{it.product.name}</strong> <br />
                ₹{it.product.price} × {it.qty}
              </div>
              <div>
                <button onClick={()=>onRemove(it._id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div style={{marginTop:10}}>
        <strong>Total: ₹{cart.total}</strong>
        <div style={{marginTop:10}}>
          <button onClick={onOpenCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
