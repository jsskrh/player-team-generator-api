const express = require("express");
const router = express.Router();

const Team = require("../controllers/team");

const auth = require("../middleware/index");

router.post("/process", Team.generateTeam);

module.exports = router;
