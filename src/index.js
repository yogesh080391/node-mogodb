const express = require('express');
const { body,validationResult } = require('express-validator');
const { config } = require('dotenv');

config();

const userController = require('../controllers/userController');

const logiController = require('../controllers/loginController');

const router = express.Router();

router.post('/users', 
    [
        body('name', 'Name does not Empty').not().isEmpty(),
        body('email', 'Email does not Empty').not().isEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password does not Empty').not().isEmpty()
    ], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return userController.insertUser(req, res)
        }
        res.status(422).json({errors: errors.array()})
    }
);
router.get('/users', userController.getUser);
router.get('/users/:id', userController.getUserByID);
router.put('/users/:id', userController.updateUserByID);
router.delete('/users/:id', userController.deleteUserByID);

router.post("/user/generateToken", userController.generateToken);
router.get("/user/validateToken", userController.validateToken);

router.post("/login", 
    [
        body('email', 'Email does not Empty').not().isEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password does not Empty').not().isEmpty()
    ], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return logiController.login(req, res)
        }
        res.status(422).json({errors: errors.array()})
    }
);

module.exports = router;