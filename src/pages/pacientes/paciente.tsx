import React, { FC, useState } from 'react';
import { TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { apiPost, STATUS_CODE } from '../../api/RestClient';
import { aplicarMascaraDocumento, formatarTelefone, removerCaracteresNaoNumericos } from '../../components/formatos';
import './paciente.css';
import { useNavigate } from 'react-router-dom';

const Paciente: FC = () => {
    const [nome, setNome] = useState<string>('');
    const [pcd, setPcd] = useState<boolean>(false);
    const [pcdDescricao, setPcdDescricao] = useState<string>('');
    const [cpf, setCPF] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const navigate = useNavigate();

    const salvarPaciente = async () => {
        // Validação dos campos obrigatórios
            const data = {
            nome,
            pcd,
            cpf: removerCaracteresNaoNumericos(cpf),
            telefone: removerCaracteresNaoNumericos(telefone),
            email,
            dataNascimento,
            pcdDescricao,
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

        if (!nome || !cpf || !telefone || !email || !dataNascimento) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Verifica se o campo "Qual tipo de deficiência você possui?" foi preenchido quando o checkbox está marcado
        if (pcd && !pcdDescricao) {
            alert("Por favor, preencha o campo 'Qual tipo de deficiência você possui?'.");
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
                        label="CPF"
                        value={cpf}
                        onChange={(event) => setCPF(aplicarMascaraDocumento(event.target.value))}
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
                <div className="div-linha">
                    <TextField
                        fullWidth
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="div-linha">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={pcd}
                                onChange={(event) => setPcd(event.target.checked)}
                            />
                        }
                        label="Possui Deficiência?"
                    />
                </div>
                <div className="div-linha">
                    <TextField
                        fullWidth
                        label="Qual tipo de deficiência você possui?"
                        type="text"
                        value={pcdDescricao}
                        onChange={(event) => setPcdDescricao(event.target.value)}
                        disabled={!pcd}  // Desabilita o campo se o checkbox estiver desmarcado
                        required={pcd}   // Torna o campo obrigatório se o checkbox estiver marcado
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
