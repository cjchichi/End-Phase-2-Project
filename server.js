import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to users.json
const usersFilePath = path.join(__dirname, 'src/data/users.json');

// Helper to read users.json
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users.json:', err);
    return [];
  }
};

// Helper to write to users.json
const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing to users.json:', err);
  }
};

// Path to blogs.json
const blogsFilePath = path.join(__dirname, 'src/data/blogs.json');

// Helper to read blogs.json
const readBlogs = () => {
  try {
    const data = fs.readFileSync(blogsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading blogs.json:', err);
    return [];
  }
};

// Helper to write to blogs.json
const writeBlogs = (blogs) => {
  try {
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2));
  } catch (err) {
    console.error('Error writing to blogs.json:', err);
  }
};

// API to get all users
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// API to validate user credentials (login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// API to add a new user (signup)
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const users = readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json(newUser);
});

// API to get all blogs
app.get('/blogs', (req, res) => {
  const blogs = readBlogs();
  res.json(blogs);
});

// API to create a new blog
app.post('/blogs', (req, res) => {
  const { title, content, author } = req.body;

  console.log('Received blog creation request:', req.body); // Log the incoming request

  // Validate the request body
  if (!title || !content || !author) {
    console.error('Validation failed: Missing title, content, or author');
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }

  const blogs = readBlogs(); // Read existing blogs from blogs.json
  const newBlog = {
    id: Date.now().toString(), // Generate a unique ID
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog); // Add the new blog to the list
  writeBlogs(blogs); // Persist the updated list to blogs.json

  console.log('Blog created successfully:', newBlog); // Log the created blog
  res.status(201).json(newBlog); // Return the newly created blog
});

// API to get a single blog by ID
app.get('/blogs/:id', (req, res) => {
  const { id } = req.params;
  const blogs = readBlogs();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  res.json(blog);
});

// API to update a blog by ID
app.put('/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  const blogs = readBlogs();
  const blogIndex = blogs.findIndex((b) => b.id === id);

  if (blogIndex === -1) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  const updatedBlog = { ...blogs[blogIndex], title, content, author, updatedAt: new Date().toISOString() };
  blogs[blogIndex] = updatedBlog;
  writeBlogs(blogs);

  res.json(updatedBlog);
});

// API to delete a blog by ID
app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;

  const blogs = readBlogs();
  const filteredBlogs = blogs.filter((b) => b.id !== id);

  if (blogs.length === filteredBlogs.length) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  writeBlogs(filteredBlogs);
  res.status(200).json({ message: 'Blog deleted successfully' }); // Always return JSON
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/blogs/${id}`);
  return response.data; // Return the JSON response from the server
};
