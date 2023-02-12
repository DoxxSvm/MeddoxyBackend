const jwt = require("jsonwebtoken")
const SECRET_KEY = "DOXXSVM"
const auth = async (req, res, next) => {
    let token = req.headers.authorization

    try {
        if (token) {
            token = token.split(" ")[1]
            let employee = jwt.verify(token, SECRET_KEY)
            next()
        }
        else return res.status(401).json({message:"Unauthorised User"})
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message:"Unauthorised User"})
    }
}
module.exports=auth