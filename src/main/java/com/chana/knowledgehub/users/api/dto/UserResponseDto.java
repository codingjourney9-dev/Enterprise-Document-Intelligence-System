package com.chana.knowledgehub.users.api.dto;

import com.chana.knowledgehub.common.Role;

import java.util.UUID;

/**
 * DTO returned by user endpoints.
 */
public record UserResponseDto(UUID id, String name, Role role) {
}
