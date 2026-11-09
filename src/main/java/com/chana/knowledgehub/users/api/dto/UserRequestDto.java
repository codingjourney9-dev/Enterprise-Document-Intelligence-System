package com.chana.knowledgehub.users.api.dto;

import com.chana.knowledgehub.common.Role;

/**
 * Data required to create a new user.
 */
public record UserRequestDto(String name, Role role) {
}
