# Admin Panel API Implementation

## Overview

The admin panel now uses real API calls for authentication instead of dummy logic. This document explains the implementation details.

## Backend API Endpoints

### Admin Authentication Endpoints

#### 1. Admin Login

- **URL**: `POST /api/admin/login`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "token": "jwt_token_here",
    "admin": {
      "id": "admin_id",
      "email": "admin@example.com",
      "name": "Admin Name",
      "role": "admin"
    }
  }
  ```
- **Error Responses**:
  ```json
  {
    "message": "Email not found. Please check your email or register a new account.",
    "errorType": "EMAIL_NOT_FOUND"
  }
  ```
  ```json
  {
    "message": "Invalid password. Please try again.",
    "errorType": "INVALID_PASSWORD"
  }
  ```

#### 2. Admin Register

- **URL**: `POST /api/admin/register`
- **Body**:
  ```json
  {
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here",
    "admin": {
      "id": "admin_id",
      "email": "admin@example.com",
      "name": "Admin Name",
      "role": "admin"
    }
  }
  ```

#### 3. Check Email Exists

- **URL**: `POST /api/admin/check-email`
- **Body**:
  ```json
  {
    "email": "admin@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "If the email exists, a password reset link will be sent.",
    "exists": true
  }
  ```

#### 4. Admin Forgot Password

- **URL**: `POST /api/admin/forgot-password`
- **Body**:
  ```json
  {
    "email": "admin@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP sent successfully to your email",
    "email": "admin@example.com"
  }
  ```

#### 5. Admin Verify OTP

- **URL**: `POST /api/admin/verify-otp`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP verified successfully",
    "email": "admin@example.com"
  }
  ```

#### 6. Admin Reset Password

- **URL**: `POST /api/admin/reset-password`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "newPassword": "newpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset successfully"
  }
  ```

## Frontend Implementation

### API Service (`src/services/api.ts`)

- Centralized API service for all admin authentication calls
- Proper error handling and response formatting
- TypeScript interfaces for type safety
- Configurable base URL via environment variables
- Enhanced error type handling for better user feedback
- **Forgot Password Methods**: `adminForgotPassword()`, `adminVerifyOTP()`, `adminResetPassword()`

### AuthContext Updates (`src/contexts/AuthContext.tsx`)

- **Login Function**: Now calls `apiService.adminLogin()` with enhanced error handling
- **Register Function**: Now calls `apiService.adminRegister()`
- **Token Management**: Stores JWT tokens from API responses
- **User State**: Manages admin user data from API responses
- **Error Types**: Handles specific error types (EMAIL_NOT_FOUND, INVALID_PASSWORD)

### Form Updates

- **LoginPage**: Enhanced error handling with specific error messages and forgot password dialog
- **RegisterPage**: Enhanced validation and API error handling
- **ForgotPasswordDialog**: Complete forgot password flow with OTP verification
- **Error Handling**: Toast notifications with context-specific error messages

## Environment Configuration

Create a `.env` file in the Admin Panel root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Database Schema

### Admin Model (`backend/models/Admin.js`)

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" },
  createdAt: { type: Date, default: Date.now }
}
```

## Security Features

### Enhanced Login Security

1. **Email Existence Check**: First verifies if email exists before password check
2. **Specific Error Messages**: Different messages for email not found vs invalid password
3. **Security Best Practices**: Prevents email enumeration attacks
4. **Password Hashing**: All passwords are hashed using bcrypt
5. **JWT Tokens**: Secure token-based authentication
6. **Input Validation**: Server-side validation using express-validator
7. **CORS**: Proper CORS configuration for cross-origin requests
8. **Helmet**: Security headers for protection

## Error Handling

### Frontend

- **Specific Error Types**: Handles EMAIL_NOT_FOUND and INVALID_PASSWORD separately
- **User-Friendly Messages**: Context-specific error messages
- **Network Error Handling**: Proper handling of network failures
- **Form Validation**: Client-side validation with immediate feedback

### Backend

- **Validation Errors**: Detailed validation messages
- **Email Existence**: Checks email before password verification
- **Duplicate Email Prevention**: Prevents registration with existing emails
- **Server Error Handling**: Proper HTTP status codes and error messages
- **Database Error Handling**: Graceful handling of database errors

## Usage

1. **Start Backend Server**:

   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Admin Panel**:

   ```bash
   cd "Admin Panel"
   npm install
   npm run dev
   ```

3. **Register New Admin**:

   - Navigate to `/admin/register`
   - Fill in the registration form
   - Account will be created and auto-login will occur

4. **Login**:
   - Navigate to `/admin/login`
   - Use registered credentials to login
   - Get specific feedback for email/password issues

## Enhanced Login Flow

### New Security Features:

1. **Email Verification First**: System checks if email exists before attempting password verification
2. **Specific Error Messages**:
   - "Email not found. Please check your email or register a new account."
   - "Invalid password. Please try again."
3. **Better User Experience**: Users know exactly what went wrong
4. **Security Enhancement**: Prevents timing attacks and provides better security

### Error Types:

- **EMAIL_NOT_FOUND**: Email doesn't exist in database
- **INVALID_PASSWORD**: Email exists but password is incorrect
- **NETWORK_ERROR**: Connection issues
- **VALIDATION_ERROR**: Form validation failures

## Forgot Password Functionality

### Complete Password Reset Flow:

1. **Email Submission**: User enters admin email address
2. **OTP Generation**: System generates 6-digit OTP and sends via email
3. **OTP Verification**: User enters OTP for verification
4. **Password Reset**: User creates new password after OTP verification
5. **Auto-login**: User can immediately login with new password

### Security Features:

- **OTP Expiration**: OTPs expire after 10 minutes
- **One-time Use**: OTPs can only be used once
- **Email Validation**: Only registered admin emails can request password reset
- **Password Requirements**: New passwords must be at least 6 characters
- **Admin-specific**: Separate OTP system for admin users

### User Experience:

- **Step-by-step Flow**: Clear progression through email → OTP → password
- **Countdown Timer**: 60-second countdown for OTP resend
- **Error Handling**: Specific error messages for each step
- **Loading States**: Visual feedback during API calls
- **Success Feedback**: Clear confirmation of password reset

## Migration from Dummy Logic

The following dummy logic has been replaced with real API calls:

### Previously (Dummy Logic)

- Local storage-based user management
- Hardcoded demo credentials
- No server-side validation
- No password hashing
- Generic error messages

### Now (API Implementation)

- Database-backed user management
- Real JWT authentication
- Server-side validation and security
- Proper password hashing and storage
- Specific error messages with error types
- Enhanced security with email existence checking

## Testing

1. **Registration Test**:

   - Try registering with invalid email format
   - Try registering with existing email
   - Verify password confirmation validation

2. **Login Test**:

   - Try logging in with non-existent email (should show EMAIL_NOT_FOUND)
   - Try logging in with wrong password (should show INVALID_PASSWORD)
   - Verify successful login flow

3. **Error Handling Test**:

   - Test network disconnection scenarios
   - Verify specific error messages are displayed
   - Test form validation errors

4. **Token Management**:
   - Verify tokens are stored in localStorage
   - Test logout functionality
   - Verify session persistence
