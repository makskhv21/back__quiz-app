'use strict';

const mongoose = require('mongoose');

const participantsSchema = new mongoose.Schema({
    name  : {type: String, required : true },
    email : {type: String, unique: true, required : true },
    phone : {type: Number, unique: true, required : true },
    patternSet  : {type: Boolean, default : false },
    password : {type: String, required : true },
})

module.exports = mongoose.model('participants', participantsSchema);