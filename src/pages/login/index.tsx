import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles.css';

const Login: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8090/api/enfermeiros/login', null, {
        params: { matricula, senha },
      });
      
      if (response.status === 200) {
        alert('Login bem-sucedido');
        // Redirecionar ou armazenar o token de autenticação, se necessário
      }
    } catch (error) {
      setError('Matrícula ou senha incorretos.');
    }
  };

  return (
    <div className="container-login">
      <Form
        name="formulario_login"
        className="formulario-login"
        initialValues={{ remember: true }}
        onFinish={handleLogin} // Conecta o handleLogin ao envio do formulário
      >
        <Form.Item
          name="usuario"
          rules={[{ required: true, message: 'Por favor, insira sua matrícula!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
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
            onChange={(e) => setSenha(e.target.value)}
          />
        </Form.Item>
        {error && <div className="error-message">{error}</div>}
        <Form.Item>
          <Form.Item name="lembrar" valuePropName="checked" noStyle>
            <Checkbox>Lembrar-me</Checkbox>
          </Form.Item>
          <a className="esqueceu-senha" href="">
            Esqueceu sua senha?
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="botao-login">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
