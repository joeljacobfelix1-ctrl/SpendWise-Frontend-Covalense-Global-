import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDarkMode(document.body.getAttribute('data-theme') === 'dark');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('mail_id', email);
      alert(res.data.message);
      navigate('/dashboard/overview');
    } catch (err) {
      console.error(err);
      alert('Login failed — please check your credentials');
    }
  };

  // Styles
  const styles = {
    header: {
      backgroundColor: darkMode ? '#2c2c3c' : '#fff',
      padding: '15px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    websiteName: {
      color: '#ff9900',
      margin: 0,
      fontSize: '1.8em',
      fontWeight: 'bold',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 70px)',
      padding: '20px',
      backgroundColor: darkMode ? '#1f1f1f' : '#f4f4f9',
    },
    formContainer: {
      backgroundColor: darkMode ? '#2c2c2c' : '#ffffff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.45)' : '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      color: darkMode ? '#f0f0f0' : '#333',
    },
    h2: {
      color: darkMode ? '#66ccff' : 'rgb(111, 66, 193)',
      marginBottom: '30px',
      fontSize: '1.8em',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '12px 15px',
      border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
      borderRadius: '6px',
      fontSize: '1em',
      backgroundColor: darkMode ? '#3a3a3a' : '#fff',
      color: darkMode ? '#f0f0f0' : '#333',
    },
    button: {
      backgroundColor: darkMode ? '#66ccff' : 'rgb(111, 66, 193)',
      color: '#fff',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1.1em',
      cursor: 'pointer',
      marginTop: '10px',
    },
    linkText: {
      marginTop: '20px',
      fontSize: '0.95em',
      color: darkMode ? '#f0f0f0' : '#333',
    },
    link: {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: '#ff9900',
    },
  };

  return (
    <>
      <header style={styles.header}>
        <h1 style={styles.websiteName}>SpendWise</h1>
      </header>
      <div style={styles.wrapper}>
        <div style={styles.formContainer}>
          <h2 style={styles.h2}>Login</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
          <p style={styles.linkText}>
            Don't have an account? <a href="/signup" style={styles.link}>Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
