
const Users = require("../controllers/user.controller");
const RoomController = require("../controllers/room.controller");







const {authenticate } = require("../config/jwt");
const rooms = require("../controllers/room.controller"); 
module.exports = app=>{
    app.post("/api/register", Users.register)
    app.post("/api/login", Users.login)

    app.get("/api/users/loggedin",authenticate, Users.getLoggedInUser)


    app.get("/api/users/logout", Users.logout)
    app.post("/api/addin", RoomController.create )
    app.get('/api/room/:id', RoomController.getRoom);
    app.delete("/api/delete/:id", RoomController.delete )
    app.get('/api/rooms',RoomController.getAll)
    app.put('/api/users/loggedin',authenticate, Users.EditUser);


}