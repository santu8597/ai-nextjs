import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import nodemailer from 'nodemailer';

export const sendEmailTool = createTool({
    id: 'send-email',
    description: 'Send an email to a specified recipient',
    inputSchema: z.object({
      to: z.string().describe('Recipient email address'),
      subject: z.string().describe('Email subject line'),
      body: z.string().describe('Plain text body of the email'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
    execute: async ({ context }) => {
      const { to, subject, body } = context;
      const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: "santup205@gmail.com",
          pass: "ijsh ybkm wikw dddi",
        },
      });
      try {
        await transporter.sendMail({
          from: "santup205@gmail.com",
          to,
          subject,
          text: body,
        });
  
        return {
          success: true,
          message: 'Email sent successfully.',
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message || 'Failed to send email.',
        };
      }
    },
  });

  
