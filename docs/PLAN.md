# Development Plan (Spec-Driven, Vertical Slices)

## Phase 1 – Documents Core (CRUD) ✅
Goal: Implement basic CRUD for documents.
- [x] Document entity (JPA)
- [x] DocumentType enum
- [x] Repository
- [x] Service + Impl
- [x] Controller
- [x] Test endpoints locally

## Phase 2 – Security (Cross-cutting) ✅ NEXT
Goal: Role-based authorization without service if-statements.
- [x] Define Role enum (ADMIN, USER)
- [x] docs/SECURITY_SPEC.md
- [x] @RequiresRole annotation
- [x] RoleInterceptor reading ?role=
- [x] Register interceptor
- [x] Protect endpoints:
  - ADMIN: create/delete documents
  - USER: ask questions

### Implementation Steps
1. [x] Create Role enum
2. [x] Create @RequiresRole annotation
3. [x] Implement RoleInterceptor
4. [x] Register interceptor
5. [x] Annotate controllers

### Constraints
- No role checks inside service layer
- Interceptor must be HTTP-layer only
- Do not modify business logic
- Do not introduce Spring Security

## Phase 3 – Users (In-Memory) ✅
Goal: Basic user management (fast MVP).
- [X] USERS_SPEC.md
- [X] InMemoryUserRepository (ConcurrentHashMap)
- [X] Endpoints:
  - GET /users
  - POST /users
  - PUT /users/{id}/role?role=ADMIN|USER

## Phase 4 – QA + Summary (LLM + Strategy) ✅
Goal: Summary + Q&A per document type.
- [X] QA_SPEC.md + LLM_SPEC.md
- [X] DocumentBehavior strategies (POLICY/REPORT/MANUAL)
- [X] LlmClient + MockLlmClient (deterministic)
- [X] Endpoints:
  - GET /documents/{id}/summary
  - POST /documents/{id}/questions

## Phase 5 – Polish ✅
- [X] test.http coverage
- [X] README: architecture + how to run + examples
- [X] Small validations + consistent errors