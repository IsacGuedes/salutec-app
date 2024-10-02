import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IAgendamento } from '../components/interface';
import { aplicarMascaraDocumentocpf, aplicarMascaraDocumentocns, formatarTelefone, formatDate } from '../components/formatos';

export const gerarPDF = (agendamentos: IAgendamento[]): Blob => {
  const doc = new jsPDF();

  doc.text('Relatório de Agendamentos', 14, 20);

  const tableColumn = ['ID', 'Nome', 'CPF', 'CNS', 'Contato', 'Data da Consulta', 'Tipo de Consulta', 'Status'];
  const tableRows: any[] = [];

  agendamentos.forEach(agendamento => {
    const agendamentoData = [
      agendamento.id,
      agendamento.paciente.nome,
      aplicarMascaraDocumentocpf(agendamento.paciente.documento),
      aplicarMascaraDocumentocns(agendamento.paciente.documento),
      formatarTelefone(agendamento.paciente.telefone),
      formatDate(agendamento.dataConsulta),
      agendamento.tipoConsulta,
      agendamento.statusConsulta,
    ];
    tableRows.push(agendamentoData);
  });

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  const pdfBlob = doc.output('blob');
  return pdfBlob;
};
