import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button, message, Modal, DatePicker, ConfigProvider } from 'antd';
import { Agendamento } from '../../types/agendamento';
import DashboardSidebar from '../../components/sidebar';
import { aplicarMascaraDocumentocns, aplicarMascaraDocumentocpf, formatarTelefone, formatDate } from '../../components/formatos';
import './styles.css';
import { IAgendamento } from '../../components/interface';
import { gerarPDF } from '../../components/gerarPDF';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import ptBR from 'antd/lib/locale/pt_BR'; // Importando o locale do Ant Design
import ReactDOM from 'react-dom';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Content } = Layout;
const { RangePicker } = DatePicker;

const DashboardConfirmado: FC = () => {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IAgendamento | null>(null);
  const [dataInicio, setDataInicio] = useState<Dayjs | null>(null);
  const [dataFim, setDataFim] = useState<Dayjs | null>(null);

  useEffect(() => {
    const fetchAgendamentosCancelados = async () => {
      try {
        const url = `http://localhost:8090/agendar-consulta/listarConsultasConfirmadas`;
        const response = await fetch(url);
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setAgendamentos(data); // Armazena todos os agendamentos inicialmente
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
  
  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setDataInicio(dates[0]);
      setDataFim(dates[1]);
    } else {
      setDataInicio(null);
      setDataFim(null);
    }
  };

  const handleFilterClick = () => {
    if (dataInicio && dataFim) {
      // Filtra os agendamentos
      const agendamentosFiltrados = agendamentos.filter((agendamento) => {
        const dataConsulta = dayjs(agendamento.dataConsulta);
        return (
          dataConsulta.isSameOrAfter(dataInicio, 'day') && 
          dataConsulta.isSameOrBefore(dataFim, 'day')
        );
      });
      setAgendamentos(agendamentosFiltrados);
    } else {
      message.warning('Por favor, selecione um intervalo de datas.');
    }
  };

  const handleTodosClick = async () => {
    try {
      const response = await fetch('http://localhost:8090/agendar-consulta/listarConsultasConfirmadas');
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

  const columns = [
    { title: 'Consulta', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: ['paciente', 'nome'], key: 'nome' },
    { title: 'CPF', dataIndex: ['paciente', 'documentocpf'], key: 'cpf', render: (cpf: string) => aplicarMascaraDocumentocpf(cpf) },
    { title: 'CNS', dataIndex: ['paciente', 'documentocns'], key: 'cns', render: (cns: string) => aplicarMascaraDocumentocns(cns) },
    { title: 'Contato', dataIndex: ['paciente', 'telefone'], key: 'contato', render: (telefone: string) => formatarTelefone(telefone) },
    { title: 'Data da Consulta', dataIndex: 'dataConsulta', key: 'dataConsulta', render: (dataConsulta: string) => formatDate(dataConsulta) },
    { title: 'Tipo de Consulta', dataIndex: ['tipoConsulta', 'descricao'], key: 'tipoConsulta' },
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
    if (pdfUrl) {
      setPdfUrl(null); 
    }
    setIsModalVisible(false); 
    setSelectedRecord(null); 
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSidebar />
      <Layout className="layout-dashboard">
        <Content className="conteudo-dashboard">
          <h2>Agendamentos confirmados</h2>
          <RangePicker
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
            placeholder={['Data Início', 'Data Fim']}
          />
          <Button
            type="primary"
            onClick={handleFilterClick}
            className="botao-filtrar"
          >
            Filtrar
          </Button>
          <Button
            type="primary"
            onClick={handleTodosClick}
            className="botao-filtrar"
          >
            Mostrar todos
          </Button>
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

export default DashboardConfirmado;
