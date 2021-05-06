# TreeSurveyUI
#1 
The react front end is accessible here : http://localhost:3000/surveys

#2
To start the app simply run the command :
npm run dev

This will start the react app and also start the mock server to serve up fake responses to be consumed by UI !

#3
Mock fake response is served at following URL : http://localhost:3001/energyBills

#4
Using faker we can define our response schema in file : /src/api/mockSurveyListDataSchema.js
In this file we can define the format for date fields .
Though datatype is string , we can define 'format' which will determine the format in which fake data will be generated


