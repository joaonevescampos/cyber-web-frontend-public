import { useParams, Link } from 'react-router-dom';
import { useComments } from '../hooks/useComments';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductDetails from '../components/ui/ProductDetails';
import CommentList from '../components/ui/CommentList';
import ReviewSummary from '../components/ui/ReviewSummary';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRelatedProducts } from "../hooks/useRelatedProducts";
import ProductList from "../components/ui/ProductList";
import Loading from "../components/modal/Loading";
import arrowIcon from "../assets/img/arrow_icon.svg";

export interface ProductDataType {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  discounted_price: number | null;
  stock: number;
  url_image: string | null;
  tag: string | null;
  category: { id: number; name: string };
  colors: { id: number; hex_code: string; name: string }[];
  storage_options: { id: number; size: string }[];
  specs: {
    id: number;
    screen_size: string;
    cpu: string;
    total_cores: string;
    main_camera: string;
    front_camera: string;
    battery: string;
  } | null;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { comments, metadata, loading, error, loadMoreComments } = useComments(id);

  const [product, setProduct] = useState<ProductDataType | null>(null);
  const [loadingRelated, setLoading] = useState(true);
  const [errorRelated, setError] = useState<string | null>(null);

  const {
    productsResponse: relatedProducts,
    loading: relatedLoading,
    error: relatedError,
  } = useRelatedProducts(product?.brand || "");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          setError("Product ID not provided.");
          setLoading(false);
          return;
        }
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3333/api/products/${id}`
        );
        setProduct(response.data.data);
      } catch (err) {
        setError("Error fetching product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loadingRelated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (errorRelated || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error or product not found.</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="flex gap-4 mt-[88px] pt-10 max-w-[1120px] m-auto text-[#A4A4A4] max-lg:px-4">
        <ul className="flex list-none gap-4 hidden lg:flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          <img src={arrowIcon} alt="arrow" className="rotate-180 w-4 opacity-40" />
          <li>
            <Link to="/products/all">Catalog</Link>
          </li>
          <img src={arrowIcon} alt="arrow" className="rotate-180 w-4 opacity-40" />
          <li>
            <Link to={`/products/${product.category.name}`}>
              {product.category.name}
            </Link>
          </li>
          <img src={arrowIcon} alt="arrow" className="rotate-180 w-4 opacity-40" />
          <li className="text-black">
            <span>{product.name}</span>
          </li>
        </ul>
      </div>

      <div className="container mx-auto px-4">
        <div className="pt-[88px] max-lg:pt-0">
          <ProductDetails product={product} />
        </div>

        <ReviewSummary productId={id} />

        <CommentList
          comments={comments}
          metadata={metadata}
          loading={loading}
          error={error}
          loadMoreComments={loadMoreComments}
        />
      </div>
      
      {relatedLoading ? (
        <div className="h-[880px]">
          <Loading />
        </div>
      ) : relatedError ? (
        <p className="text-center w-full">
          There was a problem to get the data
        </p>
      ) : relatedProducts && relatedProducts.length > 0 ? (
        <section className="m-auto mt-20 max-md:mt-10 md:w-full max-w-[1120px] max-lg:max-w-[700px] max-md:max-w-[343px]">
          <h2 className="mb-8 font-medium text-2xl">Related Products</h2>
          <ProductList products={relatedProducts} cols={4} productAmount={4} />
        </section>
      ) : (
        <p className="text-center w-full">No products found.</p>
      )}

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
