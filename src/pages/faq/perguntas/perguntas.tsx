import React from 'react';
import FAQItem from '..';


interface FAQ {
  question: string;
  answer: string;
}

const FaqQuestions: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "Por que não tem horário todos os dias?",
      answer: "Os dias são liberados conforme a agenda/presença dos médicos na Únidade de Saúde."
    },
    {
      question: "Só posso fazer agendamento pelo site?",
      answer: "Não, você também pode realizar o agendamento presencialmente na Unidade ou via telefone."
    },
    {
      question: "Como faço para confirma a consulta",
      answer: "Após o agendamento feito pelo site, será enviado um SMS de confirmação via WhatsApp para o telefone informado no momento do agendamento."
    }
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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
