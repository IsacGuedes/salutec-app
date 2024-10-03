import React from 'react';
import ModalMedico from './modalMedico';
import ModalDentista from './modalDentista';
import DashboardSidebar from '../../components/sidebar'; // Importando o Sidebar
import './styles.css';

const AgendaPersonalizacao: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DashboardSidebar /> {/* Adicionando o Sidebar */}
      <div className="agenda-personalizacao" style={{ marginLeft: '250px', padding: '20px' }}>
        {/* Mantém o restante do layout intacto */}
        <ModalMedico />
        <ModalDentista />
      </div>
    </div>
  );
};

export default AgendaPersonalizacao;
