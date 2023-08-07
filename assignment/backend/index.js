const express = require("express")

const app = express();
const {userController} = require("./routes/user.routes")
const { bagsController } = require("./routes/bag.routes");

const {connection} = require("./config/db")
require('dotenv').config()

const {authentication} = require("./Middleware/authentication")

const PORT = process.env.PORT ||  8080;
const jwt = require("jsonwebtoken")
const cors = require("cors");


app.use(express.json())

app.get("/", (req, res)=>{  
    res.send("Home page")
})

app.use(cors());

app.use("/user", userController)


app.use(authentication)

app.use("/bags", bagsController)



app.listen(PORT, async(req, res)=>{
    try{
        await connection;
        console.log("connected to db")
    }
    catch(err){
        console.log("error in connection", err)
    }
    console.log(`listening on port  ${PORT}`)
})