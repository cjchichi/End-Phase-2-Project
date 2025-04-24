import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        if (!currentUser?.token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch('/api/blogs', {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserBlogs();
    }
  }, [currentUser]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        if (!currentUser?.token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete blog');
        }
        
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
        setSuccessMessage('Blog deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="dashboard-unauthorized">
        <h2>Please login to view your dashboard</h2>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your blogs...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {currentUser.name || currentUser.email.split('@')[0]}!</h1>
          <p className="subtitle">You have {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}</p>
        </div>
        <div className="header-actions">
          <Link 
            to="/create-blog" 
            className="btn-primary"
            state={{ fromDashboard: true }} 
          >
            <i className="icon-plus"></i> Create New
          </Link>
        </div>
      </div>
      
      {error && (
        <div className="alert-error">
          <i className="icon-error"></i> {error}
        </div>
      )}

      {successMessage && (
        <div className="alert-success">
          <i className="icon-success"></i> {successMessage}
        </div>
      )}

      <div className="blog-grid">
        {blogs.length === 0 ? (
          <div className="empty-state">
            <img 
              src="/images/empty-blog.svg" 
              alt="No blogs"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/images/default-blog.svg'
              }}
            />
            <h3>You haven't created any blogs yet</h3>
            <p>Start by creating your first blog post</p>
            <Link 
              to="/create-blog" 
              className="btn-primary"
              state={{ fromDashboard: true }}  // Add this to track navigation origin
            >
              Create Blog
            </Link>
          </div>
        ) : (
          blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              {blog.image && (
                <div className="blog-image">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '/images/blog-placeholder.jpg'
                    }}
                  />
                </div>
              )}
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <div className="blog-meta">
                  <span className="blog-date">
                    <i className="icon-calendar"></i> {new Date(blog.date).toLocaleDateString()}
                  </span>
                  <span className="blog-views">
                    <i className="icon-eye"></i> {blog.views || 0} views
                  </span>
                </div>
                <div className="blog-actions">
                  <Link 
                    to={`/blogs/${blog.id}`} 
                    className="btn-outline"
                    title="View blog"
                  >
                    <i className="icon-view"></i> View
                  </Link>
                  <Link 
                    to={`/edit-blog/${blog.id}`} 
                    className="btn-outline"
                    title="Edit blog"
                  >
                    <i className="icon-edit"></i> Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    className="btn-danger"
                    type="button"
                    title="Delete blog"
                  >
                    <i className="icon-delete"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;