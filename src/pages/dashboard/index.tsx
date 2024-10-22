import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button, Modal, message } from 'antd';
import { IAgendamento } from '../../components/interface';
import DashboardSidebar from '../../components/sidebar';
import { gerarPDF } from '../../components/gerarPDF';
import './styles.css';
import { aplicarMascaraDocumentocpf, aplicarMascaraDocumentocns, formatarTelefone, formatDate } from '../../components/formatos';

const { Content } = Layout;

const Dashboard: FC = () => {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IAgendamento | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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

  const showPdfModal = () => {
    const pdfBlob = gerarPDF(agendamentos);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
    setIsModalVisible(true);
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'relatorio.pdf';
      link.click();
    }
  };

  const showModal = (record: IAgendamento) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // Verifica se há um PDF aberto e o fecha
    if (pdfUrl) {
      setPdfUrl(null); // Reseta o URL do PDF para garantir que o modal feche
    }
    // Fecha o modal de status também
    setIsModalVisible(false); 
    setSelectedRecord(null); // Reseta a seleção do agendamento
  };
  

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
          agendamento.id === id ? { ...agendamento, statusConsulta: status } : agendamento
        );
        setAgendamentos(updatedAgendamentos);
        setIsModalVisible(false);
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
        render: (text: string, record: IAgendamento) => (
          <Button
            type="primary"
            className={`botao-status ${
              record.statusConsulta === 'CONFIRMADO'
                ? 'botao-sucesso'
                : record.statusConsulta === 'AGUARDANDO_CONFIRMACAO'
                ? 'botao-aviso'
                : record.statusConsulta === 'CANCELADO'
                ? 'botao-erro'
                : ''
            }`}
            onClick={() => record.statusConsulta !== 'CANCELADO' && showModal(record)}
            disabled={record.statusConsulta === 'CANCELADO'}
          >
            {record.statusConsulta}
          </Button>
        ),
      }      
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSidebar />
      <Layout className="layout-dashboard">
        <Content className="conteudo-dashboard">
          <h2>Todos Agendamentos</h2>
          <Button
            type="primary"
            onClick={showPdfModal}
            className="botao-exportar-pdf"
          >
            Exportar para PDF
          </Button>
          <Table
            dataSource={agendamentos}
            columns={columns}
            rowKey={(record) => record.id.toString()}
            pagination={false}
          />
        </Content>
      </Layout>
      <Modal
        title="Atualizar Status da Consulta"
        visible={isModalVisible && !!selectedRecord}
        onCancel={handleCancel}
        footer={[
          <Button key="confirm" type="primary" onClick={() => handleAction(selectedRecord?.id!, 'CONFIRMADO')}>
            Confirmar Consulta
          </Button>,
          <Button key="cancel" danger onClick={() => handleAction(selectedRecord?.id!, 'CANCELADO')}>
            Cancelar Consulta
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Fechar
          </Button>,
        ]}
      >
        <p>Status atual: {selectedRecord?.statusConsulta}</p>
      </Modal>
      <Modal
        title="Visualizar PDF"
        visible={!!pdfUrl}
        onCancel={handleCancel}
        footer={[
          <Button key="download" type="primary" onClick={downloadPdf}>
            Baixar PDF
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Fechar
          </Button>,
          ]}
        >
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="400px"
            title="Visualizar PDF"
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Dashboard;
