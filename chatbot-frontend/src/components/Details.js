import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import Button from './Button';

const Details = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <DetailsContainer>
      <DetailsContent>
        <DetailsLeft>
          <DetailsTitle>
            Transforming E-Waste Management with Smart Solutions & Community Engagement
          </DetailsTitle>
          <DetailsDescription>
            Our advanced AI technology optimizes your e-waste recycling process, maximizing resource recovery while minimizing environmental impact. Discover industry insights and connect with experts at our exclusive community events—all designed to empower a greener future.
          </DetailsDescription>
          <ButtonGroup>
            <Button primary={false}>Learn More</Button>
            <Button primary={true} onClick={() => navigate('/events')}>Explore Events</Button> {/* Navigate to EventsPage */}
          </ButtonGroup>
        </DetailsLeft>
        <DetailsRight>
          <DetailsImageContainer>
            <DetailsImage src="images/detail.jpg" alt="E-waste management process" />
          </DetailsImageContainer>
        </DetailsRight>
      </DetailsContent>
    </DetailsContainer>
  );
};

export default Details;

const DetailsContainer = styled.section`
  width: 100%;
  padding: 80px 20px;
`;

const DetailsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 991px) {
    flex-direction: column;
    text-align: center;
  }
`;

const DetailsLeft = styled.div`
  flex: 1;
  padding-right: 30px;

  @media (max-width: 991px) {
    padding-right: 0;
  }
`;

const DetailsRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const DetailsTitle = styled.h2`
  font-family: 'Inria Serif', serif;
  font-size: 40px;
  font-weight: 700;
  color: #2f666f;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const DetailsDescription = styled.p`
  font-family: 'Petrona', serif;
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ButtonGroup = styled.div`
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

const DetailsImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }
`;
