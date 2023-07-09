const router = require("express").Router()

const  {
    getTasks, 
    createMyTask, 
    getMyTask,
    createTask,
    updateMyTask,
    updateTask,
    deleteMyTask,
    deleteTask
}  = require("../controllers/task.controller.js")

const {
    checkAuth,
    checkAdmin,
} = require('../middleware/auth')

router.get("/", checkAuth, getMyTask)
router.get("/:id",checkAuth, checkAdmin, getTasks )
router.post("/", checkAuth, createMyTask)
router.post("/:id", checkAuth, checkAdmin, createTask)
router.put("/", checkAuth, updateMyTask)
router.put("/:id", checkAuth, checkAdmin, updateTask)
router.delete("/", checkAuth, deleteMyTask)
router.delete("/:id", checkAuth, checkAdmin, deleteTask) //borra la tarea de un usuario


module.exports = router