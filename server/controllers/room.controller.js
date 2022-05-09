const { room } = require("../models/room.model");

module.exports.index = (request, response) => {
  response.json({
    message: "Hello World",
  });
};

module.exports.createroom = (req, res) => {
  room.create(req.body)
    .then((room) => res.json(room))
    .catch((err) => res.status(400).json(err));
};

module.exports.getAllrooms = (req, res) => {
  room.find({})
    .sort("dueDate")
    .then((rooms) => res.json(rooms))
    .catch((err) => res.status(400).json(err));
};

/* module.exports.getroom = (req, res) => {
  const { id } = req.params;
  Athlete.findOne({ _id: id })
    .then((athlete) => res.json(athlete))
    .catch((err) => res.status(400).json(err));
}; */

module.exports.deleteroom = (req, res) => {
  const { id } = req.params;
  room.deleteOne({
    _id: id,
  })
    .then((room) => res.json(room))
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.updateroom = (req, res) => {
  const { id } = req.params;
  room.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
    { new: true, runValidators: true }
  )
    .then((updatedroom) => res.json(updatedroom))
    .catch((err) => res.status(400).send(err));
};
