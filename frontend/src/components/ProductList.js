import React from 'react';

export default function ProductList({ products, onAdd, loading }) {
  if (!products.length) return <div>Loading products...</div>;
  return (
    <div className="grid">
      {products.map(p => (
        <div key={p._id || p.id} className="card">
          <div className="card-body">
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <button onClick={()=>onAdd(p._id || p.id)} disabled={loading}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
