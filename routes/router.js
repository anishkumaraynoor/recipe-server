






const express = require('express')
const userController = require('../controller/userController')
const projectController = require('../controller/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/multerMiddleware')
const router = new express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'), projectController.addProject)

module.exports = router
