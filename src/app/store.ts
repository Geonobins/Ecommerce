import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';  // Import the orders reducer

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,  // Add the orders reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
