import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Bag from "../icons/shopping-bag.png";
import Logo from './Logo';
import CartButton from './CartButton';
import ButtonComponent from './ButtonComponent';
import Profile from './ProfileButton';
import { useAuth0 } from '@auth0/auth0-react';
import { getCartQuantity, openCart } from '@/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import useTranslations from '@/hooks/useTranslations';

type NavbarProps = {
  setSearchQuery?: (arg: string) => void;
}

const Navbar = ({ setSearchQuery }: NavbarProps) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = useSelector((state: RootState) => getCartQuantity(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { isAuthenticated } = useAuth0();
  
  const t = useTranslations();
  
  const handleCart = () => {
    if (isAuthenticated) {
      dispatch(openCart());
    } else {
      alert("Login to manage cart");
    }
  };

  const handleNavigation = (path: string) => {
    navigate(`/home/${path}`);
  };

  const handleSearchChange = (e: { target: { value: string }; }) => {
    setSearch(e.target.value);
    setSearchQuery && setSearchQuery(e.target.value);
  };

  // Define paths for comparison
  const paths = {
    home: '/home/',
    allProducts: '/home/all%20products',
    livingRoom: '/home/Living%20Room',
    dining: '/home/Dining',
    bedroom: '/home/Bedroom',
  };

  const isHomepage = location.pathname === '/home' || location.pathname === '/home/';
  // Determine the active path
  const getButtonClass = (path: string) => location.pathname === path ? 'md:bg-slate-300 h-1.5 animate-grow duration-300 ' : '';

  return (
    <nav className="flex items-center justify-between flex-wrap fixed top-0 bg-white min-w-[100%] z-40 shadow-sm">
      <div className="flex items-center m-6 flex-shrink-0 text-gray-600 mr-6 lg:mr-72">
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
        className={`w-full block flex-grow md:flex md:w-auto ${isOpen ? "block" : "hidden"}`}
      >
        <div className="md:flex text-sm md:flex-grow min-h-full items-center">
          <div className="block h-full md:pt-8 mt-4 md:inline-block md:mt-0 text-white-200 mr-4 hover:bg-slate-50 duration-300 cursor-pointer" onClick={() => { handleNavigation("") }}>
            <ButtonComponent value={t["Home"]} cl="hover:bg-slate-50 " />
            <div className={`w-full  md:mt-9 ${getButtonClass(paths.home)}`}></div>
          </div>
          <div className="block h-full md:pt-8 mt-4 md:inline-block md:mt-0 text-white-200 mr-4 hover:bg-slate-50 duration-300 cursor-pointer" onClick={() => { handleNavigation("all products") }}>
            <ButtonComponent value={t["All Products"]} cl="hover:bg-slate-50"/>
            <div className={`w-full md:mt-9 ${getButtonClass(paths.allProducts)}`}></div>
          </div>
          <div className="block h-full md:pt-8 mt-4 md:inline-block md:mt-0 text-white-200 mr-4 hover:bg-slate-50 duration-300 cursor-pointer" onClick={() => { handleNavigation("Living Room") }}>
            <ButtonComponent value={t["Living"]} cl="hover:bg-slate-50"/>
            <div className={`w-full md:mt-9 ${getButtonClass(paths.livingRoom)}`}></div>
          </div>
          <div className="block h-full md:pt-8 mt-4 md:inline-block md:mt-0 text-white-200 mr-4 hover:bg-slate-50 duration-300 cursor-pointer" onClick={() => { handleNavigation("Dining") }}>
            <ButtonComponent value={t["Dining"]}  cl="hover:bg-slate-50"/>
            <div className={`w-full md:mt-9 ${getButtonClass(paths.dining)}`}></div>
          </div>
          <div className="block h-full md:pt-8 mt-4 md:inline-block md:mt-0 text-white-200 mr-4 hover:bg-slate-50 duration-300 cursor-pointer" onClick={() => { handleNavigation("Bedroom") }}>
            <ButtonComponent value={t["Bedroom"]} cl="hover:bg-slate-50"/>
            <div className={`w-full md:mt-9 ${getButtonClass(paths.bedroom)}`}></div>
          </div>
        </div>
        <div className='flex flex-row gap-4 m-6'>
          {/* Conditionally render the search input */}
          { !isHomepage && (
            <input
              type="text"
              placeholder={`${t["Search"]}...`}
              value={search}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md p-2"
            />
          )}
          <Profile />
          <div onClick={handleCart}>
            <CartButton src={Bag} quantity={cartQuantity} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
