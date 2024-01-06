'use strict';

const report = require('../schema/reportSchema');

const searchAllTestees = async () => {
    
    const data = await report.find({}, { "email": 1, "technology": 1, "totalScore": 1, "_id": 0 });

    if (data.length === 0) {
        throw Error("No participants have undergone the test yet");
    }

    return data;
};

module.exports = searchAllTestees;
