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

#5
The mocked response was available at: http://localhost:3001/energyBills
The spring boot api was exposed at:   http://localhost:9090/api/v1/surveys

So we needed mocked api to mimic spring boot endpoint.
To achieve this we modified the script in package.json :
From:
"start-mockapi": "json-server --watch src/api/db.json --port 9090",
To:
"start-mockapi": "json-server --watch src/api/db.json --routes src/api/routes.json --port 9090",

Here we have added "--routes" with reference to a file "src/api/routes.json"
This is a new file added by us .
In this file we simply define the mapping :
{
    "/api/v1/surveys": "/energyBills"
}

The above means any requests to : "/energyBills" will get routed to >> "/api/v1/surveys"

Thats it .
Reference: https://shekhargulati.com/2019/07/10/how-to-setup-json-server-to-use-custom-id-and-route/



