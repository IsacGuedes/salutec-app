import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Paciente {
  nome: string;
}

interface TipoConsulta {
  id: string;
  descricao: string;
}

interface Consulta {
  id: string;
  dataConsulta: string; // Altere para corresponder à resposta da API
  horario: string; // Altere para corresponder à resposta da API
  paciente: Paciente;
  statusConsulta: string; // Altere para corresponder à resposta da API
  tipoConsulta: TipoConsulta;
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

  const handleConfirmar = () => {
    if (consultaId && consulta) {
      axios.post(`http://localhost:8090/agendar-consulta/atualizarStatus`, {
        id: consultaId,
        status: 'CONFIRMADO'
      }).then((response) => {
        consulta.statusConsulta = 'CONFIRMADO';
        navigate('/finalizado', { state: { consulta } });
      }).catch(() => {
        alert('Erro ao confirmar a consulta.');
      });
    }
  };

  const handleCancelar = () => {
    if (consultaId && consulta) {
      axios.post(`http://localhost:8090//agendar-consulta/atualizarStatus`, {
        id: consultaId,
        status: 'CANCELADO'
      }).then((response) => {
        consulta.statusConsulta = 'CANCELADO';
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
    <div className="modal-backdrop">
      <div className="confirmacao-consulta">
        {consulta && consulta.statusConsulta === 'AGUARDANDO_CONFIRMACAO' ? (
          <>
            <h2>Confirmação de Agendamento</h2>
            <p>
            Olá <strong>{consulta.paciente.nome}</strong>, por gentileza, confirme ou cancele o seu
            agendamento no dia <strong>{consulta.dataConsulta}</strong> horário <strong>{consulta.horario}</strong> para a consulta <strong>{consulta.tipoConsulta.descricao === 'MEDICO' ? 'MÉDICA' : consulta.tipoConsulta.descricao === 'DENTISTA' ? 'ODONTOLÓGICA' : consulta.tipoConsulta.descricao.toUpperCase()}</strong>.
          </p>
            <div className="acoes">
              <button onClick={handleConfirmar} className="btn confirmar">Confirmar</button>
              <button onClick={handleCancelar} className="btn cancelar">Cancelar</button>
            </div>
          </>
        ) : (
          <p>
            Seu agendamento já foi <strong>{consulta?.statusConsulta}</strong>. Caso necessário, entre em contato com a Unidade Básica de Saúde pelo telefone (48) 99995-8432.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmacaoPaciente;
