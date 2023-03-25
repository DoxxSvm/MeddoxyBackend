const sendMail = require("./sendMail")
const driver = async()=>{
    await sendMail("svmguptapk@gmail.com", "Startup", "fund krdo plz")
}

driver()