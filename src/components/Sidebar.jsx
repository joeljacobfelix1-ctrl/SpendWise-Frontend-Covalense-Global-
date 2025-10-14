import React from 'react';
import { Menu } from 'antd';
import {
  PieChartOutlined,
  UnorderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const items = [
    {
      key: '/dashboard/overview',
      icon: <PieChartOutlined />,
      label: <Link to="/dashboard/overview">Overview</Link>,
    },
    {
      key: '/dashboard/expenses',
      icon: <UnorderedListOutlined />,
      label: <Link to="/dashboard/expenses">Expenses</Link>,
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: <Link to="/dashboard/settings">Settings</Link>,
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      inlineCollapsed={collapsed}
      items={items}
    />
  );
};

export default Sidebar;
