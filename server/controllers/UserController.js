const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};


const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};

//register route
const registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const user = await User.register(firstname, lastname, email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    loginUser,
    registerUser
};

    //tutorial 3
