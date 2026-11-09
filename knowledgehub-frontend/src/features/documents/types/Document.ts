export type DocumentType = "POLICY" | "REPORT" | "MANUAL";

export interface Document {
  id: string;
  name: string;
  uploader: string;
  uploadDate: string;
  type: DocumentType;
  filePath: string;
}
