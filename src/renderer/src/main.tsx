import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from 'antd';

import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout className="main">
      <Layout.Header className="header">Header</Layout.Header>
      <Layout>
        <Layout.Sider width={50} className="slider">
          Sider
        </Layout.Sider>
        <Layout.Content className="content">Content</Layout.Content>
      </Layout>
    </Layout>
  </React.StrictMode>
);
