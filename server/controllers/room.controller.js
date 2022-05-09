const {Room} = require("../models/room.model");
const { request, response } = require('express');



class RoomController {


  create(request, response) {
    const {lang1,lang2,desc} = request.body;
    Room.create({lang1,lang2,desc})
      .then(newRoom => response.json(newRoom)
      ,console.log("hh"))
      .catch(err => response.json(err));
  }

}

module.exports = new RoomController();
