// utils/api.ts

type CartItem = {
    id: number;
    quantity: number;
  };
  

  // Function to save cart items to localStorage
    const saveCartItemsToLocalStorage = (email: string, cartItems: CartItem[]) => {
    const storedCarts = localStorage.getItem('carts');
    const carts = storedCarts ? JSON.parse(storedCarts) : {};
    carts[email] = cartItems; // Update the user's cart
    localStorage.setItem('carts', JSON.stringify(carts)); // Save all carts
  };
  
  export default saveCartItemsToLocalStorage