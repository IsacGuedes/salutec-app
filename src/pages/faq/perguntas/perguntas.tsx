import React from 'react';
import FAQItem from '..';

interface FAQ {
  question: string;
  answer: string;
}

const FaqQuestions: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "Por que nem todos os dias têm horários disponíveis?",
      answer: "A disponibilidade de horários é determinada pela agenda e presença dos profissionais de saúde na Unidade. Nem todos os dias têm atendimento médico ou odontológico. Além disso, os agendamentos são limitados aos próximos 7 dias para reduzir faltas e garantir oportunidades de agendamento igualitárias para todos."
    },    
    {
      question: "Posso agendar uma consulta de outra forma além do site?",
      answer: "Sim, você pode realizar o agendamento presencialmente na Unidade de Saúde ou entrando em contato por telefone."
    },
    {
      question: "Como posso confirmar minha consulta?",
      answer: "Após realizar o agendamento pelo site, um email de confirmação será enviado para o endereço de email fornecido durante a solicitação."
    }
  ];

  return (
    <div className="faq-container">
  <h2>Perguntas Frequentes</h2>
  {faqs.map((faq, index) => (
    <FAQItem 
      key={index} 
      question={faq.question} 
      answer={faq.answer} 
    />
  ))}
</div>
  );
};

export default FaqQuestions;
