drop table if exists users;

create table users (
    id serial primary key,
    username varchar unique,
    password varchar,
    firstName varchar,
    lastName varchar,
    imageUrl varchar,
    bio varchar,
    email varchar
);

insert into users( username, password)
values
( 'Luke', 'Dimas'),
( 'Daniel', 'Szlauer'),
( 'Bryce', 'Bond');

select * from users;