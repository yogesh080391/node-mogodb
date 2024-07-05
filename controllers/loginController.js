const user = require('../models/user');

const login = async(req,res) => {
    try {
        const data = {email : req.body.email,password : req.body.password } 
        const result = await user.login(data);
        if(result.status){
            res.status(201).json(result);
        }
        res.status(401).json(result);
    } 
    catch (error) {
        res.status(500).json({
          error: `Failed to login: ${error.message}`
        });
    }
}
module.exports = {
    login
};