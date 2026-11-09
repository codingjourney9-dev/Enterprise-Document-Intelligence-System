package com.chana.knowledgehub.qa.behavior;

import com.chana.knowledgehub.documents.model.DocumentType;

public interface DocumentBehaviorResolver {
    DocumentBehavior resolve(DocumentType documentType);
}
