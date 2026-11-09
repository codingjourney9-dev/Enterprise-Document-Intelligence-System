# LLM Specification

## Goal
Provide an abstraction for generating text responses used by the QA and Summary features.

The system must support both:
- Mock LLM implementation for deterministic local testing
- Real LLM provider integration

---

## Interface

LlmClient:
- String complete(String prompt)

The service layer must depend only on this interface.

---

## Implementations

### MockLlmClient (Default)
Used for local development and deterministic testing.

Behavior:
- Returns deterministic text
- Prefix response with "MOCK_RESPONSE:"
- Return first 200 characters of the prompt

Example:

MOCK_RESPONSE: <first 200 characters>

---

### OpenAiLlmClient (Real Integration)

Optional real provider implementation.

Responsibilities:
- Send prompt to OpenAI Chat API
- Return generated text response

Requirements:
- Use HTTP client (Spring RestClient or WebClient)
- API key read from configuration:
  openai.api.key
- Model configurable:
  openai.model

---

## Configuration

If property:

knowledgehub.llm.provider = openai

Then use:
OpenAiLlmClient

Otherwise default to:
MockLlmClient

---

## Design Principles

- Business logic must not depend on a specific LLM provider
- LLM integration must be swappable
- System must work without external API keys

## Implementation Details

### OpenAiLlmClient

Location:
com.chana.knowledgehub.llm

Responsibilities:
- Implement LlmClient
- Call OpenAI Chat Completions API
- Return generated response text

HTTP endpoint:
https://api.openai.com/v1/chat/completions

Request structure example:

{
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "user", "content": "<prompt>" }
  ]
}

Response parsing:
Extract:

choices[0].message.content

### Spring Integration

Use Spring WebClient.

Configuration properties:

openai.api.key
openai.model

Default model:
gpt-4o-mini