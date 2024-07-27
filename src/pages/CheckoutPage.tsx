import { useLocation, useParams } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext'
import CheckoutItem from '../components/CheckoutItem';


const CheckoutPage = () => {

  const { id } = useParams<{ id: string }>();
  // const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };
  console.log(totalPrice)

  const { cartItems } = useShoppingCart();
  let products = [];
  if (id) {
    products = [{ id: id, quantity: 1 }]
  } else {
    products = cartItems;
    console.log(products)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Checkout</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            
            {products.map((product) => (
                <CheckoutItem id={Number(product.id)} quantity={product.quantity} />
            ))}
          </div>

          <div className="mt-6 sticky top-32 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${totalPrice+4.99}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Confirm Purchase</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
