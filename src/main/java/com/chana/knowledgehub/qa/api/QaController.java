package com.chana.knowledgehub.qa.api;

import com.chana.knowledgehub.common.Role;
import com.chana.knowledgehub.config.security.RequiresRole;
import com.chana.knowledgehub.qa.api.dto.AnswerResponseDto;
import com.chana.knowledgehub.qa.api.dto.QuestionRequestDto;
import com.chana.knowledgehub.qa.api.dto.SummaryResponseDto;
import com.chana.knowledgehub.qa.service.QaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/documents")
public class QaController {

    private final QaService qaService;

    public QaController(QaService qaService) {
        this.qaService = qaService;
    }

    @RequestMapping(value = "/{id}/summary", method = {RequestMethod.GET, RequestMethod.POST})
    @RequiresRole({Role.ADMIN, Role.USER})
    public ResponseEntity<SummaryResponseDto> getSummary(@PathVariable("id") UUID documentId) {
        return ResponseEntity.ok(qaService.summarize(documentId));
    }

    @PostMapping({"/{id}/ask", "/{id}/questions"})
    @RequiresRole({Role.ADMIN, Role.USER})
    public ResponseEntity<AnswerResponseDto> askQuestion(@PathVariable("id") UUID documentId,
                                                          @Valid @RequestBody QuestionRequestDto request) {
        return ResponseEntity.ok(qaService.answerQuestion(documentId, request));
    }
}
