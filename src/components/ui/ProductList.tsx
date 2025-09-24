import ProductCard from "./ProductCard";
import type {ProductsType} from "../../models/Products";

interface ProductsListProps {
  products: ProductsType[];
  cols: number;
  productAmount: number;
}

const ProductList = ({ products, cols, productAmount }: ProductsListProps) => {
  const colsClass =
    {
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[cols] || "grid-cols-1";
    
  return (
    <section
      className={`grid ${colsClass} max-lg:grid-cols-2 max-xl:grid-cols-3 gap-4 m-auto w-fit mb-[56px]`}
    >
      {products.slice(0, productAmount).map((product) => (
        <ProductCard
          productName={product.name}
          productPrice={product.price}
          discountedPrice={product.discounted_price ?? null}
          productUrl={product.url_image}
          id={product.id}
          key={`${product.id}`}
        />
      ))}
    </section>
  );
};

export default ProductList;
