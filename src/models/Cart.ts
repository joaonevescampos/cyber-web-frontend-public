export interface CartItem {
  id: number;
  name: string;
  price: number;
};

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
};