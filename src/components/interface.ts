export interface ITipoConsulta {
  id: number; // ou outro identificador, se necessário
  descricao: string;
}

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
    tipoConsulta: ITipoConsulta;
    statusConsulta: string;
  }
  