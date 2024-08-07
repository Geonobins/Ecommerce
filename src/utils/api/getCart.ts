type CartItem = {
    id: number;
    quantity: number;
  };
  
  // Function to get cart items from localStorage
   const getCartItemsFromLocalStorage = (email: string): CartItem[] => {
    const storedCarts = localStorage.getItem('carts');
    const carts = storedCarts ? JSON.parse(storedCarts) : {};
    return carts[email] || [];
  };

  export default getCartItemsFromLocalStorage
  