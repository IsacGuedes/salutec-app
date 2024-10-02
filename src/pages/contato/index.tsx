import React from 'react';
import { Layout, Form, Input, Button, Row, Col, Typography } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './styles.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contato: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Dados enviados:', values);
    // Aqui você pode adicionar a lógica para enviar os dados ao backend.
  };

  return (
    <Layout>
      <Content className="contact-content">
        <div className="contact-header">
          <Title level={2}>Entre em Contato Conosco</Title>
          <Paragraph>
            Se você tem alguma dúvida, sugestão ou deseja saber mais sobre nossos serviços, fique à vontade para nos contatar. Responderemos o mais breve possível!
          </Paragraph>
        </div>

        <div className="contact-body">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div className="contact-info">
                <Title level={3}>Informações de Contato</Title>
                <p>
                  <PhoneOutlined /> Telefone: (48) 1234-5678
                </p>
                <p>
                  <MailOutlined /> E-mail: salutechealth@gmail.com
                </p>
                <p>
                  <EnvironmentOutlined /> Endereço: Rua da Saúde, 123, Içara - SC
                </p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Form
                name="contact-form"
                layout="vertical"
                onFinish={onFinish}
                className="contact-form"
              >
                <Form.Item
                  name="nome"
                  label="Nome"
                  rules={[{ required: true, message: 'Por favor, insira seu nome' }]}
                >
                  <Input placeholder="Digite seu nome" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    { required: true, message: 'Por favor, insira seu e-mail' },
                    { type: 'email', message: 'Por favor, insira um e-mail válido' },
                  ]}
                >
                  <Input placeholder="Digite seu e-mail" />
                </Form.Item>
                <Form.Item
                  name="mensagem"
                  label="Mensagem"
                  rules={[{ required: true, message: 'Por favor, insira sua mensagem' }]}
                >
                  <TextArea rows={4} placeholder="Digite sua mensagem" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="submit-button">
                    Enviar Mensagem
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Contato;
