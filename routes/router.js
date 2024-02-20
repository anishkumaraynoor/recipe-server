






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
router.get('/get-user-recipes',jwtMiddleware, recipeController.getUserRecipes)

router.delete('/remove-recipe/:pid',jwtMiddleware,recipeController.removeRecipe)




//update project
router.put('/recipe/edit/:pid',jwtMiddleware, multerConfig.single('recipeimage'), recipeController.editRecipe)



module.exports = router
