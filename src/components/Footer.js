import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterInner>
        {/* Footer Content */}
        <FooterGrid>
          {/* Newsletter Section */}
          <NewsletterSection>
            <SectionTitle>Stay Informed</SectionTitle>
            <SectionText>
              Get updates about new features and special offers.
            </SectionText>
            <FormContainer>
              <EmailInput type="email" placeholder="Enter your email" />
              <SubscribeButton>Subscribe</SubscribeButton>
            </FormContainer>
          </NewsletterSection>

          {/* Quick Contact Section */}
          <QuickContactSection>
            <SectionTitle>Quick Contact</SectionTitle>
            <ContactList>
              <ContactItem>📧 support@quickserve.com</ContactItem>
              <ContactItem>📞 +1 (555) 123-4567</ContactItem>
              <ContactItem>📍 123 Innovation Drive, Tech City</ContactItem>
            </ContactList>
          </QuickContactSection>

          {/* Social Media Section */}
          <SocialSection>
            <SectionTitle>Join Our Community</SectionTitle>
            <SectionText>
              Connect with us on social media:
            </SectionText>
            <SocialIcons>
              <SocialLink href="#" bgColor="#BFDBFE" hoverColor="#93C5FD">
                <FaFacebookF />
              </SocialLink>
              <SocialLink href="#" bgColor="#FBCFE8" hoverColor="#F9A8D4">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="#" bgColor="#BFDBFE" hoverColor="#93C5FD">
                <FaLinkedinIn />
              </SocialLink>
              <SocialLink href="#" bgColor="#FECACA" hoverColor="#FCA5A5">
                <FaYoutube />
              </SocialLink>
            </SocialIcons>
          </SocialSection>
        </FooterGrid>

        {/* Footer Bottom */}
        <FooterBottom>
          <FooterBottomText>
            © {currentYear} Trash2Cash. All rights reserved.
          </FooterBottomText>
          <FooterBottomLinks>
            <FooterBottomLink href="#">Privacy Policy</FooterBottomLink>
            <FooterBottomLink href="#">Terms of Service</FooterBottomLink>
            <FooterBottomLink href="#">Cookie Settings</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterInner>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #D6E1F3, #8A95BF, #2DB3E3, #3B7C87);
  color: #000;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
`;

// Full-width inner container with slight horizontal padding.
const FooterInner = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Align left two sections to center on desktop.
const NewsletterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    justify-self: center;
  }
`;

const QuickContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    justify-self: center;
  }
`;

// Align social section to the right with extra right gap.
const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    justify-self: end;
    padding-right: 20px;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

// Updated to use a darker color for improved visibility.
const SectionText = styled.p`
  color: #333333;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  max-width: 28rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  padding: 0.5rem 1rem;
  flex: 1;
  border: 1px solid #D1D5DB;
  border-right: none;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3B82F6;
  }

  @media (max-width: 576px) {
    border-radius: 0.5rem;
    border-right: 1px solid #D1D5DB;
    margin-bottom: 0.5rem;
  }
`;

const SubscribeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563EB;
  color: #fff;
  border: none;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1D4ED8;
  }

  @media (max-width: 576px) {
    border-radius: 0.5rem;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color:rgb(35, 33, 33);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.li`
  font-size: 1rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${(props) => props.bgColor || '#BFDBFE'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  color: inherit;
  font-size: 1.25rem;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#93C5FD'};
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: rgb(35, 33, 33);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterBottomText = styled.p`
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterBottomLink = styled.a`
  color: rgb(35, 33, 33);
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
`;

export default Footer;
