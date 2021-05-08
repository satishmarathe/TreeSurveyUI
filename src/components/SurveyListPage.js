import React from "react";
import {getListOfEnergyBills} from "../api/energyBillsApi.js";
import axios from "axios";

/** define the table header as a constant and use it within  */
const SurveyListTableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Tree ID</th>
            <th>Species</th>
            <th>Experiment</th>
            <th>Action</th>
        </tr>
    </thead>
    )
  }

class SurveyListPage extends React.Component{

    
    /** we will store the api results in a state */
    /** in class components state is initialised in constructor */
    /** constructor accepts 'props' as a parameter */
    /** first line in constructor must be to super(props) to ensure parent is called first */
    constructor(props){
        super(props);

        /** now declare state */
        this.state = {
            isLoaded: false,
            /** we will getback an array of Survey Details so we define a property to hold an array */
            surveyRecordsArray: []
            
        }
    }

    /** we want to get list of Survey Details when this page loads i.e. set some state when the page loads  
     *  The best place to do this is to use the lifecycle method : componentDidMount
     *  This method is called immediately after the component is mounted
    */
   componentDidMount(){
       console.log("<<< inside componentDidMount of SurveyList Page >>>")
       /** this is the proper lifecycle method for making api calls
        *  the component MUST be mounted before the state is set
        *  since the component is mounted before this below api run is done we can set state here
        */
       //getListOfEnergyBills();
       //getListOfEnergyBills().then((energyBillsResponseFromApi) => {
           /** we now got the results from api call and need to set the result to the state of this class */

           /** setting state MUST happen using setState and no other way - this is important */
           /** NOTE below call to setState will ONLY modify the attribute 'energyBillsArray' of state
            *  if there were other attributes / properties in state they would not get impacted / modified
            *  so setState is more like setters for individual properties 
            *  you can change multiple properties in one setter OR call setState for each property you want to change !
            */
           /**
           console.log(energyBillsResponseFromApi);
          **/
         /** define the endpoint to be called */
        const baseUrl = process.env.REACT_APP_API_URL + "/api/v1/surveys";
        axios.get(baseUrl).then(({data}) => {
            //console.log(data);
            //console.log(JSON.stringify(data));
            this.setState(
                { surveyRecordsArray: data }
                
           );            
        })
                   
   }
    render(){ 
        console.log("@@@ inside render array is @@@",this.state.surveyRecordsArray)
        //console.log(this.state.energyBillsArray) ;      
        return(
            <React.Fragment>
            <h3>Tree Survey List</h3>
            <table className="table">

                <SurveyListTableHeader />

                <tbody>
                    {this.state.surveyRecordsArray.map((surveyRecord,index) => {
                        return (<tr key={index}>
                            <td>{surveyRecord.treeId}</td>
                            <td>{surveyRecord.species}</td>
                            <td>{surveyRecord.days}</td>
                            <td><button onClick={() => this.deleteSurveyRecord(index)}>Delete!</button></td>
                           
                        </tr>);

                    })}
                </tbody>
            </table>
            </React.Fragment>
        );
    }    

    deleteSurveyRecord = (index) => {
        /** below is an example of 'destructuring'  
         * here if we need to extract specific properties from an object we need to enclose that property within {}
         * so in below example we are extracting the property / attribute 'energyBillsArray' from the object : 'state' 
        */
        const { surveyRecordsArray } = this.state;

        /** set state after removing the record we clicked on to delete  */
        this.setState({
            isLoaded: true,
            surveyRecordsArray: surveyRecordsArray.filter((surveyRecord, i) => { 
                /** from all of the records find the record whose index matches with the record we want to delete */
                /** the record for which the index matches needs to be removed from results , so we dont send it back */
                /** we only return those records whose index is not the same as the record we chose to delete */
                return i !== index;
            })
        });        
    }
}
export default SurveyListPage;