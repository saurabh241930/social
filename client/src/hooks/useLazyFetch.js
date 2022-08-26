import { useState, useEffect, useCallback, useRef } from "react";

function useLazyFetch(pageno, api, limit) {
  const [page, setPage] = useState(pageno);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null);
  const [results, setResults] = useState([]);

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
  }, [handleObserver]);

  const fetchApi = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api}?page=${page}&limit=${limit}`);
      const data = await response.json();

      setResults((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return { loading, results };
}

export default useLazyFetch;
