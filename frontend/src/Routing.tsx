import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SellerForm from "./pages/SellerForm";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sellers/new" element={<SellerForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
