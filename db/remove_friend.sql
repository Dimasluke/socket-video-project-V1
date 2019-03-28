delete from friends where
id = $1 and friend = $2;

select *
from friends join users on (friends.friend = users.username)
where friends.id = $1;