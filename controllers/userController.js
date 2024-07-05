
const user = require('../models/user');
const jwt = require('jsonwebtoken');

const insertUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var data = {"name":req.body.name,"email":req.body.email,"password":hashedPassword}
    const insertedId = await user.insertUser(data);
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
    var data = {"name":req.body.name,"email":req.body.email}
    const result = await user.updateUserByID(req.params.id,data);
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

const generateToken = async(req,res) => {

  // Then generate JWT Token
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId: 12,
  }
  const token = await jwt.sign(data, jwtSecretKey);
  res.status(201).json({
    token: token
  });
}

const validateToken = async(req,res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
  
    try {
        const token = await req.header(tokenHeaderKey);
        
        const verified = await jwt.verify(token, jwtSecretKey); 
        if (verified) {
            return  res.status(201).json({
              message: "Successfully Verified"
            });
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(500).send(error);
    }
}

module.exports = {
  insertUser,
  getUser,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  generateToken,
  validateToken
};