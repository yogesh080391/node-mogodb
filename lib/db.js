const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI;

let dbInstance = null;

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  const client = new MongoClient(uri);
  await client.connect();
  dbInstance = client.db(process.env.DB_NAME);
  
  return dbInstance;
}

module.exports = connectToDatabase;