// Make an Expressjs app
const express = require("express");
const app = express();

// Import Nodemailer package
const nodemailer = require("nodemailer");

// Import path package
const path = require("path");

// Import dotenv package
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// Import body-parser package
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Define port
const PORT = 3000;

// Parse form into json
app.use(express.json());

// GET REQUESTS
// When client visits contact form
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "static/index.html"));
});

// When form is submitted successfully
app.get("/congrats", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "static/success.html"));
});

// POST Request
// Form Submission
app.post("/send", async (req, res) => {
  try {
    // Create Nodemailer transport object
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send mail
    await transport.sendMail({
      from: req.body.email,
      to: "helloshehroz123@gmail.com",
      subject: "New Email For Contact",
      html: `<p>${req.body.message}</p>`,
    });

    // Redirect to success HTML page
    res.redirect("/congrats");
  } catch (error) {
    console.log(error);
  }
});

// Listen to upcoming requests
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
