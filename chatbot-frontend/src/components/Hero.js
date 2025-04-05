import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Hero = () => {
  const navigate = useNavigate(); 

  const handleEducation = () => {
    navigate("/education");
  };


  return (
    <HeroContainer id="home">
      <HeroContent>
        <HeroRow>
          <HeroLeft>
            <HeroTitle>
              Transform Your E-Waste into Cash Effortlessly
            </HeroTitle>
          </HeroLeft>
          <HeroRight>
            <HeroDescription>
              Welcome to Trash2Cash, your AI-powered solution for e-waste
              classification. Simply upload an image of your electronic waste
              and let our technology guide you on the best next steps.
            </HeroDescription>
            <ButtonGroup>
              <Button primary={true} onClick={() => navigate('/chatbot')}>
                Upload
              </Button>
              <Button primary={false} onClick={handleEducation}>Learn more</Button>
            </ButtonGroup>
          </HeroRight>
        </HeroRow>
        <HeroImageContainer>
          <HeroImage src="images/hero.jpg" alt="E-waste classification" />
        </HeroImageContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

/* ========== Styled Components ========== */

const HeroContainer = styled.section`
  width: 100%;
  padding: 140px 20px 80px;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const HeroRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const HeroRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 991px) {
    align-items: center;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Inria Serif', serif;
  font-size: 3rem;
  font-weight: 700;
  color: #2f666f;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroDescription = styled.p`
  font-family: 'Petrona', serif;
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.6;
  max-width: 500px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    align-items: center;
  }
`;

const HeroImageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const HeroImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 991px) {
    aspect-ratio: 4 / 3;
  }
`;