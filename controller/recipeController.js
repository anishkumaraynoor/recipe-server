






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
