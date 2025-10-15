import React from 'react';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import LogoutButton from './LogoutButton.jsx';

const Header = ({ collapsed, toggle, theme }) => {
  // Determine styles based on theme
  const isDark = theme === 'dark';

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    background: isDark ? '#2c2c2c' : '#fff',
    height: '64px',
    borderBottom: isDark ? '1px solid #444' : '1px solid #f0f0f0',
  };

  const titleStyle = {
    marginLeft: '1rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: isDark ? '#f0f0f0' : '#6F42C1',
    flexGrow: 1,
  };

  const buttonStyle = {
    fontSize: '1.2rem',
    width: 48,
    height: 48,
    color: isDark ? '#f0f0f0' : '#333',
  };

  return (
    <div className="app-header" style={headerStyle}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggle}
        style={buttonStyle}
      />
      <span style={titleStyle}>SpendWise</span>
      
      <LogoutButton />
    </div>
  );
};

export default Header;
