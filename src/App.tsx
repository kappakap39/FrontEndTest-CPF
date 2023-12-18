import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import Index from './FrontEnd/Index';
import ShowUser from './FrontEnd/User/ShowUser';
import ShowProduct from './FrontEnd/Product/ShowProduct';
import CategoryProduct from './FrontEnd/Product/CategoryProduct';
import ShowOrder from './FrontEnd/Order/ShowOrder';
import OrderDetails from './FrontEnd/Order/OrderDetail';
import Login from './FrontEnd/Login';

function App() {
  return (
    <div>
      {/* เป็นเส้นทางติดต่อไปยัง Component อื่นๆ */}
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Index" element={<Index/>}></Route>
          <Route path="/ShowUser" element={<ShowUser/>}></Route>
          <Route path="/ShowProduct" element={<ShowProduct/>}></Route>
          <Route path="/CategoryProduct" element={<CategoryProduct/>}></Route>
          <Route path="/ShowOrder" element={<ShowOrder/>}></Route>
          <Route path="/OrderDetails" element={<OrderDetails/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
