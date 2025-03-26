// src/pages/Home.jsx
import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Details from '../components/Details';
import CallToAction from '../components/CallToAction';
import Results from '../components/Results';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import FAQs from '../components/FAQs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <AppContainer>
      <Navbar />
      <Hero />
      <Details />
      <CallToAction />
      <Results />
      <Team />
      <Testimonials />
      <FAQSection>
        <div className="container">
          <FAQs />
          <Contact />
        </div>
      </FAQSection>
      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const FAQSection = styled.div`
  padding: 50px 0;
  .container {
    display: flex;
    gap: 50px;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

export default Home;
