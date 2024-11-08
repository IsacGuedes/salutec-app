import React, { FC, useState } from 'react';
import { TextField, Button, Typography, Radio, FormControlLabel, Grid, Tooltip } from '@mui/material';
import { apiPost, STATUS_CODE } from '../../api/RestClient';
import { aplicarMascaraDocumentocns, aplicarMascaraDocumentocpf, formatarTelefone, removerCaracteresNaoNumericos, validarCpf } from '../../components/formatos';
import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import './styles.css';

const Paciente: FC = () => {
  const [nome, setNome] = useState<string>('');
  const [documentocpf, setDocumentocpf] = useState<string>('');
  const [documentocns, setDocumentocns] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedDocType, setSelectedDocType] = useState<string>('cpf'); // Estado para controlar o tipo de documento
  const navigate = useNavigate();

  const salvarPaciente = async () => {
    if (!nome || (!documentocpf && !documentocns) || !telefone || !dataNascimento || !email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
  
    if (selectedDocType === 'cpf' && !validarCpf(documentocpf)) {
      alert("CPF inválido. Por favor, verifique o número informado.");
      return;
    }
  
    const data = {
      nome,
      documentocpf: selectedDocType === 'cpf' ? removerCaracteresNaoNumericos(documentocpf) : null,
      documentocns: selectedDocType === 'cns' ? removerCaracteresNaoNumericos(documentocns) : null,
      telefone: formatarTelefone(removerCaracteresNaoNumericos(telefone), true),
      email,
      dataNascimento,
    };
  
    try {
      const response = await apiPost("http://localhost:8090/pacientes/criarPaciente", data);
      if (response.status === STATUS_CODE.CREATED) {
        const pacienteId = response.data.id;
  
        // Recupera os dados da consulta do sessionStorage
        const consultaData = JSON.parse(sessionStorage.getItem('consultaData') || '{}');
        consultaData.pacienteId = pacienteId;
  
        // Verifica se os dados da consulta estão completos
        if (!consultaData.dataConsulta || !consultaData.tipoConsulta || !consultaData.horario) {
          alert("Dados da consulta estão incompletos.");
          return;
        }
  
        // Faz a requisição para criar a consulta
        const consultaResponse = await apiPost("http://localhost:8090/agendar-consulta/criarConsulta", consultaData);
        if (consultaResponse.status === STATUS_CODE.CREATED) {
          navigate('/confirmacao-consulta');
        } else {
          alert(`Erro ao cadastrar consulta: ${consultaResponse.statusText}`);
        }
      } else {
        alert(`Erro ao cadastrar paciente: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };  
  
  return (
    <div className="paciente">
      <div className="lembrete">
        <Typography variant="h6">
          <InfoCircleOutlined /> Lembre-se de levar um documento de identificação com foto no dia da consulta.
        </Typography>
      </div>
      <div className="div-formulario">
        <div className="div-linha">
          <TextField
            fullWidth
            label="Nome completo"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div className="div-linha">
          <TextField
            fullWidth
            label="Data de Nascimento"
            InputLabelProps={{ shrink: true }}
            type="date"
            value={dataNascimento}
            onChange={(event) => setDataNascimento(event.target.value)}
          />
        </div>
        {/* Colocando os labels de CPF e CNS lado a lado */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <FormControlLabel
              control={<Radio
                checked={selectedDocType === 'cpf'}
                onChange={() => setSelectedDocType('cpf')}
                value="cpf"
              />}
              label="Informar CPF"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Radio
                checked={selectedDocType === 'cns'}
                onChange={() => setSelectedDocType('cns')}
                value="cns"
              />}
              label="Informar CNS"
            />
          </Grid>
        </Grid>

        {/* Colocando os campos de CPF e CNS lado a lado */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CPF"
              value={documentocpf}
              onChange={(event) => setDocumentocpf(aplicarMascaraDocumentocpf(event.target.value))}
              disabled={selectedDocType !== 'cpf'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CNS"
              value={documentocns}
              onChange={(event) => setDocumentocns(aplicarMascaraDocumentocns(event.target.value))}
              disabled={selectedDocType !== 'cns'}
            />
          </Grid>
        </Grid>
        <div className="div-linha"></div>
        <div className="div-linha">
          <TextField
            fullWidth
            label="Telefone/Celular"
            value={telefone}
            onChange={(event) => setTelefone(formatarTelefone(event.target.value))}
          />
        </div>
        <div className="div-linha">
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="Email"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Informe um email válido. É nele em que você receberá a solicitação de confirmação de consulta.">
                <InfoCircleOutlined style={{ fontSize: '15px', cursor: 'pointer' }} />
              </Tooltip>
            </Grid>
          </Grid>
        </div>
        <div className="div-linha full-width">
          <Button variant="contained" onClick={salvarPaciente}>
            Fazer solicitação
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Paciente;