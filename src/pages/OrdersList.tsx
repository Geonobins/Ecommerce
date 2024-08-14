import Breadcrumbs from '@/components/Breadcrumbs'
import { FooterComponent } from '@/components/FooterComponent'
import Navbar from '@/components/Navbar'
import OrdersTable from '@/components/OrdersTable'
import Sidebar from '@/components/Sidebar'

const OrdersList = () => {
  return (
    <div>
            <div className='flex-1 '>
                <Navbar />
                <div className='mt-24 ml-4 flex max-h-full '>
                    <Sidebar />
                    <div className='flex flex-col max-w-[60%] md:min-w-[90%]  h-full items-center justify-center text-gray ' >
                        <Breadcrumbs/>
                        <div className='  h-[800px]  max-w-[80%] flex flex-col items-center my-16 min-w-[80%] '>
                            <OrdersTable/>
                        </div>
                    </div>
                </div>



            </div >
            <FooterComponent />

        </div>
  )
}

export default OrdersList
