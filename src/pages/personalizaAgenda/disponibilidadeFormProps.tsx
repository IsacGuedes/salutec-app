import React, { useState, useEffect } from 'react';
import './styles.css';
import { apiPost, STATUS_CODE, urlBackend } from '../../api/RestClient';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type Disponibilidade = {
  diasDaSemana: string[];
  horariosDisponiveis: string[];
};

const diasDaSemana = [
  'DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'
];

interface DisponibilidadeFormProps {
  tipoConsultaId: number;
  onDisponibilidadeChange: (disponibilidade: Disponibilidade) => void;
}

const DisponibilidadeForm: React.FC<DisponibilidadeFormProps> = ({ tipoConsultaId, onDisponibilidadeChange }) => {
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [horarios, setHorarios] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const disponibilidadeSalva = localStorage.getItem(`disponibilidade-${tipoConsultaId}`);
    if (disponibilidadeSalva) {
      const disponibilidade: Disponibilidade = JSON.parse(disponibilidadeSalva);
      setDiasSelecionados(disponibilidade.diasDaSemana);
      setHorarios(disponibilidade.horariosDisponiveis);
    }
  }, [tipoConsultaId]);

  const toggleDia = (dia: string) => {
    setDiasSelecionados(prevState =>
      prevState.includes(dia)
        ? prevState.filter(d => d !== dia)
        : [...prevState, dia]
    );
  };

  const handleHorarioChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newHorarios = [...horarios];
    newHorarios[index] = e.target.value;
    setHorarios(newHorarios);
  };

  const addHorario = () => {
    setHorarios([...horarios, '']);
  };

  const removeHorario = (index: number) => {
    setHorarios(horarios.filter((_, i) => i !== index));
  };

  const showAlert = (message: string, severity: AlertColor) => {
    setAlert({ open: true, message, severity });
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (diasSelecionados.length === 0 || horarios.filter(h => h !== '').length === 0) {
      showAlert('Por favor, selecione pelo menos um dia da semana e preencha os horários.', 'warning');
      return;
    }

    const disponibilidade: Disponibilidade = {
      diasDaSemana: diasSelecionados,
      horariosDisponiveis: horarios.filter(h => h !== '')
    };

    localStorage.setItem(`disponibilidade-${tipoConsultaId}`, JSON.stringify(disponibilidade));
    onDisponibilidadeChange(disponibilidade);
    setLoading(true);

    try {
      const disponibilidadeResponse = await apiPost(urlBackend + `/personaliza/criaDisponibilidade/${tipoConsultaId}`, disponibilidade);
      if (disponibilidadeResponse.status === STATUS_CODE.CREATED) {
        showAlert('Disponibilidade salva com sucesso!', 'success');
      }
    } catch (error) {
      console.error('Erro ao salvar disponibilidade', error);
      showAlert('Erro ao salvar disponibilidade: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Dias da Semana:</label>
          <div className="dias-buttons">
            {diasDaSemana.map(dia => (
              <button
                type="button"
                key={dia}
                onClick={() => toggleDia(dia)}
                className={diasSelecionados.includes(dia) ? 'selected' : ''}
                aria-pressed={diasSelecionados.includes(dia)}
              >
                {dia.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
        <div className="horarios-container">
          <label>Horários Disponíveis:</label>
          {horarios.map((horario, index) => (
            <div key={index}>
              <input
                type="time"
                value={horario}
                onChange={(e) => handleHorarioChange(index, e)}
                required
              />
              <button type="button" onClick={() => removeHorario(index)}>Remover</button>
            </div>
          ))}
          <button type="button" className="add-horario" onClick={addHorario}>Adicionar Horário</button>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Disponibilidade'}
        </button>
      </form>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DisponibilidadeForm;
