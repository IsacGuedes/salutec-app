export interface IPaciente {
    nome: string;
    documento: string;
    telefone: string;
  }
  
  export interface IAgendamento {
    id: number;
    dataConsulta: string;  
    horario: string;
    paciente: IPaciente;
    tipoConsulta: string;
    statusConsulta: string;
  }
  