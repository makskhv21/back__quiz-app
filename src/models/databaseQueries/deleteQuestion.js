'use strict';

const question = require('../schema/questionSchema');

const deleteQuestion = async (questionID) => {
    try {
        // Delete one question by its unique questionID.
        const data = await question.deleteOne(questionID);

        // Check if one question was successfully deleted.
        if (data.deletedCount === 1) {
            return data;
        } else {
            throw new Error("The Database does not contain this Participant. Please provide a valid question for deletion.");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = deleteQuestion;
