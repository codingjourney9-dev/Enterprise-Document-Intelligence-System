import { useState } from "react";

import { AskQuestionPanel } from "../../ai/components/AskQuestionPanel";
import { SummaryModal } from "../../ai/components/SummaryModal";
import { useRequestRole } from "../../../shared/api/requestRole";
import { deleteDocument } from "../api/documentsApi";
import { DocumentsTable } from "../components/DocumentsTable";
import { UploadDocumentForm } from "../components/UploadDocumentForm";
import { useDocuments } from "../hooks/useDocuments";

export function DocumentsPage() {
  const { documents, isLoading, error, refetch } = useDocuments();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isQuestionPanelOpen, setIsQuestionPanelOpen] = useState(false);

  const currentUserRole = useRequestRole();

  const handleViewSummary = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setIsSummaryOpen(true);
    setIsQuestionPanelOpen(false);
  };

  const handleAskQuestion = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setIsQuestionPanelOpen(true);
    setIsSummaryOpen(false);
  };

  const handleCloseSummary = () => {
    setIsSummaryOpen(false);
  };

  const handleCloseQuestionPanel = () => {
    setIsQuestionPanelOpen(false);
  };

  const handleDelete = async (documentId: string) => {
    if (currentUserRole !== "ADMIN") {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteDocument(documentId);
      await refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDocumentCreated = async () => {
    await refetch();
  };

  if (isLoading) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">Loading documents...</div>;
  }

  if (error) {
    return <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm font-medium text-rose-700">{error}</div>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Documents</h1>
        <p className="mt-1 text-sm text-slate-600">Manage business documents and access AI tools.</p>
      </div>
      {currentUserRole === "ADMIN" ? (
        <UploadDocumentForm onDocumentCreated={handleDocumentCreated} />
      ) : null}

      {documents.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No documents found.
        </div>
      ) : (
        <DocumentsTable
          documents={documents}
          currentUserRole={currentUserRole}
          onViewSummary={handleViewSummary}
          onAskQuestion={handleAskQuestion}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      <SummaryModal
        isOpen={isSummaryOpen}
        documentId={selectedDocumentId}
        onClose={handleCloseSummary}
      />

      <AskQuestionPanel
        isOpen={isQuestionPanelOpen}
        documentId={selectedDocumentId}
        onClose={handleCloseQuestionPanel}
      />
    </section>
  );
}
