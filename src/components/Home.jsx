import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const blogs = [
    {
      id: 1,
      title: 'First Blog',
      excerpt: 'This is the first blog post',
      image: 'https://via.placeholder.com/300x200',
      author: 'User1'
    },
    {
      id: 2,
      title: 'Second Blog',
      excerpt: 'This is the second blog post',
      image: 'https://via.placeholder.com/300x200',
      author: 'User2'
    }
  ];

  return (
    <div className="home">
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            {blog.image && (
              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
              </div>
            )}
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
            <Link to={`/blogs/${blog.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
