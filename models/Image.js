const mongoose=require('mongoose')
const ImageSchema  = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        contentType:String
    }
})

module.exports=ImageModel=mongoose.model("Image",ImageSchema);