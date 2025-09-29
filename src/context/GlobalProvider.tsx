import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../models/Cart";
import type { GlobalContextType } from "../models/GlobalContext";
import type { AddressType } from "../models/AddressType";

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const storedCart = localStorage.getItem("cart");
  const parsedCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

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

  const updateAmount = (id: number, amount: number): CartItem[] => {
    const updatedCart: CartItem[] = parsedCart.map((product) => {
      if (product.id == id) {
        return { ...product, amount };
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    return updatedCart;
  };

  // Address
  const defaultAdresses: AddressType[] = [
    {
      id: "1",
      name: "2118 Thornridge",
      address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
      contact: "2095550104",
      tag: "home",
    },
    {
      id: "2",
      name: "Headoffice",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      contact: "7045550127",
      tag: "office",
    },
  ];

  const storedAddress = localStorage.getItem("address");
  const [addresses, setAddress] = useState<AddressType[]>(
    storedAddress && JSON.parse(storedAddress)
  );

  useEffect(() => {
    if (!storedAddress) {
      localStorage.setItem("address", JSON.stringify(defaultAdresses));
      setAddress(defaultAdresses);
    }
  }, []);

  const parsedAddress: AddressType[] = storedAddress
    ? JSON.parse(storedAddress)
    : [defaultAdresses];

  const addAddress = (item: AddressType) => {
    const updatedAddress = [...parsedAddress, item];
    setAddress(updatedAddress);
    localStorage.setItem("address", JSON.stringify(updatedAddress));
  };

  const getAddresses = () => {
    setAddress(parsedAddress);
    return parsedAddress;
  };

  const removeAddress = (id: string) => {
    const updatedAddress = parsedAddress.filter((address) => address.id !== id);
    localStorage.setItem("address", JSON.stringify(updatedAddress));
    setAddress(updatedAddress);
  };

  const updateAddress = (addressToUpdate: AddressType): void => {
    console.log("o que recebo: ", addressToUpdate);
    const updatedAddress: AddressType[] = parsedAddress.map((address) => {
      if (address.id == addressToUpdate.id) {
        return { ...addressToUpdate };
      }
      return address;
    });
    console.log("array atualizado: ", updatedAddress);
    localStorage.setItem("address", JSON.stringify(updatedAddress));
    setAddress(updatedAddress);
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getProductsInCart,
        updateAmount,
        addresses,
        addAddress,
        removeAddress,
        getAddresses,
        updateAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
