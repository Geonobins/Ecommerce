import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartButton from './CartButton';
import ButtonComponent from './ButtonComponent';
import Cart from '../icons/shopping-cart.png';


const Card = (props: any) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/products/${props.id}`);
  };

  const handleBuyNow = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation(); // Prevents the event from bubbling up to the parent div
    navigate(`/home/products/${props.id}/checkout`, { state: { totalPrice: props.price } });
  };

  const { getItemQuantity,increaseItemQuantity, decreaseItemQuantity} = useShoppingCart()
  const quantity = getItemQuantity(props.id);

  const handleDecreaseCart = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation(); 
    decreaseItemQuantity(props.id)
  }

  const handleIncreaseCart = (event: { stopPropagation: () => void; }) =>{
    event.stopPropagation(); 
    increaseItemQuantity(props.id)
  }
  return (
    <div
      className="w-60 p-2 flex flex-col justify-between bg-white rounded-x1 transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0"
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
        <CartButton quantity={quantity} src ={Cart}/>
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
