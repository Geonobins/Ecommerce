import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '../components/Navbar';
import { RootState } from '@/app/store'
import {useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react';
import { addOrder } from '@/features/orders/ordersSlice';
import { clearCart } from '@/features/cart/cartSlice';
import { decreaseProductAvailability, initDB } from '@/utils/db';
import useTranslations from '@/hooks/useTranslations';
const CheckoutPage = () => {

  const t= useTranslations();
  const { id } = useParams<{ id: string }>();
  // const [products, setProducts] = useState<Product[]>([]);
  const {user} = useAuth0()
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { totalPrice } = location.state || { totalPrice: 0 };

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  let products = [];
  if (id) {
    products = [{ id: Number(id), quantity: 1 }]
  } else {
    products = cartItems;
  }
  const handleCheckout = async ()=>
  {
    try {
      const db = await initDB(); // Initialize IndexedDB

      // Loop through each product in the cart and decrease availability
      for (const product of products) {
        console.log("Hello",products)
        await decreaseProductAvailability(db, product.id, product.quantity);
      }

      if (user?.email) {
        dispatch(addOrder({ email: user.email, products }));
        if (!id) {
          dispatch(clearCart());
        }
        // Redirect to success page
        navigate("/home/", { state: { showNotification: true, message: "Your order has been placed!" } });
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      // Handle errors, such as product out of stock
    }
  }

  return (
    <div className='flex flex-col min-h-screen '>
      <div className='flex-1'>
        <Navbar />
        <div className="min-h-screen bg-gray-100 pt-20 my-28">
          <h1 className="mb-10 text-center text-2xl font-bold">{t["Checkout"]}</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">

              {products.map((product) => (
                <CheckoutItem id={Number(product.id)} quantity={product.quantity} />
              ))}
            </div>

            <div className="mt-6 sticky top-32 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">{t["Subtotal"]}</p>
                <p className="text-gray-700">${totalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">{t["Shipping"]}</p>
                <p className="text-gray-700">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">{t["Total"]}</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${totalPrice + 4.99}</p>
                  <p className="text-sm text-gray-700">{t["including VAT"]}</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handleCheckout}>{t["Confirm Purchase"]}</button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />

    </div>
  );
};

export default CheckoutPage;
