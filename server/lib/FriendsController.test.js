// Bryce

const sinon = require("sinon");
const fC = require("./FriendsController");
const testDb = require("../../test/init");

describe("getFriends", () => {
  it("select * from friends join users on (friends.friend = users.username) where friends.username = $1", () => {
    const fakeDb = {
      query: sinon
        .mock()
        .withArgs(
          "select * from friends join users on (friends.friend = users.username) where friends.username = test"
        )
    };
    return fC.getFriends(fakeDb);
  });
});

describe("addFriend", () => {
  it("insert into friends (username, friend) values($1, $2); select * from friends;", () => {
    const friend = {
      username: "test",
      friend: "bill"
    };
    const fakeDb = {
      query: sinon.mock().withArgs(
        "insert into friends (username, friend) values($1, $2); select * from friends;",
        sinon.match({
          username: friend.username,
          friend: friend.friend
        })
      )
    };
    return fC.addFriend(fakeDb, friend);
  });
});
