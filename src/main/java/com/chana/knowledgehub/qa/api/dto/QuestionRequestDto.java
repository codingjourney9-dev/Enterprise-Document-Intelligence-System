package com.chana.knowledgehub.qa.api.dto;

import jakarta.validation.constraints.NotBlank;

public record QuestionRequestDto(@NotBlank String question) {
}
