
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

import ProductDetails from './pages/ProductDetails'
import CheckoutPage from './pages/CheckoutPage'
import { ShoppingCartProvider, useShoppingCart } from './context/ShoppingCartContext';
import NotFoundPage from './pages/NotFoundPage'
import ProductsPage from './pages/ProductsPage';
import ProfilesPage from './pages/ProfilesPage';
import AddProductPage from './pages/AddProductPage';
import {  useEffect } from 'react';
import { addProducts, initDB } from './utils/db';
import axios from 'axios';




const App = () => {

  // ----------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchAndStoreProducts = async () => {
      const db = await initDB();
      const cachedProducts = await db.getAll('products');

      if (cachedProducts.length === 0) {
        try {
          const response = await axios.get('https://jsondummy.vercel.app/api/products?type=furniture');
          const products = response.data.products;
          console.log("app.tsx",products)
          await addProducts(db, products); // Store fetched products in IndexedDB
          console.log('Products stored in IndexedDB');
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        console.log('Using cached products from IndexedDB');
        console.log(cachedProducts)
      }
    };

    fetchAndStoreProducts();
  }, []);

  

  

  //----------------------------------------------------------------------------------------------------------------------------

  //=======================================================

  const{cartItems} = useShoppingCart()
  console.log("CartItems",cartItems);
  //=================================================

  return (
    <div>
      <ShoppingCartProvider>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          <Route path="/" index element={<HomePage />} />
          <Route path="/profile" index element={<ProfilesPage />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/:id/checkout" element={<CheckoutPage />} />
          <Route path="/products/checkout" element={<CheckoutPage />} />
          <Route path="/:navStatus" element={<ProductsPage/>}/>
          <Route path="/admin/:action" element={<AddProductPage/>}/>
          <Route path="/admin/:id/:action" element={<AddProductPage/>}/>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </ShoppingCartProvider>
    </div>
  )
}

export default App
