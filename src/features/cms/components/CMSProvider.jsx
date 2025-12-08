import React from 'react';

// CMSProvider simplificado - solo provee el contexto
// La inicialización real se hace en AdminPage
const CMSProvider = ({ children }) => {
  return <>{children}</>;
};

export default CMSProvider;