const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema(
  {
    lang1: {
      type: String,
      minlength: [3, "language must be at least 3 characters!"],
      required: [true, "language is required!"],
    },

lang2: {
      type: String,
      minlength: [3, "language must be at least 3 characters!"],
      required: [true, "language is required!"],
    },
    desc: {
        type: String,
        minlength: [3, "language Description must be at least 3 characters!"],
        required: [true, "language Description is required!"],
      },
    
    
    });
module.exports.Room = mongoose.model("Room", RoomSchema);
