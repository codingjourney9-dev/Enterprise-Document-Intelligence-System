package com.chana.knowledgehub.users.model;

import com.chana.knowledgehub.common.Role;

import java.util.UUID;

/**
 * Simple domain representation of an application user.
 * Stored in-memory; not managed by JPA.
 */
public class User {
    private UUID id;
    private String name;
    private Role role;

    public User(UUID id, String name, Role role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
