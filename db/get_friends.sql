select *
from users
    join friends on (friends.friend = users.username)
where friends.id = 1;