import { useEffect, useState, useCallback } from "react";
import { type CommentsType, type MetadataType } from "../models/Comments";
import Services from "../services/AppServices";

export function useComments(productId: string | undefined) {
    const [comments, setComments] = useState<CommentsType[]>([]);
    const [metadata, setMetadata] = useState<MetadataType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const api = new Services();

    const fetchComments = useCallback(async (currentPage: number) => {
        if (!productId) return;

        try {
            setLoading(true);
            const endpoint = `reviews/comments/${productId}?page=${currentPage}`;
            const response = await api.getComments(endpoint);

            setComments(response.data);
            setMetadata(response.metadata);
        } catch {
            setError(`Error: cannot get the comments.`);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        setComments([]);
        setPage(1);
        fetchComments(1);
    }, [fetchComments]);

    const loadMoreComments = () => {
        if (metadata?.next_page) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchComments(nextPage);
        }
    };

    return { comments, metadata, loading, error, loadMoreComments };
}

