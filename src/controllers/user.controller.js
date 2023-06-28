const User = require("../models/user.model")

async function getAllUsers(req, res) {
    try {
        const users = await User.find()
        console.log(users)
        if (users) {
            return res.status(200).json(users)
        } else {
            return res.status(404).send("No users found")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function postUser(req, res) {
    try {
        const user = userSchema(req.body)
    }
}

module.exports = getAllUsers