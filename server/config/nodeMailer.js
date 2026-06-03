import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com", // Brevo SMTP host
    port: 587, // Brevo SMTP port
    auth: {
        user: process.env.SMTP_USER, // Your SMTP user
        pass: process.env.SMTP_PASS, // Your SMTP password
    },
});

export default transporter;