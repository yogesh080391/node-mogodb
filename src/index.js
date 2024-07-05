const express = require('express');
const { config } = require('dotenv');
config();

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.insertUser);
router.get('/users', userController.getUser);
router.get('/users/:id', userController.getUserByID);
router.put('/users/:id', userController.updateUserByID);
router.delete('/users/:id', userController.deleteUserByID);

module.exports = router;
                                                                                                                                                                                                                                                                           