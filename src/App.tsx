
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

import ProductDetails from './pages/ProductDetails'
import CheckoutPage from './pages/CheckoutPage'
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import NotFoundPage from './pages/NotFoundPage'
import ProductsPage from './pages/ProductsPage';
import ProfilesPage from './pages/ProfilesPage';




const App = () => {

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
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </ShoppingCartProvider>
    </div>
  )
}

export default App
