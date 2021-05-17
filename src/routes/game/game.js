const express = require('express');
const router = express.Router();
const {
  updatePoints
} = require('../../services/game/service')

/**
 * PUT update points in user
*/
router.put('/game/points', async (res, req) => {
  try {
    const {
      points
    } = req.req.body;
    const token = req.req.headers.authorization.split(" ")[1]
    const result = await updatePoints(token, points);
    if (result.error) {
      req.status(500).send(result)
    } else {
      req.send(result)
    }
  } catch (error) {
    req.status(500).send(error)
  }
})

module.exports = router;