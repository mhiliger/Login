const React = require('react');
const { Resend } = require('resend');
const { render } = require('@react-email/render');
const VerificationEmail = require('../emails/VerificationEmail').default;
const AdminNotificationEmail = require('../emails/AdminNotificationEmail').default;
const ApprovalEmail = require('../emails/ApprovalEmail').default;
const RejectionEmail = require('../emails/RejectionEmail').default;
const PasswordResetEmail = require('../emails/PasswordResetEmail').default;

/**
 * Email Service - Resend Integration
 * 
 * Uses React Mail templates and Resend to send transactional emails.
 */
const createEmailService = (baseUrl) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  // Use a friendly name format: "Name <email@domain.com>"
  const fromEmail = process.env.EMAIL_FROM || 'Login System <noreply@login.hiliger.com>';

  /**
   * Helper to render and send an email
   */
  const sendEmail = async (to, subject, component) => {
    try {
      console.log(`Preparing to send email to: ${to}`);

      // Fallback to console if no API key (development safety)
      if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️  WARNING: No RESEND_API_KEY found. Printing email to console.');
        const plainText = await render(component, { plainText: true });
        console.log("=".repeat(60));
        console.log(`To: ${to}`);
        console.log(`From: ${fromEmail}`);
        console.log(`Subject: ${subject}`);
        console.log("-".repeat(60));
        console.log(plainText);
        console.log("=".repeat(60) + "\n");
        return;
      }

      const emailHtml = await render(component);

      const data = await resend.emails.send({
        from: fromEmail,
        to: to,
        subject: subject,
        html: emailHtml,
      });

      if (data.error) {
        console.error('❌ Resend API Error:', data.error);
      } else {
        console.log(`✅ Email sent successfully! ID: ${data.data.id}`);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Exception sending email:', error);
    }
  };

  return {
    sendVerificationEmail: async (user, token) => {
      const verificationUrl = `${baseUrl}/register/verify/${token}`;
      await sendEmail(
        user.email,
        'Verify your email address',
        React.createElement(VerificationEmail, { user, verificationUrl })
      );
    },

    sendAdminNotification: async (user, adminEmail) => {
      const adminUrl = `${baseUrl}/loginadmin/registrations`;
      await sendEmail(
        adminEmail,
        'New Registration Request',
        React.createElement(AdminNotificationEmail, { user, adminUrl })
      );
    },

    sendApprovalEmail: async (user, token) => {
      const setupUrl = `${baseUrl}/register/setup/${token}`;
      await sendEmail(
        user.email,
        'Your account has been approved!',
        React.createElement(ApprovalEmail, { user, setupUrl })
      );
    },

    sendRejectionEmail: async (user, reason) => {
      await sendEmail(
        user.email,
        'Registration Status Update',
        React.createElement(RejectionEmail, { user, reason })
      );
    },

    sendPasswordResetEmail: async (user, token) => {
      const resetUrl = `${baseUrl}/register/setup/${token}`;
      await sendEmail(
        user.email,
        'Reset your password',
        React.createElement(PasswordResetEmail, { user, resetUrl })
      );
    },
  };
};

module.exports = { createEmailService };