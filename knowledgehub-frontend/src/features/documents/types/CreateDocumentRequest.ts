import type { DocumentType } from "./Document";

export interface CreateDocumentRequest {
  name: string;
  uploader: string;
  type: DocumentType;
  filePath: string;
  contentText: string;
}
