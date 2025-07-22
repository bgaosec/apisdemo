# React Keycloak Demo

A simple React application demonstrating integration with Keycloak for authentication and authorization.

## Features

- User authentication with Keycloak
- Protected routes
- User profile display
- Token refresh handling
- Simple navigation between pages

## Prerequisites

1. **Node.js** (version 14 or higher)
2. **Keycloak Server** running locally or accessible

## Keycloak Setup

Before running the application, you need to set up Keycloak:

### 1. Install and Run Keycloak

Download Keycloak from [https://www.keycloak.org/downloads](https://www.keycloak.org/downloads)

Start Keycloak:
```bash
# For Keycloak 17+
bin/kc.sh start-dev

# For older versions
bin/standalone.sh -Djboss.socket.binding.port-offset=0
```

### 2. Configure Keycloak

1. Access Keycloak Admin Console: `http://localhost:8080`
2. Create a new realm called `demo-realm`
3. Create a new client:
   - Client ID: `react-demo-client`
   - Client Type: `OpenID Connect`
   - Client authentication: `Off` (public client)
   - Valid redirect URIs: `http://localhost:3000/*`
   - Web origins: `http://localhost:3000`

### 3. Update Configuration

Edit `src/keycloak.js` to match your Keycloak setup:

```javascript
const keycloakConfig = {
  url: 'http://localhost:8080/', // Your Keycloak server URL
  realm: 'demo-realm', // Your realm name
  clientId: 'react-demo-client', // Your client ID
};
```

## Installation and Running

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

- **Home Page**: Shows welcome message and login status
- **Protected Page**: Only accessible when authenticated
- **Profile Page**: Displays user information from Keycloak token
- **Login/Logout**: Authentication controls in the navigation

## Project Structure

```
src/
├── components/
│   ├── Navigation.js      # Navigation bar with auth controls
│   ├── ProtectedRoute.js  # Component for protecting routes
│   └── UserProfile.js     # User profile display
├── keycloak.js           # Keycloak configuration
├── App.js               # Main application component
├── index.js            # Application entry point
└── index.css          # Styles
```

## Key Features Explained

### Authentication Flow
- Uses `check-sso` mode to check if user is already authenticated
- Automatic token refresh before expiration
- Graceful handling of authentication failures

### Protected Routes
- Components wrapped with `ProtectedRoute` require authentication
- Automatic redirect to login if not authenticated

### User Information
- Extracts user data from JWT token
- Displays username, email, roles, etc.

## Troubleshooting

1. **CORS Issues**: Ensure Keycloak client has correct web origins configured
2. **Redirect Issues**: Check that redirect URIs match exactly
3. **Token Issues**: Verify client configuration and realm settings

## Next Steps

- Add role-based access control
- Implement API calls with bearer tokens
- Add more sophisticated routing with React Router
- Integrate with backend services