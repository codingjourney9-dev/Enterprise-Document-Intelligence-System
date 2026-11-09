import { useCallback, useEffect, useState } from "react";

import { getDocuments } from "../api/documentsApi";
import type { Document } from "../types";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load documents.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    documents,
    isLoading,
    error,
    refetch,
  };
}
