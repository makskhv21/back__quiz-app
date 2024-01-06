'use strict';

const report = require('../schema/reportSchema');

const searchReport = async (params) => {
    
    const data = await report.find(params, { _id: 0, __v: 0 });
    
    if (data.length === 0) {
        throw new Error("This Email ID's owner hasn't taken any tests as a participant.");
    }

    return data;
};

module.exports = searchReport;
