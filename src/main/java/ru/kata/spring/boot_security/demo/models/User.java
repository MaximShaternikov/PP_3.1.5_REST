package ru.kata.spring.boot_security.demo.models;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
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
    @Column(name = "email", unique = true)
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Should not be empty")
    @Column(name = "password")
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;

    public User() {
    }

    public User(String firstName, String lastName, byte age, String email, String password, List<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
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
                (Objects.equals(email, user.email)) &&
                (Objects.equals(password, user.password)) &&
                (Objects.equals(roles, user.roles));
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, age, email, password, roles);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", email=" + email +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }
}
