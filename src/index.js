const express = require('express')
const {patientRouter,utilRouter} = require('../routes/patientRoutes')
const appointmentRouter = require('../routes/appointmentRoutes')
const appointment = require('../models/Appointment')
const mongoose = require('mongoose')
const dotevn = require('dotenv')
const app = express()
// INITIALIZE NPMS
var AWS = require('aws-sdk'),multer = require('multer'),multerS3 = require('multer-s3'),path = require('path');

// CONFIGURATION OF S3
AWS.config.update({
    secretAccessKey:process.env.AWS_SECRET_KEY ,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: 'ap-south-1'
});

// CREATE OBJECT FOR S3
const S3 = new AWS.S3();
// CREATE MULTER FUNCTION FOR UPLOAD
var upload = multer({
    // CREATE MULTER-S3 FUNCTION FOR STORAGE
    storage: multerS3({
        s3: S3,

        // bucket - WE CAN PASS SUB FOLDER NAME ALSO LIKE 'bucket-name/sub-olvder1'
        bucket: 'doxx3434',
        // META DATA FOR PUTTING FIELD NAME
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        // SET / MODIFY ORIGINAL FILE NAME
        key: function (req, file, cb) {
            cb(null, file.originalname); //set unique file name if you wise using Date.toISOString()
            

        }
    }),
    // SET DEFAULT FILE SIZE UPLOAD LIMIT
    limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Allow images only of extensions jpeg|jpg|png !");
        }
    }
});
const MONGO_URI = "mongodb+srv://doxx:822eB6x7yq2aPzX@cluster0.ht4cn.mongodb.net/Meddoxy?retryWrites=true&w=majority"

dotevn.config()
const port = process.env.PORT || 5001

app.use(express.json())
app.use('/patient',patientRouter)
app.use('/utils',utilRouter)
app.use('/appointment',appointmentRouter)

app.get('/',async (req,res)=>{
    const result = await appointment.find({ })
        console.log(result)
    res.send("Meddoxy backend")
})

app.post('/upload', upload.single('file'), async (req, res, next) =>{
    console.log('Uploaded!');
    const result = await appointment.updateOne({appointmentID: req.body.appointmentID},{prescription:req.file.location},{upsert:true})

    console.log(result)
    console.log(req.body.appointmentID)

    res.send(req.file);
});

mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(port,()=>{
        
        console.log("server started at port "+port)
    })
}).catch(()=>{

    console.log("Unable to connect to Database")
})

