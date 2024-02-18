





const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({
    recipename:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    cookingtime:{
        type:String,
        required:true
    },
    recipeimage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const recipes = mongoose.model("recipes", recipeSchema)
module.exports = recipes