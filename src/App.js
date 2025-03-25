import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Details from './components/Details';
import CallToAction from './components/CallToAction';
import Results from './components/Results';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/chatbot';

// Home component wraps your homepage sections
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
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

export default App;
