import React from 'react';
import { ToastContainer } from 'react-toastify'
import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={3002} />
    </>    
  );
}

export default App;
