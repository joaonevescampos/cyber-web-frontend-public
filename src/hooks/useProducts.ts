import { useEffect, useState } from "react";
import type {ProductsType} from "../models/Products";
import Services from "../services/AppServices";

export function useProducts(initialEndpoint: string) {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = new Services();

  const fetchProducts = async (endpoint: string) => {
    try {
      setLoading(true);
      const data = await api.getProducts(endpoint);
      setProducts(data);
    } catch (error) {
      setError("Error: Cannot get the products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(initialEndpoint);
  }, [initialEndpoint]);

  return { products, fetchProducts, loading, error };
}
