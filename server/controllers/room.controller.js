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

  delete = (req, res) => {
    const { id } = req.params;
    Room.deleteOne({
      _id: id,
    })
      .then((rooms) => res.json(rooms))
      .catch((err) => {
        res.status(400).json(err);
      });
  };

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
