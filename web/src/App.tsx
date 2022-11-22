import { BrowserRouter as RouterProvider } from "react-router-dom";

import AuthContextProvider from './contexts/AuthContext';

import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="bg-gray-150 flex h-screen max-h-screen">
      <AuthContextProvider>
        <RouterProvider>
          <AppRoutes />
        </RouterProvider>
      </AuthContextProvider>
    </div>
  );
}
