






const express = require('express')
const userController = require('../controller/userController')
const projectController = require('../controller/projectController')
const recipeController = require('../controller/recipeController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/multerMiddleware')
const router = new express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add-recipe',jwtMiddleware,multerConfig.single('recipeimage'), recipeController.addRecipes)


router.get('/get-all-recipes', jwtMiddleware, recipeController.getAllRecipes)
router.get('/get-user-projects',jwtMiddleware, projectController.getUserProjects)
//update project
router.put('/project/edit/:pid',jwtMiddleware, multerConfig.single('projectImage'), projectController.editProject)
//remove project
router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)
//update user
router.put('/user/edit',jwtMiddleware, multerConfig.single('profileImage'), userController.editUser)

module.exports = router
