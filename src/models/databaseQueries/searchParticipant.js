'use strict';

const participant = require('../schema/participantsSchema');

const searchParticipant = async (email) => {

    const data = await participant.find(email, { _id: 0, __v: 0 });

    // Checking the presence of a found participant.
    if (data.length === 0) {
        throw new Error("There are no records associated with this email. Kindly reach out to the Support Team.");
    }
        
    return data;
};

module.exports = searchParticipant;
