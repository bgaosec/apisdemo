import Keycloak from 'keycloak-js';

// Keycloak configuration
const keycloakConfig = {
  url: 'http://localhost:8080/', // Your Keycloak server URL
  realm: 'demo-realm', // Your realm name
  clientId: 'react-demo-client', // Your client ID
};

// Initialize Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;