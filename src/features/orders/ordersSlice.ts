import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import generateNumericUUIDNumber from '@/utils/uuid';

type ProductOrder = {
  id: number;
  quantity: number;
};

type Order = {
  orderId: number;
  products: ProductOrder[];
  status: string;
};

type OrdersState = {
  orders: { [email: string]: Order[] };
};

const initialState: OrdersState = {
  orders: {},
};

// Fetch orders from localStorage
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (email: string) => {
  const orders = JSON.parse(localStorage.getItem('Orders') || '{}');
  return orders[email] || [];
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<{ email: string; products: ProductOrder[] }>) {
      const { email, products } = action.payload;
      
      // Get existing orders from localStorage
      const existingOrders = JSON.parse(localStorage.getItem('Orders') || '{}');

      const newOrder: Order = {
        orderId: generateNumericUUIDNumber(),
        products,
        status: 'Placed',
      };

      // Merge state orders with localStorage orders
      if (!existingOrders[email]) {
        existingOrders[email] = [];
      }

      // Add the new order to the correct user's orders
      existingOrders[email].push(newOrder);

      // Update localStorage
      localStorage.setItem('Orders', JSON.stringify(existingOrders));

      // Update the slice state as well
      state.orders = existingOrders;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      const email = action.meta.arg;
      state.orders[email] = action.payload;
    });
  },
});

export const { addOrder } = ordersSlice.actions;

// Selectors
export const selectOrdersByEmail = (state: RootState, email: string) => state.orders.orders[email] || [];

export default ordersSlice.reducer;
