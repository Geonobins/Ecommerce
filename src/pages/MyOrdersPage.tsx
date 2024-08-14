import {  useSelector } from 'react-redux';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import OrderBox from '@/components/OrderBox';
import Sidebar from '@/components/Sidebar';
import { RootState } from '@/app/store';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { fetchOrders } from '@/features/orders/ordersSlice';
import useThunkDispatch from '@/hooks/useThunkDispatch';

const MyOrdersPage = () => {
    const { user } = useAuth0();
    const dispatch = useThunkDispatch();
  
    useEffect(() => {
      if (user?.email) {
        dispatch(fetchOrders(user.email));
      }
    }, [user, dispatch]);
  
    const orders = useSelector((state: RootState) => 
        user?.email && state.orders.orders[user.email] ? state.orders.orders[user.email] : []
      );
  
    console.log("orders",orders)
  
    return (
      <div>
        <div className='flex-1 '>
          <Navbar />
          <div className='mt-24 ml-4 flex max-h-full '>
            <Sidebar />
            <div className='flex flex-col max-w-[60%] md:min-w-[90%] h-full items-center justify-center text-gray'>
              <Breadcrumbs />
              <div className='min-h-[400px] min-w-full  flex flex-col items-center my-16 justify-center'>
                {orders.length > 0 ?orders.map((order) => (
                  <OrderBox 
                    key={order.orderId} 
                    orderId={order.orderId} 
                    products={order.products} 
                    status={order.status} 
                  />
                )):
                <div className='text-gray-400'>No Orders Yet</div>
                }
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  };
  
  export default MyOrdersPage;
  
