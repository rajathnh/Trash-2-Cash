import React from 'react';
import styled from 'styled-components';

const Button = ({ primary, children, onClick }) => {
  return (
    <StyledButton primary={primary} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'Petrona', serif;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.primary ? `
    background-color: #2F666F;
    color: white;
    border: none;
    
    &:hover {
      background-color: #1d4a51;
    }
  ` : `
    background-color: transparent;
    color: #2F666F;
    border: 2px solid #2F666F;
    
    &:hover {
      background-color: rgba(47, 102, 111, 0.1);
    }
  `}
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export default Button; 