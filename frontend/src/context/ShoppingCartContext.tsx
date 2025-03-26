import { createContext, ReactNode, useContext, useState } from 'react';
import { ShoppingCartItem } from '../types/ShoppingCartItem';

interface CartContextType {
  cart: ShoppingCartItem[];
  cartTotal: number;
  addToCart: (item: ShoppingCartItem) => void;
  removeFromCart: (bookId: number) => void;
  increaseQuantity: (bookId: number) => void;
  decreaseQuantity: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined); //"constructor"

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ShoppingCartItem[]>([]);

  const addToCart = (item: ShoppingCartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);
      const updatedCart = prevCart.map((c) =>
        c.bookId === item.bookId
          ? { ...c, quantity: c.quantity + item.quantity, itemSubtotal: (c.quantity + item.quantity) * c.price }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId)); //filter out everything that is equal to the deleting projectId and reset to the new "prevCart"
  };

    // ✅ Increase quantity of an item in the cart
    const increaseQuantity = (bookId: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + 1, itemSubtotal: (item.quantity + 1) * item.price }
            : item
        )
      );
    };
  
    // ✅ Decrease quantity of an item in the cart, remove if quantity is 1
    const decreaseQuantity = (bookId: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity - 1, itemSubtotal: (item.quantity - 1) * item.price }
            : item
        ).filter((item) => item.quantity > 0) // ✅ Remove item if quantity reaches 0
      );
    };

  const cartTotal = cart.reduce((sum, item) => sum + item.itemSubtotal, 0);

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, cartTotal, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};