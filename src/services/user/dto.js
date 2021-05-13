const client = require('../../db/connection');
const bcrypt = require('bcrypt');

const createUser = async (name, lastName, userName, email, password) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(process.env.DB_NAME);
    const user = database.collection('user');
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async function(err, hash) {
      const userCreate = await user.insert({
        name: name,
        email: email,
        lastName: lastName,
        password: hash, 
        userName: userName
      });
      console.log(userCreate);
    });
  } catch (error){
    console.log(error);
    throw "Error try get data from MongoDb";
  }
}



module.exports = {
  createUser
};