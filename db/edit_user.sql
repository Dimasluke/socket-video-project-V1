update users
set firstname = $1, lastname = $2, email = $3, bio = $4, imageurl = $5
where id = $6
returning *;