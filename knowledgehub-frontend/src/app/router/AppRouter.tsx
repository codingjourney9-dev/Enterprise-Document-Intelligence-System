import { AppLayout } from "../layout/AppLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DocumentsPage } from "../../features/documents/pages/DocumentsPage";
import { UsersPage } from "../../features/users/pages/UsersPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/documents" replace />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/documents" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
