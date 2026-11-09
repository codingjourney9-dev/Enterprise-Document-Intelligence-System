package com.chana.knowledgehub.documents.api.dto;

import com.chana.knowledgehub.documents.model.DocumentType;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for document responses.
 */
public record DocumentResponseDto(
        UUID id,
        String name,
        String uploader,
        LocalDateTime uploadDate,
        DocumentType type,
        String filePath
) {
}