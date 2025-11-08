import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [displayPlants, setDisplayPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setDisplayPlants(data);
      });
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
    setDisplayPlants([...plants, newPlant]);
  }

  function handleSearch(searchTerm) {
    const filtered = plants.filter(plant => 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayPlants(filtered);
  }

  function handleToggleSoldOut(plantId) {
    const updatedPlants = plants.map(plant => 
      plant.id === plantId ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updatedPlants);
    
    const updatedDisplayPlants = displayPlants.map(plant =>
      plant.id === plantId ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setDisplayPlants(updatedDisplayPlants);
  }

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={displayPlants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
