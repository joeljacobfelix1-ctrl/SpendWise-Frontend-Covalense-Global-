import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "antd/dist/reset.css";
import App from './App.jsx';
import { ConfigProvider, message } from 'antd';

const WarmProfessionalTheme = {
  token: {
    colorPrimary: '#FF9900',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#333333',
    colorBgContainer: '#F7F8F9',
    colorLink: '#0077B6',
    colorLinkHover: '#00B4D8',
    colorBorder: '#CCCCCC',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
};

const DarkTheme = {
  token: {
    colorPrimary: '#FF9900',
    colorBgBase: '#1e1e2c',
    colorTextBase: '#f0f0f0',
    colorBgContainer: '#2c2c3c',
    colorLink: '#00b8ff',
    colorLinkHover: '#00e0ff',
    colorBorder: '#444',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
  },
};

const Root = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    message.success(`Theme changed to ${newTheme} mode`);
  };

  return (
    <ConfigProvider theme={theme === 'dark' ? DarkTheme : WarmProfessionalTheme}>
      <App theme={theme} onThemeChange={handleThemeChange} />
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
