
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar  from '../components/Sidebar'
import { useAuth0 } from '@auth0/auth0-react';
import { UserRoundIcon } from 'lucide-react';



const Actions = () => {

    const {user} = useAuth0();
    return (
        <div>
        <div className='flex-1'>
        <Navbar/>
            <div className='mt-32 ml-4 flex'>
            <Sidebar/>
            <div className='w-full flex flex-col items-center justify-center text-gray-'>
                Actions
            </div>
            </div>
            
        

        </div >
        <FooterComponent />
        </div>
    );
}

export default Actions
