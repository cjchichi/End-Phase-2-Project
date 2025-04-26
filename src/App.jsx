import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Searchbar from './components/Searchbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Searchbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blogs/:id" element={<BlogDetail />} />
                  
                  <Route path="/dashboard" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/create-blog" element={
                    <PrivateRoute>
                      <CreateBlog />
                    </PrivateRoute>
                  } />
                  <Route path="/edit-blog/:id" element={
                    <PrivateRoute>
                      <EditBlog />
                    </PrivateRoute>
                  } />
                  
                  <Route path="/404" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
          
          {/* Auth routes without Navbar and Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;