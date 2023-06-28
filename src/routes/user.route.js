const router = require("express").Router()
const  getAllUsers = require("../controllers/user.controller")


router.get("/", getAllUsers)
router.post("/", )

module.exports= router