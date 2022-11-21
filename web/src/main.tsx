import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthContextProvider from './contexts/AuthContext';
import App from './App';

import "./index.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
