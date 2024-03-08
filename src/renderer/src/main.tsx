import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from 'antd';

import SliderMenu from './components/slider';
import Header from './components/header';

import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout className="main">
      <Layout.Header className="header">
        <Header />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={50} className="slider">
          <SliderMenu />
        </Layout.Sider>
        <Layout.Content className="content">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          Content
        </Layout.Content>
      </Layout>
    </Layout>
  </React.StrictMode>
);
