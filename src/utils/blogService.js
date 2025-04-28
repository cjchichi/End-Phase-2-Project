import axios from 'axios';


axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });


const API_URL = 'http://localhost:5000'; // Ensure this is the correct backend URL

export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const createBlog = async (title, content, author) => {
  try {
    const response = await axios.post(`${API_URL}/blogs`, { title, content, author });
    return response.data; // Return the newly created blog
  } catch (err) {
    console.error('Error creating blog:', err.response?.data || err.message);
    throw err;
  }
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};

export const updateBlog = async (id, title, content, author) => {
  const response = await axios.put(`${API_URL}/blogs/${id}`, { title, content, author });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/blogs/${id}`);
  return response.data;
};
