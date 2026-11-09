package com.chana.knowledgehub.documents.api.dto;

import com.chana.knowledgehub.documents.model.DocumentType;

/**
 * DTO for creating a new document.
 */
public record DocumentRequestDto(
        String name,
        String uploader,
        DocumentType type,
        String filePath,
        String contentText
) {
}