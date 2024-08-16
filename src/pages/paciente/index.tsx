import React, { FC, useState } from 'react';
import { TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { apiPost, STATUS_CODE } from '../../api/RestClient';
import { aplicarMascaraDocumento, formatarTelefone, removerCaracteresNaoNumericos } from '../../components/formatos';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Paciente: FC = () => {
    const [nome, setNome] = useState<string>('');
    const [documento, setDocumento] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const navigate = useNavigate();

    const salvarPaciente = async () => {
            const data = {
            nome,
            documento: removerCaracteresNaoNumericos(documento),
            telefone: removerCaracteresNaoNumericos(telefone),
            dataNascimento,
            };

        try {
            const response = await apiPost("/pacientes/criarPaciente", data);
            if (response.status === STATUS_CODE.CREATED) {
                alert("Concluído com sucesso!");
                navigate('/');
            } else {
                alert(`Erro ao cadastrar paciente: ${response.statusText}`);
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }

        console.log(">>>>", data);

        if (!nome || !documento || !telefone || !dataNascimento) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
    };

    return (
        <div className="paciente">
            <div className="lembrete">
                <Typography variant="h6">
                    Lembre-se de levar consigo um documento de identificação com foto no dia da consulta.
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
                        InputLabelProps={{
                            shrink: true, 
                        }}
                        type="date"
                        value={dataNascimento}
                        placeholder="dd/mm/aaaa"
                        onChange={(event) => setDataNascimento(event.target.value)}
                    />
                </div>
                <div className="div-linha">
                    <TextField
                        fullWidth
                        label="CPF/CNS"
                        value={documento}
                        onChange={(event) => setDocumento(aplicarMascaraDocumento(event.target.value))}
                    />
                </div>
                <div className="div-linha">
                    <TextField
                        fullWidth
                        label="Telefone/Celular"
                        value={telefone}
                        onChange={(event) => setTelefone(formatarTelefone(event.target.value))}
                    />
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
