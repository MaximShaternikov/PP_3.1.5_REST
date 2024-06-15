package ru.kata.spring.boot_security.demo.models;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Should not be empty")
    @Column(name = "first_name", length = 45)
    private String firstName;

    @NotEmpty(message = "Should not be empty")
    @Column(name = "last_name", length = 45)
    private String lastName;

    @Min(value = 1, message = "Should be greater than 0")
    @Column(name = "age")
    private byte age;

    @NotEmpty(message = "Should not be empty")
    @Size(min = 1, max = 12, message = "Username should be between 1 and 12 characters")
    @Column(name = "username")
    private String username;

    @NotEmpty(message = "Should not be empty")
    @Column(name = "password")
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public User() {
    }

    public User(String firstName, String lastName, byte age, String username, String password, Set<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public byte getAge() {
        return age;
    }

    public void setAge(byte age) {
        this.age = age;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if ((o == null) || (getClass() != o.getClass())) {
            return false;
        }
        User user = (User) o;
        return (age == user.age) &&
                (Objects.equals(id, user.id)) &&
                (Objects.equals(firstName, user.firstName)) &&
                (Objects.equals(lastName, user.lastName)) &&
                (Objects.equals(username, user.username)) &&
                (Objects.equals(password, user.password)) &&
                (Objects.equals(roles, user.roles));
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, age, username, password, roles);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }
}
