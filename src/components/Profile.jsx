import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {currentUser?.name || 'Not provided'}</p>
        <p><strong>Email:</strong> {currentUser?.email}</p>
      </div>
      <button 
        onClick={logout}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;