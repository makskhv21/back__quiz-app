'use strict';

const mongoose = require('mongoose');
const config = require('../config/config');

const { host, port, db } = config.database;
const mongoUrl = `mongodb://${host}:${port}/${db}`;

(async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Successfully connected to MongoDB DataBase");
    } catch (error) {
        console.error("Failed to connect with MongoDB DataBase:", error);
    }
})();
