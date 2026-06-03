import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userlayout from './components/Layout/Userlayout';
import Home from './pages/Home';
import ProductPage from './components/Common/ProductDetails';
import ProductDetailShow from './components/Common/PrductDetailShow';
import Profile from '@pages/Profile';
import Product from '@pages/Product';
import Cart from '@pages/Cart';
import Admin from '@pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route with Userlayout */}
        <Route path="/" element={<Userlayout />}>
          {/* Child Routes */}
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailShow />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="admin" element={<Admin/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
