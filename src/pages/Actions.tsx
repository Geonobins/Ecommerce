
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar  from '../components/Sidebar'

import ActionsTable from '@/components/ActionsTable';



const Actions = () => {

    // const {user} = useAuth0();
    return (
        <div>
        <div className='flex-1 '>
        <Navbar/>
            <div className='mt-24 ml-4 flex max-h-screen'>
            <Sidebar/>
            <div className=' w-full flex flex-col items-center my-16 '>
                <ActionsTable/>
            </div>
            </div>
            
        

        </div >
        <FooterComponent />
        </div>
    );
}

export default Actions
