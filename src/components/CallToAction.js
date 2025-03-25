import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <CTAContainer id='callToAction'>
      <CTAContent>
        <CTALeft>
          <CTATitle>Transform Your E-Waste Today</CTATitle>
          <CTADescription>
            Easily classify your e-waste with our AI tool.
          </CTADescription>
          <CTAButton primary={true} onClick={() => navigate('/chatbot')}>
            Upload
          </CTAButton>
        </CTALeft>
        <CTARight>
          <CTATitle>Monitor and Classify Your E-Waste</CTATitle>
          <CTADescription>
            A one way solution for hassle free monitoring and classifying industrial E-Waste
          </CTADescription>
          <CTAButtonGroup>
            <CTAButton primary={false}>Register as Industry</CTAButton>
            <CTAButton primary={true}>Log in</CTAButton>
          </CTAButtonGroup>
        </CTARight>
      </CTAContent>
    </CTAContainer>
  );
};

export default CallToAction;

const CTAContainer = styled.section`
  /* Constrain the width, set fixed height and center the container */
  max-width: 1210px;
  height: 320px;
  margin: 40px auto;
  padding: 40px 20px;
  background: linear-gradient(to right, rgb(110, 77, 45), #4F7D8C, #B39468, #DFC394, #DEDDC9);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const CTAContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* vertically centers the content */
  height: 100%;
  
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 50px;
    text-align: center;
  }
`;

const CTALeft = styled.div`
  flex: 1;
  padding-right: 30px;
  
  @media (max-width: 991px) {
    padding-right: 0;
  }
`;

const CTARight = styled.div`
  flex: 1;
  padding-left: 30px;
  
  @media (max-width: 991px) {
    padding-left: 0;
  }
`;

const CTATitle = styled.h2`
  font-family: 'Inria Serif', serif;
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CTADescription = styled.p`
  font-family: 'Petrona', serif;
  font-size: 18px;
  margin-bottom: 25px;
  color: #000;
  max-width: 80%;
  
  @media (max-width: 991px) {
    max-width: 100%;
    margin: 0 auto 25px;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CTAButton = styled(Button)`
  font-size: 16px;
  padding: 10px 24px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 20px;
  }
`;

const CTAButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 991px) {
    justify-content: center;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
  }
`;
