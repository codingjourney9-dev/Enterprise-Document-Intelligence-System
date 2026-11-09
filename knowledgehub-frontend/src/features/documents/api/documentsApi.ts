import { apiClient } from "../../../shared/api/apiClient";
import type { CreateDocumentRequest, Document } from "../types";

export async function getDocuments(): Promise<Document[]> {
  const { data } = await apiClient.get<Document[]>("/documents");
  return data;
}

export async function createDocument(
  payload: CreateDocumentRequest,
): Promise<Document> {
  const { data } = await apiClient.post<Document>("/documents", payload);
  return data;
}

export async function deleteDocument(id: string): Promise<void> {
  await apiClient.delete(`/documents/${id}`);
}
