
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar  from '../components/Sidebar'
import { useAuth0 } from '@auth0/auth0-react';
import { UserRoundIcon } from 'lucide-react';



const Dashboard = () => {

    const {user} = useAuth0();
    return (
        <div>
        <div className='flex-1'>
        <Navbar/>
            <div className='mt-32 ml-4 flex'>
            <Sidebar/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-8">
            <div className='flex bg-red-400 items-center justify-center rounded-xl '>01</div>
            <div className='flex bg-red-400 items-center justify-center rounded-xl'>02</div>
            <div className='flex bg-red-400 items-center justify-center rounded-xl'>03</div>
            <div className='flex bg-red-400 items-center justify-center rounded-xl'> 04</div>
            </div>
            </div>
            
        

        </div >
        <FooterComponent />
        </div>
    );
}

export default Dashboard
