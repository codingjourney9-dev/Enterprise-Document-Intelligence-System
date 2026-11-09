package com.chana.knowledgehub.documents.repository;

import com.chana.knowledgehub.documents.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Spring Data repository for {@link Document} metadata.
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {

    /**
     * Returns true if a document with the given filePath already exists.
     * Used for validation to enforce uniqueness.
     */
    boolean existsByFilePath(String filePath);
}