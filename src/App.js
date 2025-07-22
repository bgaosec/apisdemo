import React, { useState, useEffect } from 'react';
import keycloak from './keycloak';
import Navigation from './components/Navigation';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Initialize Keycloak
    keycloak.init({
      onLoad: 'check-sso', // Options: 'login-required', 'check-sso'
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256'
    }).then((authenticated) => {
      console.log('Keycloak initialized. Authenticated:', authenticated);
      setKeycloakInitialized(true);
    }).catch((error) => {
      console.error('Keycloak initialization failed:', error);
      setKeycloakInitialized(true); // Still set to true to show the app
    });

    // Token refresh
    keycloak.onTokenExpired = () => {
      console.log('Token expired, refreshing...');
      keycloak.updateToken(30).then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed');
        } else {
          console.log('Token not refreshed, valid for another 30 seconds');
        }
      }).catch(() => {
        console.log('Failed to refresh token');
        keycloak.login();
      });
    };
  }, []);

  if (!keycloakInitialized) {
    return (
      <div className="app">
        <div className="content">
          <h2>Loading...</h2>
          <p>Initializing authentication...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div>
            <h2>Welcome to React Keycloak Demo</h2>
            <p>This is a simple demonstration of integrating React with Keycloak for authentication.</p>
            {keycloak.authenticated ? (
              <div className="user-info">
                <h3>You are logged in!</h3>
                <p>Welcome, {keycloak.tokenParsed?.preferred_username}!</p>
                <p>Try navigating to the Protected Page or view your Profile.</p>
              </div>
            ) : (
              <div>
                <p>You are not logged in. Click the Login button to authenticate.</p>
              </div>
            )}
          </div>
        );
      case 'protected':
        return (
          <ProtectedRoute keycloak={keycloak}>
            <div className="protected-content">
              <h2>Protected Content</h2>
              <p>This content is only visible to authenticated users.</p>
              <p>Your access token is valid and you have permission to view this page.</p>
            </div>
          </ProtectedRoute>
        );
      case 'profile':
        return (
          <ProtectedRoute keycloak={keycloak}>
            <div>
              <h2>User Profile</h2>
              <UserProfile keycloak={keycloak} />
            </div>
          </ProtectedRoute>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="app">
      <Navigation 
        keycloak={keycloak} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;