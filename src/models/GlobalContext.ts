import type { AddressType } from "./AddressType";
import type { CartItem } from "./Cart";
import type { ShippingType } from "./ShippingType";
import type { Summary } from "./Summary";

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
  updateAllAddresses: (addresses: AddressType[]) => void;
  shippingSelected: ShippingType;
  storeshippingSelected: (shipping: ShippingType) => void;
  getshippingSelected: () => void;
  getSummary: () => void;
  storeSummary: (summary: Summary) => void;
  summary: Summary;
}
