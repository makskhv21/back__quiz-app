'use strict';

const template = require('../schema/templateSchema');

const searchTemplate = async (email) => {
    
    const data = await template.find(email, { _id: 0, __v: 0 });
    
    if (data.length === 0) {
        throw new Error("No template has been established for this email yet.");
    }
    
    return data;
};

module.exports = searchTemplate;
