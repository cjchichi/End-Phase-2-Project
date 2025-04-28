import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css';


const AuthForm = ({ isSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [localError, setLocalError] = useState('');
  const { currentUser, signup, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    try {
      if (!acceptedTerms) {
        throw new Error('You must accept the terms and conditions');
      }
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err.message);
    }
  };

  if (currentUser) {
    return null;
  }

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      {(error || localError) && <div className="error">{error || localError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
          </label>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="auth-switch">
        Already have an account?
        <button 
          type="button" 
          onClick={() => navigate('/login')}
          className="link-button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
