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
              res.status(403).json({ message: "You fucked up." });
            }
          });
        } else {
          res.status(403).json({
            message: "Who the fuck is this?!?!"
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
  }
};
