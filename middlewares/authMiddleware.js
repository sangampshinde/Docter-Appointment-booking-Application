const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
// we here extrating the token innheader and spliit it out from string 
    const token = req.headers["authorization"].split(" ")[1]
    
}