'use strict';

const template = require('../schema/templateSchema')

const saveTemplate = async(templateDetails)=>{
    try{
        let newData = new template(templateDetails);
        let savedResult = await newData.save()
        return savedResult;
    }
    catch (e){
        if (e.name === "MongoServerError"){
            throw Error("The participant already has a set template.");
        }
        else{
            throw e;
        }      
    }
}

module.exports = saveTemplate;