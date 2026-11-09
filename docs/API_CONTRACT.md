# API Contract – AI-Powered Knowledge Hub

Base URL: http://localhost:8080

All secured endpoints require query param:
?role=ADMIN | ?role=USER

Notes:
- Controllers return DTO responses (not JPA entities). POST responses include the created resource DTO with `id` and `uploadDate` as shown below.

If role is missing or invalid -> 400 Bad Request
If role not authorized -> 403 Forbidden

---

# 1. Documents

## 1.1 Create Document
POST /documents?role=ADMIN

Request:
{
  "name": "Security Policy",
  "uploader": "Chana",
  "type": "POLICY",
  "filePath": "/storage/policy1.txt",
  "contentText": "Optional plain text for MVP"
}

Response 201:
{
  "id": "uuid",
  "name": "Security Policy",
  "uploader": "Chana",
  "uploadDate": "2026-03-01T10:15:00",
  "type": "POLICY",
  "filePath": "/storage/policy1.txt"
}

---

## 1.2 List Documents
GET /documents?role=ADMIN

Response 200:
[
  {
    "id": "uuid",
    "name": "Security Policy",
    "uploader": "Chana",
    "uploadDate": "...",
    "type": "POLICY",
    "filePath": "/storage/policy1.txt"
  }
]

---

## 1.3 Get Document By Id
GET /documents/{id}?role=ADMIN

Response 200 or 404

---

## 1.4 Delete Document
DELETE /documents/{id}?role=ADMIN

Response 204

---

# 2. Summary

## 2.1 Get Summary
GET /documents/{id}/summary?role=USER

Response 200:
{
  "summary": "Generated summary text..."
}

Errors:
- 404 if document not found
- 403 if role not allowed

---

# 3. Q&A

## 3.1 Ask Question
POST /documents/{id}/questions?role=USER

Request:
{
  "question": "What are the main risks?"
}

Response 200:
{
  "answer": "Generated answer text..."
}

Errors:
- 400 if question is blank
- 404 if document not found
- 403 if role not allowed

---

# 4. Users (In-Memory)

## 4.1 Create User
POST /users

Request:
{
  "name": "Dana",
  "role": "USER"
}

Response 201:
{
  "id": "uuid",
  "name": "Dana",
  "role": "USER"
}

---

## 4.2 List Users
GET /users

Response 200:
[
  {
    "id": "uuid",
    "name": "Dana",
    "role": "USER"
  }
]

---

## 4.3 Update User Role
PUT /users/{id}/role?role=ADMIN

Response 200:
{
  "id": "uuid",
  "name": "Dana",
  "role": "ADMIN"
}