import { apiClient } from "../../../shared/api/apiClient";
import type { AnswerResponse, AskQuestionRequest, SummaryResponse } from "../types";

export async function generateDocumentSummary(documentId: string): Promise<string> {
  const { data } = await apiClient.post<SummaryResponse>(
    `/documents/${documentId}/summary`,
  );
  return data.summary;
}

export async function askQuestionAboutDocument(
  documentId: string,
  payload: AskQuestionRequest,
): Promise<string> {
  const { data } = await apiClient.post<AnswerResponse>(
    `/documents/${documentId}/ask`,
    payload,
  );
  return data.answer;
}
