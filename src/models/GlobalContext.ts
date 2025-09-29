import type { AddressType } from "./AddressType";
import type { CartItem } from "./Cart";

export interface GlobalContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  getProductsInCart: () => CartItem[];
  updateAmount: (id: number, amount: number) => CartItem[];
  addresses: AddressType[];
  addAddress: (item: AddressType) => void;
  removeAddress: (id: string) => void;
  getAddresses: () => AddressType[];
  updateAddress: (address: AddressType) => void;
}
