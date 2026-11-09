package com.chana.knowledgehub.documents.api;

import com.chana.knowledgehub.common.Role;
import com.chana.knowledgehub.config.security.RequiresRole;
import com.chana.knowledgehub.documents.api.dto.DocumentRequestDto;
import com.chana.knowledgehub.documents.api.dto.DocumentResponseDto;
import com.chana.knowledgehub.documents.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    private final DocumentService service;

    public DocumentController(DocumentService service) {
        this.service = service;
    }

    @PostMapping
    @RequiresRole({Role.ADMIN})
    public ResponseEntity<DocumentResponseDto> create(@RequestBody DocumentRequestDto document) {
        DocumentResponseDto saved = service.create(document);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    @RequiresRole({Role.ADMIN})
    public ResponseEntity<List<DocumentResponseDto>> getAll() {
        List<DocumentResponseDto> docs = service.getAll();
        return ResponseEntity.ok(docs);
    }

    @GetMapping("/{id}")
    @RequiresRole({Role.ADMIN})
    public ResponseEntity<DocumentResponseDto> getById(@PathVariable UUID id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @RequiresRole({Role.ADMIN})
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}