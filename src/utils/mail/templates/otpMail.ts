// export const otpMailTemplate = (username: string, otp: string) => `
//   <div style="font-family: Arial; padding: 20px;">
//       <h2>Hello ${username},</h2>
//       <p>Your OTP code is:</p>
//       <h1 style="color:#0c7bff">${otp}</h1>
//       <p>This OTP will expire in 10 minutes.</p>
//   </div>
// `;










export const otpMailTemplate = (username: string, otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code - FoodApp</title>
    <style>
        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }
        
        /* Header */
        .email-header {
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
            padding: 32px 40px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            display: inline-block;
        }
        
        .logo-icon {
            color: #FFE66D;
            margin-right: 8px;
        }
        
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 500;
        }
        
        /* Content */
        .email-content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #2D3436;
            margin-bottom: 24px;
        }
        
        .greeting-name {
            color: #FF6B6B;
        }
        
        .message {
            font-size: 16px;
            color: #636E72;
            margin-bottom: 32px;
            line-height: 1.7;
        }
        
        /* OTP Display */
        .otp-container {
            text-align: center;
            margin: 40px 0;
            padding: 32px;
            background: #F8F9FA;
            border-radius: 12px;
            border: 2px dashed #DFE6E9;
        }
        
        .otp-label {
            font-size: 14px;
            color: #636E72;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
            font-weight: 600;
        }
        
        .otp-code {
            font-size: 48px;
            font-weight: 800;
            letter-spacing: 8px;
            color: #FF6B6B;
            font-family: 'Courier New', monospace;
            padding: 8px;
            background: white;
            border-radius: 8px;
            display: inline-block;
            min-width: 280px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Expiry Notice */
        .expiry-notice {
            background: #FFF9E6;
            border: 1px solid #FFEAA7;
            border-radius: 10px;
            padding: 20px;
            margin: 32px 0;
            display: flex;
            align-items: flex-start;
        }
        
        .expiry-icon {
            color: #FDCB6E;
            font-size: 20px;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        .expiry-text {
            color: #E17055;
            font-size: 15px;
            font-weight: 500;
        }
        
        /* Instructions */
        .instructions {
            background: #F1F8FF;
            border-radius: 10px;
            padding: 24px;
            margin: 32px 0;
        }
        
        .instructions-title {
            font-size: 16px;
            font-weight: 700;
            color: #2D3436;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
        }
        
        .instructions-icon {
            color: #74B9FF;
            margin-right: 10px;
        }
        
        .instructions-list {
            padding-left: 24px;
            color: #636E72;
        }
        
        .instructions-list li {
            margin-bottom: 8px;
            line-height: 1.6;
        }
        
        /* Footer */
        .email-footer {
            background: #2D3436;
            color: #ffffff;
            padding: 32px 40px;
            text-align: center;
            font-size: 14px;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin: 20px 0;
        }
        
        .footer-link {
            color: #74B9FF;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-link:hover {
            color: #FFE66D;
        }
        
        .copyright {
            color: #B2BEC3;
            font-size: 13px;
            margin-top: 24px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin: 20px 0;
        }
        
        .social-icon {
            width: 36px;
            height: 36px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: background 0.3s;
        }
        
        .social-icon:hover {
            background: #FF6B6B;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            .email-content {
                padding: 24px;
            }
            
            .email-header {
                padding: 24px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 6px;
                min-width: 240px;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="logo">
                <span class="logo-icon">🍔</span>
                FoodApp
            </div>
            <div class="header-subtitle">Delivering Happiness to Your Doorstep</div>
        </div>
        
        <!-- Content -->
        <div class="email-content">
            <h1 class="greeting">
                Hello <span class="greeting-name">${username}</span>,
            </h1>
            
            <p class="message">
                You're almost there! Use the OTP code below to complete your login and start exploring delicious food options near you.
            </p>
            
            <!-- OTP Code -->
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
            </div>
            
            <!-- Expiry Notice -->
            <div class="expiry-notice">
                <div class="expiry-icon">⏰</div>
                <div class="expiry-text">
                    This OTP will expire in <strong>10 minutes</strong> for your security. Please use it before it expires.
                </div>
            </div>
            
            <!-- Instructions -->
            <div class="instructions">
                <div class="instructions-title">
                    <span class="instructions-icon">🔒</span>
                    Security Tips
                </div>
                <ul class="instructions-list">
                    <li>Never share this OTP with anyone, including FoodApp staff</li>
                    <li>We'll never ask for your password or OTP via phone or email</li>
                    <li>If you didn't request this OTP, please ignore this email</li>
                </ul>
            </div>
            
            <p class="message">
                Happy ordering! 🍕<br>
                If you need any help, reply to this email or visit our help center.
            </p>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <div class="social-links">
                <a href="#" class="social-icon">📱</a>
                <a href="#" class="social-icon">📘</a>
                <a href="#" class="social-icon">🐦</a>
                <a href="#" class="social-icon">📸</a>
            </div>
            
            <div class="footer-links">
                <a href="#" class="footer-link">Help Center</a>
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
                <a href="#" class="footer-link">Unsubscribe</a>
            </div>
            
            <div class="copyright">
                © ${new Date().getFullYear()} FoodApp Inc. All rights reserved.<br>
                123 Food Street, San Francisco, CA 94107
            </div>
        </div>
    </div>
</body>
</html>
`;