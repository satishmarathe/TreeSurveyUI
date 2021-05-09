# TreeSurveyUI
#1 
The react front end is accessible here : http://localhost:3000/surveys

#2
To start the app simply run the command :
npm run dev

This will start the react app and also start the mock server to serve up fake responses to be consumed by UI !

#3
Mock fake response is served at following URL : http://localhost:3001/surveyRecords

#4
Using faker we can define our response schema in file : /src/api/mockSurveyListDataSchema.js
In this file we can define the format for date fields .
Though datatype is string , we can define 'format' which will determine the format in which fake data will be generated

#5
The mocked response was available at: http://localhost:3001/surveyRecords
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
    "/api/v1/surveys": "/surveyRecords"
}

The above means any requests to : "/surveyRecords" will get routed to >> "/api/v1/surveys"

Thats it .
Reference: https://shekhargulati.com/2019/07/10/how-to-setup-json-server-to-use-custom-id-and-route/

#6
Started passing 'Keys' or index for each row of array so that we can uniquely identify each row.
This will become useful while editing a row or deleting .
For more details refer : https://reactjs.org/docs/lists-and-keys.html#keys

#7
Implemented delete functionality making use of the site: https://www.taniarascia.com/getting-started-with-react/

First we added a button for each row :
<td><button onClick={() => this.deleteSurveyRecord(index)}>Delete!</button></td>

We defined an anonymous function for 'onClick' event.
This anonymous function in turn calls a function 'deleteSurveyRecord'
To this function we passed the 'index'

This defined function is also an anonymous function:
deleteSurveyRecord = (index) => {
        /** destructuring **/
        const { surveyRecordsArray } = this.state;


        /** set state after removing the record we clicked on to delete  */
        this.setState({
            isLoaded: true,
            surveyRecordsArray: surveyRecordsArray.filter((surveyRecord, i) => { 
                return i !== index;
            })
        });        
}

NOTE : a Good understanding of detructuring for syntax like :
const { surveyRecordsArray } = this.state;

is explained here :
https://codeburst.io/a-simple-guide-to-destructuring-and-es6-spread-operator-e02212af5831

#8
Additional details of JSON Server:
https://codingthesmartway.com/create-a-rest-api-with-json-server/

#9
extracting an element from an array based on index position :
Example:
surveyRecordsArray[2].id

here we are attempting to extract the 'id' of the 'third' element in the array 

#10
We needed to make a call to backend to delete a specific record.
Whenever we made a DELETE call to : http://localhost:9090/api/v1/surveys/123 it would return 404 
( here assuming 123 is the id of record ) 
when we changed this to make a DELETE call to : http://localhost:9090/surveyRecords/123 it worked ! 

This meant we need to add a route for this to support our call .
So we added the following route:
"/api/v1/surveys/:id": "/surveyRecords/:id"

Note:
Notice how we provide path param as ':id' 
Reference:
https://shekhargulati.com/2019/07/10/how-to-setup-json-server-to-use-custom-id-and-route/

#11
We thought that JSON Server will support routes specific to the type: /api/v1/surveys/:id"
So we thought that our JSON object MUST have an attribute : 'id'
As a result we had changed our json data from 'treeId' to 'id'

However this is not required ! 
By passing a parameter to JSON server as startup we can tell it which attribute should be treated as 'id' !
Ex:
( in package.json ) >> 
"scripts": {
    ...
    "start-mockapi": "json-server --watch src/api/db.json --id treeId --routes src/api/routes.json --port 9090"    ,
    ...
  }
Notice we are passing --id treeId which tells json server to treat 'treeId' as the 'id' field

Reference:
https://shekhargulati.com/2019/07/10/how-to-setup-json-server-to-use-custom-id-and-route/



