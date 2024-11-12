import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useSearchParams } from 'react-router-dom';

interface Paciente {
  nome: string;
}

interface Consulta {
  id: string;
  data: string;
  hora: string;
  paciente: Paciente;
}

type TipoConsulta = "Medico" | "Dentista";

const ConfirmacaoPaciente: React.FC = () => {
  const [tipoConsulta, setTipoConsulta] = useState<TipoConsulta | "">("");
  const [searchParams] = useSearchParams();
  const consultaId = searchParams.get('consultaId');
  
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // Buscar detalhes da consulta
    axios.get(`http://localhost:8090/agendar-consulta/listarConsultas/${consultaId}`)
      .then((response) => {
        setConsulta(response.data);
        setCarregando(false);
      })
      .catch((err) => {
        setErro('Erro ao carregar os dados da consulta.');
        setCarregando(false);
      });
  }, [consultaId]);

  const handleConfirmar = () => {
    axios.post(`/api/consultas/${consultaId}/confirmar`)
      .then(() => alert('Consulta confirmada com sucesso!'))
      .catch(() => alert('Erro ao confirmar a consulta.'));
  };

  const handleCancelar = () => {
    axios.post(`/api/consultas/${consultaId}/cancelar`)
      .then(() => alert('Consulta cancelada com sucesso!'))
      .catch(() => alert('Erro ao cancelar a consulta.'));
  };

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div className="erro">{erro}</div>;
  }

  return (
    <div className="confirmacao-consulta">
      {consulta && (
        <>
          <h2>Confirmação de Agendamento</h2>
          <p>
            Olá <strong>{consulta.paciente.nome}</strong>, por gentileza, confirme ou cancele o seu
            agendamento no dia <strong>{consulta.data}</strong> horário <strong>{consulta.hora}</strong> para a consulta.
          </p>

          <div className="acoes">
            <button onClick={handleConfirmar} className="btn confirmar">Confirmar</button>
            <button onClick={handleCancelar} className="btn cancelar">Cancelar</button>
          </div>
        </>
      )}
    </div>
  );  
};

export default ConfirmacaoPaciente;
