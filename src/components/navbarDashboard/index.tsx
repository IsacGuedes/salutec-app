import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import './styles.css';

const { Header } = Layout;

const DashboardNavbar: FC = () => {
  return (
    <Header className="cabecalho">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      </Menu>
    </Header>
  );
};

export default DashboardNavbar;
