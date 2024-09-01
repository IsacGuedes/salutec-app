import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { apiPost, STATUS_CODE } from '../../api/RestClient';

type Disponibilidade = {
  diasDaSemana: string[];
  horariosDisponiveis: string[];
};

const diasDaSemana = [
  'DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'
];

interface DisponibilidadeFormProps {
  tipo: 'Medico' | 'Dentista';
  onDisponibilidadeChange: (disponibilidade: Disponibilidade) => void; // Adicione esta prop
}

const DisponibilidadeForm: React.FC<DisponibilidadeFormProps> = ({ tipo, onDisponibilidadeChange }) => {
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [horarios, setHorarios] = useState<string[]>(['']);

  useEffect(() => {
    const disponibilidadeSalva = localStorage.getItem(`disponibilidade-${tipo}`);
    if (disponibilidadeSalva) {
      const disponibilidade: Disponibilidade = JSON.parse(disponibilidadeSalva);
      setDiasSelecionados(disponibilidade.diasDaSemana);
      setHorarios(disponibilidade.horariosDisponiveis);
    }
  }, [tipo]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (diasSelecionados.length === 0 || horarios.filter(h => h !== '').length === 0) {
      alert('Por favor, selecione pelo menos um dia da semana e preencha os horários.');
      return;
    }

    const disponibilidade: Disponibilidade = {
      diasDaSemana: diasSelecionados,
      horariosDisponiveis: horarios.filter(h => h !== '')
    };

    localStorage.setItem(`disponibilidade-${tipo}`, JSON.stringify(disponibilidade)); 
    onDisponibilidadeChange(disponibilidade); // Atualizar o calendário

    try {
      const disponibilidadeResponse = await apiPost(`/personaliza/criaDisponibilidade/${tipo}`, disponibilidade);
      if (disponibilidadeResponse.status === STATUS_CODE.CREATED) {
        alert('Disponibilidade salva com sucesso!');
      } 
    } catch (error) {
      console.error('Erro ao salvar disponibilidade', error);
      alert('Erro ao salvar disponibilidade');
    }
  };
  return (
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
            />
            <button type="button" onClick={() => removeHorario(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="add-horario" onClick={addHorario}>Adicionar Horário</button>
      </div>
      <button type="submit" className="submit-button">Salvar Disponibilidade</button>
    </form>
  );
};

export default DisponibilidadeForm;
