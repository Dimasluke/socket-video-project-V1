drop table if exists friends;
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

create table friends
(
    friend_id serial primary key,
    username varchar REFERENCES users(username),
    friend varchar REFERENCES users(username)
);

insert into users
    ( username, password, firstName, lastName, imageUrl, bio, email)
values
    ( 'test', '$2b$12$SE8gRmF6gxggB.c9Gz0BhuROhdJZOb6spHpzIBQ205vHxRH3SYdIC', 'test', 'test', 'https:
//img.huffingtonpost.com/asset/563a94621800002a00303e2f.jpeg', 'test', 'test'),
    ( 'dszlauer', '$2b$12$SZ2RT6Mc.h0pNY3u8cRJBO3m3QprUZKRf1ArRMVjtzL0YCtgGTLC.', 'Daniel', 'Szlauer', 'https://media.licdn.com/dms/image/C5603AQH8pV32ieOJNw/profile-displayphoto-shrink_200_200/0?e=1559174400&v=beta&t=oCsiPWwNT24yTJ_t7KO3LLzPB4mV_aLEpsXl3k94aEA', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven', 'dszlauer@gmail.com' ),
    ( 'Bryce', 'Bond', 'test', 'test', 'https:cdn.britannica.com/67/197567-131-1645A26E.jpg', 'test', 'test'),
    ('bill', '$2b$12$SE8gRmF6gxggB.c9Gz0BhuROhdJZOb6spHpzIBQ205vHxRH3SYdIC', 'Bill', 'Buckley', 'https:static.independent.co.uk/s3fs-public/thumbnails/image/2013/11/27/10/rexfeatures_3211080a.jpg', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.', 'bill@gmail.com'),
    ('bill2', '$2b$12$SE8gRmF6gxggB.c9Gz0BhuROhdJZOb6spHpzIBQ205vHxRH3SYdIC', 'Bill', 'Buckley', 'https:static.independent.co.uk/s3fs-public/thumbnails/image/2013/11/27/10/rexfeatures_3211080a.jpg', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.', 'bill@gmail.com')
    ,
    ('bill3', '$2b$12$SE8gRmF6gxggB.c9Gz0BhuROhdJZOb6spHpzIBQ205vHxRH3SYdIC', 'Bill', 'Buckley', 'https:static.independent.co.uk/s3fs-public/thumbnails/image/2013/11/27/10/rexfeatures_3211080a.jpg', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.', 'bill@gmail.com'),
    ('bill4', '$2b$12$SE8gRmF6gxggB.c9Gz0BhuROhdJZOb6spHpzIBQ205vHxRH3SYdIC', 'Bill', 'Buckley', 'https:static.independent.co.uk/s3fs-public/thumbnails/image/2013/11/27/10/rexfeatures_3211080a.jpg', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.', 'bill@gmail.com'
),
    ('bill5', '$2b$12$SE8gRmF6gxggB.c9Gz0BhuROhdJZOb6spHpzIBQ205vHxRH3SYdIC', 'Bill', 'Buckley', 'https:static.independent.co.uk/s3fs-public/thumbnails/image/2013/11/27/10/rexfeatures_3211080a.jpg', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.', 'bill@gmail.com'
);;


insert into friends
    (username, friend)
values
    ('test', 'dszlauer'),
    ('test', 'Bryce'),
    ('test', 'bill'),
    ('test', 'bill2'),
    ('test', 'bill3'),
    ('test', 'bill4'),
    ('test', 'bill5'),
    ('dszlauer', 'Bryce'),
    ('dszlauer', 'test');

select *
from users;
select *
from friends;