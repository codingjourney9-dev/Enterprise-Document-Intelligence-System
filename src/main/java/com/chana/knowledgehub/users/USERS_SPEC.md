# Users Feature Specification (In-Memory)

## Goal
Provide minimal user management for MVP, using in-memory storage.

## Entity
User:
- UUID id (generated)
- String name (required)
- Role role (ADMIN/USER)

Validation:
- name must not be blank

## Storage
- InMemoryUserRepository backed by ConcurrentHashMap<UUID, User>

## API Contract

GET /users
- Returns list of users

POST /users
Request:
{
  "name": "Chana",
  "role": "USER"
}
Response 201:
{
  "id": "...",
  "name": "Chana",
  "role": "USER"
}

PUT /users/{id}/role?role=ADMIN
Response 200: updated user

## Done Criteria
- Can create user and list users
- Can update role
- No database dependency for users