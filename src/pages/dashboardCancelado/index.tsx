import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button, message } from 'antd';
import { Agendamento } from '../../types/agendamento';
import DashboardSidebar from '../../components/sidebar';
import { aplicarMascaraDocumentocns, aplicarMascaraDocumentocpf, formatarTelefone, formatDate } from '../../components/formatos'; // Usando as máscaras
import './styles.css';

const { Content } = Layout;

const DashboardCancelado: FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const fetchAgendamentosCancelados = async () => {
      try {
        const response = await fetch('http://localhost:8090/agendar-consulta/listarConsultasCanceladas');
        const data = await response.json();

        console.log("Dados recebidos da API:", data);

        if (Array.isArray(data)) {
          setAgendamentos(data);
        } else {
          console.error('Os dados retornados não são um array', data);
          setAgendamentos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar agendamentos cancelados:', error);
        setAgendamentos([]);
      }
    };

    fetchAgendamentosCancelados();
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
          Number(agendamento.id) === id ? { ...agendamento, status: status } : agendamento // Comparando ambos como números
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
    { title: 'CPF', dataIndex: ['paciente', 'documentocpf'], key: 'cpf', render: (cpf: string) => aplicarMascaraDocumentocpf(cpf) },
    { title: 'CNS', dataIndex: ['paciente', 'documentocns'], key: 'cns', render: (cns: string) => aplicarMascaraDocumentocns(cns) },
    { title: 'Contato', dataIndex: ['paciente', 'telefone'], key: 'contato', render: (telefone: string) => formatarTelefone(telefone) },
    { title: 'Data da Consulta', dataIndex: 'dataConsulta', key: 'dataConsulta', render: (dataConsulta: string) => formatDate(dataConsulta) },
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
              : record.status === 'Aguardando Confirmação'
              ? 'botao-aviso'
              : record.status === 'CANCELADO'
              ? 'botao-erro'
              : ''
          }`}
          onClick={() => handleAction(Number(record.id), record.status === 'CANCELADO' ? 'CONFIRMADO' : 'CANCELADO')} // Garantir que `record.id` é tratado como número
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
          <h2>Agendamentos Cancelados</h2>
          <Table
            dataSource={Array.isArray(agendamentos) ? agendamentos : []}
            columns={columns}
            rowKey={(record) => record.id.toString()} // Convertendo `id` para string para usar como `rowKey`
            pagination={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardCancelado;
