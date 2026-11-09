import { useState } from "react";

import { askQuestionAboutDocument } from "../api/aiApi";

interface AskQuestionPanelProps {
  isOpen: boolean;
  documentId: string | null;
  onClose: () => void;
}

export function AskQuestionPanel({
  isOpen,
  documentId,
  onClose,
}: AskQuestionPanelProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!documentId || !question.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnswer("");

    try {
      const result = await askQuestionAboutDocument(documentId, {
        question: question.trim(),
      });
      setAnswer(result);
    } catch (err) {
      console.error(err);
      setError("Failed to get answer.");
      setAnswer("");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Ask Question</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
        >
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask a question about this document..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-300 transition focus:border-slate-400 focus:ring-2"
        />

        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Asking..." : "Ask"}
        </button>
      </form>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
        {!error && answer ? (
          <div>
            <strong className="text-sm font-semibold text-slate-900">Answer</strong>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{answer}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
