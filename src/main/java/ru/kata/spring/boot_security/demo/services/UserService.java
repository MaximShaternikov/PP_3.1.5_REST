package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(long id);

    void save(User user);

    void delete(long id);

    void update(Long id, User user);

    User findByUsername(String username);
}