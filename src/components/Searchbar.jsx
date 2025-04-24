import React from "react";


function Searchbar({ searchTerm, setSearchTerm }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;