# Q&A and Summary Feature Specification

## Goal
Enable users to:
- View document summaries
- Ask questions about documents
- Receive responses generated via LLM abstraction

Behavior differs by DocumentType.

---

## High-Level Flow

1. Controller receives request
2. Service loads Document
3. Service resolves DocumentBehavior (Strategy)
4. Strategy builds prompt
5. Service calls LlmClient
6. Service returns structured response DTO

Controllers must contain no business logic.

---

## Endpoints

### 1. Get Summary

GET /documents/{id}/summary?role=...

Response 200:
{
  "summary": "Generated summary text..."
}

Errors:
- 404 if document not found
- 400 if role missing/invalid
- 403 if not authorized

Allowed Roles:
- ADMIN
- USER

---

### 2. Ask Question

POST /documents/{id}/questions?role=...

Request:
{
  "question": "What are the main risks?"
}

Response 200:
{
  "answer": "Generated answer..."
}

Errors:
- 400 if question is blank
- 404 if document not found
- 400 if role missing/invalid
- 403 if not authorized

Allowed Roles:
- ADMIN
- USER

---

## Strategy Pattern (Document Behavior)

### Interface

DocumentBehavior:
- String buildSummaryPrompt(Document doc)
- String buildQaPrompt(Document doc, String question)

### Implementations

PolicyBehavior:
- Emphasize sections, rules, headings

ReportBehavior:
- Emphasize statistics, data, conclusions

ManualBehavior:
- Emphasize practical steps and procedures

---

## Design Principles

- Open/Closed Principle:
  Adding new DocumentType must not require changes in service layer.
- No if/else logic in service for type handling.
- Strategy resolution must be centralized (registry/factory).
- Strategy does not call LLM directly.
- Service orchestrates behavior + LLM.

---

## LLM Integration

- Service builds prompt via Strategy.
- Service calls LlmClient.complete(prompt).
- Default implementation: MockLlmClient (deterministic).

System must function without external API keys.

---

## Prompt Input Source

For MVP:
- Use Document.contentText if exists.
- If not available, fallback to metadata (name/type/uploader).

No advanced file parsing required.

---

## Done Criteria

- Summary returns text for any document type.
- Q&A returns answer for any document type.
- Different DocumentTypes produce different prompt styles.
- No type-based logic inside service (no switch/if on enum).
- LLM implementation is swappable via interface.