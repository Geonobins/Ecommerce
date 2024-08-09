
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar  from '../components/Sidebar'
import { useAuth0 } from '@auth0/auth0-react';
import { UserRoundIcon } from 'lucide-react';



const ProfilesPage = () => {

    const {user} = useAuth0();
    return (
        <div>
        <div className='flex-1'>
        <Navbar/>
            <div className='mt-24 ml-4 flex'>
            <Sidebar/>
            <div className='w-full flex flex-col items-center justify-center text-gray-'>
                <div>
                    <UserRoundIcon className='size-44'/>
                </div>
            <p>{user?.nickname}</p>
            <p>{user?.email}</p>
            </div>
            </div>
            
        

        </div >
        <FooterComponent />
        </div>
    );
}

export default ProfilesPage
