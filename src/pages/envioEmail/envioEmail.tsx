import React, { FC, useState } from 'react';
import './envioEmail.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const envioEmail: FC = () => {
    return (
        <div className='fundo'>
        <div className="modal-conf">
            <Typography variant="h6">
            Se você forneceu um endereço de e-mail durante a solicitação, receberá um e-mail para confirmar ou cancelar o
            pedido. Caso contrário, aguarde o contato do responsável pelo Posto de Saúde.
            </Typography>
        </div>
        </div>
        )};

export default envioEmail;