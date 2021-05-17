const jwt = require('jsonwebtoken')

const tokenizeUser = (id) => {
  try {
    return jwt.sign({id}, process.env.SECRET_KEY, {
      expiresIn: 600
    });
  } catch (error) {
    console.log(error)
  }
}

const exceptionJwt = jwt.TokenExpiredError;

module.exports = {
  tokenizeUser,
  jwt,
  exceptionJwt
}