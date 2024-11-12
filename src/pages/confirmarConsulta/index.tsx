import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useSearchParams } from 'react-router-dom';

interface Paciente {
  nome: string;
  dataNascimento: string;
  telefone: string;
}

interface Consulta {
  id: string;
  data: string;
  hora: string;
  tipoConsulta: string;
  paciente: Paciente;
}

const ConfirmacaoPaciente: React.FC = () => {
  const [searchParams] = useSearchParams();
  const consultaId = searchParams.get('consultaId');
  
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  

  useEffect(() => {
    // Buscar detalhes da consulta
    axios.get<Consulta>(`/api/consultas/${consultaId}`)
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

  console.log(consultaId)

  return (
    <div className="consulta-detalhes">
      {consulta && (
        <>
          <h2>Detalhes da Consulta</h2>
          <div className="consulta-info">
            <p><strong>Paciente:</strong> {consulta.paciente.nome}</p>
            <p><strong>Data de Nascimento:</strong> {consulta.paciente.dataNascimento}</p>
            <p><strong>Telefone:</strong> {consulta.paciente.telefone}</p>
            <p><strong>Data da Consulta:</strong> {consulta.data}</p>
            <p><strong>Hora:</strong> {consulta.hora}</p>
            <p><strong>Tipo de Consulta:</strong> {consulta.tipoConsulta}</p>
          </div>
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
