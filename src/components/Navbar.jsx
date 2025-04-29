import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Moca Blog</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-blog">Create Blog</Link>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;