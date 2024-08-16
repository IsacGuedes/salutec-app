import React, { useState, useEffect, FC } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from '../../components/sidebar';
import { Agendamento } from '../../types/agendamento';
import './styles.css';


const Dashboard: FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('URL_DA_SUA_API/aqui');
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Container className="container-dashboard">
        <h2>Todos Agendamentos</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Consulta</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Data da Consulta</TableCell>
                <TableCell>Tipo de Consulta</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agendamentos.map((agendamento) => (
                <TableRow key={agendamento.id}>
                  <TableCell>{agendamento.id}</TableCell>
                  <TableCell>{agendamento.nome}</TableCell>
                  <TableCell>{agendamento.cpf}</TableCell>
                  <TableCell>{agendamento.contato}</TableCell>
                  <TableCell>{agendamento.data}</TableCell>
                  <TableCell>{agendamento.tipo}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color={
                        agendamento.status === 'Confirmado' ? 'success' :
                        agendamento.status === 'A Confirmar' ? 'warning' :
                        agendamento.status === 'Cancelado' ? 'error' :
                        'primary'
                      }
                    >
                      {agendamento.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Dashboard;
