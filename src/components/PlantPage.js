import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [displayPlants, setDisplayPlants] = useState([]);

  // Fetch all plants on page load
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setDisplayPlants(data);
      });
  }, []);

  // Toggle "Sold Out" status
  function handleToggleSoldOut(id) {
    const plant = plants.find((p) => p.id === id);
    const updatedPlant = { ...plant, soldOut: !plant.soldOut };

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soldOut: updatedPlant.soldOut }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlants(plants.map((p) => (p.id === id ? data : p)));
        setDisplayPlants(displayPlants.map((p) => (p.id === id ? data : p)));
      });
  }

  // Add a new plant
  function handleAddPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant), // send {name, image, price} directly
    })
      .then((res) => res.json())
      .then((addedPlant) => {
        setPlants([...plants, addedPlant]);
        setDisplayPlants([...displayPlants, addedPlant]);
      });
  }

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search plants={plants} onFiltered={setDisplayPlants} />
      <PlantList plants={displayPlants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
