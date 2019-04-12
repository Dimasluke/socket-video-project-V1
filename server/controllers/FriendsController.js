module.exports = {
  getFriends: (req, res, next) => {
    const db = req.app.get("db");
    const { username } = req.params;
    console.log("getFriends ===> ", username);
    db.get_friends(username).then(friends => {
      res.status(200).json(friends);
    });
  },
  addFriend: (req, res, next) => {
    const db = req.app.get("db");
    console.log(req.body);
    const { username, friend } = req.body;
    console.log("addFriend ===> ", username, friend);
    db.add_friend([username, friend]).then(friends => {
      res.status(200).json(friends);
    });
  },
  removeFriend: (req, res, next) => {
    const db = req.app.get("db");
    const { username, friend } = req.params;
    console.log("deleteFriend ===> ", username, friend);
    db.remove_friend(username, friend).then(friends => {
      res.status(200).json(friends);
    });
  }
};
