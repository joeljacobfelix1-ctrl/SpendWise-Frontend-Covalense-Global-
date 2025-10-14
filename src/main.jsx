import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "antd/dist/reset.css";
import App from './App.jsx';

import { ConfigProvider } from 'antd';

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


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={WarmProfessionalTheme}>
      <App />
    </ConfigProvider>,
  </StrictMode>,
)
