const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        console.info(userData)

        const result = await userService.registerUser(userData);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Registration error user controller: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await userService.loginUser(username, password);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Login error user in controller: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
}