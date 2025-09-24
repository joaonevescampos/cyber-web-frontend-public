import { useEffect, useState } from "react";
import type BrandType from "../models/Brands";
import Services from "../services/AppServices";

export function useBrands(endpoint: string) {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = new Services();

  const fetchBrands = async (endpoint: string) => {
    try {
      setLoading(true);
      const response = await api.getBrands(endpoint);
      setBrands(response);
    } catch (error) {
      setError("Error: Cannot get the Brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(endpoint);
  }, [endpoint]);

  return { brands, fetchBrands, loading, error };
}
