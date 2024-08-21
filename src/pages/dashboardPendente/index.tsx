import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button } from 'antd';
import { Agendamento } from '../../types/agendamento';
import DashboardSidebar from '../../components/sidebar';
import './styles.css';

const { Content } = Layout;

const DashboardPendente: FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('/agendar-consulta/listarConsultas');
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  const columns = [
    { title: 'Consulta', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'CPF', dataIndex: 'cpf', key: 'cpf' },
    { title: 'Contato', dataIndex: 'contato', key: 'contato' },
    { title: 'Data da Consulta', dataIndex: 'data', key: 'data' },
    { title: 'Tipo de Consulta', dataIndex: 'tipo', key: 'tipo' },
    {
      title: 'Status',
      key: 'status',
      render: (text: string, record: Agendamento) => (
        <Button
          type="primary"
          className={`botao-status ${
            record.status === 'Confirmado'
              ? 'botao-sucesso'
              : record.status === 'A Confirmar'
              ? 'botao-aviso'
              : record.status === 'Cancelado'
              ? 'botao-erro'
              : ''
          }`}
        >
          {record.status}
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSidebar />
      <Layout className="layout-dashboard">
        <Content className="conteudo-dashboard">
          <h2>Agendamentos Pendentes</h2>
          <Table
            dataSource={agendamentos}
            columns={columns}
            rowKey={(record) => record.id.toString()}
            pagination={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPendente;
