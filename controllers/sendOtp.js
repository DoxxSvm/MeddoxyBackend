const sendMail = require('../middlewares/sendMail')
const user = require('../models/Users')
const sendOtp = async (req, res) => {
    try {
        console.log("Called")
        const {email} = req.body
        const otp = generateOtp()
        await sendMail(email, "OTP for Meddoxy", "Your OTP is ".concat(otp))
        await user.updateOne({ email: email }, { otp: otp }, { upsert: true })
    
        const nUser = await user.findOne({email:email})
        console.log(otp)
        console.log(nUser)
        return res.status(200).json({ "message": "OTP sent" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ "message": "something went wrong from otp" })
    }

}

const verifyOtp = async (req, res) => {
    try {
        const {email,otp} = req.body
        const _user = await user.findOne({ email: email })
        if(!(_user.otp === otp)){
            return res.status(404).json({ "message": "OTP wrong" })
        }
        return res.status(200).json({ "user": _user })
    }
    catch (error) {
        res.status(500).json({ "message": "something went wrong" })
    }

}

function generateOtp() {
    var length = 6,
        charset = "1234567890",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
module.exports = {sendOtp, verifyOtp}
