import React from 'react';

function WardrobeItem({ item, onDelete }) {
  return (
    <div className="card p-3 d-flex justify-content-between align-items-center">
      <div>
        <h5 className="card-title fw-bold">{item.name}</h5>
        <p className="card-text">Category: {item.category}</p>
      </div>
      <button onClick={() => onDelete(item.id)} className="btn btn-danger">Remove</button>
    </div>
  );
}

export default WardrobeItem;