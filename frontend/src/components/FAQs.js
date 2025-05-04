import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'What is e-waste?',
      answer: 'E-waste refers to discarded electronic devices such as computers, phones, and appliances. It poses environmental hazards if not disposed of properly. Trash2Cash helps manage e-waste responsibly.'
    },
    {
      id: 2,
      question: 'How does it work?',
      answer: 'Users can upload images of their e-waste for AI classification. Based on the results, they are directed to appropriate actions—selling, recycling, or safe disposal. This ensures a streamlined process for managing e-waste.'
    },
    {
      id: 3,
      question: 'Is it free?',
      answer: 'Yes, the platform is free for the general public to use. Industries may have additional features available through registration. Our goal is to promote responsible e-waste management.'
    },
    {
      id: 4,
      question: 'What if my item is disposable?',
      answer: 'If your item is classified as disposable, we provide detailed guidelines for safe disposal. This includes local regulations and best practices. Proper disposal is crucial to minimize environmental impact.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FAQContainer id="faqs">
      <FAQTitle>FAQs</FAQTitle>
      <FAQDescription>
        Discover how Trash2Cash simplifies e-waste management for both individuals and industries.
      </FAQDescription>
      <FAQList>
        {faqData.map((faq, index) => (
          <FAQItem key={faq.id} isActive={activeIndex === index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {faq.question}
              <FAQIcon>
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </FAQIcon>
            </FAQQuestion>
            <FAQAnswer isActive={activeIndex === index}>
              {faq.answer}
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQList>
    </FAQContainer>
  );
};

const FAQContainer = styled.div`
  flex: 1;
  min-width: 300px;
  scroll-margin-top: 170px; 
`;

const FAQTitle = styled.h2`
  font-family: 'Inria Serif', serif;
  font-size: 32px;
  font-weight: 700;
  color: #2F666F;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const FAQDescription = styled.p`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FAQItem = styled.div`
  border: 1px solid ${props => props.isActive ? '#2F666F' : '#eee'};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isActive ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const FAQQuestion = styled.div`
  font-family: 'Petrona', serif;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 15px;
  }
`;

const FAQIcon = styled.span`
  color: #2F666F;
  font-size: 16px;
`;

const FAQAnswer = styled.div`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #555;
  padding: ${props => props.isActive ? '15px 20px' : '0 20px'};
  max-height: ${props => props.isActive ? '300px' : '0'};
  opacity: ${props => props.isActive ? '1' : '0'};
  transition: all 0.3s ease;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: ${props => props.isActive ? '12px 15px' : '0 15px'};
  }
`;

export default FAQs; 