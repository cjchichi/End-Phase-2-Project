import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = { 
        email, 
        name: email.split('@')[0], 
        id: Date.now().toString(),
        token: 'mock-auth-token'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user; // Return user instead of navigating
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = { 
        email, 
        name, 
        id: Date.now().toString(),
        token: 'mock-auth-token'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user; // Return user instead of navigating
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      error,
      login,
      signup,
      logout
    }}>
      {!loading && children}
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