const Player = require("../models/player");

const generateTeam = async (req, res) => {
  try {
    const requirements = req.body;

    // Function to check for duplicate mainskill and position requirement
    const hasDuplicates = requirements.some((obj, index) => {
      const duplicateIndex = requirements.findIndex(
        (item, i) =>
          item.mainSkill === obj.mainSkill &&
          item.position === obj.position &&
          i !== index
      );

      return duplicateIndex !== -1;
    });

    // Check for duplicate mainskill and position requirement
    if (hasDuplicates) {
      return res.status(400).json({
        message: `Duplicate requirements for position and mainskill not allowed`,
      });
    }

    const players = await Player.find();

    function containsId(array, id) {
      return array.some(
        (obj) => obj.hasOwnProperty("_id") && obj._id.equals(id)
      );
    }

    function findPlayers(players, queries) {
      const results = [];

      for (const query of queries) {
        const { position, mainSkill, numberOfPlayers } = query;

        const positionPlayers = players.filter(
          (player) => player.position === position
        );

        // Sort positionPlayers by mainSkill value in descending order
        positionPlayers.sort((a, b) => {
          const skillA = a.playerSkills.sort((a, b) => b.value - a.value)[0];
          const skillB = b.playerSkills.sort((a, b) => b.value - a.value)[0];
          return skillB?.value - skillA?.value;
        });

        // Sort positionPlayers by mainSkill value in descending order
        positionPlayers.sort((a, b) => {
          const skillA = a.playerSkills.find(
            (skill) => skill && skill.skill === mainSkill
          );
          const skillB = b.playerSkills.find(
            (skill) => skill && skill.skill === mainSkill
          );
          return skillB?.value - skillA?.value;
        });

        let count = 0;
        let index = 0;

        while (count < numberOfPlayers && index < positionPlayers.length) {
          const player = positionPlayers[index];
          const skill = player.playerSkills.find(
            (skill) => skill && skill.skill === mainSkill
          );

          if (skill && skill.value && skill.value > 0) {
            results.push(player);
            count++;
          }
          index++;
        }

        if (count < numberOfPlayers) {
          let positionIndex = 0;
          while (
            count < numberOfPlayers &&
            positionIndex < positionPlayers.length
          ) {
            const player = positionPlayers[positionIndex]; // Highest value player irrespective of skill
            if (results.some((obj) => obj._id.equals(player._id))) {
              positionIndex++;
            } else {
              results.push(player);
              count++;
            }
          }
        }

        if (count < numberOfPlayers) {
          return res.status(500).json({
            status: true,
            message: `Not enough players for the position. Please try again.`,
          });
        } else {
          return res.json(results);
        }
      }
    }

    findPlayers(players, requirements);
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to generate team. Please try again. \n Error: ${error}`,
    });
  }
};

module.exports = {
  generateTeam,
};
