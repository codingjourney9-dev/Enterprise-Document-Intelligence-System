package com.chana.knowledgehub.qa.service;

import com.chana.knowledgehub.qa.api.dto.AnswerResponseDto;
import com.chana.knowledgehub.qa.api.dto.QuestionRequestDto;
import com.chana.knowledgehub.qa.api.dto.SummaryResponseDto;

import java.util.UUID;

public interface QaService {
    SummaryResponseDto summarize(UUID documentId);

    AnswerResponseDto answerQuestion(UUID documentId, QuestionRequestDto request);
}
