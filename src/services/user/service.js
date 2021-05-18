const client = require('../../db/connection');
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt');
const {
  tokenizeUser,
  jwt
} = require('../../jwt/jwt');

/**
 * Service create user
 * @param {string} name 
 * @param {string} lastName
 * @param {string} userName 
 * @param {string} email  
 * @param {string} password  
 * @returns {object} return ouser
*/
const createUser = async (name, lastName, userName, email, password) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(process.env.DB_NAME);
    const user = database.collection('user');
    const saltRounds = 10;
    const userCheck = await user.findOne({userName: userName})
    if (userCheck) {
      return {
        error: "userName already exist"
      }
    }
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      await user.insertOne({
        name: name,
        email: email,
        lastName: lastName,
        password: hash, 
        userName: userName,
        points: 0
      });
    });
    return {
      status: 'User created'
    }
  } catch (error){
    console.log(error)
    return {
      error: "Error " + error
    }
  }
}

/**
 * Service manage login
 * @param {string} userName 
 * @param {string} password 
 * @returns {object} return object referrer the login
*/
const userExist = async (userName, password) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(process.env.DB_NAME);
    const user = database.collection('user');
    const userDb = await user.findOne({userName: userName});
    if (!userDb) {
      return {
        "autho": false,
        "message": "Username/Password incorrect"
      }
    }
    const match = await bcrypt.compare(password, userDb.password);
    if (match) {
      return {
        "autho": true,
        "token": tokenizeUser(userDb._id),
        "user": userDb
      }
    } else {
      return {
        "autho": false
      }
    }
  } catch (error) {
    return {
      "autho": false,
      "error": "Error login --- " + error
    }
  }
};

/**
 * Service check the token and return data or refresh and relogin
 * @param {string} token 
 * @returns {object} return object referrer if need refresh
*/
const userHomeAutho = async (token) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(process.env.DB_NAME);
    const user = database.collection('user');
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    const userDb = await user.findOne({ _id: new ObjectId(userId.id) });
    return {
      "refresh": false,
      "user": userDb
    }
  } catch (error) {
    return {
      "refresh": true,
      "error": error
    }
  }
};

module.exports = {
  createUser,
  userExist,
  userHomeAutho
};