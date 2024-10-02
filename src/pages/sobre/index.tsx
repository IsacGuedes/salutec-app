import React from 'react';
import { Layout, Row, Col, Typography, Card } from 'antd';
import './styles.css';  // Certifique-se de ajustar os estilos aqui conforme necessário

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const SobreNos: React.FC = () => {
  return (
    <Layout>
      <Content className="conteudo-sobre-nos">
        <div className="cabecalho-sobre-nos">
          <Title level={2}>Sobre a Salutec</Title>
          <Paragraph>
            A Salutec nasceu da necessidade de otimizar o processo de agendamento de consultas nas Unidades Básicas de Saúde (UBS) do município de Içara, Santa Catarina. Nosso objetivo é proporcionar mais autonomia e agilidade tanto para a população que utiliza os serviços de saúde quanto para os profissionais que realizam os agendamentos.
          </Paragraph>
        </div>

        <div className="corpo-sobre-nos">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Nossa Missão" bordered={false} className="cartao-missao">
                <Paragraph>
                  Desenvolver soluções tecnológicas que simplifiquem o acesso à saúde pública, garantindo que os usuários das UBS tenham um sistema prático e eficiente para agendar e gerenciar suas consultas médicas e odontológicas.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Nossa Visão" bordered={false} className="cartao-visao">
                <Paragraph>
                  Ser referência em inovação para a gestão de saúde pública, contribuindo para a qualidade do atendimento à população e o aprimoramento da gestão de agendamentos nas Unidades Básicas de Saúde.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="linha-objetivos">
            <Col xs={24}>
              <Card title="Nossos Objetivos" bordered={false}>
                <ul>
                  <li>Facilitar o agendamento de consultas sem a necessidade de ligações ou visitas presenciais.</li>
                  <li>Reduzir a sobrecarga nas UBS e otimizar o fluxo de pacientes.</li>
                  <li>Permitir o cancelamento de consultas com antecedência, disponibilizando vagas para outros pacientes.</li>
                  <li>Proporcionar uma melhor gestão para os profissionais da saúde, com ferramentas para relatórios e monitoramento.</li>
                </ul>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="linha-caracteristicas">
            <Col xs={24} md={12}>
              <Card title="Inovação e Tecnologia" bordered={false}>
                <Paragraph>
                  A Salutec aplica as melhores práticas de engenharia de software, utilizando tecnologias modernas e garantindo conformidade com leis como a LGPD. Nossa equipe se compromete a entregar uma solução segura e fácil de usar.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Sustentabilidade" bordered={false}>
                <Paragraph>
                  Reduzimos a necessidade de deslocamentos físicos e evitamos aglomerações, melhorando a qualidade de vida dos cidadãos e diminuindo os custos operacionais das UBS.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default SobreNos;
