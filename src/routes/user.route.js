const router = require("express").Router()
const  {
    getAllUsers, 
    createUser, 
    updateUser, 
    getOneUser, 
    getMe,
    deleteUser,
    deleteMe,
    updateMe
} = require("../controllers/user.controller")

const {
    checkAuth,
    checkAdmin,
} = require('../middleware/auth')

const {
    login,
    signUp
} = require('../controllers/auth.controller')

router.get("/", checkAuth, checkAdmin, getAllUsers)
router.get("/me", checkAuth, getMe)
router.get("/:id", checkAuth, checkAdmin, getOneUser)
router.post("/", checkAuth, checkAdmin, createUser)
router.post('/signUp', signUp)
router.post('/login', login)
router.put("/me", checkAuth, updateMe) 
router.put("/:id", checkAuth, checkAdmin, updateUser)
router.delete("/me", checkAuth, deleteMe)
router.delete("/:id", checkAuth, checkAdmin, deleteUser)


module.exports= router