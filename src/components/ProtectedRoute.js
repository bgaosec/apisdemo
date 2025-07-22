import React from 'react';

const ProtectedRoute = ({ keycloak, children }) => {
  if (!keycloak.authenticated) {
    return (
      <div className="protected-content">
        <h2>Access Denied</h2>
        <p>You need to be logged in to view this content.</p>
        <button onClick={() => keycloak.login()}>
          Login to Access
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;