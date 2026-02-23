import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Button, Hr, Link } from '@react-email/components';

/**
 * Template for sending a password reset link.
 */
export default function PasswordResetEmail({ user, resetUrl }) {
  const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };

  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
  };

  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#333',
  };

  const btnContainer = {
    textAlign: 'center',
    marginTop: '32px',
    marginBottom: '32px',
  };

  const button = {
    backgroundColor: '#1976d2',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    padding: '12px 20px',
  };

  const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
  };

  const footer = {
    color: '#8898aa',
    fontSize: '12px',
  };

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {user?.first || 'User'},</Text>
          <Text style={paragraph}>
            A request has been received to reset the password for your account.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>
          <Text style={paragraph}>
            If you didn't request this, you can safely ignore this email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Or copy and paste this URL into your browser: <Link href={resetUrl}>{resetUrl}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
