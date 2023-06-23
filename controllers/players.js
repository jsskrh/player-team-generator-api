const Player = require("../models/player");

const create = async (req, res) => {
  try {
    const playerData = req.body;
    const result = await Player.create(playerData);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to create player. Please try again. \n Error: ${error}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const playerData = req.body;
    const result = await Player.findByIdAndUpdate(id, playerData, {
      new: true,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Player not found. Please try again. \n Error: ${error}`,
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Player.findByIdAndDelete(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to create player. Please try again. \n Error: ${error}`,
    });
  }
};

const getList = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Player.find();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to create player. Please try again. \n Error: ${error}`,
    });
  }
};

module.exports = {
  create,
  deletePlayer,
  getList,
  update,
};
