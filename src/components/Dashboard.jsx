import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import blogsData from '../data/blogs.json';

const Dashboard = ({ searchQuery }) => {
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
    // Simulate fetching blogs from blogs.json
    setBlogs(blogsData);
    setLoading(false);
  }, []);

  const addBlog = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <p className="subtitle">You have {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'}</p>
        </div>
        <div className="header-actions">
          <Link 
            to="/create-blog" 
            className="btn-primary"
            state={{ fromDashboard: true, addBlog }}
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
        {filteredBlogs.length === 0 ? (
          <div className="empty-state">
            <h3>No blogs found</h3>
          </div>
        ) : (
          filteredBlogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
                <div className="blog-actions">
                  <Link 
                    to={`/blogs/${blog.id}`} 
                    className="btn-view-details"
                  >
                    View Details
                  </Link>
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