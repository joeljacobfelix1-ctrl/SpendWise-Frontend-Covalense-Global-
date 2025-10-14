import React from 'react';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import LogoutButton from './LogoutButton.jsx';

const Header = ({ collapsed, toggle }) => {
  return (
    <div
      className="app-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: '#fff',
        height: '64px',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggle}
        style={{
          fontSize: '1.2rem',
          width: 48,
          height: 48,
        }}
      />
      <span
        style={{
          marginLeft: '1rem',
          fontSize: '1.25rem',
          color: '#6F42C1',
        }}
      >
        SpendWise
      </span>

      <LogoutButton />
    </div>
  );
};

export default Header;
