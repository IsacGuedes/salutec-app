import React, { useState, useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const { Sider } = Layout;

const DashboardSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [selectedKey, setSelectedKey] = useState(''); 
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    navigate(key);
  };

  // sicroniza o selectedKey com a URL atual
  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard/todas-consultas':
        setSelectedKey('/dashboard/todas-consultas');
        break;
      case '/dashboard/consultas-confirmadas':
        setSelectedKey('/dashboard/consultas-confirmadas');
        break;
      case '/dashboard/consultas-pendentes':
        setSelectedKey('/dashboard/consultas-pendentes');
        break;
      case '/dashboard/consultas-canceladas':
        setSelectedKey('/dashboard/consultas-canceladas');
        break;
      case '/dashboard/configurar-horario':
        setSelectedKey('/dashboard/configurar-horario');
        break;
      default:
        setSelectedKey('');
        break;
    }
  }, [location.pathname]);

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
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={({ key }) => handleMenuClick(key)}
      >
        <Menu.Item
          key="/dashboard/todas-consultas"
          icon={<ProfileOutlined />}
        >
          Todas as Consultas
        </Menu.Item>
        <Menu.Item
          key="/dashboard/consultas-confirmadas"
          icon={<CheckCircleOutlined />}
        >
          Consultas Confirmadas
        </Menu.Item>
        <Menu.Item
          key="/dashboard/consultas-pendentes"
          icon={<ClockCircleOutlined />}
        >
          Consultas Pendentes
        </Menu.Item>
        <Menu.Item
          key="/dashboard/consultas-canceladas"
          icon={<CloseCircleOutlined />}
        >
          Consultas Canceladas
        </Menu.Item>
        <Menu.Item
          key="/dashboard/configurar-horario"
          icon={<CalendarOutlined />}
        >
          Configurar Horário
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default DashboardSidebar;
