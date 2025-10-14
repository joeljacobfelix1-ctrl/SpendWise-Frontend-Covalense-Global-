import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';    // using your original Header name
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={250}
        style={{ background: '#1e1e2c' }}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>

      <Layout>
        <Header collapsed={collapsed} toggle={toggle} />
        <Content style={{ margin: '16px', overflow: 'auto' }}>
          {/* Outlet will render Overview, Expenses, Settings here */}
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
