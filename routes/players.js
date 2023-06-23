const express = require("express");
const router = express.Router();

const Players = require("../controllers/players");

const auth = require("../middleware/index");

router.post("/", Players.create);
router.delete("/:id", auth.authToken, Players.deletePlayer);
router.get("/", Players.getList);
router.put("/:id", Players.update);

module.exports = router;
