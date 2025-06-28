# Frontend API Implementation

## Authentication API Calls

### Overview

The frontend now includes real API calls for user authentication (login and register) that connect to the backend server.

### API Service (`src/services/api.js`)

#### Authentication Methods:

- `login(credentials)` - Authenticates user with email and password
- `register(userData)` - Registers a new user with name, email, and password

#### Forgot Password Methods:

- `forgotPassword(email)` - Sends OTP to user's email for password reset
- `verifyOTP(email, otp)` - Verifies the OTP code entered by user
- `resetPassword(email, newPassword)` - Resets user's password after OTP verification

#### Utility Methods:

- `isAuthenticated()` - Checks if user has a valid token
- `getAuthHeaders()` - Returns authorization headers for protected requests

### Components Updated:

#### 1. Login Component (`src/pages/Login.tsx`)

- **Before**: Used mock implementation with setTimeout
- **After**: Uses `apiService.login()` with real API call
- **Features**:
  - Real authentication against backend
  - Proper error handling
  - Automatic navigation on success
  - **Toast Notifications**:
    - ✅ Success toast on successful login
    - ❌ Error toast on login failure
    - 👍 Encouragement toast when user fixes input errors
  - **Dummy Mode**: Commented dummy implementation available for testing
  - **Forgot Password**: Integrated forgot password dialog

#### 2. Register Component (`src/pages/Register.tsx`)

- **Before**: Used mock implementation with setTimeout
- **After**: Uses `apiService.register()` with real API call
- **Features**:
  - Real user registration against backend
  - Form validation before submission
  - Proper error handling
  - Automatic login after successful registration
  - **Toast Notifications**:
    - ✅ Success toast on successful registration
    - ❌ Error toast on registration failure
    - ⚠️ Validation error toasts for form validation
    - 👍 Encouragement toast when user fixes input errors
  - **Dummy Mode**: Commented dummy implementation available for testing

#### 3. ForgotPasswordDialog Component (`src/components/ForgotPasswordDialog.tsx`)

- **New Component**: Multi-step password reset dialog
- **Features**:
  - **Step 1**: Email input with validation
  - **Step 2**: OTP verification with countdown timer
  - **Step 3**: New password creation with confirmation
  - **Real-time Feedback**: Toast notifications for all actions
  - **Resend OTP**: 60-second countdown with resend functionality
  - **Password Validation**: Strength and confirmation checks
  - **Responsive Design**: Works on all screen sizes

#### 4. AuthContext (`src/contexts/AuthContext.tsx`)

- **Enhanced**: Added JWT token decoding
- **Features**:
  - Decodes JWT tokens to extract user information
  - Checks token expiration
  - Automatic logout on expired tokens
  - Proper user state management

### Forgot Password Flow

The forgot password functionality provides a secure, multi-step process:

#### 1. Email Verification

- User enters their email address
- System checks if email exists in database
- If valid, sends 6-digit OTP via email

#### 2. OTP Verification

- User enters the 6-digit OTP received via email
- System validates OTP and marks it as used
- OTP expires after 10 minutes

#### 3. Password Reset

- User creates a new password with confirmation
- System validates password strength
- Password is updated in database

### Dummy Mode for Testing

Both Login and Register components now include commented dummy implementations for easy testing without a backend server:

#### Login Dummy Mode:

```javascript
// DUMMY LOGIN FOR TESTING (uncomment to use)
// await new Promise((resolve) => setTimeout(resolve, 1000));
// if (formData.email && formData.password) {
//   login("dummy-jwt-token-123", { email: formData.email });
//   toast({
//     title: "Login Successful!",
//     description: "Welcome back to SkillTwin.",
//   });
//   navigate("/");
//   return;
// } else {
//   throw new Error("Please fill in all fields");
// }
```

#### Register Dummy Mode:

```javascript
// DUMMY REGISTRATION FOR TESTING (uncomment to use)
// await new Promise((resolve) => setTimeout(resolve, 1500));
// if (formData.name && formData.email && formData.password) {
//   login("dummy-jwt-token-456", { name: formData.name, email: formData.email });
//   toast({
//     title: "Registration Successful!",
//     description: "Welcome to SkillTwin! Your account has been created.",
//   });
//   navigate("/");
//   return;
// } else {
//   throw new Error("Please fill in all required fields");
// }
```

#### How to Use Dummy Mode:

1. **Comment out** the real API call section
2. **Uncomment** the dummy implementation section
3. **Test** the authentication flow without backend
4. **Switch back** to real API calls when ready

### Toast Notification System

The application now includes comprehensive toast notifications for better user experience:

#### Success Notifications:

- **Login Success**: "Login Successful! Welcome back to SkillTwin."
- **Registration Success**: "Registration Successful! Welcome to SkillTwin! Your account has been created."
- **OTP Sent**: "OTP Sent! Check your email for the 6-digit OTP code."
- **OTP Verified**: "OTP Verified! Please create your new password."
- **Password Reset**: "Password Reset Successful! Your password has been updated."

#### Error Notifications:

- **Login Errors**: Shows specific error messages from backend
- **Registration Errors**: Shows specific error messages from backend
- **OTP Errors**: Shows OTP-related error messages
- **Validation Errors**: Shows form validation errors with specific messages

#### User Feedback:

- **Input Correction**: Encouragement toast when users fix input errors
- **Real-time Feedback**: Immediate feedback for user actions

### API Endpoints Used:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Send password reset OTP
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/reset-password` - Reset user password

### Error Handling:

- Network errors are caught and displayed to users
- Backend validation errors are properly handled
- User-friendly error messages
- Toast notifications for all error states

### Security Features:

- JWT tokens are stored in localStorage
- Tokens are automatically checked for expiration
- Protected routes can use `getAuthHeaders()` for API calls
- OTP expiration and single-use validation
- Password strength validation

### Usage Example:

```javascript
// Login
const response = await apiService.login({
  email: "user@example.com",
  password: "password123",
});

// Register
const response = await apiService.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
});

// Forgot Password
await apiService.forgotPassword("user@example.com");
await apiService.verifyOTP("user@example.com", "123456");
await apiService.resetPassword("user@example.com", "newpassword123");
```

### Backend Requirements:

- Server must be running on `http://localhost:8000`
- JWT_SECRET environment variable must be set (or fallback to "SkillTwinJWT@123")
- CORS must be properly configured for frontend requests
- Email configuration for OTP sending (see `backend/FORGOT_PASSWORD_SETUP.md`)
