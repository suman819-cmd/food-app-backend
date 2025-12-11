// import axios from "axios";

// export const sendMailViaAPI = async (to: string, subject: string, html: string) => {
//   const apiKey = process.env.BREVO_API_KEY;
//   const senderEmail = process.env.SENDER_EMAIL;

//   if (!apiKey || !senderEmail) {
//     console.error("❌ Brevo API Key or Sender Email not set in .env");
//     console.log(`Simulating sending email to ${to} with content: ${html}`);
//     return { simulated: true };
//   }

//   try {
//     const response = await axios.post(
//       "https://api.brevo.com/v3/smtp/email",
//       {
//         sender: {
//           name: "FoodApp",
//           email: senderEmail,
//         },
//         to: [{ email: to }],
//         subject,
//         htmlContent: html,
//       },
//       {
//         headers: {
//           "api-key": apiKey,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(`✅ Email sent via Brevo API to ${to}`);
//     console.log(`📧 Email content:\n${html}`);
//     return response.data;
//   } catch (error: any) {
//     console.error("❌ Brevo API Error:", error.response?.data || error.message);
//     throw error;
//   }
// };












import axios from "axios";

export const sendMailViaAPI = async (to: string, subject: string, html: string) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;

  if (!apiKey || !senderEmail) {
    console.error("❌ Brevo API Key or Sender Email not set in .env");
    console.log(`Simulating sending email to ${to} with content: ${html}`);
    return { simulated: true };
  }

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "FoodApp",
          email: senderEmail,
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Email sent via Brevo API to ${to}`);
    console.log(`📧 Email content:\n${html}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Brevo API Error:", error.response?.data || error.message);
    throw error;
  }
};
