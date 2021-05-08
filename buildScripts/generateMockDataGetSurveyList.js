var jsf = require("json-schema-faker");
var dataFromSurveyDetailSchema = require("../src/api/mockSurveyListDataSchema.js");


var fs = require("fs");
var chalk = require("chalk");

const json = JSON.stringify(jsf(dataFromSurveyDetailSchema));

fs.writeFile("./src/api/db.json",json,function (err){
    if(err){
        return console.log(chalk.red(err));
    }else{
        return console.log(chalk.green("Mock data generated"));
    }
});


