
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar from '../components/Sidebar'
import { ProductsChart } from '@/components/ProductsChart';
import { UserChart } from '@/components/UserChart';
import Overview from '@/components/Overview';
import DashboardTable from '@/components/DashboardTable';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';



const Dashboard = () => {
    const navigate = useNavigate()
     // Loading states for each section
     const [overviewLoading, setOverviewLoading] = useState(true);
     const [productsChartLoading, setProductsChartLoading] = useState(true);
     const [userChartLoading, setUserChartLoading] = useState(true);
     const [dashboardTableLoading, setDashboardTableLoading] = useState(true);
 
     // Simulate loading time for each section
     useEffect(() => {
         setTimeout(() => setOverviewLoading(false), 500);
         setTimeout(() => setProductsChartLoading(false), 500);
         setTimeout(() => setUserChartLoading(false), 500);
         setTimeout(() => setDashboardTableLoading(false), 500);
     }, []);
 
     // Loading component (you can style this as needed)
     const Loading = () => (
         <div className="flex items-center justify-center  ">
             <div className="spinner-border animate-spin " role="status">
                 <Loader2/>
             </div>
         </div>
     );

    return (
        <div>
            <div className='flex-1 '>
                <Navbar />
                <div className='mt-24 ml-4 flex'>
                    <Sidebar />
                    <div className='flex flex-col w-full h-full items-center justify-center text-gray' >
                        <Breadcrumbs/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full  p-8">
                            <div className='flex  items-center justify-center rounded-xl  min-h-[400px]'>
                            {overviewLoading ? <Loading /> : <Overview />}
                            
                            </div>
                            <div className='flex items-center justify-center rounded-xl drop-shadow-xl hover:-translate-y-1.5 duration-200  min-h-[400px]'>
                                {productsChartLoading ? <Loading /> : <ProductsChart />}
                                
                            </div>
                            <div className='flex items-center justify-center rounded-xl drop-shadow-xl hover:-translate-y-1.5 duration-200 min-h-[400px]'>
                            {userChartLoading ? <Loading /> : <UserChart />}
                            </div>
                            <div className='flex items-center justify-center rounded-xl  p-6  hover:-translate-y-1.5 duration-200 min-h-[400px]' onClick={() => navigate("/home/profile/actions")}>
                            <div className='min-w-[90%] rounded-xl shadow-xl border-3 border'>
                            {dashboardTableLoading ? <Loading /> : 
                            <div className='flex flex-col items-center'>
                            <p className='text-2xl text-pretty w-full px-14 py-4 font-extrabold'>Low Stocks Allert</p>
                            <DashboardTable />
                            </div>
                            }
                            </div>
                            </div>
                        </div>
                    </div>

                </div>



            </div >
            <FooterComponent />
        </div>
    );
}

export default Dashboard
