/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Inventory from "./pages/Inventory";
import Purchase from "./pages/Purchase";
import Logistics from "./pages/Logistics";
import AfterSale from "./pages/AfterSale";
import Finance from "./pages/Finance";
import Report from "./pages/Report";
import Setting from "./pages/Setting";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="after-sale" element={<AfterSale />} />
          <Route path="finance" element={<Finance />} />
          <Route path="report" element={<Report />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
