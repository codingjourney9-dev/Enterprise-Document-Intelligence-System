package com.chana.knowledgehub.users.repository;

import com.chana.knowledgehub.users.model.User;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Very simple in-memory user repository backed by a thread-safe map.
 * Not persisted to a database; used only for MVP.
 */
@Repository
public class InMemoryUserRepository {

    private final ConcurrentMap<UUID, User> store = new ConcurrentHashMap<>();

    public List<User> findAll() {
        return new ArrayList<>(store.values());
    }

    public Optional<User> findById(UUID id) {
        return Optional.ofNullable(store.get(id));
    }

    public User save(User user) {
        if (user.getId() == null) {
            user.setId(UUID.randomUUID());
        }
        store.put(user.getId(), user);
        return user;
    }

    public void deleteById(UUID id) {
        store.remove(id);
    }
}
