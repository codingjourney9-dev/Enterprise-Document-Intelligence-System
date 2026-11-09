import { useState } from "react";

import { createDocument } from "../api/documentsApi";
import type { CreateDocumentRequest, DocumentType } from "../types";

interface UploadDocumentFormProps {
  onDocumentCreated: () => Promise<void>;
}

export function UploadDocumentForm({ onDocumentCreated }: UploadDocumentFormProps) {
  const [form, setForm] = useState<CreateDocumentRequest>({
    name: "",
    uploader: "",
    type: "POLICY",
    filePath: "",
    contentText: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = <K extends keyof CreateDocumentRequest>(
    field: K,
    value: CreateDocumentRequest[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.uploader.trim() || !form.filePath.trim() || !form.contentText.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createDocument({
        name: form.name.trim(),
        uploader: form.uploader.trim(),
        type: form.type,
        filePath: form.filePath.trim(),
        contentText: form.contentText.trim(),
      });

      setForm({
        name: "",
        uploader: "",
        type: "POLICY",
        filePath: "",
        contentText: "",
      });

      await onDocumentCreated();
    } catch (err) {
      console.error(err);
      setError("Failed to create document.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Upload Document</h2>
        <p className="mt-1 text-sm text-slate-600">Add metadata and content to make the document searchable by AI.</p>
      </div>

      {error ? <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Document Details</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label htmlFor="document-name" className="text-sm font-medium text-slate-700 sm:col-span-2">Name</label>
            <input
              id="document-name"
              type="text"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="sm:col-span-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
            />

            <label htmlFor="document-uploader" className="text-sm font-medium text-slate-700">Uploader</label>
            <input
              id="document-uploader"
              type="text"
              value={form.uploader}
              onChange={(event) => handleChange("uploader", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
            />

            <label htmlFor="document-type" className="text-sm font-medium text-slate-700">Type</label>
            <select
              id="document-type"
              value={form.type}
              onChange={(event) => handleChange("type", event.target.value as DocumentType)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
            >
              <option value="POLICY">POLICY</option>
              <option value="REPORT">REPORT</option>
              <option value="MANUAL">MANUAL</option>
            </select>

            <label htmlFor="document-file-path" className="text-sm font-medium text-slate-700 sm:col-span-2">File Path</label>
            <input
              id="document-file-path"
              type="text"
              value={form.filePath}
              onChange={(event) => handleChange("filePath", event.target.value)}
              className="sm:col-span-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Content</h3>
          <div className="mt-3 grid gap-3">
            <label htmlFor="document-content-text" className="text-sm font-medium text-slate-700">Content Text</label>
            <textarea
              id="document-content-text"
              value={form.contentText}
              onChange={(event) => handleChange("contentText", event.target.value)}
              rows={5}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </form>
    </section>
  );
}
