package com.chana.knowledgehub.documents.service;

import com.chana.knowledgehub.documents.api.dto.DocumentRequestDto;
import com.chana.knowledgehub.documents.api.dto.DocumentResponseDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service layer contract for document operations.
 * Implementations handle validation and business rules.
 */
public interface DocumentService {

    DocumentResponseDto create(DocumentRequestDto document);

    List<DocumentResponseDto> getAll();

    Optional<DocumentResponseDto> getById(UUID id);

    void delete(UUID id);
}