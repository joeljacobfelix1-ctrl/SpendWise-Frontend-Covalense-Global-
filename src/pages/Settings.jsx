// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import { Card, Switch, message } from 'antd';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleThemeToggle = (checked) => {
    const selectedTheme = checked ? 'dark' : 'light';
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    message.success(`Theme changed to ${selectedTheme} mode`);
    document.body.setAttribute('data-theme', selectedTheme); // optional: for CSS
  };

  return (
    <Card title="Settings" style={{ maxWidth: 400, fontSize:'20px', textAlign:'center', margin: '0 auto', fontWeight:"bold" }}>
      <div style={{ display: 'flex', fontWeight:"bold", alignItems: 'center', justifyContent: 'center', gap: '12px', paddingTop: '12px' }}>
        <span>Dark Mode</span>
        <Switch checked={theme === 'dark'} onChange={handleThemeToggle} style={{maxWidth:'50px'}}/>
      </div>
    </Card>
  );
};

export default Settings;
