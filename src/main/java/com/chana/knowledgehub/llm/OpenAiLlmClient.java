package com.chana.knowledgehub.llm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

public class OpenAiLlmClient implements LlmClient {

    private static final String OPENAI_CHAT_COMPLETIONS = "https://api.openai.com/v1/chat/completions";
    private static final Logger logger = LoggerFactory.getLogger(OpenAiLlmClient.class);

    private final WebClient webClient;
    private final String apiKey;
    private final String model;

    public OpenAiLlmClient(WebClient webClient, String apiKey, String model) {
        this.webClient = webClient;
        this.apiKey = apiKey;
        this.model = model;
    }

    @Override
    public String complete(String prompt) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("openai.api.key is required when knowledgehub.llm.provider=openai");
        }

        if (prompt == null || prompt.isBlank()) {
            throw new IllegalArgumentException("prompt must not be blank");
        }

        ChatCompletionRequest request = new ChatCompletionRequest(
                model,
                List.of(new ChatMessage("user", prompt))
        );

        ChatCompletionResponse response;
        try {
            response = webClient.post()
                    .uri(OPENAI_CHAT_COMPLETIONS)
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(ChatCompletionResponse.class)
                    .block();
        } catch (WebClientResponseException e) {
            logger.warn("OpenAI API responded with status {}. Falling back to mock response.", e.getStatusCode().value());
            return fallback(prompt);
        } catch (WebClientRequestException e) {
            logger.warn("OpenAI API is unreachable ({}). Falling back to mock response.", e.getMessage());
            return fallback(prompt);
        }

        if (response == null
                || response.choices() == null
                || response.choices().isEmpty()
                || response.choices().get(0).message() == null
                || response.choices().get(0).message().content() == null) {
            logger.warn("OpenAI API returned invalid response payload");
            return fallback(prompt);
        }

        return response.choices().get(0).message().content();
    }

    private String fallback(String prompt) {
        int maxLength = Math.min(200, prompt.length());
        return "MOCK_RESPONSE: " + prompt.substring(0, maxLength);
    }

    private record ChatCompletionRequest(String model, List<ChatMessage> messages) {
    }

    private record ChatMessage(String role, String content) {
    }

    private record ChatCompletionResponse(List<Choice> choices) {
    }

    private record Choice(ChatMessage message) {
    }
}
