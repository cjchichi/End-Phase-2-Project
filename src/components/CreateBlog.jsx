import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBlog } from '../utils/blogService'; // Import the actual API call function

const CreateBlog = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const addBlog = location.state?.addBlog;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      const newBlog = await createBlog(title, content, author, image, currentUser.token);
      setSuccess(`Blog created successfully: ${newBlog.title}`);
      setTitle('');
      setContent('');
      setAuthor('');
      setImage(null);
      navigate('/dashboard', { 
        state: { 
          success: 'Blog created successfully!' 
        } 
      });
    } catch (err) {
      setError(err.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = (newBlog) => {
    // Simulate saving the blog (e.g., API call)
    const createdBlog = {
      ...newBlog,
      id: Date.now(), // Generate a unique ID
      createdAt: new Date().toISOString(),
    };

    // Call the addBlog function to update the Dashboard
    if (addBlog) {
      addBlog(createdBlog);
    }

    // Redirect back to the Dashboard
    navigate('/', { state: { success: 'Blog created successfully!' } });
  };

  return (
    <div className="create-blog">
      <h2>Create New Blog</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>
      <Link 
        to="/create-blog" 
        className="btn-primary"
        state={{ fromDashboard: true, addBlog }}
      >
        <i className="icon-plus"></i> Create New
      </Link>
      <button onClick={() => handleCreateBlog({ title: 'New Blog', content: 'Blog content...' })}>
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlog;