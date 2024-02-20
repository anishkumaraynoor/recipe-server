






require('dotenv').config()
const cors = require('cors')
const express = require('express')
const router = require('./routes/router')
require('./db/connection')

const expressServer = express()
expressServer.use(cors())
expressServer.use(express.json())
expressServer.use('/uploads', express.static('./uploads'))
expressServer.use(router)


const PORT = 3000 || process.env.PORT
expressServer.listen(PORT, ()=>{
    console.log(`started ${PORT}`);
})

expressServer.get('/',(req,res)=>{
    res.send("request received")
})


