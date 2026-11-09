package com.chana.knowledgehub.users.service;

import com.chana.knowledgehub.common.exceptions.BadRequestException;
import com.chana.knowledgehub.common.exceptions.NotFoundException;
import com.chana.knowledgehub.common.Role;
import com.chana.knowledgehub.users.api.dto.UserRequestDto;
import com.chana.knowledgehub.users.api.dto.UserResponseDto;
import com.chana.knowledgehub.users.model.User;
import com.chana.knowledgehub.users.repository.InMemoryUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final InMemoryUserRepository repository;

    public UserServiceImpl(InMemoryUserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDto> getAll() {
        return repository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserResponseDto create(UserRequestDto dto) {
        if (dto.name() == null || dto.name().isBlank()) {
            throw new BadRequestException("name must not be blank");
        }
        if (dto.role() == null) {
            throw new BadRequestException("role is required");
        }
        User user = new User(null, dto.name(), dto.role());
        User saved = repository.save(user);
        return toDto(saved);
    }

    @Override
    @Transactional
    public UserResponseDto updateRole(UUID userId, Role newRole) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new NotFoundException("user not found"));
        user.setRole(newRole);
        repository.save(user);
        return toDto(user);
    }

    private UserResponseDto toDto(User user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getRole());
    }
}
