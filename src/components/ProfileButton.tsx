import { useAuth0 } from '@auth0/auth0-react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';


const ProfileButton = () => {

    const [user, setUser] = useState<any>(null); // Initialize user as null

    const { loginWithRedirect, logout, user: authUser, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
     // Load user from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log(storedUser)
      try {
        setUser(JSON.parse(storedUser)); // Parse stored user data
      } catch (error) {
        console.error("Failed to parse user data from local storage:", error);
      }
    }
  }, []);
  const handleLogin = async () => {
    if (!isAuthenticated) {
      try {
        await loginWithRedirect();
        // Use the authUser directly
        setUser(authUser);
        // localStorage.setItem("user", JSON.stringify(authUser)); // Store user info in local storage
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ logoutParams: { returnTo: window.location.origin } });
      setUser(null);
      localStorage.removeItem("user"); // Remove user info from local storage on logout
    } catch (error) {
      console.error(error);
    }
  };

 // Update user state if authUser changes
 useEffect(() => {
    if (authUser) {
      setUser(authUser);
      localStorage.setItem("user", JSON.stringify(authUser)); // Update local storage
    }
  }, [authUser]);

  
  return (
    <Popover className="relative bg-white ">
      <PopoverButton className="flex">
        <UserCircleIcon className='size-10 text-gray-300 hover:text-gray-500'/>
        <ChevronDownIcon className="size-5 text-gray-300 group-data-[open]:rotate-180" />
        </PopoverButton>
        
      <PopoverPanel anchor="bottom" transition className="flex origin-top flex-col text-gray-500 bg-slate-50 m-2 px-2 gap-2 py-2 min-w-60 rounded-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
        
          {user ? 
            <div onClick={()=>{navigate("/profile")}}>
            <div className='cursor-pointer flex flex-col hover:text-black'>
              <p className='text-md'>{`Hello ${user.given_name}`}</p>
              <p className='text-sm'>{user.email}</p>
            </div>
            <hr className='m-2'/>
            </div>:
            <div>
                <div className='cursor-pointer flex flex-col hover:text-black'>
              <p className='text-md'>Welcome</p>
              <p className='text-sm'>To access account and manage orders</p>
            </div>
            </div>
          }
          {user?
        <div onClick={handleLogout} className='cursor-pointer text-gray-600 flex'>
            Logout<LogOutIcon/>
          </div>:
          <div onClick={handleLogin} className='cursor-pointer text-red-600'>
          Login/Sign-up
        </div>
          
        }
        
      </PopoverPanel>
    </Popover>
  )
}

export default ProfileButton
