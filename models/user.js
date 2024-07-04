const connectToDatabase = require('../lib/db');

async function insertUser(userData) {
  const database = await connectToDatabase();
  const userCollection = database.collection('users');
  const result = await userCollection.insertOne(userData);
  return result.insertedId;
}

module.exports = {
  insertUser,
};