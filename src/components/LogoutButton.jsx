// src/components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove JWT
    navigate('/', { replace: true }); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        maxWidth: '100px',
        marginLeft: 'auto',
        marginRight: '100px',
        padding: '6px 12px',
        border: 'none',
        backgroundColor: '#6F42C1',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
