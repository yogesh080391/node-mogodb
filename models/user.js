const connectToDatabase = require('../lib/db');
const {ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

// Connect to the database and store the reference to userCollection
let userCollection;

connectToDatabase()
  .then(database => {
    userCollection = database.collection('users');
  })
  .catch(error => {
    return `Error setting up database connection ${error}`;
  });

async function insertUser(userData) {
  const result = await userCollection.insertOne(userData);
  return result.insertedId;
}

async function getUsers(){
    const result = await userCollection.find({}).toArray();
    return result;
}

async function getUserByID(id){
    const query = { _id: new ObjectId(id) };
    const result = await userCollection.findOne(query);
    return result;
}

async function updateUserByID(id,userData){
  const query = { _id: new ObjectId(id) }; // Ensure the id is converted to ObjectId
  const update = { $set: userData }; // The fields to update

  const result = await userCollection.updateOne(query, update);
  return result;
}

async function deleteUserByID(id){
  const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

async function login(data){
  const user = await userCollection.findOne({ email: data.email });
  if (user == null) {
    return {status:false,error:"email is not exist"};
  }
  const isPasswordValid = await bcrypt.compare(String(data.password), String(user.password));
  if (!isPasswordValid) {
    return {status:false,error:"password is not matched"};
  }
  return {status:true,data:user}
}
module.exports = {
  insertUser,
  getUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  login
};