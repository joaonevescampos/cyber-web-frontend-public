export interface CartItem {
  id: number;
  name: string;
  price: number;
  url_image: string;
  amount: number;
};

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  getProductsInCart: () => CartItem[];
  updateAmount: (id: number, amount: number) => CartItem[]
};