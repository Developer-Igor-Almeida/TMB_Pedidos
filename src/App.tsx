import { BrowserRouter, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-blue-700 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">TMB Pedidos</Link>
        </div>
      </nav>
      <main className="p-6 bg-gray-50 min-h-screen">
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}
