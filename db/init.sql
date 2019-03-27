drop table if exists users;

create table users
(
    id serial primary key,
    username varchar unique,
    password varchar,
    firstName varchar,
    lastName varchar,
    imageUrl varchar,
    bio varchar,
    email varchar
);

insert into users
    ( username, password, firstName, lastName, imageUrl, bio, email)
values
    ( 'test', '$2b$12$SE8gRmF6gxggB.c9Gz0BhuROhdJZOb6spHpzIBQ205vHxRH3SYdIC', 'test', 'test', 'test', 'test', 'test'),
    ( 'dszlauer', 'test', 'Daniel', 'Szlauer', 'https://media.licdn.com/dms/image/C5603AQH8pV32ieOJNw/profile-displayphoto-shrink_200_200/0?e=1559174400&v=beta&t=oCsiPWwNT24yTJ_t7KO3LLzPB4mV_aLEpsXl3k94aEA', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven', 'dszlauer@gmail.com' ),
    ( 'Bryce', 'Bond', 'test', 'test', 'test', 'test', 'test');

select *
from users;