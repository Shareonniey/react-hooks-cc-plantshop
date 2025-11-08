import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {

  const formattedPrice = Number(plant.price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {formattedPrice}</p>
      <button
        className={plant.soldOut ? "secondary" : "primary"}
        onClick={() => onToggleSoldOut(plant.id)}
      >
        {plant.soldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
