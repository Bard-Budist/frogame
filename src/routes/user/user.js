const express = require('express');
const router = express.Router();
const { 
  jsonParser
} = require('../../utils/util')
const {
  createUser
} = require('../../services/user/dto');


router.post('/users', async (res, req) => {
  try {
    console.log(req.req.body)
    const {
      name,
      lastName,
      userName,
      password,
      email
    } = req.req.body;
    await createUser(name,
      lastName,
      userName,
      password,
      email);
  } catch (error) {
    console.log("Error creating user" + error);
  }
})

module.exports = router;