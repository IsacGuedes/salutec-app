import React, { useState, useEffect, FC } from 'react';
import { Layout, Table, Button, Modal, message, DatePicker } from 'antd';
import { IAgendamento } from '../../components/interface';
import DashboardSidebar from '../../components/sidebar';
import { gerarPDF } from '../../components/gerarPDF';
import './styles.css';
import { aplicarMascaraDocumentocpf, aplicarMascaraDocumentocns, formatarTelefone, formatDate } from '../../components/formatos';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

const { Content } = Layout;
const { RangePicker } = DatePicker;

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DashboardPendente: FC = () => {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [filteredAgendamentos, setFilteredAgendamentos] = useState<IAgendamento[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IAgendamento | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dataInicio, setDataInicio] = useState<Dayjs | null>(null);
  const [dataFim, setDataFim] = useState<Dayjs | null>(null);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('http://localhost:8090/agendar-consulta/listarConsultasAguardando');
        const data = await response.json();
        setAgendamentos(data);
        setFilteredAgendamentos(data); // Inicialmente, os agendamentos filtrados são todos
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  const showPdfModal = () => {
    const pdfBlob = gerarPDF(filteredAgendamentos);
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
        setFilteredAgendamentos(updatedAgendamentos); // Atualiza também os agendamentos filtrados
        setIsModalVisible(false);
      } else {
        message.error('Erro ao atualizar status!');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

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
      const agendamentosFiltrados = agendamentos.filter((agendamento) => {
        const dataConsulta = dayjs(agendamento.dataConsulta);
        return (
          dataConsulta.isSameOrAfter(dataInicio, 'day') && 
          dataConsulta.isSameOrBefore(dataFim, 'day')
        );
      });
      setFilteredAgendamentos(agendamentosFiltrados);
    } else {
      message.warning('Por favor, selecione um intervalo de datas.');
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

  const handleTodosClick = async () => {
    try {
      const response = await fetch('http://localhost:8090/agendar-consulta/listarConsultasAguardando');
      const data = await response.json();
  
      console.log("Dados recebidos da API:", data);
  
      if (Array.isArray(data)) {
        setAgendamentos(data);
        setFilteredAgendamentos(data); // Atualiza os agendamentos filtrados para exibir todos
      } else {
        console.error('Os dados retornados não são um array', data);
        setAgendamentos([]);
        setFilteredAgendamentos([]); // Também limpa os agendamentos filtrados
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      setAgendamentos([]);
      setFilteredAgendamentos([]); // Limpa os agendamentos filtrados em caso de erro
    }
  };  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSidebar />
      <Layout className="layout-dashboard">
        <Content className="conteudo-dashboard">
          <h2>Agendamentos pendentes de confirmação</h2>
          <RangePicker
            onChange={handleDateRangeChange}
            style={{ marginBottom: 16 }}
          />
          <Button type="primary" onClick={handleFilterClick} style={{ marginBottom: 16 }}>
            Filtrar
          </Button>
          <Button type="primary" onClick={handleTodosClick} className="botao-filtrar">
            Mostrar todos
          </Button>
          <Button type="primary" onClick={showPdfModal} className="botao-exportar-pdf" style={{ marginLeft: 8 }}>
            Exportar para PDF
          </Button>
          <Table
            dataSource={filteredAgendamentos}
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

export default DashboardPendente;
