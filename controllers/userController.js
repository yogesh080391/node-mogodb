
const user = require('../models/user');

const insertUser = async (req, res) => {
    try {
      const insertedId = await user.insertUser(req.body);
      res.status(201).json({
        message: `A document was inserted with the _id: ${insertedId}`,
      });
    } 
    catch (error) {
      res.status(500).json({
        message: `Failed to insert document: ${error.message}`,
      });
    }
};

module.exports = {
    insertUser,
};