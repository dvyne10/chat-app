const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "sentBy",
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
