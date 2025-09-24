import { useEffect, useState } from "react";
import type ReviewSummaryType from "../models/ReviewSummary";
import Services from "../services/AppServices";

export function useSummary(productId: string | undefined) {
    const [summary, setSummary] = useState<ReviewSummaryType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        const fetchSummary = async () => {
            const api = new Services();

            try {
                setLoading(true);

                const endpoint = `reviews/summary/${productId}`;
                const response = await api.getReviewSummary(endpoint);

                setSummary(response);
            } catch {
                setError("Error: cannot get the review summary.");
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [productId]);

    return { summary, loading, error };
}

