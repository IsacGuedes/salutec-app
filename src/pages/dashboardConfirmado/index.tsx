import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button } from 'antd';
import { Agendamento } from '../../types/agendamento';
import DashboardSidebar from '../../components/sidebar';
import './styles.css';

const { Content } = Layout;

const DashboardConfirmadas: FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const fetchAgendamentosConfirmados = async () => {
      try {
        const response = await fetch('http://localhost:8090/agendar-consulta/listarConsultasConfirmadas');
        const data = await response.json();

        if (Array.isArray(data)) {
          setAgendamentos(data);
        } else {
          console.error('Os dados retornados não são um array', data);
          setAgendamentos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar agendamentos confirmados:', error);
        setAgendamentos([]);
      }
    };

    fetchAgendamentosConfirmados();
  }, []);

  const columns = [
    { title: 'Consulta', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: ['paciente', 'nome'], key: 'nome' },
    { title: 'CPF', dataIndex: ['paciente', 'documento'], key: 'cpf' },
    { title: 'Contato', dataIndex: ['paciente', 'telefone'], key: 'contato' },
    { title: 'Data da Consulta', dataIndex: 'dataConsulta', key: 'dataConsulta' },
    { title: 'Tipo de Consulta', dataIndex: 'tipoConsulta', key: 'tipoConsulta' },
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
          <h2>Agendamentos Confirmados</h2>
          <Table
            dataSource={Array.isArray(agendamentos) ? agendamentos : []}
            columns={columns}
            rowKey={(record) => record.id.toString()}
            pagination={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardConfirmadas;
