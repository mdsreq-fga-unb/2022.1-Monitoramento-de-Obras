import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes/index.routes';



function App() {
  
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
