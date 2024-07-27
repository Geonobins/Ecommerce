
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'

import ProductDetails from './pages/ProductDetails'
import CheckoutPage from './pages/CheckoutPage'
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import NotFoundPage from './pages/NotFoundPage'
import ProductsPage from './pages/ProductsPage';



const App = () => {

  return (
    <div>
      <ShoppingCartProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" index element={<HomePage />} />
          <Route path="/home/products/:productId" element={<ProductDetails />} />
          <Route path="/home/products/:id/checkout" element={<CheckoutPage />} />
          <Route path="/home/products/checkout" element={<CheckoutPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/home/:navStatus" element={<ProductsPage/>}/>
        </Routes>
      </ShoppingCartProvider>
    </div>
  )
}

export default App
