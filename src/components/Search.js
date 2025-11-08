import React, { useState } from "react";

function Search({ plants, onFiltered }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(value)
    );
    onFiltered(filtered);
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        id="search"
        type="text"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;

