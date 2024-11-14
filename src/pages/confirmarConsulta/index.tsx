import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Paciente {
  nome: string;
}

interface Consulta {
  id: string;
  data: string;
  hora: string;
  paciente: Paciente;
  status: string; // Adicione esta linha para incluir o status
}

const ConfirmacaoPaciente: React.FC = () => {
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const consultaId = searchParams.get('consultaId');
  const navigate = useNavigate();

  useEffect(() => {
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

  // Funções precisam estar definidas dentro do componente
  const handleConfirmar = () => {
    if (consultaId && consulta) { // Verifique se consulta não é null
      axios.post(`http://localhost:8090/agendar-consulta/atualizarStatus`, {
        id: consultaId,
        status: 'CONFIRMADO'
      }).then((response) => {
        // Atualiza o status da consulta antes de passar para a página finalizada
        consulta.status = 'CONFIRMADO'; // Agora podemos acessar com segurança
        navigate('/finalizado', { state: { consulta } });
      }).catch(() => {
        alert('Erro ao confirmar a consulta.');
      });
    }
  };
  
  const handleCancelar = () => {
    if (consultaId && consulta) { // Verifique se consulta não é null
      axios.post(`http://localhost:8090/agendar-consulta/atualizarStatus`, {
        id: consultaId,
        status: 'CANCELADO'
      }).then((response) => {
        // Atualiza o status da consulta antes de passar para a página finalizada
        consulta.status = 'CANCELADO'; // Agora podemos acessar com segurança
        navigate('/finalizado', { state: { consulta } });
      }).catch(() => {
        alert('Erro ao cancelar a consulta.');
      });
    }
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
