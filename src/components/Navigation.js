import React from 'react';

const Navigation = ({ keycloak, currentPage, setCurrentPage }) => {
  return (
    <div className="header">
      <h1>React Keycloak Demo</h1>
      <div>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{ backgroundColor: currentPage === 'home' ? '#0056b3' : '#007bff' }}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('protected')}
          style={{ backgroundColor: currentPage === 'protected' ? '#0056b3' : '#007bff' }}
        >
          Protected Page
        </button>
        {keycloak.authenticated ? (
          <>
            <button 
              onClick={() => setCurrentPage('profile')}
              style={{ backgroundColor: currentPage === 'profile' ? '#0056b3' : '#007bff' }}
            >
              Profile
            </button>
            <button 
              className="logout"
              onClick={() => keycloak.logout()}
            >
              Logout ({keycloak.tokenParsed?.preferred_username})
            </button>
          </>
        ) : (
          <button onClick={() => keycloak.login()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;