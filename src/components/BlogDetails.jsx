import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import blogsData from '../data/blogs.json';

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Find the blog by ID from blogsData
    const selectedBlog = blogsData.find((b) => b.id === parseInt(blogId));
    setBlog(selectedBlog);
  }, [blogId]);

  if (!blog) {
    return <p>Loading blog details...</p>;
  }

  return (
    <div className="blog-details-container">
      <h1>{blog.title}</h1>
      {blog.image && <img src={blog.image} alt={blog.title} />}
      <p>{blog.content}</p>
      <p><strong>Published on:</strong> {new Date(blog.date).toLocaleDateString()}</p>
    </div>
  );
};

export default BlogDetails;