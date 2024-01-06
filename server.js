'use strict';

const mongoose = require('mongoose');
const express = require('express');
const quiz = express();


const cors = require("cors");

require('dotenv').config();
const port = process.env.Port || 8080;

require('./src/services/databaseConnect')

const saveParticipant = require('./src/models/databaseQueries/saveParticipant');
const searchParticipant = require('./src/models/databaseQueries/searchParticipant');
const searchAllParticipants = require('./src/models/databaseQueries/searchAllParticipants');
const updateParticipant = require('./src/models/databaseQueries/updateParticipant');

const saveQuestion = require('./src/models/databaseQueries/saveQuestion');
const searchAllQuetions = require('./src/models/databaseQueries/searchAllQuestions');
const deleteQuestion = require('./src/models/databaseQueries/deleteQuestion');

const saveReportDetails = require('./src/models/databaseQueries/saveReportDetails');
const searchReport = require('./src/models/databaseQueries/searchReport');
const seacrhAllTestees = require('./src/models/databaseQueries/searchAllTestees');

const saveTemplate = require('./src/models/databaseQueries/saveTemplate');
const searchTemplate = require('./src/models/databaseQueries/searchTemplate');

const sendMail = require('./src/services/sendMail');

const {generatePassword, encryptPassword, decryptPassword} = require('./src/services/passwordGenCryptor');

// Middleware CORS Config:
const corsOptions ={
    origin:'*', 
    credentials:true,           
    optionSuccessStatus:200,
}


// Middlewares:
quiz.use(cors(corsOptions))
quiz.use(express.json());


// ROUTING: Endpoint is http://localhost:8080


// Route handler to save participant details received in the request body
quiz.post("/saveParticipant", async (request, response) => {
    try{
        const randomPass = generatePassword();
        request.body.password = encryptPassword(randomPass);
        console.log(request.body)
        
        const result = await saveParticipant(request.body);
        response.send({success: true, document : result});
        console.log("Participant successfully Registered and added to DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }
});


// Route handler to search for participant details by email
quiz.get("/searchParticipant/:email", async (request, response) => {
    try{
        console.log(request.params)
        
        const result = await searchParticipant(request.params);
        response.send({success: true, document : result});
        console.log("Participant details found in DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }  
});


// Route handler to fetch all participant details from the database
quiz.get("/searchAllParticipants", async (request, response) => {
    try{
        const result = await searchAllParticipants();
        response.send({success: true, document : result});
        console.log("Showing all the Participants details from the DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }  
});


// Used in admin template set page, participant assessment page after he submits test
quiz.patch("/updateParticipant/:email", async (request, response) => {
    try{
        console.log(request.params)
        console.log(request.body)
        const result = await updateParticipant(request.params,request.body);
        response.send({success: true, document : result});
        console.log("Participant details successfully updated in DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }  
});


// Route handler to save a new question to the database
quiz.post("/saveQuestion", async (request, response) => {
    try{
        console.log(request.body)
        const result = await saveQuestion(request.body);
        response.send({success: true, document : result});
        console.log("Question successfully added to DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }  
});


// Route handler to retrieve all question details from the database
quiz.get("/searchAllQuetions", async (request, response) => {
    try{
        const result = await searchAllQuetions();
        response.send({success: true, document : result});
        console.log("Showing all the Questions details from the DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }
});


// Route handler to delete a question from the database by its ID
quiz.delete("/deleteQuestion/:questionID", async (request, response) => {
    try{
        console.log(request.params)
        const result = await deleteQuestion({"_id": mongoose.Types.ObjectId(request.params.questionID)});
        response.send({success: true, document : result});
        console.log("Questions successfully deleted from DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }
})


// Route handler to save participant report details to the database
quiz.post("/saveReportDetails", async (request, response) => {
    try{
        console.log(request.body)
        const result = await saveReportDetails(request.body);
        response.send({success: true, document : result});
        console.log("Report of participant successfully added to DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }
});


// Route handler to search for a participant's test report by email
quiz.get("/searchReport/:email", async (request, response) => {
    try{
        console.log(request.params)
        const result = await searchReport(request.params);
        response.send({success: true, document : result});
        console.log("Participant Test report found in Database.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }
});


// Route handler to fetch details of all testees from the database
quiz.get("/seacrhAllTestees", async (request, response) => {
    try{
        const result = await seacrhAllTestees();
        response.send({success: true, document : result});
        console.log("Testees details found in database.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message})
        console.log(e.message)
    }
});

// Route handler to send an email with a test link and password to a participant
quiz.post("/sendMail", async (request, response) => {
    try{
        console.log(request.body)
        await sendMail(request.body.email)
        
        const successMessage = "Email containing the test link and password has been successfully sent to the participant.";
        response.send({success: true, message : successMessage});
        console.log(successMessage)
    }
    catch(e){
        console.log(e.message)
        const errorMessage  = "Failed to send the test link email to the participant.";
        response.status(400);
        response.send({success: false, errorMsg: errorMessage });
        console.log(errorMessage )
    }
});


// Route handler to save a template data to the database
quiz.post("/saveTemplate", async (request, response) => {
    try{
        console.log(request.body)
        const result = await saveTemplate(request.body);
        response.send({success: true, document : result});
        console.log("Template successfully set and added to DataBase.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }   
});


// Route handler to search for a template by email in the database
quiz.get("/searchTemplate/:email", async (request, response) => {
    try{
        console.log(request.params)
        const result = await searchTemplate(request.params);
        response.send({success: true, document : result});
        console.log("Template found in database.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }
});


// Route handler to authenticate a participant
quiz.post("/authenticateParticipant", async (request, response) => {
    try{
        console.log(request.body);

        const result = await searchParticipant({email : request.body.email});
        const decryptedPassword = decryptPassword(result[0].password);
        
        if(!(request.body.password === decryptedPassword)){
            throw Error("Password Doesn't Match")
        }
        response.send({success: true, document : result});
        console.log("The participant has been successfully authenticated and can proceed to the next stage.")
    }
    catch(e){
        response.status(400);
        response.send({success: false, errorMsg: e.message});
        console.log(e.message)
    }  
});

// Start the server at port 8080
quiz.listen(port, () => {
    console.log('Listening on port ' + port);
});