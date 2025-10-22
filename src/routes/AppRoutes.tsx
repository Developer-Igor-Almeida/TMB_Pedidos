import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { OrderNew } from "../features/orders/OrderNew";
import { OrderDetails } from "../features/orders/OrderDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<OrderNew />} />
      <Route path="/order/:id" element={<OrderDetails />} />
    </Routes>
  );
}
