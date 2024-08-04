import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0
import ShoppinCart from "../components/ShoppinCart";
import { getAllProducts, initDB } from "@/utils/db";

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number
  increaseItemQuantity: (id: number) => void
  decreaseItemQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
  isOpen: boolean
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const { user } = useAuth0(); // Access user data from Auth0
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);




  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const validateCartItems = async (items: CartItem[]) => {
    const db = await initDB();
    const products = await getAllProducts(db);
    const validItems = items.filter(item => products.some((product: { id: number; }) => product.id === item.id));
    console.log("validItems",validItems)
    return validItems;
    
  };

  useEffect(() => {
    if (user?.email) {
      const storedCarts = localStorage.getItem('carts');
      const carts = storedCarts ? JSON.parse(storedCarts) : {};
      const userCart = carts[user.email] || [];
      validateCartItems(userCart).then(validItems => setCartItems(validItems));
    }
  }, [user?.email]);

  // Update local storage whenever cartItems change
  useEffect(() => {
    if (user?.email) {
      const storedCarts = localStorage.getItem('carts');
      const carts = storedCarts ? JSON.parse(storedCarts) : {};
      carts[user.email] = cartItems; // Update the user's cart
      localStorage.setItem('carts', JSON.stringify(carts)); // Save all carts
    }
  }, [cartItems,user?.email]); 

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        isOpen
      }}>
      {children}
      <ShoppinCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
