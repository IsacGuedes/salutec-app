import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  ProfileOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import './styles.css';

const { Sider } = Layout;

const DashboardSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200); // Largura inicial da sidebar

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setSidebarWidth(e.clientX);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      width={sidebarWidth}
      className="layout-fundo"
      trigger={null}
      style={{ userSelect: 'none' }}
    >
      <div
        style={{ width: 5, cursor: 'ew-resize', position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 1 }}
        onMouseDown={handleMouseDown}
      />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item
          key="toggle"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapse}
        />
        <Menu.Item key="1" icon={<ProfileOutlined />}>
          Todas as Consultas
        </Menu.Item>
        <Menu.Item key="2" icon={<CheckCircleOutlined />}>
          Consultas Confimadas
        </Menu.Item>
        <Menu.Item key="3" icon={<ClockCircleOutlined />}>
        Consultas Pendentes
        </Menu.Item>
        <Menu.Item key="4" icon={<CloseCircleOutlined />}>
          Consultas Canceladas
        </Menu.Item>
        <Menu.Item key="5" icon={<CalendarOutlined />}>
          Configurar Horário
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default DashboardSidebar;
