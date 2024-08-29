import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button, Modal } from 'antd'; // Importando Modal
import { IAgendamento } from '../../components/interface';
import DashboardSidebar from '../../components/sidebar';
import { aplicarMascaraDocumento, formatarTelefone, formatDate } from '../../components/formatos';
import './styles.css';

const { Content } = Layout;

const Dashboard: FC = () => {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IAgendamento | null>(null);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('http://localhost:8090/agendar-consulta/listarConsultas');
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  // Função para abrir o modal
  const showModal = (record: IAgendamento) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Função para atualizar o status no backend
  const handleStatusChange = async (status: string) => {
    if (selectedRecord) {
      try {
        const response = await fetch(`http://localhost:8090/agendar-consulta/atualizarStatus`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: selectedRecord.id, status }),
        });
        if (response.ok) {
          // Atualiza a lista de agendamentos
          setAgendamentos((prevAgendamentos) =>
            prevAgendamentos.map((agendamento) =>
              agendamento.id === selectedRecord.id ? { ...agendamento, statusConsulta: status } : agendamento
            )
          );
          setIsModalVisible(false); // Fecha o modal após a atualização
        } else {
          console.error('Erro ao atualizar o status');
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
      }
    }
  };

  const columns = [
    { title: 'Consulta', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: ['paciente', 'nome'], key: 'nome' },
    { title: 'CPF', dataIndex: ['paciente', 'documento'], key: 'cpf', render: (cpf: string) => aplicarMascaraDocumento(cpf) },
    { title: 'Contato', dataIndex: ['paciente', 'telefone'], key: 'contato', render: (telefone: string) => formatarTelefone(telefone) },
    { title: 'Data da Consulta', dataIndex: 'dataConsulta', key: 'dataConsulta', render: (dataConsulta: string) => formatDate(dataConsulta) },
    { title: 'Tipo de Consulta', dataIndex: 'tipoConsulta', key: 'tipoConsulta' },
    {
      title: 'Status',
      key: 'status',
      render: (text: string, record: IAgendamento) => (
        <Button
          type="primary"
          className={`botao-status ${
            record.statusConsulta === 'Confirmado'
              ? 'botao-sucesso'
              : record.statusConsulta === 'A Confirmar'
              ? 'botao-aviso'
              : record.statusConsulta === 'Cancelado'
              ? 'botao-erro'
              : ''
          }`}
          onClick={() => showModal(record)} // Abre o modal ao clicar
        >
          {record.statusConsulta}
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSidebar />
      <Layout className="layout-dashboard">
        <Content className="conteudo-dashboard">
          <h2>Todos Agendamentos</h2>
          <Table
            dataSource={agendamentos}
            columns={columns}
            rowKey={(record) => record.id.toString()}
            pagination={false}
          />
        </Content>
      </Layout>

      {/* Modal de confirmação */}
      <Modal
        title="O que você deseja fazer?"
        visible={isModalVisible}
        onCancel={handleCancel} // Fecha o modal sem fazer nada
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="confirm" type="primary" onClick={() => handleStatusChange('Confirmado')}>
            Confirmar Consulta
          </Button>,
          <Button key="cancel" type="primary" danger onClick={() => handleStatusChange('Cancelado')}>
            Cancelar Consulta
          </Button>,
        ]}
      >
        <p>Escolha uma ação para a consulta.</p>
      </Modal>
    </Layout>
  );
};

export default Dashboard;
