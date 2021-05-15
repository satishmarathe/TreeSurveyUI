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

#12
how do we check if the 'type' is an array ?
Use the function :  Array.isArray(variable)

#13
how do we find the datatype in js ?
Use the function : typeof <var_name>

#14
Placeholder to explain usage of ParentComponent and calling ChildComponent
How we pass values for 'props' from parent component to child component.
How 'callBack' functions ate passed to child component and how child component
makes a call to 'callBack' which invokes function in parent !

#15
Calling POST from axios needs to ensure that we pass the payload.
Passing payload is a little different in JavaScript
Reference : https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/#axiospost
This site provided good examples .
We did it this way :

```javascript
axios.post(baseUrl,{
                            "treeId": surveyRecord.treeId,
                            "species": surveyRecord.species,
                            "experiment": surveyRecord.days
                        })
        .then(data => {
```
#16
Data entry form  is being done via:
https://react-bootstrap.netlify.app/components/alerts/

#17
Using react-bootstrap we are adding text box with following syntax:
```html
<Form.Control id="inlineFormInputName" placeholder="tree Id" onChange={this.handleChange} />
```

To ensure we can capture the value entered in this text box we need to add the attribute : 'name=treeId'
```html
<Form.Control id="treeId" name="treeId" placeholder="tree Id" onChange={this.handleChange} />
```

By doing this the 'onChange' is able to identify which element has changed and capture the change in state !

#18
Using react bootstrap to develop forms :
https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2

#19
How do we remove a property from a Javascript object ?
We can use the syntax:
```javascript
delete this.state.age
```

#20 
what is the double !! mark used in code ?
```javascript
if ( !!this.state.errors[name] ){
```
Single exclamation means 'NOT' operator and all we are doing here is we are using it twice
so what we are checking is : if the 'errors' object has an attribute represented by 'name'
i.e. if not null or empty

#21
Using Forms , CSS , validations ......

##21.1
To use forms we have used : reactbootstrap and imported its form rich components like : 
Form , Row , Col , FormControl , Dropdown , Inputgroup etc

##21.2
This is a very rich library which we can use for various purposes like :

```html
<Form.Control type="date" id="plantDate" name="plantDate" placeholder="date of plantation : mm/dd/yyyy" onChange={this.handleChange} />
```
In above example we are defining an input field which will provide us a calendar 
So it will behave like a datepicker.
This is being achieved by specifying the attribute:
```html
<Form.Control type="date"
```

Another example is where we are defining an input field which will only allow numbers to be entered 

```html
<Form.Control type="number" id="healthScore" name="healthScore" placeholder="Health Score" 
onChange={this.handleChange} />
```

This is being achieved by specifying the attribute:
```html
<Form.Control type="number"
```

Another example is where we are defining an input field which will be a text area: 

```html
<Form.Control as='textarea' id="notes" name="notes" onChange={this.handleChange} />  
```

This is being achieved by specifying the attribute:
```html
<Form.Control as='textarea'
```

#21.3
We have also added a css file as a js file : 'style.js'
```javascript
const style = {
    signUpForm: {
      border:'2px solid #000000'
    }
  }  
  module.exports = style;
```
Here we are defining a variable 'style' which holds a javascript object : 'signupForm'
This object has a property / attribute called 'border' which is holding a value 
So this javascript object is actually holding 'css like' properties 

Next step is to make use of these 'css like' properties:
We do this in our <Div> which contains the <Form> ( where we want to apply css):
```html
<div style={signUpForm}>
```
More details explained in below reference:
https://stackoverflow.com/questions/45348146/how-to-draw-a-border-around-a-bootstrap-form-in-reactjs

#21.4
Form Validations - this bit caused a lot of grief 
This reference article was a saviour:
https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2

Almost all of our logic is based on above reference
Lets dive in ...
#21.4.1 
Checking for errors on submit. So when we hit the submit button we need the user entered data to be validated.
As an example:
```javascript
const newErrors = {}
      if ( !this.state.treeId || this.state.treeId === '' ){
        newErrors.treeId = 'cannot be blank!';
      } 
```
Above we have a simple validation check : the 'treeId' field should not be blank or empty
if it is null or empty we are populating a javascript object: 'newErrors'
We populate it with a property and value with the syntax:
```javascript
newErrors.treeId = 'cannot be blank!';
```
here the property is : 'treeId'
its value is : 'cannot be blank!'

#21.4.2
We now need to check if we have any validation errors :
```javascript
if ( Object.keys(newErrors).length > 0 ) {
        this.setState(
          {             
            errors: newErrors
          });
      } else {
        this.props.onSubmitAddSurveyCallback(this.state);
        /** reset state for all attributes  */
        this.setState({"treeId": '',"species":''});
      } 
```
First we check if the js object 'newErrors' is empty or not.
If not empty it means we have validation errors.
In case of validation errors:
We populate 'state's errors' object  with our errors object:
NOTE:
our newErrors object is populated with validation errors and they are now available in 'state'
```javascript
        this.setState(
          {             
            errors: newErrors
          });
```
So if there are validation errrors we populate state with errors and do NOT allow form to be submitted to backend.

#21.4.3
Second if the js object 'newErrors' is empty or null:
This means there are no validation errors 
So we are good to try and submit the form to backend 

```javascript
else {
    this.props.onSubmitAddSurveyCallback(this.state);
    /** reset state for all attributes  */
    this.setState({"treeId": '',"species":''});
}
```

so above we are making call to call back function that this component received from Parent component 
the function is : 'onSubmitAddSurveyCallback' and since the parent passed it to child component
we know this is possible by passing it in 'props'
this is why we call it this way:

```javascript
this.props.onSubmitAddSurveyCallback(this.state);
```

Also important point to note is we are passing our data entry forms values by passing 'this.state'
So then it is the parent form's duty to call backend and populate the listing records to display
newly added record.

#21.4.4
Next - if successful then after submitting data we need to ensure that the data entry fields ( text box , dropdowns)
are cleaned up and dont hold on to earlier entered data .
To achieve this :

```javascript
/** reset state for all attributes  */
        this.setState({"treeId": '',"species":''});
```

Here we are calling 'setState' and setting individual attributes such as 'treeId' 'species' to null / empty values.
NOTE:
using the above technique we can change the state of individual attributes of state without disturbing other attributes.

NOTE:
in above example we have only shown two attributes being reset , but we will need to reset the values for all other
state attributes ( whichever we want to reinitialise )

However this alone will not reset the UI data entry fields with null / empty values.
We need to do an additional tweak :

```html
<Form.Control  type="text" id="treeId" name="treeId" value={this.state.treeId} placeholder="tree Id" onChange={this.handleChange} 
              isInvalid={ !!this.state.errors.treeId } />
```

Here the tweak is the addition of :
```html
<Form.Control  value={this.state.treeId}  />
```

what this will do is set this UI field with its value from 'state'
Since in earlier step on form submit we set the value of this property in 'state' to empty / null value 
now this field on UI will show null / empty value ! 
Exactly what we want :)
NOTE :
whenever we change state , react will trigger call to 'render' which is helping the reset to null / empty.

#21.4.5
Displaying errors on UI fields
This is the place where 'React bootstrap' comes into action !
For each of the UI Form data entry fields which we want to validate and show errors , we add following attributes:
( abbreviated below to only display relevant attributes )

```html
<Form.Control  type="text"  isInvalid={ !!this.state.errors.treeId } />
<Form.Control.Feedback type='invalid'> { this.state.errors.treeId } </Form.Control.Feedback>
```
what we are doing is defining an attribute to this <Form.Control> called : isInvalid
To this attribute we are assigning a javascript object
The value of this attribute 'isInvalid' will be true when the 'errors' object has a attribute called 'treeId'
The value of this attribute 'isInvalid' will be false when the 'errors' object does NOT have an attribute called 'treeId'

Next - we have added : <Form.Control.Feedback type='invalid'>
This is a feature of 'React bootstrap' by means of which if there are validation errors ( isInvalid = true )
then that field will show up in red and also show the validation error message 
Note that the error message is extracted as follows:
```javascript
{ this.state.errors.treeId }
```
so here from state we retrieve the 'errors' object and from it we are extracting value of the property 'treeId'.

#21.4.6
The final bit is where after the error is displayed ( in red and with error message ) :
we want this error details to disappear as we start correcting the value.
To do this :
```javascript
handleChange = event => {
    ...
    ...
    /** check if the errors js object has any property represented by 'name' */
    /** here due to javascript majic 'name' represents any of the various data entry fields we have */
    /** as an example name = treeId if there was a validation error for treeid field */
    /** this would mean the errors js object will have a property called 'treeId' */
    
    /** in below if condition we are using !! which is two not conditions   */
    /** so all we are trying to check is whether the 'errors' js object has a property 'name' ( 'name' could be 'treeId') */
    /** if it has such a property enter the if condition and clear off the property */
    if ( !!this.state.errors[name] ){
        //this.setState({...this.state.errors,[name] : value});

        /** here we are deleting from errors js object property represented by 'name'  */
        /** as states above 'name' is a placeholder and it will denote different form fields when they change */
        delete this.state.errors[name];
    }
  }
  ```
In above comments is explained what we are doing .
TLDR : we remove the error specific to the field in question from state.

