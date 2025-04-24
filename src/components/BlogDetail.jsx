import React from 'react';

const BlogDetail = () => {
 
    const blog = {
      id: 1,
      title: 'Sample Blog',
      content: 'This is the full content of the blog post...',
      image: 'https://via.placeholder.com/800x400',
      author: 'John Doe'
    };
  
    return (
      <div className="blog-detail">
        <h2>{blog.title}</h2>
        <p className="author">By: {blog.author}</p>
        
        {blog.image && (
          <div className="blog-featured-image">
            <img src={blog.image} alt={blog.title} />
          </div>
        )}
        
        <div className="content">
          <p>{blog.content}</p>
        </div>
      </div>
    );
  };
  
  export default BlogDetail;