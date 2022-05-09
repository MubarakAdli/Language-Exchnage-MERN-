
const Users = require("../controllers/user.controller");
const RoomController = require("../controllers/room.controller");


const {authenticate } = require("../config/jwt");

module.exports = app=>{
    app.post("/api/register", Users.register)
    app.post("/api/login", Users.login)

    app.get("/api/users/loggedin",authenticate, Users.getLoggedInUser)

    app.get("/api/users/logout", Users.logout)
    app.post("/api/addin", RoomController.create )
}