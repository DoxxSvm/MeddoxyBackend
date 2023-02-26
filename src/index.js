const express = require('express')
const patientRoutes = require('../routes/patientRoutes')
const mongoose = require('mongoose')
const dotevn = require('dotenv')
const app = express()
const MONGO_URI = "mongodb+srv://doxx:822eB6x7yq2aPzX@cluster0.ht4cn.mongodb.net/Meddoxy?retryWrites=true&w=majority"

dotevn.config()
const port = process.env.PORT || 5001

app.use(express.json())
app.use('/patient',patientRoutes)

app.get('/',(req,res)=>{
    res.send("Meddoxy backend")
    // refresh key: 1//04GaeKLQLu5sJCgYIARAAGAQSNwF-L9IrAe5JLByPcT2ZaFPAW6lgMOlSfB0o59Dm4GXqGAweH-m5mc5zbkMnEpN-9vw__9kewN4
})

mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(port,()=>{
        
        console.log("server started at port "+port)
    })
}).catch(()=>{

    console.log("Unable to connect to Database")
})

