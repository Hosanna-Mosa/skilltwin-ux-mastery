# Forgot Password Setup Guide

## Overview

The forgot password functionality uses nodemailer to send OTP codes via email for secure password reset.

## Email Configuration

### 1. Gmail Setup

To use Gmail for sending emails, you need to:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

### 2. Environment Variables

Add these to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 3. Alternative Email Providers

You can modify `backend/utils/email.js` to use other email providers:

#### Outlook/Hotmail:

```javascript
const transporter = nodemailer.createTransporter({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

#### Custom SMTP:

```javascript
const transporter = nodemailer.createTransporter({
  host: "smtp.your-provider.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## API Endpoints

### 1. Send OTP

- **POST** `/api/auth/forgot-password`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: `{ "message": "OTP sent successfully", "email": "user@example.com" }`

### 2. Verify OTP

- **POST** `/api/auth/verify-otp`
- **Body**: `{ "email": "user@example.com", "otp": "123456" }`
- **Response**: `{ "message": "OTP verified successfully", "email": "user@example.com" }`

### 3. Reset Password

- **POST** `/api/auth/reset-password`
- **Body**: `{ "email": "user@example.com", "newPassword": "newpassword123" }`
- **Response**: `{ "message": "Password reset successfully" }`

## Database Schema

### OTP Model

```javascript
{
  email: String,        // User's email
  otp: String,          // 6-digit OTP code
  expiresAt: Date,      // Expiration time (10 minutes)
  isUsed: Boolean,      // Whether OTP has been used
  createdAt: Date       // Creation timestamp
}
```

## Security Features

1. **OTP Expiration**: OTPs expire after 10 minutes
2. **Single Use**: Each OTP can only be used once
3. **Automatic Cleanup**: Expired OTPs are automatically deleted
4. **Rate Limiting**: Consider implementing rate limiting for OTP requests
5. **Email Validation**: Only sends OTP to registered email addresses

## Frontend Integration

The frontend includes a multi-step dialog:

1. **Email Input**: User enters their email address
2. **OTP Verification**: User enters the 6-digit OTP
3. **Password Reset**: User creates a new password

### Features:

- Real-time countdown for OTP resend
- Password strength validation
- Toast notifications for all actions
- Responsive design
- Error handling

## Testing

### Test Email Setup

For development/testing, you can use:

- **Gmail**: Use your personal Gmail with app password
- **Mailtrap**: For testing without sending real emails
- **Ethereal Email**: For testing email templates

### Mailtrap Setup

```javascript
const transporter = nodemailer.createTransporter({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "your-mailtrap-user",
    pass: "your-mailtrap-pass",
  },
});
```

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**:

   - Check if 2FA is enabled on Gmail
   - Verify app password is correct
   - Ensure EMAIL_USER and EMAIL_PASS are set correctly

2. **OTP not received**:

   - Check spam folder
   - Verify email address is correct
   - Check server logs for email sending errors

3. **OTP expired**:

   - OTPs expire after 10 minutes
   - User can request a new OTP

4. **Database connection issues**:
   - Ensure MongoDB is running
   - Check MONGODB_URI in environment variables

## Production Considerations

1. **Email Provider**: Use a reliable email service (SendGrid, AWS SES, etc.)
2. **Rate Limiting**: Implement rate limiting for OTP requests
3. **Monitoring**: Add logging for email sending success/failure
4. **Backup**: Consider SMS OTP as backup option
5. **Security**: Implement CAPTCHA for OTP requests
