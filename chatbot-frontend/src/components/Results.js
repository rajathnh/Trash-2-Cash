import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();

  const handleJoinForum = () => {
    const username = prompt("Please enter your username:");
    if (username) {
      navigate("/forum");
    }
  };

  return (
    <ResultsContainer id="results">
      <ResultsHeader>
        <ClassifyText>Classify</ClassifyText>
        <ResultsTitle>E-Waste Classification Made Easy</ResultsTitle>
        <ResultsSubtitle>
          Discover the fate of your e-waste effortlessly.
        </ResultsSubtitle>
      </ResultsHeader>
      <ResultsContent>
        {/* Forum Card */}
        <ResultCard>
          <ResultCardImage src="images/r1.jpg" alt="Community forum" />
          <ResultCardTextWrapper>
            <ResultCardTitle>Join the Community</ResultCardTitle>
            <ResultCardSubtitle>Connect &amp; Collaborate</ResultCardSubtitle>
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
            <ResultCardTitle>E-Waste Education</ResultCardTitle>
            <ResultCardSubtitle>Learn &amp; Grow</ResultCardSubtitle>
            <ResultCardText>
              Explore educational resources and insightful articles to become more aware of e-waste challenges and solutions.
            </ResultCardText>
            <ResultCardLink to="/education">Learn More &gt;</ResultCardLink>
          </ResultCardTextWrapper>
        </ResultCard>
      </ResultsContent>
    </ResultsContainer>
  );
};

export default Results;

/* Styled Components */
const ResultsContainer = styled.section`
  width: 1210px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: center;
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
`;

const ResultsSubtitle = styled.p`
  font-size: 20px;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
`;

const ResultsContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;

const ResultCard = styled.div`
  flex: 1;
  max-width: 580px;
  height: 450px; /* Decreased height from 500px to 450px */
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
  height: calc(100% - 250px); /* Adjusts height based on the image height */
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

const ResultCardLink = styled(Link)`
  font-size: 16px;
  color: #2F666F;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ResultCardButton = styled.button`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #2F666F;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
    background: none; /* Ensures no background color on hover */
  }
`;
