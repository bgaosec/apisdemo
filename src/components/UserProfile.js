import React from 'react';

const UserProfile = ({ keycloak }) => {
  if (!keycloak.authenticated) {
    return null;
  }

  const { tokenParsed } = keycloak;

  return (
    <div className="user-info">
      <h3>User Information</h3>
      <p><strong>Username:</strong> {tokenParsed?.preferred_username || 'N/A'}</p>
      <p><strong>Email:</strong> {tokenParsed?.email || 'N/A'}</p>
      <p><strong>First Name:</strong> {tokenParsed?.given_name || 'N/A'}</p>
      <p><strong>Last Name:</strong> {tokenParsed?.family_name || 'N/A'}</p>
      <p><strong>Roles:</strong> {tokenParsed?.realm_access?.roles?.join(', ') || 'N/A'}</p>
    </div>
  );
};

export default UserProfile;