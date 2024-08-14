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

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (email: string) => {
  const orders = JSON.parse(localStorage.getItem('Orders') || '{}');
  console.log("hello",orders[email])
  return orders[email] || [];
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<{ email: string; products: ProductOrder[] }>) {
      const { email, products } = action.payload;
      const newOrder: Order = {
        orderId:generateNumericUUIDNumber(),
        products,
        status:"Placed"
      };
      if (!state.orders[email]) {
        state.orders[email] = [];
      }
      state.orders[email].push(newOrder);

      // Update localStorage
      localStorage.setItem('Orders', JSON.stringify(state.orders));
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
