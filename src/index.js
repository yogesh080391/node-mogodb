const express = require('express');
const { config } = require('dotenv');
config();

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.insertUser);

module.exports = router;
                                                                                                                                                                                                                                                                           