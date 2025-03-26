import React from 'react';
import styled from 'styled-components';

const Results = () => {
  return (
    <ResultsContainer id="results">
      <ResultsHeader>
        <ClassifyText>Classify</ClassifyText>
        <ResultsTitle>E-Waste Classification Made Easy</ResultsTitle>
        <ResultsSubtitle>Discover the fate of your e-waste effortlessly.</ResultsSubtitle>
      </ResultsHeader>
      <ResultsContent>
        <ResultCard>
          <ResultCardTitle>Results</ResultCardTitle>
          <ResultCardSubtitle>What Can You Do?</ResultCardSubtitle>
          <ResultCardText>Choose the best option for your e-waste.</ResultCardText>
          <ResultCardLink href="#">Learn More &gt;</ResultCardLink>
          <ResultCardImage src="https://via.placeholder.com/300x400" alt="Person with e-waste" />
        </ResultCard>
        
        <ResultCard>
          <ResultCardTitle>Options</ResultCardTitle>
          <ResultCardSubtitle>Classification Outcomes</ResultCardSubtitle>
          <ResultCardText>Find out if it's sellable, recyclable, or disposable.</ResultCardText>
          <ResultCardLink href="#">Explore &gt;</ResultCardLink>
          <ResultCardImage src="https://via.placeholder.com/300x220" alt="E-waste components" />
        </ResultCard>
        
        <ResultCard>
          <ResultCardTitle>Guidelines</ResultCardTitle>
          <ResultCardSubtitle>Safe Disposal</ResultCardSubtitle>
          <ResultCardText>Follow our steps for proper disposal.</ResultCardText>
          <ResultCardLink href="#">Get Started &gt;</ResultCardLink>
          <ResultCardImage src="https://via.placeholder.com/300x220" alt="Safe disposal" />
        </ResultCard>
      </ResultsContent>
    </ResultsContainer>
  );
};

const ResultsContainer = styled.section`
  width: 100%;
  padding: 80px 0;
`;

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const ClassifyText = styled.span`
  font-family: 'Petrona', serif;
  font-size: 18px;
  color: #8A95BF;
  display: block;
  margin-bottom: 10px;
`;

const ResultsTitle = styled.h2`
  font-family: 'Inria Serif', serif;
  font-size: 40px;
  font-weight: 700;
  color: #2F666F;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const ResultsSubtitle = styled.p`
  font-family: 'Petrona', serif;
  font-size: 20px;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ResultsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  
  @media (max-width: 991px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ResultCard = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 380px;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
`;

const ResultCardTitle = styled.h4`
  font-family: 'Petrona', serif;
  font-size: 18px;
  color: #75CDED;
  margin-bottom: 10px;
`;

const ResultCardSubtitle = styled.h3`
  font-family: 'Inria Serif', serif;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
`;

const ResultCardText = styled.p`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
`;

const ResultCardLink = styled.a`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #2F666F;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ResultCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
`;

export default Results; 