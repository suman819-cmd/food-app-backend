export const passwordResetMailTemplate = (username: string, resetLink: string) => `
  <div style="font-family: Arial; padding: 20px;">
      <h2>Password Reset Request</h2>
      <p>Hello ${username}, click below link to reset your password:</p>
      <a href="${resetLink}" style="padding:10px 20px;background:#0c7bff;color:white;text-decoration:none;border-radius:5px;">
         Reset Password
      </a>
      <p>If you didn’t request this, ignore the mail.</p>
  </div>
`;
