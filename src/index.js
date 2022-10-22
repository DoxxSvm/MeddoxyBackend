const express = require('express')
const employeeRouter = require('../routes/employeeRoutes')
const mongoose = require('mongoose')
const dotevn = require('dotenv')
const app = express()
const port = process.env.PORT || 5000
const MONGO_URI = "mongodb+srv://doxx:822eB6x7yq2aPzX@cluster0.ht4cn.mongodb.net/TvsDB?retryWrites=true&w=majority"

dotevn.config()
app.use(express.json())
app.use('/employee',employeeRouter)

app.get('/',(req,res)=>{
    res.send("Tvs backend")
})

mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(port,()=>{
        console.log("server started at port "+port)
    })
}).catch(()=>{

    console.log("Unable to connect to Database")
})

