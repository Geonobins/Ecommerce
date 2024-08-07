import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductsPage from './pages/ProductsPage';
import ProfilesPage from './pages/ProfilesPage';
import AddProductPage from './pages/AddProductPage';
import { useEffect } from 'react';
import { addProducts, initDB } from './utils/db';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, validateCartItems } from '@/features/cart/cartSlice';
import getCartItemsFromLocalStorage from '@/utils/api/getCart';
import { RootState } from './app/store';
import saveCartItemsToLocalStorage from './utils/api/saveCart';
import Actions from './pages/Actions';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const isAdmin = user?.nickname === "admin";
  console.log("admin?", isAdmin);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    if (user?.email) {
      const storedCarts = getCartItemsFromLocalStorage(user.email);
      dispatch(validateCartItems(storedCarts))
        .unwrap()
        .then((validItems: { id: number; quantity: number; }[]) => dispatch(setCartItems(validItems)));
    }
  }, [isAuthenticated, user?.email, dispatch]);

  useEffect(() => {
    if (user?.email) {
      saveCartItemsToLocalStorage(user.email, cartItems);
    }
  }, [cartItems, user?.email]);

  useEffect(() => {
    const fetchAndStoreProducts = async () => {
      const db = await initDB();
      const cachedProducts = await db.getAll('products');

      if (cachedProducts.length === 0) {
        try {
          const response = await axios.get('https://jsondummy.vercel.app/api/products?type=furniture');
          const products = response.data.products;
          console.log("app.tsx", products);
          await addProducts(db, products); // Store fetched products in IndexedDB
          console.log('Products stored in IndexedDB');
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        console.log('Using cached products from IndexedDB');
        console.log(cachedProducts);
      }
    };

    fetchAndStoreProducts();
  }, []);

  console.log("CartItems", cartItems);

  return (
    <div>
      <Routes>
        <Route path="/home" index element={<HomePage />} />
        <Route path="/home/profile" element={<ProfilesPage />} />
        <Route path="/home/profile/dashboard" element={<Dashboard />} />
        <Route path="/home/profile/actions" element={<Actions />} />
        <Route path="/home/products/:productId" element={<ProductDetails />} />
        <Route path="/home/products/:id/checkout" element={<CheckoutPage />} />
        <Route path="/home/products/checkout" element={<CheckoutPage />} />
        <Route path="/home/:navStatus" element={<ProductsPage />} />
        <Route path="/home/admin/:action" element={isAdmin ? <AddProductPage /> : <NotFoundPage />} />
        <Route path="/home/admin/:id/:action" element={isAdmin ? <AddProductPage /> : <NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
