






const express = require('express')
const userController = require('../controller/userController')
const projectController = require('../controller/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/multerMiddleware')
const router = new express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'), projectController.addProject)


router.get('/get-home-projects', projectController.getHomeProjects)
router.get('/get-all-projects', jwtMiddleware, projectController.getAllProjects)
router.get('/get-user-projects',jwtMiddleware, projectController.getUserProjects)

module.exports = router
