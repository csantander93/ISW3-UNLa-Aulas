import React from 'react';
import styled from 'styled-components';

// Estilizando el cartel de carga
const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Asegura que esté sobre otros elementos */
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Gris claro */
  border-top: 4px solid #8f0d0d; /* Rojo */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite; /* Animación de rotación */
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingSpinner = ({ isLoading }) => {
  // Si isLoading es true, mostramos el cartel de carga, de lo contrario, no mostramos nada
  return (
    <>
      {isLoading && (
        <SpinnerOverlay>
          <Spinner />
        </SpinnerOverlay>
      )}
    </>
  );
};

export default LoadingSpinner;
