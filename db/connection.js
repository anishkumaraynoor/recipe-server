






const mongoose = require('mongoose')
const connectionString = process.env.CONNECTION_STRING
mongoose.connect(connectionString).then(()=>{
    console.log("mongo db atlas connected with project-server")
}).catch((reason)=>{
    console.log(reason)
    console.log("connection failed")
})