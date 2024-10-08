import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllProducts, initDB } from '@/utils/db'
import { RootState } from '@/app/store'
import { closeCart, } from '@/features/cart/cartSlice'
import { useAuth0 } from '@auth0/auth0-react'
import saveCartItemsToLocalStorage from '@/utils/api/saveCart'
import useTranslations from '@/hooks/useTranslations'
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  image: string[];
  availability: number;
  reviews: { id: number; user: string; rating: number; review: string; date: string }[];
  category: string[];
  subcategory: string;
}

type CartItem = {
    id: number;
    quantity: number;
  };


export default function ShoppingCart() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();

  const t = useTranslations();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems || []);
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);


  useEffect(() => {
    const fetchProductsFromDB = async () => {
      const db = await initDB();
      const productsFromDB = await getAllProducts(db);
      setProducts(productsFromDB);
    };

    fetchProductsFromDB();
  }, []);

  

  // Save cart items to localStorage whenever cartItems change
  useEffect(() => {
    if (user?.email) {
      saveCartItemsToLocalStorage(user.email, cartItems);
    }
  }, [cartItems, user?.email]);

  

  const price = cartItems.reduce((total, cartItem) => {
    const item = products.find(i => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const handleCheckout = () => {
    if(cartItems.length>0){
      navigate("/home/products/checkout", { state: { totalPrice: price } });
      dispatch(closeCart());
    }
    else{
      dispatch(closeCart());
    }
    
  };

  const handleCloseCart = () => {
    dispatch(closeCart())
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseCart} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">{t["Cart"]}</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={handleCloseCart}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <CartItem id={product.id} quantity={product.quantity} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>{t["Subtotal"]}</p>
                    <p>${price}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">{t["Shipping and taxes calculated at checkout."]}</p>
                  <div className="mt-6" onClick={handleCheckout}>
                    <div
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                    >
                      {t["Checkout"]}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      {t["or"]}{' '}
                      <button
                        type="button"
                        onClick={() => dispatch(closeCart())}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {t["Continue Shopping"]}
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
