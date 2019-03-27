module.exports = {
  getFriends: (req, res, next) => {
    const db = req.app.get("db");
    console.log("getFriends ===> ");
    db.get_friends().then(friends => {
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
    const { id, friend } = req.params;
    console.log("deleteFriend ===> ", id, friend);
    db.remove_friend(id, friend).then(friends => {
      res.status(200).json(friends);
    });
  }
};
