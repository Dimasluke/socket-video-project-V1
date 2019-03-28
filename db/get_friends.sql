select *
from friends join users on (friends.friend = users.username)
where friends.id = $1;