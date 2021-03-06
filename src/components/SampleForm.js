import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {signUpForm} from "../style.js";

const initialState = {
  treeId: '',
  location: '',
  species: '',
  plantDate: '',
  inspectionDate: '',
  treatment: '',
  healthScore: '',
  pathogenFound: '',
  woodBorerFound: '',
  notes: '',
  days: '',
  errors: {}
}

class SampleForm extends React.Component{

  constructor(props){
    super(props);

    /** now initialise state  */
    this.state = initialState;
}

handleChange = event => {
    /** here all we are doing is destructuring : we are extracting the values and setting to 'name' and 'value' */
    const { name, value } = event.target;
    
    this.setState({
        /** this wierd [name] syntax  is probably 'detructuring' but is meaningless here as per me */
        [name] : value
    });
    
    console.log("inspection 1 " + this.state.errors[name]);
    console.log("inspection 1 ! " + !this.state.errors[name]);
    console.log("inspection 2 !1 " + !!this.state.errors[name]);
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

  onFormClear = () => {
    console.log("<<<<<<< in here ! >>>>>>>")
    this.setState(this.initialState);
  }

    onFormSubmit = () => {
      /** satish test start */
      const newErrors = {}

      if ( !this.state.treeId || this.state.treeId === '' ){
        newErrors.treeId = 'TreeId cannot be blank';        
      } 

      if ( !this.state.species || this.state.species === '' ){
        newErrors.species = 'Species needs to be selected';        
      } 

      if ( !this.state.treatment || this.state.treatment === '' ){
        newErrors.treatment = 'Treatment needs to be selected';        
      } 

      if ( !this.state.location || this.state.location === '' ){
        newErrors.location = 'Location needs to be selected';        
      }
      
      if ( !this.state.plantDate || this.state.plantDate === '' ){
        newErrors.plantDate = 'Date of Plantation needs to be selected';        
      }

      console.log("inspectionDate = " + this.state.inspectionDate);
      console.log("plantDate = " + this.state.plantDate);

      if ( this.state.inspectionDate && this.state.plantDate ){
        
          console.log("<<<<<< 2 >>>>>>>");
          /** plantDate is not null or empty  */
          /** check to ensure inspectionDate >=  plantDate */
          var dateInspection = new Date(this.state.inspectionDate);
          var datePlant = new Date(this.state.plantDate);
          if(dateInspection < datePlant){
            console.log("<<<<<< 3 >>>>>>>");
            /** inspection date cannot be less than plantation date ! */
            newErrors.inspectionDate = 'Inspection Date must be greater than Plantation Date';
          }
        
      }
      
      
      if ( Object.keys(newErrors).length > 0 ) {
        // We got errors!
        //setErrors(newErrors)
        this.setState(
          {             
            errors: newErrors
          });
      } else {
        // No errors! Put any logic here for the form submission!
        //alert('Thank you for your feedback!')
        this.props.onSubmitAddSurveyCallback(this.state);
        //this.setState(this.initialState);

        /** reset state for all attributes  */
        this.setState({"treeId": '',"species":'',"location": '',"plantDate": '',"inspectionDate": '',
                      "treatment": '',"healthScore": '',"pathogenFound": '',"woodBorerFound": '',
                      "notes": ''});
      }      
    }

  
    render(){ 
        return(
          <div style={signUpForm}>
          <Form>
          <Form.Row className="align-items-center">
            
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
                Tree Id
              </Form.Label>
              <Form.Control  type="text" id="treeId" name="treeId" value={this.state.treeId} placeholder="tree Id" onChange={this.handleChange} 
              isInvalid={ !!this.state.errors.treeId } />
              <Form.Control.Feedback type='invalid'>
              { this.state.errors.treeId }
              </Form.Control.Feedback>
               
            </Col>
            
            <Col sm={3} className="my-1">
              <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                Species
              </Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="species"
                name="species"
                value={this.state.species}
                onChange={this.handleChange} isInvalid={ !!this.state.errors.species }
                custom
              >
                <option value="">Species...</option>
                <option value="Nilgiri">Nilgiri</option>
                <option value="Chapha">Chapha</option>
                <option value="Tagar">Tagar</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
              { this.state.errors.species }
              </Form.Control.Feedback>
            </Col>
            
            <Col xs="auto" className="my-1">
              <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                Location
              </Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="location"
                name="location"
                value={this.state.location}
                onChange={this.handleChange} isInvalid={ !!this.state.errors.location }
                custom
              >
                <option value="">Location...</option>
                <option value="China">China</option>
                <option value="South Africa">South Africa</option>
                <option value="India">India</option>                
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                  { this.state.errors.location }
              </Form.Control.Feedback>
            </Col>
            <Col xs="auto" className="my-1">
              
            </Col>
          </Form.Row>

          <Form.Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
                plantDate
              </Form.Label>
              <Form.Control type="date" id="plantDate" name="plantDate" value={this.state.plantDate} placeholder="date of plantation : mm/dd/yyyy" 
                isInvalid={ !!this.state.errors.plantDate } onChange={this.handleChange} />
                <Form.Control.Feedback type='invalid'>
              { this.state.errors.plantDate }
              </Form.Control.Feedback>
            </Col>
            
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
                inspectionDate
              </Form.Label>
              <Form.Control type="date" id="inspectionDate" name="inspectionDate" value={this.state.inspectionDate} placeholder="date of Inspection : mm/dd/yyyy" 
              isInvalid={ !!this.state.errors.inspectionDate } onChange={this.handleChange} />
              <Form.Control.Feedback type='invalid'>
              { this.state.errors.inspectionDate }
              </Form.Control.Feedback>
            </Col>
            
            <Col xs="auto" className="my-1">
              <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                Preference
              </Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="treatment"
                name="treatment"
                value={this.state.treatment}
                onChange={this.handleChange} isInvalid={ !!this.state.errors.treatment }
                custom
              >
                <option value="0">Treatment...</option>
                <option value="Girdle">Girdle</option>                
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                  { this.state.errors.treatment }
              </Form.Control.Feedback>
            </Col>
            
            <Col xs="auto" className="my-1">              
            </Col>
          </Form.Row>

          <Form.Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
                healthScore
              </Form.Label>
              <Form.Control type="number" id="healthScore" name="healthScore" placeholder="Health Score" onChange={this.handleChange} />
            </Col>
            
            <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
                pathogenCount
            </Form.Label>
            <Form.Control type="number" id="pathogenFound" name="pathogenFound" placeholder="Number of Pathogen(s) found" onChange={this.handleChange} />
            </Col>
            
            <Col xs="auto" className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
                woodborerCount
            </Form.Label>
            <Form.Control type="number" id="woodBorerFound" name="woodBorerFound" placeholder="Woodborer count" onChange={this.handleChange} />
            </Col>
            <Col xs="auto" className="my-1">              
            </Col>
          </Form.Row>

          <Form.Row className="align-items-center">
            <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
                Comments
              </Form.Label>
              <Form.Control as='textarea' id="notes" name="notes" onChange={this.handleChange} />              
            </Col>
           
            <Col xs="auto" className="my-1">
            </Col>
            <Col xs="auto" className="my-1">              
            </Col>
          </Form.Row>

          <Form.Row className="align-items-center">
            <Col sm={3} className="my-1">
            <Button type="" onClick={this.onFormClear}>Clear</Button>
            </Col>
           
            <Col xs="auto" className="my-1">
              <Button type="" onClick={this.onFormSubmit}>Submit</Button>
            </Col>
            <Col xs="auto" className="my-1">              
            </Col>
          </Form.Row>

        </Form>
        </div>
        );
    }
}

export default SampleForm;

