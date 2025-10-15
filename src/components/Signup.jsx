import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDarkMode(document.body.getAttribute('data-theme') === 'dark');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      alert(res.data.message);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Signup failed — check console for details');
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: darkMode ? '#1f1f1f' : '#f4f4f9',
    },
    formContainer: {
      backgroundColor: darkMode ? '#2c2c2c' : '#ffffff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: darkMode
        ? '0 4px 12px #00000073'
        : '0 4px 12px #0000001a',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      color: darkMode ? '#f0f0f0' : '#333',
    },
    h2: {
      color: darkMode ? '#66ccff' : '#6f42c1ff',
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
      backgroundColor: darkMode ? '#66ccff' : '#6f42c1ff',
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
    <div style={styles.wrapper}>
      <div style={styles.formContainer}>
        <h2 style={styles.h2}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.linkText}>
          Already have an account?{' '}
          <a href="/" style={styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
