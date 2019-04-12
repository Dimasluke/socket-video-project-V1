const sinon = require("sinon");
const uC = require("./UserController");
const testDb = require("../../test/init");

describe("Unit Tests for db queries", () => {
  describe("getUser", () => {
    it("should send out a select * from users where username = Luke", () => {
      const fakeDb = {
        query: sinon
          .mock()
          .withArgs("select * from users where username = Luke")
      };
      return uC.getUser(fakeDb);
    });
  });

  describe("createUser", () => {
    const user = {
      firstName: "Luke",
      lastName: "Dimas",
      email: "dimasluke@gmail.com",
      username: "test567",
      password: "test",
      imageUrl: "pic goes here",
      bio: "cool biography"
    };
    const fakeDb = {
      query: sinon.mock().withArgs(
        "insert into users (firstName, lastName, email, username, password, imageUrl, bio) values(${firstName}, ${lastName}, ${email}, ${username}, ${password}, ${imageUrl}, ${bio}) returning *;",
        sinon.match({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          password: user.password,
          imageUrl: user.imageUrl,
          bio: user.bio
        })
      )
    };
    return uC.createUser(fakeDb, user);
  });
});

describe("Integration tests for userController", () => {
  let db;
  beforeAll(() => {
    return testDb.initDb().then(database => {
      return (db = database);
    });
  });
  describe("createUser", () => {
    it("should create a user in our db", () => {
      const user = {
        firstName: "Luke",
        lastName: "Dimas",
        email: "dimasluke@gmail.com",
        username: "test567",
        password: "test",
        imageUrl: "pic goes here",
        bio: "cool biography"
      };

      return uC.createUser(db, user).then(createUser => {
        expect(createUser.length).not.toEqual(0);
        expect(createUser[0]).toMatchObject({
          id: expect.any(Number),
          firstname: expect.any(String),
          lastname: expect.any(String),
          email: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          imageurl: expect.any(String),
          bio: expect.any(String)
        });
      });
    });
  });
});
