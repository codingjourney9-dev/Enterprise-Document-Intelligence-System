package com.chana.knowledgehub.documents.mapper;

import com.chana.knowledgehub.documents.api.dto.DocumentRequestDto;
import com.chana.knowledgehub.documents.api.dto.DocumentResponseDto;
import com.chana.knowledgehub.documents.model.Document;

/**
 * Manual mapper for Document entities and DTOs.
 */
public class DocumentMapper {

    /**
     * Converts DocumentRequestDto to Document entity.
     */
    public static Document toDocument(DocumentRequestDto dto) {
        Document document = new Document(dto.name(), dto.uploader(), dto.type(), dto.filePath());
        if (dto.contentText() != null) {
            document.setContentText(dto.contentText());
        }
        return document;
    }

    /**
     * Converts Document entity to DocumentResponseDto.
     */
    public static DocumentResponseDto toResponseDto(Document document) {
        return new DocumentResponseDto(
                document.getId(),
                document.getName(),
                document.getUploader(),
                document.getUploadDate(),
                document.getType(),
                document.getFilePath()
        );
    }
}