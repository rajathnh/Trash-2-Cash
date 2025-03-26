import React from 'react';
import styled from 'styled-components';

const Testimonials = () => {
  return (
    <TestimonialsContainer id="testimonials">
      <HorizontalLine />
      <TestimonialsTitle>Testimonials</TestimonialsTitle>
      <TestimonialsContent>
        <TestimonialQuote>
          "Trash2Cash transformed our e-waste management process! The AI classification made it so easy to know what to do with our old electronics."
        </TestimonialQuote>
        <TestimonialAuthor>
          <TestimonialAvatar src="images/ceo.png" alt="John Doe" />
          <TestimonialInfo>
            <TestimonialName>John Doe</TestimonialName>
            <TestimonialRole>CEO, TechCorp</TestimonialRole>
          </TestimonialInfo>
        </TestimonialAuthor>
      </TestimonialsContent>
      <HorizontalLine />
    </TestimonialsContainer>
  );
};

const TestimonialsContainer = styled.section`
  width: 100%;
  padding: 40px 0;
  background-color: #e8ecf1;
  text-align: center;
`;

const HorizontalLine = styled.div`
  height: 3px;
  width: 100%;
  background: linear-gradient(to right, #D6E1F3, #8A95BF, #2DB3E3, #3B7C87);
  margin: 20px 0;
`;

const TestimonialsTitle = styled.h2`
  font-family: 'Inria Serif', serif;
  font-size: 40px;
  font-weight: 700;
  color: #2F666F;
  margin: 30px 0;
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const TestimonialsContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px 40px;
`;

const TestimonialQuote = styled.p`
  font-family: 'Petrona', serif;
  font-size: 24px;
  font-style: italic;
  color: #333;
  line-height: 1.6;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const TestimonialAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #e0e0e0;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const TestimonialInfo = styled.div`
  text-align: left;
`;

const TestimonialName = styled.h4`
  font-family: 'Inria Serif', serif;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TestimonialRole = styled.p`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Testimonials; 