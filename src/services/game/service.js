const client = require('../../db/connection');
const { ObjectId } = require('mongodb')
const {
  jwt
} = require('../../jwt/jwt');

/**
 * Service update points with token
 * @param {string} token 
 * @param {int} points 
 * @returns {object} return object referrer the relogin o the operation is oki
*/
const updatePoints = async (token, points) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(process.env.DB_NAME);
    const user = database.collection('user');
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    const pointsUpdate = { $set: {points: points } };
    await user.updateOne({ _id: new ObjectId(userId.id) }, pointsUpdate);
    return {
      "status": "ok"
    };
  } catch (error){
    return {
      "refresh": true,
      "error": error.message
    }
  }
}

module.exports = {
  updatePoints
};