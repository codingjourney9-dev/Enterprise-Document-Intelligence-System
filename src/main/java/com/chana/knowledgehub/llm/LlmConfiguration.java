package com.chana.knowledgehub.llm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class LlmConfiguration {

    @Bean
    @ConditionalOnProperty(prefix = "knowledgehub.llm", name = "provider", havingValue = "openai")
    public LlmClient openAiLlmClient(WebClient.Builder webClientBuilder,
                                     @Value("${openai.api.key:}") String apiKey,
                                     @Value("${openai.model:gpt-4o-mini}") String model) {
        return new OpenAiLlmClient(webClientBuilder.build(), apiKey, model);
    }

    @Bean
    @ConditionalOnProperty(prefix = "knowledgehub.llm", name = "provider", havingValue = "mock", matchIfMissing = true)
    public LlmClient mockLlmClient() {
        return new MockLlmClient();
    }
}
