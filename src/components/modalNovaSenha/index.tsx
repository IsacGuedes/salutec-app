import React, { FC } from 'react';
import { Modal, Input, Form, Button } from 'antd';

interface EsqueciSenhaProps {
  modalVisible: boolean;
  closeModal: () => void;
}

const EsqueciSenha: FC<EsqueciSenhaProps> = ({ modalVisible, closeModal }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        console.log("Valores enviados:", values);
        closeModal();
        form.resetFields();
        //chamar backend aqui
      })
      .catch(info => {
        console.log('Erro na validação:', info);
      });
  };

  return (
    <Modal
      title="Recuperar Senha"
      visible={modalVisible}
      onCancel={closeModal}
      onOk={handleOk}
      okText="Alterar Senha"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Matrícula"
          name="matricula"
          rules={[{ required: true, message: 'Por favor, insira a sua matrícula!' }]}
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
}

export default EsqueciSenha;
