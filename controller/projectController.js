const projects = require('../models/projectModel')






exports.addProject = async(req,res)=>{
    console.log("Inside Add project API");
    const userId = req.payload
    const {title,languages,overview,github,website} = req.body
    const projectImage = req.file.filename
    console.log(title,languages,overview,github,website,projectImage,userId);
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project repository is already exist. Please upload another")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}


exports.getHomeProjects = async(req,res)=>{
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllProjects = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        languages : {
            $regex:searchKey,$options:"i"
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getUserProjects = async(req,res)=>{
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editProject = async(req,res)=>{
    console.log("Inside edit project")
    const {pid} = req.params
    const userId = req.payload
    const {title,languages,overview,github,website,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    try {
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
            title,languages,overview,github,website,projectImage:uploadImage,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.removeProject = async(req,res)=>{
    console.log("inside remove project");
    const {pid} = req.params
    try {
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}