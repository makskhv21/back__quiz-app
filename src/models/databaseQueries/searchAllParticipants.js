'use strict';

const participant = require('../schema/participantsSchema');

const searchAllParticipants = async () => {
    // Retrieving all participant data excluding _id and __v fields
    const data = await participant.find({}, { _id: 0, __v: 0 });

    // Checking if there are no participants registered for the test
    if (data.length === 0) {
        // If no participants found, throw an error indicating the absence of registered participants
        throw Error("There are currently no registered participants for the test.");
    }
    
    // Returning the retrieved participant data
    return data;
};



module.exports = searchAllParticipants;