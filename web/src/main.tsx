import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as RouterProvider } from "react-router-dom";

import AuthContextProvider from './contexts/AuthContext';

import App from './App';

import "./index.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </RouterProvider>
  </React.StrictMode>
);
