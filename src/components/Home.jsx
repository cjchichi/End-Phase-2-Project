import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const blogs = [
    {
      id: 1,
      title: 'Food',
      excerpt: 'Lorem ispum',
      image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpeMC6Pkf4oPZecPq0Ng-hKy63gbe38zaMDw&s',
      author: 'User1'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    },
    {
      id: 2,
      title: 'Lifestyle',
      excerpt: 'This is the second blog post',
      image: 'https://photos.superyachtapi.com/download/283016/extra-large',
      author: 'User2'
    }

  ];

  return (
    <div className="home">
      {}
      <div className='main-banner'>
        <img src="https://img.freepik.com/free-photo/dreamy-arrangement-with-decorative-dried-flowers_23-2151363259.jpg"  
              width='1200px'
              height='400px'
              alt="Main"
               />
        <div className='banner-text'>
          <h1>Moca Blog</h1>
          <p>Share your stories, ideas, and knowledge to the world</p>
        </div>
      </div>

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
