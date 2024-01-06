'use strict';

const participant = require('../schema/participantsSchema')

const saveParticipant = async (details) => {
    try {
        // Creating a new participant object based on the provided details
        const newData = new participant(details);

        // Saving the created participant object into the database
        const savedResult = await newData.save();

        // Returning the save operation's result
        return savedResult;
    } catch (e) {
        // Checking if the error is related to the MongoDB server
        if (e.name === "MongoServerError") {
            // Generating a new error for an already registered participant with these credentials
            throw Error("The participant with these credentials is already registered.");
        } else {
            // If it's a different error, re-throwing it for further handling
            throw e;
        }
    }
};


module.exports = saveParticipant;

