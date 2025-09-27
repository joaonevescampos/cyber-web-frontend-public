import type { Address } from "./Address";
import type { CartItem } from "./Cart";

export interface GlobalContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  getProductsInCart: () => CartItem[];
  updateAmount: (id: number, amount: number) => CartItem[]
  addresses: Address[];
  addAddress : (item: Address) => void;
  removeAddress : (id: string) => void;
  getAddresses : () => Address[];
  updateAddress : (address: Address) => void
};