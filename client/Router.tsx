import React from 'react';
import {
  Layout,
} from 'antd';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Map from './component/view/MapIndex'
// import BreadcrumbNames from './config/breadcrumbNameMap';


export default () => (
  <Router>
    <Layout style={{ height: '100vh' }}>
      <Map />
    </Layout>
  </Router>
);
