'use strict';

const mongoose = require('mongoose');

const levelSchema =  new mongoose.Schema({
    total: {type: Number, required : true },
    basic  : {type: Number, required : true },
    intermediate  : {type: Number, required : true },
    advanced  : {type: Number, required : true },
})

const quizTemplateSchema = new mongoose.Schema({
    email : {type: String, unique: true, required : true },
    javaScript : {type: levelSchema, required : true },
    с : {type: levelSchema, required : true },
    php : {type: levelSchema,required : true },
    python : {type: levelSchema,required : true }
})

module.exports = mongoose.model('quizTemplates',quizTemplateSchema);