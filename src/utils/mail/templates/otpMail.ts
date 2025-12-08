export const otpMailTemplate = (username: string, otp: string) => `
  <div style="font-family: Arial; padding: 20px;">
      <h2>Hello ${username},</h2>
      <p>Your OTP code is:</p>
      <h1 style="color:#0c7bff">${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
  </div>
`;
