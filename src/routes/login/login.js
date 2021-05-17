const express = require('express');
const router = express.Router();
const {
  userExist
} = require('../../services/user/service')

/**
 * POST login route
*/
router.post('/login', async (res, req) => {
  try {
    const {
      userName,
      password,
    } = req.req.body;
    const result = await userExist(userName, password);
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