export interface ProductsType {
  id: number;
  name: string;
  price: number;
  discounted_price?: number;
  tag: string;
  url_image: string;
  key: number;
}

export interface MetaType {
  total_pages: number;
  actual_page: number;
  total_items: number;
}

export interface AllProductsType {
  metadata: MetaType;
  data: ProductsType[];
}
