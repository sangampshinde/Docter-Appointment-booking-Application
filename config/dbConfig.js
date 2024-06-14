const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

// to check connection
connection.on("connected",()=>{
    console.log("connection to database is successful")
})

connection.on("error",(error)=>{
    console.log(`error in database connection`, error)
})

module.exports = mongoose;