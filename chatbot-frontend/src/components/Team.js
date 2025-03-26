import React from 'react';
import styled from 'styled-components';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Rajath N H',
      role: 'Backend Developer',
      image: 'images/team/Rajath.png',
    },
    {
      id: 2,
      name: 'Yashaswini D B',
      role: 'Database Architect',
      image: 'images/team/Yashaswini.jpg',
    },
    {
      id: 3,
      name: 'Preeti Bhat',
      role: 'AI Engineer',
      image: 'images/team/Preeti.jpg',
    },
    {
      id: 4,
      name: 'Prajnan Vaidya',
      role: 'Frontend Developer',
      image: 'images/team/Prajnan.jpg',
    },
  ];

  return (
    <TeamContainer id="team">
      <TeamTitle>Our Team</TeamTitle>
      <TeamContent>
        {teamMembers.map((member) => (
          <TeamMember key={member.id}>
            <TeamMemberImage src={member.image} alt={member.name} />
            <TeamMemberName>{member.name}</TeamMemberName>
            <TeamMemberRole>{member.role}</TeamMemberRole>
          </TeamMember>
        ))}
      </TeamContent>
    </TeamContainer>
  );
};

export default Team;

const TeamContainer = styled.section`
  width: 100%;
  padding: 80px 20px;
  background: linear-gradient(180deg, #f2f2f2, #e8ecf1);
`;

const TeamTitle = styled.h2`
  font-family: 'Inria Serif', serif;
  font-size: 42px;
  font-weight: 700;
  color: #2f666f;
  text-align: center;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 40px;
  }
`;

const TeamContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const TeamMember = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 991px) {
    width: 200px;
  }

  @media (max-width: 576px) {
    width: 170px;
  }
`;

const TeamMemberImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid #2f666f;

  @media (max-width: 991px) {
    width: 110px;
    height: 110px;
  }

  @media (max-width: 576px) {
    width: 90px;
    height: 90px;
  }
`;

const TeamMemberName = styled.h3`
  font-family: 'Inria Serif', serif;
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const TeamMemberRole = styled.p`
  font-family: 'Petrona', serif;
  font-size: 16px;
  color: #666;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;