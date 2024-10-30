import React, { useState } from 'react';
import ModalMedico from './modalMedico';
import ModalDentista from './modalDentista';
import DashboardSidebar from '../../components/sidebar';
import './styles.css';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

const AgendaPersonalizacao = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleModal = (modalName: string) => {
    if (activeModal === modalName) {
      setActiveModal(null); // Fecha a modal se já estiver aberta
    } else {
      setActiveModal(modalName); // Abre a nova modal
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSidebar />
      <Layout className="layout-dashboard">
        <Content className="conteudo-dashboard">
          <div className="modals-container">
            <ModalMedico 
              isOpen={activeModal === 'medico'} 
              onToggle={() => toggleModal('medico')} 
            />
            <ModalDentista 
              isOpen={activeModal === 'dentista'} 
              onToggle={() => toggleModal('dentista')} 
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AgendaPersonalizacao;
