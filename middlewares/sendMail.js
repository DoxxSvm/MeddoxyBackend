const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const CLIENT_ID =
    "670017525896-hhfdan0g65p9u1icno3j8ak9qng718eo.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04k8zMwPQOD4OCgYIARAAGAQSNwF-L9IrVQyuMjVO4L47RpsYGMK1OixMxIYkWxwk4pufMezBvH-S6vDf6zq49aYtKPBjEoDrV28";
const G_MAIL = "meddoxyhelp@gmail.com";

const oAuthClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (reciever, mailSub, mailBody) => {
    const accessToken = await oAuthClient.getAccessToken();
    console.log(accessToken);

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: G_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailInfo = await transporter.sendMail({
            from: "'MedDoxy' <meddoxyhelp@gmail.com>",
            to: reciever,
            subject: mailSub,
            text: mailBody,
            html: "",
        });
        console.log(
            "Msg sent on mail(" + reciever + ")\nMailId: " + mailInfo.messageId
        );
    } catch (e) {
        console.log("Message Not sent\nError: " + e);
    }
};

module.exports = sendMail;