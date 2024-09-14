import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button, Modal, message } from 'antd';
import { IAgendamento } from '../../components/interface';
import DashboardSidebar from '../../components/sidebar';
import { gerarPDF } from '../../components/gerarPDF';
import './styles.css';
import { aplicarMascaraDocumento, formatarTelefone, formatDate } from '../../components/formatos';

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
    setIsModalVisible(false);
    setPdfUrl(null);
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
              : record.statusConsulta === 'AGUARDANDO_CONFIRMACAO'
              ? 'botao-aviso'
              : record.statusConsulta === 'Cancelado'
              ? 'botao-erro'
              : ''
          }`}
          onClick={() => showModal(record)}
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
        title="Visualizar PDF"
        visible={isModalVisible}
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
