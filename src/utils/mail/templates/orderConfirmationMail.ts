export const orderConfirmationMailTemplate = (
  username: string,
  orderId: string,
  amount: number
) => `
  <div style="font-family: Arial; padding: 20px;">
      <h2>Order Confirmed! 🍕🎉</h2>
      <p>Hello ${username}, your order has been successfully placed.</p>

      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total Amount:</strong> ₹${amount}</p>

      <p>Thank you for ordering from FoodApp!</p>
  </div>
`;
