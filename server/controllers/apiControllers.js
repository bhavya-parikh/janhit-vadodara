const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
    const {addharid, username, password} = req.body;
    if (!addharid || !username || !password) {
        console.log(addharid, username, password);
        res.status(400).send({message: "Please add all fields"});
    }
    else{

        const userExist = await User.findOne({username});
        if (userExist) {
            res.status(400).send({message: "User Already Exist!"});
        }
        else{
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            // Creating user
            const user = await User.create({addharid, username, password: hashedPassword});
        
            if (user) {
                res.status(201).send({_id: user._id, addharid: user.addharid, username: user.username});
            
            } else {
                res.status(400).send({error: 'Invalid user data'});
        
            }
        }
    }    // Check if user already exists

    // Hasing Pass
});

const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (! user) {
        res.status(404).send({message: "User Not Found"});

    }
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (! validate) {
        res.status(403).send({message: "Wrong Pass"});

    }
    res.status(200).send({message: "Logged In!", user});

});

module.exports = {
    registerUser,
    loginUser
};
