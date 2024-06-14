const express = require('express');
require("dotenv").config()
const dbConfig = require("./config/dbConfig")
const app = express();

const port = process.env.PORT || 5000

console.log(process.env.MONGO_URL)

app.listen(port,()=>{
    console.log(`Node server started ${port}`);
});

// mongodb+srv://trysangam:<password>@cluster0.fbsgzxz.mongodb.net/