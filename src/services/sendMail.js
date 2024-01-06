'use strict';

const nodemailer = require('nodemailer');
const { decryptPassword } = require('./passwordGenCryptor');

const searchParticipant = require('../models/dbQueries/searchParticipant')

async function sendMail(email) {

    const result = await searchParticipant({"email" : email});
    const decryptedPassword = decryptPassword(result[0].password);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'QUIZ BEE - Test Link',
        html: `
            <p>Dear Participant,</p>
            <p>You've been invited to take a test on the Quiz Bee platform.</p>
            <p>Your test password: ${decryptedPassword}</p>
            <p>Please click <a href="http://127.0.0.1:5500/views/LoginPage.html">here</a> to start your assessment.</p>
            <p>Thank you & Best of luck!</p>
        `
    };
    

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            throw error;
        } else {
            console.log('Email sent to participant Successfully: ' + info.response);
        }
    });
}

module.exports = sendMail;