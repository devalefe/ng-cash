import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="bg-gray-150 flex h-screen max-h-screen">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}
