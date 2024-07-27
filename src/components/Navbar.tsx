import { SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Bag from "../icons/shopping-bag.png"
import Logo from './Logo';
import CartButton from './CartButton';
import { useShoppingCart } from '../context/ShoppingCartContext';
import ButtonComponent from './ButtonComponent';

const Navbar = ({ setSearchQuery }:any) => {
  const { openCart, cartQuantity } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleCart = () => {
    openCart();
  };

  const handleNavigation = (str:string) => {
    navigate(`/home/${str}`);
  };

  const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-gray-600 mr-6 lg:mr-72">
        <Logo />
      </div>
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}
      >
        <div className="text-sm md:flex-grow">
          <div className="block mt-4 md:inline-block md:mt-0 text-white-200 mr-4" onClick={() => { handleNavigation("") }}>
          <ButtonComponent value="Home" bg=""/>
          </div>
          <div className="block mt-4 md:inline-block md:mt-0 text-white-200 mr-4" onClick={() => { handleNavigation("all products") }}>
            <ButtonComponent value="All Products" />
          </div>
          <div className="block mt-4 md:inline-block md:mt-0 text-white-200 mr-4" onClick={() => { handleNavigation("Living Room") }}>
            <ButtonComponent value="Living" />
          </div>
          <div className="block mt-4 md:inline-block md:mt-0 text-white-200 mr-4" onClick={() => { handleNavigation("Dining") }}>
            <ButtonComponent value="Dining" />
          </div>
          <div className="block mt-4 md:inline-block md:mt-0 text-white-200 mr-4" onClick={() => { handleNavigation("Bedroom") }}>
            <ButtonComponent value="Bedroom" />
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md p-2"
          />
          <div onClick={handleCart}>
            <CartButton src={Bag} quantity={cartQuantity} />
          </div>
          <button className="rounded-lg inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
