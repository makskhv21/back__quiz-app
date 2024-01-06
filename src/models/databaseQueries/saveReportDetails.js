'use strict';

const report = require('../schema/reportSchema');

const saveReportDetails = async (details) => {
    try {
        const newData = new report(details);
        const savedResult = await newData.save();
        return savedResult;
    } catch (error) {
        // Handling possible errors during saving
        if (error instanceof MongoServerError) {
            throw new Error("The test for this participant has already been completed.");
        }
        throw error;
    }
};


module.exports = saveReportDetails;
