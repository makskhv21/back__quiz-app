'use strict';

const question = require('../schema/questionSchema');

const searchAllQuestions = async () => {
    
    const data = await question.find();

    if (data.length === 0) {
        throw Error("There are no questions entered by the admin yet.");
    }

    return data;
};

module.exports = searchAllQuestions;
