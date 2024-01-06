'use strict';

const question = require('../schema/questionSchema')

const saveQuestion = async (details) => {
    try {
        const newData = new question(details);
        const savedResult = await newData.save();
        return savedResult;
    } catch (e) {
        if (e.name === "MongoServerError") {
            throw new Error("This question has already been submitted before.");
        } else {
            throw e;
        }
    }
};


module.exports = saveQuestion;