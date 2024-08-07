import { useAuth0 } from '@auth0/auth0-react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setCartItems } from '@/features/cart/cartSlice';
// import getCartItemsFromLocalStorage from '@/utils/api/getCart';
// import { useNavigate } from 'react-router-dom';



const ProfileButton = () => {

  // const [user, setUser] = useState<any>(null); // Initialize user as null

  const { loginWithRedirect, logout, user,  isLoading } = useAuth0();
  const navigate = useNavigate()

  const handleLogin = () => {

    loginWithRedirect()
  };

  const handleLogout = async () => {
    try {
      logout({ logoutParams: { returnTo: window.location.origin } });

    } catch (error) {
      console.error(error);
    }
  };


  //  // Update user state if authUser changes
  //  useEffect(() => {
  //     if (authUser) {
  //       setUser(authUser);
  //       localStorage.setItem("user", JSON.stringify(authUser)); // Update local storage
  //     }
  //   }, [authUser]);

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  // console.log(checkPermissions(user))
  return (

    (
      <div className='flex z-50'>
      <Popover className="relative bg-white ">
        <PopoverButton className="flex">
          <UserCircleIcon className='size-10 text-gray-300 hover:text-gray-500' />
          <ChevronDownIcon className="size-5 text-gray-300 group-data-[open]:rotate-180" />
        </PopoverButton>

        <PopoverPanel anchor="bottom" transition className="flex origin-top flex-col text-gray-500 bg-slate-50 m-2 px-2 gap-2 py-2 min-w-60 rounded-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 z-50">

          {user ?
            <div >
              <div className='cursor-pointer flex flex-col hover:text-black' onClick={()=>navigate("/home/profile")}>
                <p className='text-md'>{`Hello ${user.nickname}`}</p>
                <p className='text-sm'>{user.email}</p>
              </div>
              <hr className='m-2' />
            </div> :
            <div>
              <div className='cursor-pointer flex flex-col hover:text-black'>
                <p className='text-md'>Welcome</p>
                <p className='text-sm'>To access account and manage orders</p>
              </div>
            </div>
          }
          {user ?
            <div onClick={handleLogout} className='cursor-pointer text-gray-600 flex'>
              Logout<LogOutIcon />
            </div> :
            <div onClick={handleLogin} className='cursor-pointer text-red-600'>
              Login/Sign-up
            </div>

          }

        </PopoverPanel>
      </Popover>
      </div>
    )
  )
}

export default ProfileButton
