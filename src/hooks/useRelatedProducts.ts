import { useEffect, useState } from "react";
import type { ProductsType } from "../models/Products";
import Services from "../services/AppServices";

export function useRelatedProducts(brand: string) {
  const [productsResponse, setProductsResponse] = useState<
    ProductsType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = new Services();

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/products/related/${brand}`;

      const response = await api.getRelatedProducts(url);
      setProductsResponse(response.data);
    } catch (error) {
      setError("Error: Cannot get related products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (brand) {
      fetchRelatedProducts();
    }
  }, [brand]);

  return { productsResponse, fetchRelatedProducts, loading, error };
}
