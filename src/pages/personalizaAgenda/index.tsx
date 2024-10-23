import React from 'react';
import ModalMedico from './modalMedico';
import ModalDentista from './modalDentista';
import DashboardSidebar from '../../components/sidebar'; // Importando o Sidebar
import './styles.css';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';


const AgendaPersonalizacao = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSidebar />
      <Layout className="layout-dashboard">
        <Content className="conteudo-dashboard">
            <ModalMedico />
            <ModalDentista />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AgendaPersonalizacao;
