import { useEffect, useState } from "react";

import { generateDocumentSummary } from "../api/aiApi";

interface SummaryModalProps {
  isOpen: boolean;
  documentId: string | null;
  onClose: () => void;
}

export function SummaryModal({ isOpen, documentId, onClose }: SummaryModalProps) {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      if (!isOpen) {
        setSummary("");
        setError(null);
        return;
      }

      if (!documentId) {
        return;
      }

      setIsLoading(true);
      setError(null);
      setSummary("");

      try {
        const result = await generateDocumentSummary(documentId);
        setSummary(result);
      } catch (err) {
        console.error(err);
        setError("Failed to generate summary.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadSummary();
  }, [isOpen, documentId]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Document Summary</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          {isLoading ? <p className="text-sm text-slate-600">Loading summary...</p> : null}
          {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
          {!isLoading && !error ? (
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{summary || "No summary available."}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
