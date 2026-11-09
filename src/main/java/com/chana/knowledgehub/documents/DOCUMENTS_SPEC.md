# Documents Feature Specification

## Goal
Provide CRUD operations for document metadata.

## Entity Rules

Document:
- UUID id (generated)
- name (required, max 255)
- uploader (required)
- uploadDate (auto-set on creation)
- type (required enum)
- filePath (required, unique)
- (optional) contentText (plain text, for MVP QA/Summary without parsing)

Constraints:
- name cannot be empty
- uploader cannot be empty
- type is required
- filePath must be unique

## DocumentType Definition
Business document types:
- POLICY
- REPORT
- MANUAL

These represent behavior differences, not file formats.
Each type maps to a specific processing strategy.

## API Contract

POST /documents
- Creates document metadata
- Returns 201
- Security: ADMIN only (enforced by interceptor, not service logic)

GET /documents
- Returns list

GET /documents/{id}
- Returns 200 or 404

DELETE /documents/{id}
- Returns 204
- Security: ADMIN only

## Technical Constraints
- Use JPA
- Use constructor injection
- No field injection
- No business logic in controller
- Service layer handles validation

Notes:
- Controllers must expose DTOs (not JPA entities). Services or mappers should perform entity→DTO mapping before sending responses.
- `contentText` is supported as an optional field on `Document` for MVP (used by Summary/Q&A flows).