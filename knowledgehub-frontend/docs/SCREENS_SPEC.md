# Screens Specification

## Documents Page

### Purpose

Display all documents stored in the system.

### Table Columns

Name
Type
Uploader
Upload Date

### Available Actions

View Summary
Ask Question
Delete document (ADMIN only)

### Role Behavior

ADMIN users can:

* upload documents
* delete documents

USER users can:

* view documents
* ask questions about documents

### UI States

Loading state when fetching documents.

Empty state when no documents exist.

Error state when API request fails.

---

## Users Page

### Purpose

Manage system users.

### Table Columns

Name
Role

### Available Actions

Create user
Change user role

### UI States

Loading state when fetching users.

Empty state when no users exist.

Error state when API request fails.
