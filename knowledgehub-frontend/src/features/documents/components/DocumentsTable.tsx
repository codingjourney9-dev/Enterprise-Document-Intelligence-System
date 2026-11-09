import { FileText, MessageSquare, Trash2 } from "lucide-react";
import type { UserRole } from "../../users/types";
import type { Document } from "../types";

interface DocumentsTableProps {
  documents: Document[];
  currentUserRole: UserRole;
  onViewSummary: (documentId: string) => void;
  onAskQuestion: (documentId: string) => void;
  onDelete: (documentId: string) => void;
  isDeleting?: boolean;
}

function formatUploadDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
}

export function DocumentsTable({
  documents,
  currentUserRole,
  onViewSummary,
  onAskQuestion,
  onDelete,
  isDeleting = false,
}: DocumentsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100/80">
            <tr>
              <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                Name
              </th>
              <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                Type
              </th>
              <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                Uploader
              </th>
              <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                Upload Date
              </th>
              <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {documents.map((document) => (
              <tr key={document.id} className="align-top transition-colors hover:bg-slate-50">
                <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{document.name}</td>
                <td className="px-5 py-3.5 text-sm text-slate-700">{document.type}</td>
                <td className="px-5 py-3.5 text-sm text-slate-700">{document.uploader}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-600">
                  {formatUploadDate(document.uploadDate)}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onViewSummary(document.id)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    >
                      <FileText size={14} aria-hidden="true" />
                      Summary
                    </button>
                    <button
                      type="button"
                      onClick={() => onAskQuestion(document.id)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      <MessageSquare size={14} aria-hidden="true" />
                      Ask AI
                    </button>
                    {currentUserRole === "ADMIN" ? (
                      <button
                        type="button"
                        onClick={() => onDelete(document.id)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1.5 rounded-md border border-rose-700 bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        Delete
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
