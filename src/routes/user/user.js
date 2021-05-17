const express = require('express');
const router = express.Router();

const {
  createUser,
  userHomeAutho
} = require('../../services/user/service');

/**
 * POST create user endpoint
*/
router.post('/users', async (res, req) => {
  try {
    const {
      name,
      lastName,
      userName,
      password,
      email
    } = req.req.body;
    const result = await createUser(name,
      lastName,
      userName,
      email,
      password);
      req.send(result)
  } catch (error) {
    console.log("Error creating user" + error);
  }
})

/**
 * GET user endpoint by token
*/
router.get('/users', async (res, req) => {
  try {
    const token = req.req.headers.authorization.split(" ")[1]
    const data = await userHomeAutho(token)
    req.send(data);
  } catch (error) {
    req.status(500).send({"Error": error});
  }
})


module.exports = router;