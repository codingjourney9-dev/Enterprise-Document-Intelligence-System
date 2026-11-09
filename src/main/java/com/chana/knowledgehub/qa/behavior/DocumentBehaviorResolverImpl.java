package com.chana.knowledgehub.qa.behavior;

import com.chana.knowledgehub.common.exceptions.BadRequestException;
import com.chana.knowledgehub.documents.model.DocumentType;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;

@Component
public class DocumentBehaviorResolverImpl implements DocumentBehaviorResolver {

    private final Map<DocumentType, DocumentBehavior> behaviorByType;

    public DocumentBehaviorResolverImpl(PolicyBehavior policyBehavior,
                                        ReportBehavior reportBehavior,
                                        ManualBehavior manualBehavior) {
        Map<DocumentType, DocumentBehavior> map = new EnumMap<>(DocumentType.class);
        map.put(DocumentType.POLICY, policyBehavior);
        map.put(DocumentType.REPORT, reportBehavior);
        map.put(DocumentType.MANUAL, manualBehavior);
        this.behaviorByType = Map.copyOf(map);
    }

    @Override
    public DocumentBehavior resolve(DocumentType documentType) {
        DocumentBehavior behavior = behaviorByType.get(documentType);
        if (behavior == null) {
            throw new BadRequestException("Unsupported document type: " + documentType);
        }
        return behavior;
    }
}
