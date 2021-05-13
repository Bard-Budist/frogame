// File contain connection file to MongoDb
const { MongoClient } = require("mongodb");

const uri =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.URL_MONGO}/user?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;