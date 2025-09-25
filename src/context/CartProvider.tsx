import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, CartContextType } from "../models/Cart";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const stored = localStorage.getItem("cart");
  const parsedCart: CartItem[] = stored ? JSON.parse(stored) : [];

  const addToCart = (item: CartItem) => {
    const itemExists = parsedCart.some((product) => product.id === item.id);

    if (!itemExists) {
      const updatedCart = [...parsedCart, item];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const getProductsInCart = () => {
    setCart(parsedCart);
    return parsedCart;
  };

  const removeFromCart = (id: number) => {
    const updatedCart = parsedCart.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const updateAmount = (id: number, amount: number) : CartItem[] => {
    const updatedCart : CartItem[] = parsedCart.map((product) => {
      if(product.id == id) {
        return {...product, amount}
      }
      return product
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    return updatedCart
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getProductsInCart, updateAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
