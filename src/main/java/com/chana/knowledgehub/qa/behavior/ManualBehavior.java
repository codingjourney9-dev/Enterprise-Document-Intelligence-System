package com.chana.knowledgehub.qa.behavior;

import com.chana.knowledgehub.documents.model.Document;
import org.springframework.stereotype.Component;

@Component
public class ManualBehavior implements DocumentBehavior {

    @Override
    public String buildSummaryPrompt(Document document) {
        return "Summarize the following MANUAL focusing on practical steps, procedures and actionable instructions.\n\n"
                + sourceText(document);
    }

    @Override
    public String buildQaPrompt(Document document, String question) {
        return "Answer the question about this MANUAL with practical, step-by-step guidance when possible.\n"
                + "Question: " + question + "\n\n"
                + sourceText(document);
    }

    private String sourceText(Document document) {
        if (document.getContentText() != null && !document.getContentText().isBlank()) {
            return document.getContentText();
        }
        return "Document metadata:\n"
                + "name=" + document.getName() + "\n"
                + "type=" + document.getType() + "\n"
                + "uploader=" + document.getUploader();
    }
}
