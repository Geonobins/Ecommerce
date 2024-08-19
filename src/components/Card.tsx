import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity, getItemQuantity } from '@/features/cart/cartSlice';
import { useAuth0 } from '@auth0/auth0-react';
import CartButton from './CartButton';
import ButtonComponent from './ButtonComponent';
import Cart from '../icons/shopping-cart.png';
import { RootState } from '@/app/store';


type CardProps={
  id:number
  image:string;
  name:string;
  description:string;
  price:number;
}
const Card = (props: CardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();
  const quantity = useSelector((state: RootState) => getItemQuantity(state, props.id));
  const handleClick = () => {
    navigate(`/home/products/${props.id}`);
  };

  const handleBuyNow = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    if (isAuthenticated) {
      navigate(`/home/products/${props.id}/checkout`, { state: { totalPrice: props.price * quantity } });
    } else {
      alert('Please log in to proceed with the purchase.');
    }
  };

  const handleIncreaseCart = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    if (isAuthenticated) {
      dispatch(increaseItemQuantity(props.id));
    } else {
      alert("Login to manage cart");
    }
  };

  const handleDecreaseCart = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    if (isAuthenticated) {
      dispatch(decreaseItemQuantity(props.id));
    }
  };
  return (
    <div
      className="w-60 p-2 min-h-96 mx-1 flex flex-col justify-between bg-white rounded-x1 transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0"
      onClick={handleClick}
    >
      <div>
        <img src={props.image} alt={props.name} className="max-h-40 w-full object-cover object-center rounded-xl" />
        <div className="p-2">
          <h2 className="font-bold text-lg mb-2">{props.name}</h2>
          <h3 className="font-bold text-lg mb-2">${props.price}</h3>
          <p className="text-sm text-gray-600 mt-2 mb-2 line-clamp-2">{props.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-center mb-3 gap-2">
        <div onClick={handleBuyNow}>
          <ButtonComponent value="Buy Now" bg="bg-gray-300" />
        </div>
        <div onClick={handleIncreaseCart}>
          <CartButton quantity={quantity} src={Cart} />
        </div>
        {quantity > 0 &&
          <div onClick={handleDecreaseCart}>
            <ButtonComponent value="-" bg="bg-gray-300" />
          </div>
        }
      </div>
    </div>
  );
};

export default Card;
