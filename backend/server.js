const express = require('express');
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
const cors = require('cors');
/* const corsOptions = {
    origin: 'https://tecari0.github.io/JHPersonalWebsite/front/', // Replace with your frontend's URL
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); */

app.use(cors());





app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Successful response.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});

app.post('/send-email', (req, res) => {
    console.log("mrow");

    const { name, fromEmail, message} = req.body;

    const mailOptions = {
        from: process.env.email, // sender email
        to: process.env.email, // recieving email
        subject: "Message from " + name + ", " + fromEmail, // Subject line
        text: message, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return res.status(500).send({message: "Error sending email", error})
        }
        res.status(200).send({message: "Email sent successfully", info});
    })
})