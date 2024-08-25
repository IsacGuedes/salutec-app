import React, { useState } from 'react';
import './ssss.css';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='faq-principal'>
      <div className= 'faq-question' onClick={toggleAnswer}>
        {question}
      </div>
      {isOpen && (
        <div className='faq-answer' >
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
