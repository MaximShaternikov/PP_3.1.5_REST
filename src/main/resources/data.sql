insert into users (first_name, last_name, age, username, password)
values ('Tom', 'Jameson', 25, 'admin', '$2a$12$h6q62P8iuS4UJ.bqQ42useAjcbJnDfzZ5AnXV3CYcEGwCQqY1Mb5W'); --pass: admin

insert into users (first_name, last_name, age, username, password)
values ('Mathew', 'James', 42, 'user', '$2a$12$PReFKW37j9qpc7P3NRuCYO5cE0cI3cnILoCaOlpssZReX4B0k0zbm'); --pass: user

insert into roles (name)
values ('ROLE_ADMIN'), ('ROLE_USER');

insert into users_roles (user_id, role_id)
values ((select id from users where username = 'admin'), (select id from roles where name = 'ROLE_ADMIN'));

insert into users_roles (user_id, role_id)
values ((select id from users where username = 'admin'), (select id from roles where name = 'ROLE_USER'));

insert into users_roles (user_id, role_id)
values ((select id from users where username = 'user'), (select id from roles where name = 'ROLE_USER'));