'use strict';

const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.KEY);

const generator = require('generate-password');

function generatePassword() {
    const randomGeneratedPassword = generator.generate({
        length: 12,
        numbers: true
    });

    console.log(randomGeneratedPassword);

    return randomGeneratedPassword;
}

// Function to encrypt a plain password using a cryptographic library
function encryptPassword(plainPassword) {
    // Encrypt the plain password and return the encrypted value
    return cryptr.encrypt(plainPassword);
}

// Function to decrypt an encrypted password using a cryptographic library
function decryptPassword(encryptedPassword) {
    // Decrypt the encrypted password and return the plain value
    return cryptr.decrypt(encryptedPassword);
}

module.exports = { generatePassword, encryptPassword, decryptPassword };