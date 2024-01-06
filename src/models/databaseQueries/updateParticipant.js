'use strict';

const participant = require('../schema/participantsSchema')

const updateParticipant = async (email, detailsToUpdate) => {
    try {
            // Updating the participants data (email)        
            const data = await participant.updateOne(email, { $set: detailsToUpdate });

            // Checking the availability of a suitable participant at the specified email address
            if (data.matchedCount === 0 || data.modifiedCount === 0) {
            let errorMessage = "";

            // Generate an error message if the participant is not found
            if (data.matchedCount === 0) {
                errorMessage = "No information exists for this email address. Please reach out to support.";
            } else {
                errorMessage = "The update was unsuccessful. The attribute holds an identical value in the database.";
            }

            throw new Error(errorMessage);
        }

        return data;
    } catch (e) {
        throw e;
    }
}

module.exports = updateParticipant;