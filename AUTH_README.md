# Authentication System

This document describes the authentication system implemented for the Support Bot application.

## Overview

The authentication system includes:
- Login page (`/auth/login`)
- Signup page (`/auth/signup`)
- Protected routes via middleware
- AuthContext for state management
- API endpoints for authentication

## Features

### Login Page (`/auth/login`)
- Email and password authentication
- Password visibility toggle
- Remember me functionality
- Forgot password link
- Success/error messaging
- Auto-redirect after successful login

### Signup Page (`/auth/signup`)
- User registration with form validation
- Required fields: First name, Last name, Email, Password
- Optional fields: Company, Phone
- Password confirmation
- Terms and conditions acceptance
- Auto-redirect to login after successful signup

### Authentication Context
- Centralized user state management
- Login/logout functionality
- User session persistence
- Loading states

### Middleware Protection
- Automatic route protection
- Redirect unauthenticated users to login
- Prevent authenticated users from accessing auth pages
- Preserve intended destination for post-login redirect

## File Structure

```
src/
  app/
    auth/
      layout.jsx          # Auth-specific layout (no sidebar/navbar)
      login/
        page.jsx          # Login page component
      signup/
        page.jsx          # Signup page component
    api/
      auth/
        login/
          route.js        # Login API endpoint
        signup/
          route.js        # Signup API endpoint
  contexts/
    AuthContext.js        # Authentication context provider
  components/
    Navbar.js             # Updated with logout functionality
middleware.js             # Route protection middleware
```

## Usage

### Accessing Auth Pages
- Login: Navigate to `/auth/login`
- Signup: Navigate to `/auth/signup`

### API Integration
The authentication system uses these API endpoints:
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### State Management
Access authentication state in any component:

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated, loading } = useAuth();
  
  // Component logic here
}
```

### Logout
Users can logout by:
- Clicking the "Sign out" option in the user menu (top right)
- The logout function clears stored tokens and redirects to login

## Security Features

1. **Route Protection**: Middleware automatically redirects unauthenticated users
2. **Token Management**: Secure token storage and validation
3. **Form Validation**: Client-side and server-side validation
4. **Password Security**: Password strength requirements
5. **Error Handling**: Comprehensive error messages and validation

## Development Notes

### Current Implementation
- Uses localStorage for token storage (suitable for development)
- Basic validation and security measures
- Placeholder authentication logic in API routes

### Production Considerations
- Replace localStorage with secure HTTP-only cookies
- Implement proper password hashing (bcrypt)
- Add rate limiting for auth endpoints
- Implement email verification
- Add two-factor authentication
- Use proper JWT token management
- Implement session management
- Add password reset functionality

## Testing

### Test Credentials
Currently, the system accepts any email/password combination for testing purposes.

### Manual Testing
1. Visit `/auth/signup` to create an account
2. Fill out the registration form
3. Click "Create Account"
4. You'll be redirected to login page
5. Use any email/password to sign in
6. Access protected routes after authentication
7. Test logout functionality

## Error Handling

The system handles various error scenarios:
- Invalid credentials
- Missing form fields
- Network errors
- Server errors
- Validation errors

## Styling

The authentication pages use:
- Material-UI components for consistency
- Responsive design
- Clean, professional styling
- Loading states and animations
- Error/success messaging

## Future Enhancements

1. Email verification system
2. Password reset functionality
3. Social media authentication (Google, GitHub, etc.)
4. Two-factor authentication
5. Account management pages
6. Admin user management
7. Role-based access control
8. Session management dashboard
