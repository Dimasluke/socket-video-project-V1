module.exports = {
    getUser: (testDb) => {
        return testDb.query('select * from users where username = Luke')
    },
    createUser: (testDb, user) => {
        return testDb.query('insert into users (firstName, lastName, email, username, password, imageUrl, bio) values(${firstName}, ${lastName}, ${email}, ${username}, ${password}, ${imageUrl}, ${bio}) returning *;', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            imageUrl: user.imageUrl,
            bio: user.bio
        })
    }
}