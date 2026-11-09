package com.chana.knowledgehub.documents.service;

import com.chana.knowledgehub.documents.api.dto.DocumentRequestDto;
import com.chana.knowledgehub.documents.api.dto.DocumentResponseDto;
import com.chana.knowledgehub.documents.mapper.DocumentMapper;
import com.chana.knowledgehub.common.exceptions.BadRequestException;
import com.chana.knowledgehub.documents.repository.DocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository repository;

    public DocumentServiceImpl(DocumentRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public DocumentResponseDto create(DocumentRequestDto document) {
        validate(document);

        var entity = DocumentMapper.toDocument(document);
        var saved = repository.save(entity);
        return DocumentMapper.toResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentResponseDto> getAll() {
        return repository.findAll().stream()
                .map(DocumentMapper::toResponseDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DocumentResponseDto> getById(UUID id) {
        return repository.findById(id)
                .map(DocumentMapper::toResponseDto);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    private void validate(DocumentRequestDto document) {
        if (document.name() == null || document.name().isBlank()) {
            throw new BadRequestException("name must not be blank");
        }
        if (document.uploader() == null || document.uploader().isBlank()) {
            throw new BadRequestException("uploader must not be blank");
        }
        if (document.filePath() == null || document.filePath().isBlank()) {
            throw new BadRequestException("filePath must not be blank");
        }
        if (repository.existsByFilePath(document.filePath())) {
            throw new BadRequestException("filePath must be unique");
        }
    }
}
