import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <ContactContainer id="contact">
      <ContactTitle>Contact Us</ContactTitle>
      <ContactForm onSubmit={handleSubmit}>
        <FormField>
          <FormInput 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </FormField>
        <FormField>
          <FormInput 
            type="email" 
            placeholder="Email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </FormField>
        <FormField>
          <FormTextarea 
            placeholder="Message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </FormField>
        <SubmitButton primary={true} type="submit">Submit</SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ContactTitle = styled.h2`
  font-family: 'Inria Serif', serif;
  font-size: 32px;
  font-weight: 700;
  color: #2F666F;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormField = styled.div`
  width: 100%;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Petrona', serif;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2F666F;
  }
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 14px;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Petrona', serif;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2F666F;
  }
  
  @media (max-width: 768px) {
    height: 120px;
    padding: 10px 12px;
    font-size: 14px;
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  
  @media (max-width: 576px) {
    align-self: center;
    width: 100%;
  }
`;

export default Contact; 