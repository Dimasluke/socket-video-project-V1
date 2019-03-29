delete from friends where
username = $1 and friend = $2;

select *
from friends join users on (friends.friend = users.username)
where friends.username = $1;

