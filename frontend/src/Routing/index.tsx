import SaleComponent from "components/SaleComponent";
import SellerComponent from "components/SellerComponent";
import SellersList from "components/SellersList";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Routing = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/sellers-list" element={<SellersList/>}></Route>
                    <Route path="/add-seller" element={<SellerComponent/>}></Route>
                    <Route path="/edit-seller/:id" element={<SellerComponent/>}></Route>
                    <Route path="/sales-list" element={<SaleComponent/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing;