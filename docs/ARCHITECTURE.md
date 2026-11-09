# AI-Powered Knowledge Hub – Architecture

## 1. System Overview

The system allows:

- Uploading documents (metadata-first, optional raw text for MVP)
- Storing document metadata
- Generating document summaries
- Asking questions about documents
- Receiving answers generated via LLM abstraction
- Basic role-based access control (ADMIN / USER)

The system is implemented as a modular monolith using Spring Boot.

---

## 2. Architectural Style

- Layered Architecture
- Package-by-feature structure
- Clear separation between:
  - API layer (Controllers)
  - Service layer (Business logic & orchestration)
  - Repository layer (Persistence)
  - Domain model

Single deployable application.
No microservices.
No distributed components.

---

## 3. Modules

### documents
Responsible for:
- Document entity
- Metadata persistence
- CRUD operations

### qa
Responsible for:
- DocumentBehavior strategies (Strategy pattern)
- Prompt construction per DocumentType
- Summary and Q&A orchestration
- Calling LlmClient

### llm
LLM abstraction layer.

Provides:
- LlmClient interface
- MockLlmClient (default deterministic implementation)
- Optional real provider implementation

### LLM Provider Integration

The system uses an abstraction layer for LLM providers.

Current implementations:

- MockLlmClient – deterministic responses for testing
- OpenAiLlmClient – real integration with OpenAI

Provider selection is controlled via configuration:

knowledgehub.llm.provider = mock | openai

This allows switching providers without modifying the service layer.

### Runtime Provider Selection

Provider selection is controlled using Spring configuration.

Property:

knowledgehub.llm.provider = mock | openai

Implementation uses Spring conditional bean registration.

MockLlmClient remains default to ensure the system runs without external dependencies.

### users
Basic user management:
- Create user
- List users
- Update role

Storage: In-memory (for MVP simplicity).

### config
Spring MVC configuration:
- Interceptors
- Common beans
- Security cross-cutting configuration

---

## 4. Data Model

### Document
- UUID id
- String name
- String uploader
- LocalDateTime uploadDate
- DocumentType type
- String filePath (unique)
- Optional String contentText (raw text for MVP)

### User
- UUID id
- String name
- Role role (ADMIN / USER)

---

## 5. Persistence

- Spring Data JPA
- Embedded H2 database
- ddl-auto=update
- File contents optionally stored on disk under `/storage`
- Only metadata stored in DB
- contentText used for MVP to avoid complex parsing

No advanced file extraction required.

---

## Transaction Management

Transactional boundaries are defined at the Service layer.

- Mutating operations (create, delete, update) are annotated with @Transactional.
- Query operations may use @Transactional(readOnly = true) when needed.

Controllers do not manage transactions.

---

## 6. Service Layer Responsibilities

The Service layer is responsible for:

- Input validation
- Loading domain entities
- Resolving DocumentBehavior strategy
- Building prompts
- Calling LlmClient
- Returning DTO responses


The Service layer must NOT:

- Contain authorization logic
- Contain HTTP logic
- Contain type-based branching (no switch/if on DocumentType)


Input validation is performed at the service boundary.
DTO validation may use basic annotations when appropriate.
---

## 7. Document Behavior (Strategy Pattern)

Each DocumentType maps to a specific DocumentBehavior implementation.

### Interface

DocumentBehavior:
- String buildSummaryPrompt(Document doc)
- String buildQaPrompt(Document doc, String question)

### Implementations

- PolicyBehavior
  - Emphasizes sections, rules, headings

- ReportBehavior
  - Emphasizes data, statistics, conclusions

- ManualBehavior
  - Emphasizes practical steps and procedures

### Design Principle

Open/Closed Principle:

Adding a new DocumentType must not require changes
to the service layer.

Strategy resolution is centralized via registry/factory.

Strategies:
- Do not access repositories
- Do not call LLM
- Only build prompts

---

## 8. LLM Abstraction

System depends only on:

LlmClient:
- String complete(String prompt)

Default implementation:
- MockLlmClient (deterministic output)

Optional:
- Real provider (OpenAI / HuggingFace)

The application must function without external API keys.

---

## 9. Request Flow (Summary / Q&A)

Controller  
→ Service  
→ Resolve DocumentBehavior  
→ Build Prompt  
→ Call LlmClient  
→ Return DTO  
→ OpenAPI documentation auto-updated

This ensures:
- Separation of concerns
- Replaceable LLM provider
- Extensible document types

---

## 10. Security Model (Simplified RBAC)

- Role-based access control
- Role passed as query parameter:
  - ?role=ADMIN
  - ?role=USER
- No authentication mechanism (simulation only)

Authorization is implemented as cross-cutting concern:

- @RequiresRole annotation on controller methods
- Spring HandlerInterceptor reads role param
- Validation logic centralized in interceptor
- No role checks inside services

Authorization matrix defined in docs/SECURITY_SPEC.md.

---

## 11. Error Handling

All errors return structured JSON response:

{
  "timestamp": "...",
  "status": 400,
  "error": "Bad Request",
  "message": "...",
  "path": "/documents"
}

Implemented via @RestControllerAdvice.

Error codes:
- 400 → Missing/invalid role or invalid input
- 403 → Role not permitted
- 404 → Entity not found

Notes:
- The API returns `ApiError` DTO for errors (timestamp, status, error, message, path).
- Controllers should return DTOs rather than JPA entities; mapping is performed in the service layer.

---

## 12. Explicitly Out of Scope

- No OAuth / JWT
- No vector database
- No message brokers
- No cloud deployment
- No advanced document parsing
- No distributed transactions

---

## 13. Design Goals

- Simplicity
- Clean separation of concerns
- Extensibility
- Production-like structure
- Clear use of OOP principles
- Fast implementation within one working day
- Self-documented REST API (OpenAPI)

## 14. DTO Layer

Controllers expose DTOs only.
Domain entities are not returned directly.
Mapping is handled inside the service layer or via simple manual mapping.

## 15. API Documentation

The system integrates Springdoc OpenAPI.
The OpenAPI specification is generated at runtime from the controller layer.
It acts as an executable API contract and remains aligned with the static docs/API_CONTRACT.md document.