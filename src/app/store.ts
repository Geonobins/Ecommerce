import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';  // Import the orders reducer
import languageReducer from '../features/lang/languageSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer, 
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
