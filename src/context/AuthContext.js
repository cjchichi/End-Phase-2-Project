import { createContext, useContext, useState, useEffect } from 'react';
// import { validateUser, addUser } from '../utils/userCheck';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);

          setCurrentUser(parsedUser);
        }
      } catch (err) {
        console.error('Failed to parse user data:', err);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      


      await new Promise(resolve => setTimeout(resolve, 500));
      

      if (!email || !password) {
        throw new Error('Email and password are required');
      }


      const user = { 
        email, 
        name: email.split('@')[0], 
        id: Date.now().toString(),
        token: 'mock-auth-token',
        createdAt: new Date().toISOString()
      };
      

      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      

      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = { 
        email, 
        name, 
        id: Date.now().toString(),
        token: 'mock-auth-token',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
      setCurrentUser(null);
      setError(null);
    } catch (err) {
      console.error('Failed to logout:', err);
      setError('Failed to logout');
    }
  };


  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}