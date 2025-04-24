import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

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