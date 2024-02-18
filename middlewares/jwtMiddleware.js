const jwt = require('jsonwebtoken')






const jwtMiddleware = (req,res,next)=>{
    console.log("Inside JWT Middleware");
    try { 
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token){
        const jwtResponse = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(jwtResponse);
        
        req.payload = jwtResponse.userID
        
        next()
    }else{
        res.status(406).json("Please provide token")
    }
    } catch {
        res.status(401).json("Access denied... Please login")
    }
}

module.exports = jwtMiddleware