package com.chana.knowledgehub.users.api;

import com.chana.knowledgehub.common.Role;
import com.chana.knowledgehub.users.api.dto.UserRequestDto;
import com.chana.knowledgehub.users.api.dto.UserResponseDto;
import com.chana.knowledgehub.users.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAll() {
        List<UserResponseDto> users = service.getAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> create(@RequestBody UserRequestDto dto) {
        UserResponseDto created = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserResponseDto> updateRole(@PathVariable UUID id,
                                                      @RequestParam Role role) {
        UserResponseDto updated = service.updateRole(id, role);
        return ResponseEntity.ok(updated);
    }
}
