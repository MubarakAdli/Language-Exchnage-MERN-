const {Room} = require("../models/room.model");



class RoomController {

  getAll = (req, res) => {
    Room.find({})
      .then((rooms) => res.json(rooms))
      .catch((err) => res.json(err));
  };
  
  create(req, res) {
    const {lang1,lang2,desc} = req.body;
    Room.create({lang1,lang2,desc})
      .then(newRoom => res.json(newRoom)
      )
      .catch(err => res.json(err));
  }

  getRoom= (request, response) => {
    Room.findOne({_id:request.params.id})
        .then(room => response.json(room))
        .catch(err => response.json(err))
}

  delete (request, response) {
    const {id} =request.params ;
    Room.deleteOne({_id:id})

        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

  getRoom = (request,response) => {
    const { id } = request.params.id;
    Author.findOne({_id:id})
    .then(author => response.json(author))
    .catch(err => response.json(err))
}

  update = (req, res) => {
    const { id } = req.params;
    Room.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    )
      .then((updatedRoom) => res.json(updatedRoom))
      .catch((err) => res.status(400).send(err));
  };

}

module.exports = new RoomController();
