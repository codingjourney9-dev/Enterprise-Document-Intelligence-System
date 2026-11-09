# API Contract

## Base URL

The frontend communicates with the backend Spring Boot server.

Base URL:

http://localhost:8080

---

# Documents API

## Get All Documents

GET /documents

Response:

Document[]

---

## Create Document

POST /documents

Request Body:

Document

---

## Delete Document

DELETE /documents/{id}

---

# AI API

## Generate Document Summary

POST /documents/{id}/summary

Response:

string

---

## Ask Question About Document

POST /documents/{id}/ask

Request Body:

AskQuestionRequest

Response:

string

---

# Users API

## Get All Users

GET /users

Response:

User[]

---

## Create User

POST /users

Request Body:

User

---

## Update User Role

PUT /users/{id}/role

Query Parameter:

role=ADMIN | USER

---

# Data Transfer Objects (DTO)

## Document

id: string
name: string
type: POLICY | REPORT | MANUAL
uploader: string
uploadDate: string

---

## User

id: string
name: string
role: ADMIN | USER

---

## Ask Question Request

question: string
