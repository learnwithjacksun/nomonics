export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Verify Your Nomomics Email</title>
    <style>
      body {
        font-family: 'Comic Sans MS', 'Arial', sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #ddd;
        overflow: hidden;
      }
      .header {
        background-color: #ff6600;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
        color: #000000;
        font-size: 16px;
        line-height: 1.8;
      }
      .verification-code {
        display: block;
        margin: 25px 0;
        font-size: 22px;
        color: #ff6600;
        background: #fff3e6;
        border: 2px dashed #ff6600;
        padding: 14px;
        text-align: center;
        border-radius: 8px;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .footer {
        background-color: #f1f1f1;
        padding: 15px;
        text-align: center;
        color: #888;
        font-size: 12px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Verify Your Email – Nomomics</div>
      <div class="content">
        <p>Hey Comic Fan,</p>
        <p>Thanks for joining <strong>Nomomics</strong> — the home of amazing comic stories! To start exploring or publishing, please verify your email using the code below:</p>
        <span class="verification-code">{verificationCode}</span>
        <p>This code will expire in 10 minutes for your security.</p>
        <p>If you didn’t sign up on Nomomics, just ignore this email.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Nomomics. All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;




export const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to Nomomics</title>
    <style>
      body {
        font-family: 'Comic Sans MS', 'Arial', sans-serif;
        background-color: #f5f5f5;
        color: #000000;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #ddd;
      }
      .header {
        background-color: #ff6600;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
        line-height: 1.8;
        font-size: 16px;
      }
      .button {
        display: inline-block;
        padding: 12px 25px;
        margin: 20px 0;
        background-color: #ff6600;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      .button:hover {
        background-color: #cc5200;
      }
      .footer {
        background-color: #f1f1f1;
        padding: 15px;
        text-align: center;
        color: #888;
        font-size: 12px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Welcome to Nomomics!</div>
      <div class="content">
        <p>Hello {name},</p>
        <p>Welcome to <strong>Nomomics</strong>, where readers and creators come together to experience comics like never before.</p>
        <p>Your account has been successfully created. You're now ready to explore, buy, watch, and maybe even upload your own stories!</p>
        <p>Click below to access your dashboard and dive into the comic universe:</p>
        <a href="{loginUrl}" class="button">Go to Dashboard</a>
        <p>We’re excited to have you as part of the Nomomics community. Let’s tell epic stories together!</p>
        <p>Need help? Our support team is just a click away.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Nomomics. All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;



export const Forgot_Password_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Reset Your Password – Nomomics</title>
    <style>
      body {
        font-family: 'Comic Sans MS', 'Arial', sans-serif;
        background-color: #f5f5f5;
        color: #000000;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #ddd;
      }
      .header {
        background-color: #ff6600;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
        line-height: 1.8;
        font-size: 16px;
      }
      .button {
        display: inline-block;
        padding: 12px 25px;
        margin: 20px 0;
        background-color: #ff6600;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      .button:hover {
        background-color: #cc5200;
      }
      .footer {
        background-color: #f1f1f1;
        padding: 15px;
        text-align: center;
        color: #888;
        font-size: 12px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Reset Your Password</div>
      <div class="content">
        <p>Hello {name},</p>
        <p>We received a request to reset your Nomomics password. If this was you, click the button below to continue:</p>
        <a href="{resetUrl}" class="button">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email — your account is still secure.</p>
        <p>This link will expire in 10 minutes to protect your account.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Nomomics. All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;


