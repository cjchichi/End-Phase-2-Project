import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to Moca Blog</h1>
        <p>Your go-to platform for sharing stories, ideas, and knowledge with the world.</p>
        <Link to="/create-blog" className="btn-primary">Start Writing</Link>
      </div>

      {/* Main Banner */}
      <div className="main-banner">
        <img 
          src="https://img.freepik.com/free-photo/dreamy-arrangement-with-decorative-dried-flowers_23-2151363259.jpg"  
          width="1200px"
          height="400px"
          alt="Main"
        />
        <div className="banner-text">
          <h1>Moca Blog</h1>
          <p>Share your stories, ideas, and knowledge with the world</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
