package com.chana.knowledgehub.users.api.dto;

import com.chana.knowledgehub.common.Role;

/**
 * Payload for changing a user's role.
 */
public record UserRoleUpdateDto(Role role) {
}
