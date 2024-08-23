// src/components/DisponibilidadeForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; 
import { apiPost, STATUS_CODE } from '../../api/RestClient';

type Disponibilidade = {
  diasDaSemana: string[];
  horariosDisponiveis: string[];
};

const diasDaSemana = [
  'DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'
];

const DisponibilidadeForm: React.FC = () => {
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [horarios, setHorarios] = useState<string[]>(['']);

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
    const disponibilidade: Disponibilidade = {
      diasDaSemana: diasSelecionados,
      horariosDisponiveis: horarios.filter(h => h !== '')
    };

    localStorage.setItem('disponibilidade', JSON.stringify(disponibilidade));
    
  //   try {
  //     await axios.post('http://localhost:8080/api/disponibilidade', disponibilidade);
  //     alert('Disponibilidade salva com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao salvar disponibilidade', error);
  //     alert('Erro ao salvar disponibilidade');
  //   }
  // };

  try {
    const disponibilidadeResponse = await apiPost('/personaliza/criaDisponibilidade', disponibilidade);
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
      <h1>Personalizar agenda médica</h1>
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
