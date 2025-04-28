import axios from 'axios';

const USERS_KEY = 'users';
const API_URL = 'http://localhost:5000';

// Helper to read users from localStorage
export const readUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading users from localStorage:', err);
    return [];
  }
};

// Helper to write users to localStorage
export const writeUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error writing users to localStorage:', err);
  }
};

// Validate user credentials during login
export const validateUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Login failed');
  }
};

// Add a new user during signup
export const addUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Signup failed');
  }
};