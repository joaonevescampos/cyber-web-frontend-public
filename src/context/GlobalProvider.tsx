import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../models/Cart";
import type { GlobalContextType } from "../models/GlobalContext";
import type { AddressType } from "../models/AddressType";
import type { Summary } from "../models/Summary";
import type { ShippingType } from "../models/ShippingType";

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
      contact: "20955501045",
      tag: "home",
      selected: true,
    },
    {
      id: "2",
      name: "Headoffice",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      contact: "70455501273",
      tag: "office",
      selected: false,
    },
  ];

  const storedAddress = localStorage.getItem("address");
  const [addresses, setAddresses] = useState<AddressType[]>(
    storedAddress && JSON.parse(storedAddress)
  );

  useEffect(() => {
    if (!storedAddress) {
      localStorage.setItem("address", JSON.stringify(defaultAdresses));
      setAddresses(defaultAdresses);
    }
  }, []);

  const parsedAddress: AddressType[] = storedAddress
    ? JSON.parse(storedAddress)
    : [defaultAdresses];

  const addAddress = (item: AddressType) => {
    const updatedAddress = [...parsedAddress, item];
    setAddresses(updatedAddress);
    localStorage.setItem("address", JSON.stringify(updatedAddress));
  };

  const getAddresses = () => {
    setAddresses(parsedAddress);
    return parsedAddress;
  };

  const removeAddress = (id: string) => {
    const updatedAddress = parsedAddress.filter((address) => address.id !== id);
    localStorage.setItem("address", JSON.stringify(updatedAddress));
    setAddresses(updatedAddress);
  };

  const updateAddress = (addressToUpdate: AddressType): void => {
    const updatedAddress: AddressType[] = parsedAddress.map((address) => {
      if (address.id == addressToUpdate.id) {
        return { ...addressToUpdate };
      }
      return address;
    });
    localStorage.setItem("address", JSON.stringify(updatedAddress));
    setAddresses(updatedAddress);
  };

  const updateAllAddresses = (addressesToUpdate: AddressType[]): void => {
    localStorage.setItem("address", JSON.stringify(addressesToUpdate));
    setAddresses(addressesToUpdate);
  };

  // Summary
  const [summary, setSummary] = useState<Summary>({
    subtotal: 0,
    estimatedTax: 50,
    estimatedShip: 29,
    total: 0,
  });

  const storeSummary = (summary: Summary) => {
    localStorage.setItem("summary", JSON.stringify(summary));
    setSummary(summary);
  };

  const getSummary = () => {
    const summaryString = localStorage.getItem("summary");
    if (summaryString) {
      setSummary(JSON.parse(summaryString));
    }
  };

  // Shipping Method
  const [shippingSelected, setShippingSelected] = useState<ShippingType>({
    id: "1",
    value: "Free",
    description: "Regulary shipment",
    date: "17 Oct, 2023",
    selected: true,
  });

  const storeshippingSelected = (shippingSelected: ShippingType) => {
    localStorage.setItem("shippingSelected", JSON.stringify(shippingSelected));
    setShippingSelected(shippingSelected);
  };

  const getshippingSelected = () => {
    const shippingSelectedString = localStorage.getItem("shippingSelected");
    if (shippingSelectedString) {
      setShippingSelected(JSON.parse(shippingSelectedString));
    }
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
        updateAllAddresses,
        shippingSelected,
        storeshippingSelected,
        getshippingSelected,
        storeSummary,
        getSummary,
        summary,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
