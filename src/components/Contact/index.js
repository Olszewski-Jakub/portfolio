import React, { useState, useRef } from "react";
import styled, { useTheme } from "styled-components";
import emailjs from "@emailjs/browser";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiFileText, FiSend, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Bio } from "../../data/constants";
import { SectionLabel, SectionTitle, SectionDesc, SectionHeadingWrapper } from "../SectionTitle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
  background: ${({ theme }) => theme.card_light};

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


const ContactForm = styled(motion.form)`
  flex: 1;
  min-width: 0;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  gap: 20px;
  border: 1px solid ${({ theme }) => `${theme.primary}15`};

  @media (max-width: 900px) {
    width: 100%;
    max-width: 560px;
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
  transition: top 0.3s ease-in-out, font-size 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;
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
  transition: color 0.3s ease-in-out;
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
  transition: border-color 0.3s ease-in-out;
  
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
  transition: border-color 0.3s ease-in-out;
  
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
  background: linear-gradient(135deg, #2F81F7 0%, #0EA5E9 100%);
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
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(47, 129, 247, 0.4);
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

const ContactBody = styled.div`
  display: flex;
  gap: 40px;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  max-width: 960px;
  padding: 0 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 28px;
    padding: 0;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 280px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 100%;
    max-width: 560px;
  }
`;

const InfoCard = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => `${theme.primary}20`};
  text-decoration: none;
  transition: transform 0.25s ease-in-out, border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => `${theme.primary}60`};
    box-shadow: 0 8px 20px rgba(47, 129, 247, 0.12);
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => `${theme.primary}18`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
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
  const theme = useTheme();
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
          <SectionHeadingWrapper>
            <SectionLabel>Get In Touch</SectionLabel>
            <SectionTitle>Contact</SectionTitle>
          </SectionHeadingWrapper>
          <SectionDesc>
            Feel free to reach out to me for any questions or opportunities! I'll get back to you as soon as possible.
          </SectionDesc>
          </motion.div>

          <ContactBody>
            <ContactInfo
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <InfoCard href={`mailto:jakub@example.com`} onClick={(e) => e.preventDefault()}>
                <InfoIcon><FiMail size={20} /></InfoIcon>
                <InfoText>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>Send a message below</InfoValue>
                </InfoText>
              </InfoCard>
              <InfoCard href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
                <InfoIcon><FaLinkedin size={20} /></InfoIcon>
                <InfoText>
                  <InfoLabel>LinkedIn</InfoLabel>
                  <InfoValue>j-olszewski</InfoValue>
                </InfoText>
              </InfoCard>
              <InfoCard href={Bio.github} target="_blank" rel="noopener noreferrer">
                <InfoIcon><FaGithub size={20} /></InfoIcon>
                <InfoText>
                  <InfoLabel>GitHub</InfoLabel>
                  <InfoValue>Olszewski-Jakub</InfoValue>
                </InfoText>
              </InfoCard>
              <InfoCard as="div">
                <InfoIcon><FiMapPin size={20} /></InfoIcon>
                <InfoText>
                  <InfoLabel>Location</InfoLabel>
                  <InfoValue>Available for opportunities</InfoValue>
                </InfoText>
              </InfoCard>
            </ContactInfo>

          <ContactForm
              ref={form}
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
          >
            <ContactTitle>
              <FiMail size={24} style={{ color: theme.primary }} />
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
          </ContactBody>

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