import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import emailjs from "@emailjs/browser";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiFileText, FiSend } from "react-icons/fi";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;

  @media (max-width: 960px) {
    padding: 60px 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0 20px 80px;
  gap: 12px;

  @media (max-width: 960px) {
    flex-direction: column;
    padding: 0 20px 60px;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text_primary};
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.5s ease-in-out 0.2s;
  animation-fill-mode: both;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const ContactForm = styled(motion.form)`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  gap: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 24px;
    gap: 16px;
  }
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  position: absolute;
  top: ${({ isFocused, hasValue }) => (isFocused || hasValue ? '-12px' : '12px')};
  left: 16px;
  font-size: ${({ isFocused, hasValue }) => (isFocused || hasValue ? '14px' : '16px')};
  color: ${({ theme, isFocused }) => (isFocused ? theme.primary : theme.text_secondary)};
  pointer-events: none;
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme, isFocused, hasValue }) =>
      (isFocused || hasValue) ? theme.card : 'transparent'};
  padding: 0 4px;

  @media (max-width: 768px) {
    font-size: ${({ isFocused, hasValue }) => (isFocused || hasValue ? '12px' : '14px')};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  top: 14px;
  right: 16px;
  color: ${({ theme, isFocused }) => (isFocused ? theme.primary : theme.text_secondary)};
  transition: all 0.3s ease-in-out;
`;

const ContactInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.primary : theme.text_secondary + '80')};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  padding-right: 40px;
  transition: all 0.3s ease-in-out;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    padding-right: 36px;
    font-size: 14px;
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.primary : theme.text_secondary + '80')};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  padding-right: 40px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease-in-out;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    padding-right: 36px;
    font-size: 14px;
    min-height: 100px;
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: ${({ theme }) => theme.primary};
  background: linear-gradient(225deg, 
    ${({ theme }) => theme.primary} 0%, 
    ${({ theme }) => `${theme.primary}CC`} 100%);
  padding: 16px;
  margin-top: 10px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const Contact = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Focus states for input styling
  const [emailFocus, setEmailFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [subjectFocus, setSubjectFocus] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);

  // State for notifications and loading
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!email || !name || !subject || !message) {
      setError(true);
      setErrorMessage("Please fill in all fields");
      setOpen(true);
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email address");
      setOpen(true);
      setLoading(false);
      return;
    }

    // Send email using EmailJS
    emailjs
        .sendForm(
            "service_vixo1tf",
            "template_yf2eqgm",
            form.current,
            "CPSE96P74xatOp2o8"
        )
        .then(
            (result) => {
              setOpen(true);
              setError(false);
              setLoading(false);

              // Reset form fields
              setEmail("");
              setName("");
              setSubject("");
              setMessage("");
            },
            (error) => {
              console.log(error.text);
              setError(true);
              setErrorMessage("Failed to send message. Please try again.");
              setOpen(true);
              setLoading(false);
            }
        );
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <Container id="contact">
        <Wrapper>
          <Title>Contact</Title>
          <Desc>
            Feel free to reach out to me for any questions or opportunities! I'll get back to you as soon as possible.
          </Desc>

          <ContactForm
              ref={form}
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
          >
            <ContactTitle>
              <FiMail size={24} style={{ color: "#854CE6" }} />
              Let's Connect
            </ContactTitle>

            <InputGroup>
              <InputLabel htmlFor="email" isFocused={emailFocus} hasValue={email.length > 0}>
                Your Email
              </InputLabel>
              <ContactInput
                  id="email"
                  name="from_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  isFocused={emailFocus}
              />
              <InputIcon isFocused={emailFocus}>
                <FiMail size={18} />
              </InputIcon>
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="name" isFocused={nameFocus} hasValue={name.length > 0}>
                Your Name
              </InputLabel>
              <ContactInput
                  id="name"
                  name="from_name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                  isFocused={nameFocus}
              />
              <InputIcon isFocused={nameFocus}>
                <FiUser size={18} />
              </InputIcon>
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="subject" isFocused={subjectFocus} hasValue={subject.length > 0}>
                Subject
              </InputLabel>
              <ContactInput
                  id="subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onFocus={() => setSubjectFocus(true)}
                  onBlur={() => setSubjectFocus(false)}
                  isFocused={subjectFocus}
              />
              <InputIcon isFocused={subjectFocus}>
                <FiFileText size={18} />
              </InputIcon>
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="message" isFocused={messageFocus} hasValue={message.length > 0}>
                Message
              </InputLabel>
              <ContactInputMessage
                  id="message"
                  name="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setMessageFocus(true)}
                  onBlur={() => setMessageFocus(false)}
                  isFocused={messageFocus}
              />
              <InputIcon isFocused={messageFocus} style={{ top: '16px' }}>
                <FiFileText size={18} />
              </InputIcon>
            </InputGroup>

            <ContactButton type="submit" disabled={loading}>
              {loading ? (
                  <CircularProgress size={20} color="inherit" />
              ) : (
                  <>
                    <FiSend size={20} />
                    Send Message
                  </>
              )}
            </ContactButton>
          </ContactForm>

          <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
                onClose={handleClose}
                severity={error ? "error" : "success"}
                variant="filled"
                sx={{ width: '100%' }}
            >
              {error ? errorMessage : "Message sent successfully!"}
            </Alert>
          </Snackbar>
        </Wrapper>
      </Container>
  );
};

export default Contact;