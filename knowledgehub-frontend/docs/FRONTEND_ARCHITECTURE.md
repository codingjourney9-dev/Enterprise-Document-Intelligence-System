# Frontend Architecture

## Technology Stack

React
TypeScript
Vite
React Router
Axios

## Architectural Style

The frontend follows a **feature-based architecture**.

Each feature is organized into the following structure:

* pages
* components
* api
* hooks
* types

Shared reusable code is located under the `shared/` directory.

Example structure:

src/
app/
features/
shared/
styles/

## Layers

### UI Layer

Reusable UI components and visual elements.

Examples:

* tables
* buttons
* panels
* layout components

### Feature Layer

Contains business screens and feature logic.

Each feature includes:

* page components
* feature-specific components
* hooks
* API integration

### API Layer

Responsible for communication with backend REST services.

Uses Axios to call backend endpoints.

## State Management

Server data fetching is handled with feature-level React hooks and Axios.

Current approach:

* `useState` for data, loading, and error state
* `useEffect` for initial fetch
* `useCallback` for reusable refresh/refetch functions

Example hooks/pages in current code:

* `features/documents/hooks/useDocuments.ts`
* `features/users/pages/UsersPage.tsx`

Local UI state is handled with React hooks.

## Routing

Navigation between pages is handled using **React Router**.

Main routes:

/ → Documents page
/users → Users management page

## Folder Structure

src/
app/
layout/
router/
providers/

features/
documents/
users/
ai/

shared/
ui/
components/
hooks/
api/
types/
utils/

styles/

## Type Definitions

TypeScript interfaces used by the frontend should be organized in the `types` folder of each feature.

Example:

features/ai/types/
AskQuestionRequest.ts
SummaryResponse.ts
AnswerResponse.ts

For cleaner imports, each types folder may expose an index file:

features/ai/types/index.ts

Example:

export * from "./AskQuestionRequest";
export * from "./SummaryResponse";
export * from "./AnswerResponse";

This allows imports like:

import type { AskQuestionRequest, SummaryResponse } from "../types";

