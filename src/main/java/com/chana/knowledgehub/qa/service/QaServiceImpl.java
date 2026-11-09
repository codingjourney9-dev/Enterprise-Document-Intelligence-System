package com.chana.knowledgehub.qa.service;

import com.chana.knowledgehub.common.exceptions.NotFoundException;
import com.chana.knowledgehub.documents.repository.DocumentRepository;
import com.chana.knowledgehub.llm.LlmClient;
import com.chana.knowledgehub.qa.api.dto.AnswerResponseDto;
import com.chana.knowledgehub.qa.api.dto.QuestionRequestDto;
import com.chana.knowledgehub.qa.api.dto.SummaryResponseDto;
import com.chana.knowledgehub.qa.behavior.DocumentBehavior;
import com.chana.knowledgehub.qa.behavior.DocumentBehaviorResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class QaServiceImpl implements QaService {

    private final DocumentRepository documentRepository;
    private final DocumentBehaviorResolver behaviorResolver;
    private final LlmClient llmClient;

    public QaServiceImpl(DocumentRepository documentRepository,
                         DocumentBehaviorResolver behaviorResolver,
                         LlmClient llmClient) {
        this.documentRepository = documentRepository;
        this.behaviorResolver = behaviorResolver;
        this.llmClient = llmClient;
    }

    @Override
    @Transactional(readOnly = true)
    public SummaryResponseDto summarize(UUID documentId) {
        var document = documentRepository.findById(documentId)
                .orElseThrow(() -> new NotFoundException("Document not found: " + documentId));

        DocumentBehavior behavior = behaviorResolver.resolve(document.getType());
        String prompt = behavior.buildSummaryPrompt(document);
        String summary = llmClient.complete(prompt);

        return new SummaryResponseDto(summary);
    }

    @Override
    @Transactional(readOnly = true)
    public AnswerResponseDto answerQuestion(UUID documentId, QuestionRequestDto request) {
        var document = documentRepository.findById(documentId)
                .orElseThrow(() -> new NotFoundException("Document not found: " + documentId));

        DocumentBehavior behavior = behaviorResolver.resolve(document.getType());
        String prompt = behavior.buildQaPrompt(document, request.question());
        String answer = llmClient.complete(prompt);

        return new AnswerResponseDto(answer);
    }
}
