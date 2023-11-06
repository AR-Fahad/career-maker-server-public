const { MongoClient } = require("mongodb");
require("dotenv").config();
let db;

const connectToDatabase = async () => {
  const client = new MongoClient(process.env.DB_URI);
  await client.connect();
  db = client.db("servicesDB");
};

const getDb = () => {
  return db;
};

module.exports = { connectToDatabase, getDb };
