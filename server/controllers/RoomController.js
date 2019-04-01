const rooms = [
        {
          id: 500,
          roomName: "Lobby",
          description: "Enjoy time with your peers here!",
          owner: "Administrator",
          videoUrl: "https://www.youtube.com/embed/lrX6ktLg8WQ"
        },
        {
          id: 501,
          roomName: "Music",
          description: "Listen and relax to amazing tunes.",
          owner: "Administrator",
          videoUrl: "https://www.youtube.com/embed/XJYmyYzuTa8"
        },
        {
          id: 502,
          roomName: "Gaming",
          description: "Dive into the world of eSports here.",
          owner: "Administrator",
          videoUrl: "https://www.youtube.com/embed/nCSqao5nR_4"
        },
        {
          id: 503,
          roomName: "Education",
          description: "Learn about the most recent advancements in the world of technology.",
          owner: "Administrator",
          videoUrl: "https://www.youtube.com/embed/fT6mzqBAqmo"
        },
        {
          id: 504,
          roomName: "Comedy",
          description: "Take a load off and laugh with your friends.",
          owner: "Administrator",
          videoUrl: "https://www.youtube.com/embed/HZFTUtbn1RU"
        },
        {
          id: 505,
          roomName: "Sports",
          description: "Watch teams battle for trophies in the world of profession sports.",
          owner: "Administrator",
          videoUrl: "https://www.youtube.com/embed/IoN4w2o8AxY"
        }
      ]

      module.exports = {
          getRooms: (req, res) => {
              res.status(200).json(rooms)
          },
          newRoom: (req, res) => {
            let { title, description, owner, url, categories } = req.body
            let id = owner
            let likes = 0;
            let dislikes = 0;
            let newRoom = { id, title, description, owner, url, likes, dislikes, categories }
            console.log(id)
            console.log(newRoom)
            rooms.push(newRoom)
            console.log(rooms)
            res.status(200).json(rooms)
          },
          deleteRoom: (req, res) => {
            let { id } = req.params
            let index = rooms.findIndex(room => id === room.id)
            console.log('delete route hit with index - ', index)
            rooms.splice(index, 1)
            res.status(200).json(rooms)
          }
      }
