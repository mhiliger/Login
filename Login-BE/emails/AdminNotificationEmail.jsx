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
  Row,
  Column,
} from '@react-email/components';

const AdminNotificationEmail = ({ user, adminUrl }) => {
  return (
    <Html>
      <Head />
      <Preview>New Registration Request</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Registration Request</Heading>
          <Text style={text}>
            A new user has verified their email and is awaiting approval.
          </Text>
          
          <Section style={infoSection}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{user.first} {user.last}</Text>
            
            <Text style={label}>Email:</Text>
            <Text style={value}>{user.email}</Text>
            
            <Text style={label}>Request Note:</Text>
            <Text style={value}>{user.request_note || 'No note provided'}</Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={adminUrl}>
              Review Request
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNotificationEmail;

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

const infoSection = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
  margin: '20px',
  borderRadius: '4px',
};

const label = {
  color: '#666',
  fontSize: '12px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginTop: '10px',
  marginBottom: '2px',
};

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
};

const btnContainer = {
  textAlign: 'center',
  padding: '12px 0 12px',
};

const button = {
  backgroundColor: '#272727',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px',
};
