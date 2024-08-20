
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar  from '../components/Sidebar'
import { useAuth0 } from '@auth0/auth0-react';
import { UserRoundIcon } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';



const ProfilesPage = () => {

    const {user} = useAuth0();
    return (
        <div>
        <div className='flex-1'>
        <Navbar/>
            <div className='mt-24 ml-4 flex'>
            <Sidebar/>
            <div className='w-full flex flex-col items-center justify-center text-gray-'>
                <Breadcrumbs/>
                <div className='flex flex-col items-center justify-center w-full h-full'>
                    <UserRoundIcon className='size-44 '/>
                    <p>{user?.nickname}</p>
            <p>{user?.email}</p>
                </div>
            
            </div>
            </div>
            
        

        </div >
        <FooterComponent />
        </div>
    );
}

export default ProfilesPage
