import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, initDB } from '@/utils/db';
import { RootState } from '../../app/store';

type CartItem = {
  id: number;
  quantity: number;
};

type CartState = {
  isOpen: boolean;
  cartItems: CartItem[];
  cartQuantity:number;
};

const initialState: CartState = {
  isOpen: false,
  cartItems: [],
  cartQuantity:0,
};

// Async thunk to validate cart items
export const validateCartItems = createAsyncThunk(
  'cart/validateCartItems',
  async (items: CartItem[]) => {
    const db = await initDB();
    const products = await getAllProducts(db);
    const validItems = items.filter(item => products.some((product: { id: number }) => product.id === item.id));
    return validItems;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart(state) {
      console.log("helloagin")
      state.isOpen = true;
    },
    closeCart(state) {
      console.log("closing cart")
      state.isOpen = false;
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      state.cartQuantity+=1;
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        
        item.quantity += 1;
        
        
      } else {
        state.cartItems.push({ id: action.payload, quantity: 1 });
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      state.cartQuantity-=1;
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        
        if (item.quantity === 1) {
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        } else {
          item.quantity -= 1;
          
        }
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const {
  openCart,
  closeCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
  setCartItems,
} = cartSlice.actions;

// Selectors
export const selectCart = (state: RootState) => state.cart;
export const getItemQuantity = (state: RootState, id: number) =>
  state.cart.cartItems.find(item => item.id === id)?.quantity || 0;

export const getCartQuantity = (state: RootState) => 
  state.cart.cartItems.length;
// export const getCartQuantity = (state: RootState, id: number) =>
//   state.cart.cartItems.find(item => item.id === id)?.quantity || 0;

export default cartSlice.reducer;
