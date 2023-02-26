const sendMail = require("./sendMail")
const driver = async()=>{
    await sendMail("ankit.iiitg@gmail.com", "Startup", "fund krdo plz")
}

driver()