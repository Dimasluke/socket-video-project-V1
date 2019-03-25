const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const socket = require('socket.io')
const massive = require('massive')
const session = require('express-session')
const userController = require('./controllers/UserController')

app.use(bodyParser.json())
require('dotenv').config()

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000 * 24 * 14
        }
    })
)

massive(process.env.CONNECTION_STRING)
    .then(db => {
        console.log('Connected to database.')
        app.set('db', db)
        db.init()
    })
    .catch((err) => {
        console.log(err)
    })

app.get('/api/sessionInfo', userController.sessionInfo)
app.post('/api/register', userController.register)
app.post('/api/login', userController.login)
app.post('/api/logout', userController.logout)

const port = process.env.PORT || 4000
const io = socket(app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
}))

io.on('connection', socket => {
    console.log('User Connected')
})