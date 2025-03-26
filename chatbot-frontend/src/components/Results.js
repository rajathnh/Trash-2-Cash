import React from 'react';
import styled from 'styled-components';

const Results = () => {
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
        {/* Card 1: Side layout (text left, image right) */}
        <ResultCard variant="side">
          <ResultCardContent variant="side">
            <ResultCardTextWrapper variant="side">
              <ResultCardTitle>Results</ResultCardTitle>
              <ResultCardSubtitle>What Can You Do?</ResultCardSubtitle>
              <ResultCardText>
                Choose the best option for your e-waste.
              </ResultCardText>
              <ResultCardLink href="#">Learn More &gt;</ResultCardLink>
            </ResultCardTextWrapper>
            <ResultCardImage
              variant="side"
              src="images/r1.jpg"
              alt="Person with e-waste"
            />
          </ResultCardContent>
        </ResultCard>

        {/* Card 2: Vertical layout (text top, image bottom) */}
        <ResultCard variant="vertical">
          <ResultCardContent variant="vertical">
            <ResultCardTextWrapper variant="vertical">
              <ResultCardTitle>Options</ResultCardTitle>
              <ResultCardSubtitle>Classification Outcomes</ResultCardSubtitle>
              <ResultCardText>
                Find out if it's sellable, recyclable, or disposable.
              </ResultCardText>
              <ResultCardLink href="#">Explore &gt;</ResultCardLink>
            </ResultCardTextWrapper>
            <ResultCardImage
              variant="vertical"
              src="images/result2.jpg"
              alt="E-waste components"
            />
          </ResultCardContent>
        </ResultCard>

        {/* Card 3: Vertical layout (text top, image bottom) */}
        <ResultCard variant="vertical">
          <ResultCardContent variant="vertical">
            <ResultCardTextWrapper variant="vertical">
              <ResultCardTitle>Guidelines</ResultCardTitle>
              <ResultCardSubtitle>Safe Disposal</ResultCardSubtitle>
              <ResultCardText>
                Follow our steps for proper disposal.
              </ResultCardText>
              <ResultCardLink href="#">Get Started &gt;</ResultCardLink>
            </ResultCardTextWrapper>
            <ResultCardImage
              variant="vertical"
              src="images/result3.jpg"
              alt="Safe disposal"
            />
          </ResultCardContent>
        </ResultCard>
      </ResultsContent>
    </ResultsContainer>
  );
};

export default Results;

/* Styled Components */

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

/* Each card has a fixed height for a uniform look */
const ResultCard = styled.div`
  flex: 1;
  /* Slightly wider side variant (480px), narrower vertical variant (360px) */
  max-width: ${(props) => (props.variant === 'side' ? '480px' : '360px')};
  min-width: 300px;
  height: 450px;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden; /* Ensures the image can fill edges without overspill */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  display: flex; 
  flex-direction: column; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
`;

const ResultCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: ${(props) => (props.variant === 'side' ? 'row' : 'column')};
  align-items: stretch;
`;

const ResultCardTextWrapper = styled.div`
  padding: ${(props) => (props.variant === 'side' ? '25px' : '25px 25px 0')};
  /* For side variant, use about half the card width */
  flex: ${(props) => (props.variant === 'side' ? '0 0 50%' : 'none')};
  box-sizing: border-box;
`;

const ResultCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image fills the space while maintaining aspect ratio */
  object-position: center;
  display: block;

  /* SIDE VARIANT: Fills the entire right half */
  ${(props) =>
    props.variant === 'side' &&
    `
    flex: 1;
    height: 100%;
    width: auto;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  `}

  /* VERTICAL VARIANT: Fully fills the bottom portion */
  ${(props) =>
    props.variant === 'vertical' &&
    `
    width: 100%;
    margin-top: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `}
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
