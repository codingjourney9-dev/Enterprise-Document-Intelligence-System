# Security Specification (Simplified RBAC)

## Goal
Enforce role-based authorization as a cross-cutting concern,
without role checks inside the service layer.

---

## Roles
- ADMIN
- USER

Role is provided as query param on each request:

- ?role=ADMIN
- ?role=USER

If role param is:
- Missing → return 400 Bad Request
- Invalid value → return 400 Bad Request

If role is valid but not permitted for the endpoint → return 403 Forbidden.

---

## Authorization Rules

### ADMIN only:
POST /documents
DELETE /documents/{id}
GET /documents
GET /documents/{id}

### ADMIN and USER:
GET /documents/{id}/summary
POST /documents/{id}/questions

### Explicit Authorization Matrix

| Endpoint                         | ADMIN | USER |
|----------------------------------|--------|------|
| POST /documents                 | ✔      | ❌   |
| DELETE /documents/{id}          | ✔      | ❌   |
| GET /documents/{id}/summary     | ✔      | ✔    |
| POST /documents/{id}/questions  | ✔      | ✔    |
| GET /documents                  | ✔      | ❌   |
| GET /documents/{id}             | ✔      | ❌   |

---

## Implementation Approach

- Create `@RequiresRole(Role...)` annotation for controller methods.
- Create Spring `HandlerInterceptor`:
  - Read role from query param.
  - Validate role value.
  - If handler method has `@RequiresRole`:
      - Verify that the provided role is allowed.
      - If not allowed → return 403 Forbidden.
- Register interceptor via `WebMvcConfigurer`.

Additional implementation notes:
- Define a `Role` enum in `com.chana.knowledgehub.common` or `users` package with values `ADMIN` and `USER` so the annotation can reference the enum type.
- The `HandlerInterceptor` should return a structured error payload (see `ApiError`) for 400/403 responses.

No role checks are allowed inside services.

---

## Design Principles

- Authorization must remain outside business logic.
- Controllers declare required roles via annotation.
- Service layer must remain unaware of roles.
- Adding new roles should not require changes in service implementations.
- Security logic must be centralized in one place.

---

## Error Codes

- 400 → Missing or invalid role
- 403 → Role not permitted for endpoint

---

## Done Criteria

- Missing role → 400
- Invalid role → 400
- USER calling POST /documents → 403
- ADMIN calling POST /documents → 201
- Services contain no role checks
- All secured endpoints are protected via annotation + interceptor