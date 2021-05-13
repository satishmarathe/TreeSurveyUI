import React from "react";

class SurveyAdd extends React.Component{

    constructor(props){
        super(props);

        /** now declare state */
        this.state = {
            treeId: '',
            species: '',
            days: ''
        }
    }

    handleChange = event => {
        /** thunk */
        /** here all we are doing is destructuring : we are extracting the values and setting to 'name' and 'value' */
        const { name, value } = event.target;
        //console.log("name = " + name);
        //console.log("value = " + value);
        //console.log("is value an array ?  " + Array.isArray(value));
        //console.log("value typeof is " + typeof value);
        //console.log("name typeof is " + typeof name);

        
        this.setState({
            /** this wierd [name] syntax  is probably 'detructuring' but is meaningless here as per me */
            [name] : value
        });
        //console.log("state = " + this.state);
        
        //console.log("value typeof is " + typeof this.state.value);
        //console.log("name typeof is " + typeof this.state.name);

        //console.log("name  is " +  this.state.name);
        //console.log("value  is " +  this.state.value);
    }

    onFormSubmit = () => {
        this.props.onSubmitAddSurveyCallback(this.state)
        this.setState(this.initialState)
    }

    render(){ 
        //const { name, job } = this.state; 
        const { treeId, species, days } = this.state; 

        return (
            <form>                
                <label htmlFor="treeId">treeId</label>
                <input 
                    type="text" 
                    name="treeId" 
                    id="treeId"
                    value={treeId} 
                    onChange={this.handleChange} />
                <label htmlFor="species">species</label>
                <input type="text" 
                    name="species" 
                    id="species"
                    value={species} 
                    onChange={this.handleChange} />
                <label htmlFor="days">Days</label>
                <input 
                    type="text" 
                    name="days" 
                    id="days"
                    value={days} 
                    onChange={this.handleChange} />
                <input type="button" value="Submit" onClick={this.onFormSubmit} />
            </form>
        );    
    } 
}

export default SurveyAdd;