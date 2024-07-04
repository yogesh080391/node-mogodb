// var { MongoClient } = require('mongodb');
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = process.env.DB_URI;
// // Create a new client and connect to MongoDB
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect to the "insertDB" database and access its "haiku" collection
//     const database = client.db(process.env.DB_NAME);
//     return database;
//     //const user = database.collection("users");
    
//     // Create a document to insert
//     // const userDocument = {
//     //   name: "Record of a Shriveled Datum",
//     //   address: "No bytes, no problem. Just insert a document, in MongoDB",
//     // }
//     // // Insert the defined document into the "haiku" collection
//     // const result = await user.insertOne(userDocument);
//     // // Print the ID of the inserted document
//     // console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//      // Close the MongoDB client connection
//     await client.close();
//   }
// }
// // Run the function and handle any errors
// run().catch(console.dir);

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