module.exports = {
  getFriends: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log("getFriends ===> ");
    db.get_friends(id).then(friends => {
      res.status(200).json(friends);
    });
  },
  addFriend: (req, res, next) => {
    const db = req.app.get("db");
    const { id, friend } = req.body;
    console.log("addFriend ===> ", id, friend);
    db.add_friend([id, friend]).then(friends => {
      res.status(200).json(friends);
    });
  },
  removeFriend: (req, res, next) => {
    const db = req.app.get("db");
    const { id, username } = req.params;
    console.log("deleteFriend ===> ", id, username);
    db.remove_friend(id, username).then(friends => {
      res.status(200).json(friends);
    });
  }
};
