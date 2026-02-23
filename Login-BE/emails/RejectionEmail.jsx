import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

const RejectionEmail = ({ user, reason }) => {
  return (
    <Html>
      <Head />
      <Preview>Registration Status Update</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Registration Update</Heading>
          <Text style={text}>Hello {user.first},</Text>
          <Text style={text}>
            We have reviewed your registration request. Unfortunately, we are unable to approve your account at this time.
          </Text>
          
          <Section style={reasonBox}>
            <Text style={reasonLabel}>Reason:</Text>
            <Text style={reasonText}>{reason}</Text>
          </Section>

          <Text style={text}>
            If you believe this decision was made in error or if you have any questions, please contact the system administrator.
          </Text>
          <Hr style={hr} />
        </Container>
      </Body>
    </Html>
  );
};

export default RejectionEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '17px 0 0',
  textAlign: 'center',
  margin: '0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 20px',
};

const reasonBox = {
  backgroundColor: '#fff5f5',
  borderLeft: '4px solid #dc3545',
  padding: '15px',
  margin: '20px',
};

const reasonLabel = {
  color: '#dc3545',
  fontWeight: 'bold',
  fontSize: '14px',
  margin: '0 0 5px',
  textTransform: 'uppercase',
};

const reasonText = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};
