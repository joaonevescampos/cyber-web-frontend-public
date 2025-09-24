import { useState } from "react";
import type { ProductsType, MetaType } from "../models/Products";
import Services from "../services/AppServices";

export function useAllProducts() {
  const [products, setProducts] = useState<ProductsType[]>();
  const [metadata, setMetadata] = useState<MetaType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = new Services();

  const fetchAllProducts = async (endpoint: string) => {
    try {
      setLoading(true);
      const response = await api.getAllProducts(endpoint);
      setProducts(response.data);
      setMetadata(response.metadata);
    } catch (error) {
      setError("Error: Cannot get the products");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchAllProducts(initialEndpoint);
  // }, [initialEndpoint]);

  return { products, setProducts, metadata, setMetadata, fetchAllProducts, loading, error };
}
