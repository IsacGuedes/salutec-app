import React, { FC, useState } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import axios, { AxiosError } from 'axios';

interface EsqueciSenhaProps {
  modalVisible: boolean;
  closeModal: () => void;
}

const EsqueciSenha: FC<EsqueciSenhaProps> = ({ modalVisible, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Para mostrar loading enquanto envia

  const handleOk = () => {
    form.validateFields()
      .then(async (values) => {
        const { matricula, senhaAntiga, novaSenha } = values;
        setLoading(true);

        try {
          const response = await axios.post('http://localhost:8090/api/enfermeiros/trocar-senha', null, {
            params: {
              matricula,
              senhaAtual: senhaAntiga,
              novaSenha
            }
          });

          if (response.status === 200) {
            message.success('Senha alterada com sucesso.');
            closeModal(); // Fecha o modal após sucesso
            form.resetFields(); // Limpa os campos do formulário
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            message.error('Erro ao alterar a senha: ' + (error.response?.data || 'Erro desconhecido.'));
          } else {
            message.error('Erro desconhecido.');
          }
        } finally {
          setLoading(false); // Para o loading, independentemente do resultado
        }
      })
      .catch(info => {
        console.log('Erro na validação:', info);
      });
  };

  return (
    <Modal
      title="Recuperar Senha"
      visible={modalVisible}
      onCancel={closeModal} // Fecha o modal ao clicar em "Cancelar"
      onOk={handleOk} // Envia o formulário ao clicar em "Alterar Senha"
      okText="Alterar Senha"
      cancelText="Cancelar"
      confirmLoading={loading} // Mostra loading enquanto envia os dados
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Número da Matrícula"
          name="matricula"
          rules={[{ required: true, message: 'Por favor, insira o número da matrícula!' }]}
        >
          <Input placeholder="Insira sua matrícula" />
        </Form.Item>

        <Form.Item
          label="Senha Antiga"
          name="senhaAntiga"
          rules={[{ required: true, message: 'Por favor, insira a senha antiga!' }]}
        >
          <Input.Password placeholder="Insira sua senha antiga" />
        </Form.Item>

        <Form.Item
          label="Nova Senha"
          name="novaSenha"
          rules={[{ required: true, message: 'Por favor, insira a nova senha!' }]}
        >
          <Input.Password placeholder="Insira sua nova senha" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EsqueciSenha;
