package com.chana.knowledgehub.users.service;

import com.chana.knowledgehub.users.api.dto.UserRequestDto;
import com.chana.knowledgehub.users.api.dto.UserResponseDto;
import com.chana.knowledgehub.common.Role;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserResponseDto> getAll();
    UserResponseDto create(UserRequestDto dto);
    UserResponseDto updateRole(UUID userId, Role newRole);
}
