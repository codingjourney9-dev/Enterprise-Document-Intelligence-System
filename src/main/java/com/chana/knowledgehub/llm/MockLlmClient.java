package com.chana.knowledgehub.llm;

public class MockLlmClient implements LlmClient {

    @Override
    public String complete(String prompt) {
        int maxLength = Math.min(200, prompt.length());
        return "MOCK_RESPONSE: " + prompt.substring(0, maxLength);
    }
}
