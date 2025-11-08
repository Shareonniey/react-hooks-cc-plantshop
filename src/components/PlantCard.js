import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  const { id, name, image, price, soldOut } = plant;

  function handleToggleSoldOut() {
    onToggleSoldOut(id);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <button 
        className={soldOut ? "" : "primary"} 
        onClick={handleToggleSoldOut}
      >
        {soldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;


