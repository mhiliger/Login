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
  Button,
  Hr,
  Link,
} from '@react-email/components';

const ApprovalEmail = ({ user, setupUrl }) => {
  return (
    <Html>
      <Head />
      <Preview>Your account has been approved!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Account Approved</Heading>
          <Text style={text}>Great news, {user.first}!</Text>
          <Text style={text}>
            Your account request has been approved by the administrator. You can now set your password to activate your account.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={setupUrl}>
              Set Password
            </Button>
          </Section>
          <Text style={text}>
            or copy and paste this link into your browser:
            <br />
            <Link href={setupUrl} style={link}>
              {setupUrl}
            </Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            This link will expire in 48 hours.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ApprovalEmail;

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

const btnContainer = {
  textAlign: 'center',
  padding: '12px 0 12px',
};

const button = {
  backgroundColor: '#28a745',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  padding: '0 20px',
};

const link = {
  color: '#28a745',
};
