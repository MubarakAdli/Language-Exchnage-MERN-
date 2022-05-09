const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema(
  {
    lang1: {
      type: String,
      minlength: [3, "lang1 must be at least 3 characters!"],
      required: [true, "lang1 is required!"],
    },

lang2: {
      type: String,
      minlength: [3, "lang2 must be at least 3 characters!"],
      required: [true, "lang2 is required!"],
    },
    desc: {
        type: String,
        minlength: [3, "lang2 must be at least 3 characters!"],
        required: [true, "lang2 is required!"],
      },
    
    
    });
module.exports.Room = mongoose.model("Room", RoomSchema);
