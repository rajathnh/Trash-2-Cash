import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <CTAContainer id="callToAction">
      <CTAContent>
        <CTALeft>
          <CTATitle>Transform Your E-Waste Today</CTATitle>
          <CTADescription>
            Discover if your e-waste is sellable, disposable, or repairable.
            Learn what to do with it through our AI-powered guidance.
          </CTADescription>
          <Tagline>
            Find the best solution – sell, dispose, or repair your e-waste.
          </Tagline>
          <CTAButton primary onClick={() => navigate("/chatbot")}>
            Open Chat
          </CTAButton>
        </CTALeft>
      </CTAContent>
    </CTAContainer>
  );
};

export default CallToAction;

const CTAContainer = styled.section`
  max-width: 1210px;
  height: 400px;
  margin: 40px auto;
  padding: 40px 20px;
  background: linear-gradient(
    to right,
    rgb(110, 77, 45),
    #4f7d8c,
    #b39468,
    #dfc394,
    #deddc9
  );
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`;

const CTALeft = styled.div`
  max-width: 800px;
`;

const gradientText = `
  background: rgb(0, 0, 0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CTATitle = styled.h2`
  font-family: "Inria Serif", serif;
  font-size: 40px;
  font-weight: 700;
  ${gradientText}
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const CTADescription = styled.p`
  font-family: "Petrona", serif;
  font-size: 22px;
  ${gradientText}
  margin-bottom: 20px;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Tagline = styled.p`
  font-family: "Petrona", serif;
  font-size: 20px;
  font-style: italic;
  ${gradientText}
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CTAButton = styled(Button)`
  font-size: 20px;
  padding: 14px 32px;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 12px 28px;
  }
`;
