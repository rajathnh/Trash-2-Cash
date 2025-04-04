import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();

  const handleJoinForum = () => {
    
      navigate("/forum");
    
  };

  const handleEducation = () => {
    navigate("/education");
  };

  return (
    <ResultsContainer id="results">
      <ResultsHeader>
        <ClassifyText>Discover</ClassifyText>
        <ResultsTitle>E-Waste Insights at Your Fingertips</ResultsTitle>
        <ResultsSubtitle>
          Uncover valuable information on e-waste management and join our thriving community.
        </ResultsSubtitle>
      </ResultsHeader>
      <ResultsContent>
        {/* Community Forum Card */}
        <ResultCard>
          <ResultCardImage src="images/r1.jpg" alt="Community forum" />
          <ResultCardTextWrapper>
            <ResultCardTitle>Community Forum</ResultCardTitle>
            <ResultCardSubtitle>Engage &amp; Collaborate</ResultCardSubtitle>
            <ResultCardText>
              Engage with fellow eco-enthusiasts, share ideas, and discover sustainable practices for managing e-waste.
            </ResultCardText>
            <ResultCardButton onClick={handleJoinForum}>
              Join Forum &gt;
            </ResultCardButton>
          </ResultCardTextWrapper>
        </ResultCard>

        {/* Education Card */}
        <ResultCard>
          <ResultCardImage src="images/result2.jpg" alt="E-Waste Education" />
          <ResultCardTextWrapper>
            <ResultCardTitle>Knowledge Hub</ResultCardTitle>
            <ResultCardSubtitle>Discover &amp; Learn</ResultCardSubtitle>
            <ResultCardText>
              Explore educational resources and insightful articles to become more aware of e-waste challenges and solutions.
            </ResultCardText>
            <ResultCardButton onClick={handleEducation}>
              Learn More &gt;
            </ResultCardButton>
          </ResultCardTextWrapper>
        </ResultCard>
      </ResultsContent>
    </ResultsContainer>
  );
};

export default Results;

/* Styled Components */
const ResultsContainer = styled.section`
  width: 100%;
  max-width: 1210px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const ResultsHeader = styled.div`
  margin-bottom: 50px;
`;

const ClassifyText = styled.span`
  font-size: 18px;
  color: #8A95BF;
  display: block;
  margin-bottom: 10px;
`;

const ResultsTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #2F666F;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ResultsSubtitle = styled.p`
  font-size: 20px;
  color: #555;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ResultsContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ResultCard = styled.div`
  flex: 1;
  max-width: 580px;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    height: auto;
  }
`;

const ResultCardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ResultCardTextWrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 250px);
`;

const ResultCardTitle = styled.h4`
  font-size: 20px;
  color: #75CDED;
  margin-bottom: 10px;
`;

const ResultCardSubtitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
`;

const ResultCardText = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
`;

const ResultCardButton = styled.button`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #2F666F;
  background: transparent;
  border: 2px solid #2F666F;
  border-radius: 8px;
  display: inline-block;
  align-self: center; /* Center the button in its flex container */
  width: auto;
  cursor: pointer;
  font-weight: 600;
  padding: 6px 8px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover,
  &:active {
    background: #2F666F;
    color: #fff;
  }
`;