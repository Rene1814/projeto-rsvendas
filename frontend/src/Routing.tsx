import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SellerForm from "./pages/SellerForm";
import Sellers from "./pages/Sellers";
import SaleForm from "./pages/SaleForm";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sellers/new" element={<SellerForm />} />
        <Route path="/sellers/:id/edit" element={<SellerForm />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sales/new" element={<SaleForm />} />
        <Route path="/sales/:id/edit" element={<SaleForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
