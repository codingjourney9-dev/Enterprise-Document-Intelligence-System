package com.chana.knowledgehub.common;

import java.time.Instant;

/**
 * DTO for API error responses.
 * Minimal and immutable; serializes cleanly to JSON.
 */
public record ApiError(Instant timestamp, int status, String error, String message, String path) {
}
