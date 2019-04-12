// Bryce Tests

module.exports = {
  getFriends: testDb => {
    return testDb.query(
      "select * from friends join users on (friends.friend = users.username) where friends.username = test"
    );
  },
  addFriend: (testDb, friend) => {
    return testDb.query(
      "insert into friends (username, friend) values($1, $2); select * from friends;",
      {
        username: friend.username,
        friend: friend.friend
      }
    );
  }
};
