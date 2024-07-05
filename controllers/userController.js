
const user = require('../models/user');

const insertUser = async (req, res) => {
  try {
    const insertedId = await user.insertUser(req.body);
    res.status(201).json({
      message: `User inserted with the _id: ${insertedId}`,
    });
  } 
  catch (error) {
    res.status(500).json({
      error: `Failed to insert user: ${error.message}`,
    });
  }
};

const getUser = async(req,res) => {
  try {
    const result = await user.getUsers();
    res.status(201).json({
      data: result,
    });
  } 
  catch (error) {
    res.status(500).json({
      error: `Failed to get Users: ${error.message}`,
    });
  }
}

const getUserByID = async(req,res) => {
  try {
    const result = await user.getUserByID(req.params.id);
    if (result == null) {
      res.status(500).json({
        error: `Not found user with id ${req.params.id}`
      });
    }
    res.status(201).json({
      data: result
    });
  } 
  catch (error) {
    res.status(500).json({
      error: `Failed to get User: ${error.message}`
    });
  }
}

const updateUserByID = async(req,res) => {
  try {
    const result = await user.updateUserByID(req.params.id,req.body);
    if (result == null || result.modifiedCount == 0){
      res.status(500).json({
        error: `Not found user with id ${req.params.id}`
      });
    }
    res.status(201).json({
      data: result
    });
  } 
  catch (error) {
    res.status(500).json({
      error: `Failed to update User: ${error.message}`
    });
  }
}

const deleteUserByID = async(req,res) => {
  try {
    const result = await user.deleteUserByID(req.params.id);
    if (result == null || result.deletedCount == 0) {
      res.status(500).json({
        error: `Not found user with id ${req.params.id}`
      });
    }
    res.status(201).json({
      data: result
    });
  } 
  catch (error) {
    res.status(500).json({
      error: `Failed to delete User: ${error.message}`
    });
  }
}

module.exports = {
  insertUser,
  getUser,
  getUserByID,
  updateUserByID,
  deleteUserByID
};