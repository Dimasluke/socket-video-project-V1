const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
  register: (req, res) => {
    const db = req.app.get("db");
    const { username, password, firstName, lastName, email } = req.body;
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
      db.create_user([firstName, lastName, email, username, hashedPassword])
        .then(() => {
          req.session.user = username;
          res.status(200).json(req.session.user);
        })
        .catch(error => {
          if (error.message.match(/duplicate key/g)) {
            res.status(409).json({
              message: "That user already exists"
            });
          } else {
            res.status(500).json({
              message: "An error occured on the server"
            });
          }
        });
    });
  },

  login: (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    db.get_user(username)
      .then(user => {
        if (user.length) {
          bcrypt.compare(password, user[0].password).then(passwordMatch => {
            if (passwordMatch) {
              console.log(user[0].id);
              req.session.user = {
                username: user[0].username,
                userId: user[0].id
              };
              console.log(req.session.user);
              res.status(200).json(req.session.user);
            } else {
              res.status(403).json({ message: "An error has occurred. Please try again." });
            }
          });
        } else {
          res.status(403).json({
            message: "An error has occurred."
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).end();
  },

  sessionInfo: (req, res) => {
    res.status(200).json(req.session.user);
  },

  getUserInfo: (req, res) => {
    const { id } = req.params;
    // console.log("UserName", req.params);
    req.app
      .get("db")
      .get_user([id])
      .then(user => {
        // console.log(user);
        res.status(200).json(user[0]);
      })
      .catch(err => console.log("Could not get user:", err));
  },

  editUserInfo: (req, res) => {
    const { id } = req.query;
    const { firstname, lastname, email, bio, imageurl } = req.body;
    console.log("QUERY", req.query);
    console.log("BODY", req.body);

    if (!id) {
      res.status(301).json({ message: "Please add content" });
      return;
    }
    if (!firstname || !lastname || !email || !bio || !imageurl) {
      res.status(301).json({ message: "Please add content" });
      return;
    }
    req.app
      .get("db")
      .edit_user([firstname, lastname, email, bio, imageurl, id])
      .then(userInfo => {
        console.log("USERINFO", userInfo);
        res.status(200).json(userInfo);
      })
      .catch(err => console.log("Could not edit user profile", err));
  },

  getAllUsers: (req, res) => {
    req.app
      .get("db")
      .get_all_users()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => console.log("Could not get all users", err));
  }
};
