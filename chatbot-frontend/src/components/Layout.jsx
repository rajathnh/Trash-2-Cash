// Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
`;

const Content = styled.div`
  flex: 1;
  margin-top: 60px; /* reserve space for header if header is fixed */
`;

function Layout({ children }) {
  return (
    <Container>
    <Navbar hideGetStarted={true} />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
}

export default Layout;
