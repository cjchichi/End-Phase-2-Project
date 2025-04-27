import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import { useState } from 'react';
=======
import React from 'react';
>>>>>>> refs/remotes/origin/main

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [searchTerm, setSearchTerm] =useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:',searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Moca Blog</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {currentUser && <Link to="/dashboard">Dashboard</Link>}
        {currentUser && <Link to="/create-blog">Create Blog</Link>}
      </div>
      <form onSubmit={handleSearch} className='search-form'>
        <input type="text"
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-input'
         />
         <button type='submit' className='search-button'>Search</button>
      </form>
      <div className="navbar-auth">
        {currentUser ? (
          <div className="user-menu">
            <span>Hello, {currentUser.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;