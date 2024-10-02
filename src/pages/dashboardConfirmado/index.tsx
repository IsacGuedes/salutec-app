import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button, message } from 'antd';
import { Agendamento } from '../../types/agendamento';
import DashboardSidebar from '../../components/sidebar';
import { aplicarMascaraDocumentocpf, formatarTelefone, formatDate } from '../../components/formatos'; // Importando máscaras e formatações
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

  const handleAction = async (id: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:8090/agendar-consulta/atualizarStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        message.success('Status atualizado com sucesso!');
        const updatedAgendamentos = agendamentos.map((agendamento) =>
          Number(agendamento.id) === id ? { ...agendamento, status: status } : agendamento // Garantindo que id seja comparado como número
        );
        setAgendamentos(updatedAgendamentos);
      } else {
        message.error('Erro ao atualizar status!');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const columns = [
    { title: 'Consulta', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: ['paciente', 'nome'], key: 'nome' },
    { title: 'CPF', dataIndex: ['paciente', 'documento'], key: 'cpf', render: (cpf: string) => aplicarMascaraDocumentocpf(cpf) }, // Aplicando máscara CPF
    { title: 'Contato', dataIndex: ['paciente', 'telefone'], key: 'contato', render: (telefone: string) => formatarTelefone(telefone) }, // Formatação telefone
    { title: 'Data da Consulta', dataIndex: 'dataConsulta', key: 'dataConsulta', render: (dataConsulta: string) => formatDate(dataConsulta) }, // Formatação data
    { title: 'Tipo de Consulta', dataIndex: 'tipoConsulta', key: 'tipoConsulta' },
    {
      title: 'Status',
      key: 'status',
      render: (text: string, record: Agendamento) => (
        <Button
          type="primary"
          className={`botao-status ${
            record.status === 'CONFIRMADO'
              ? 'botao-sucesso'
              : record.status === 'A CONFIRMAR'
              ? 'botao-aviso'
              : record.status === 'CANCELADO'
              ? 'botao-erro'
              : ''
          }`}
          onClick={() => handleAction(Number(record.id), record.status === 'CANCELADO' ? 'CONFIRMADO' : 'CANCELADO')} // Garantindo que o ID seja tratado como número
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
            rowKey={(record) => record.id.toString()} // Garantindo que o ID seja uma string para o rowKey
            pagination={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardConfirmadas;
