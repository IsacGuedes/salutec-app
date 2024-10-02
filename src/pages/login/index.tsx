import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import EsqueciSenha from '../../components/modalNovaSenha';

const Login: React.FC = () => {
  const [matricula, setMatricula] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { matricula: string; senha: string }) => {
    const { matricula, senha } = values;
    
    try {
      const response = await axios.post('http://localhost:8090/api/enfermeiros/login', {
        matricula,
        senha,
      });
      
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        alert('Login bem-sucedido');
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Matrícula ou senha incorretos.');
    }
  };

  const openEsqueciSenhaModal = () => {
    setModalVisible(true);
    message.info({
      content: "Se você não lembra da sua senha atual, por favor, entre em contato com o administrador.",
      duration: 5,
      className: 'esqueci-senha-message', // Aplicando a classe CSS
    });
  };

  const closeEsqueciSenhaModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="container-login">
      <Form
        name="formulario_login"
        className="formulario-login"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="matricula"
          rules={[{ required: true, message: 'Por favor, insira sua matrícula!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Matrícula"
            value={matricula}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMatricula(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="senha"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
          />
        </Form.Item>
        {error && <div className="error-message">{error}</div>}
        <Form.Item>
          <a className="esqueceu-senha" href="#" onClick={openEsqueciSenhaModal}>
            Esqueceu sua senha?
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="botao-login">
            Entrar
          </Button>
        </Form.Item>
      </Form>
      <EsqueciSenha modalVisible={modalVisible} closeModal={closeEsqueciSenhaModal} />
    </div>
  );
};

export default Login;
