






const recipes = require('../models/recipeModel')

exports.addRecipes = async(req,res)=>{
    console.log("Inside Add recipes API");
    const userId = req.payload
    const {recipename, description, ingredients, instructions, cookingtime} = req.body
    const recipeimage = req.file.filename
    console.log(recipename, description, ingredients, instructions, cookingtime, recipeimage, userId);
    try {
        const newRecipe = new recipes({
            recipename, description, ingredients, instructions, cookingtime, recipeimage, userId
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
    
}


exports.getAllRecipes = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        recipename : {
            $regex:searchKey,$options:"i"
        }
    }
    try {
        const allRecipes = await recipes.find(query)
        console.log(allRecipes);
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.getUserRecipes = async(req,res)=>{
    const userId = req.payload
    try {
        const userRecipes = await recipes.find({userId})
        res.status(200).json(userRecipes)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.removeRecipe = async(req,res)=>{
    console.log("inside remove recipe");
    const {pid} = req.params
    try {
        const recipeDetails = await recipes.findByIdAndDelete({_id:pid})
        res.status(200).json(recipeDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editRecipe = async(req,res)=>{
    console.log("Inside edit recipe")
    const {pid} = req.params
    const userId = req.payload
    const {recipename, description, ingredients, instructions, cookingtime, recipeimage} = req.body
    const uploadImage = req.file?req.file.filename:recipeimage
    try {
        const updatedRecipe = await recipes.findByIdAndUpdate({_id:pid},{
            recipename, description, ingredients, instructions, cookingtime, recipeimage:uploadImage,userId
        },{new:true})
        await updatedRecipe.save()
        res.status(200).json(updatedRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}
