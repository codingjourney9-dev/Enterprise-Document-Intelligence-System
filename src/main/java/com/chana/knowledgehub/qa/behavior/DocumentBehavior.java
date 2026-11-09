package com.chana.knowledgehub.qa.behavior;

import com.chana.knowledgehub.documents.model.Document;

public interface DocumentBehavior {
    String buildSummaryPrompt(Document document);

    String buildQaPrompt(Document document, String question);
}
