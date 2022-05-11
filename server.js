

const express = require("express");
const cors = require("cors")
const cookies = require("cookie-parser");
require("dotenv").config();


const port = process.env.PORT || 8000;
// const db_name = "may_loginreg"

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}));

app.use(express.json())
app.use(cookies());


//require our mongoose config file and tell it about the db name
require("./server/config/mongoose")

//require our routes and tell it about our app
require("./server/routes/routes")(app)

//gggg



const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = {};


io.on("connection", client => {
  client.on("username", username => {
    const user = {
      name: username,
      id: client.id
    };
    users[client.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  client.on("send", message => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[client.id]
    });
  });

  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", client.id);
  });
});

//gggg
server.listen(
    port,
    ()=> console.log("listening on port", port)
)