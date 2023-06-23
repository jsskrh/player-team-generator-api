const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
      enum: ["defender", "midfielder", "forward"],
    },
    playerSkills: [
      {
        skill: {
          type: String,
          enum: ["defense", "attack", "speed", "strength", "stamina"],
          required: true,
        },
        value: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
