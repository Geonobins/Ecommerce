
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar  from '../components/Sidebar'
import { ProductsChart } from '@/components/ProductsChart';
import { UserChart } from '@/components/UserChart';
import Overview from '@/components/Overview';
import DashboardTable from '@/components/DashboardTable';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
    const navigate = useNavigate()

    return (
        <div>
        <div className='flex-1 '>
        <Navbar/>
            <div className='mt-24 ml-4 flex'>
            <Sidebar/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-8">
            <div className='flex  items-center justify-center rounded-xl '>
                <Overview/>
            </div>
            <div className='flex items-center justify-center rounded-xl drop-shadow-xl hover:-translate-y-1.5 duration-200'>
                <ProductsChart/>
            </div>
            <div className='flex items-center justify-center rounded-xl drop-shadow-xl hover:-translate-y-1.5 duration-200'>
            <UserChart/>
            </div>
            <div className='flex items-center justify-center rounded-xl drop-shadow-xl hover:-translate-y-1.5 duration-200 ' onClick={()=>navigate("/home/profile/actions")}> 
            <DashboardTable/>
            </div>
            </div>
            
            </div>
            
        

        </div >
        <FooterComponent />
        </div>
    );
}

export default Dashboard
