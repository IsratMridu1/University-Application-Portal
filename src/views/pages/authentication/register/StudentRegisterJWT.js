import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Checkbox from "../../../../components/core/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions"
import { history } from "../../../../history"
import axios from "axios"
import { rootUrl } from "../../../ReusableFunction/Api/ApiFunc"
import { store } from "react-notifications-component"
import { Link } from "react-router-dom"
import Select from 'react-select';
import get from "../../../../helpers/get";

const  StudentRegisterJWT = () => {

  
 

  const [students,setStudents] = useState([]);

  const [studentLabel, setStudentLabel] = useState('Student Type');
  const [studentValue, setStudentValue] = useState(0);





  useEffect(()=>{

    get('StudentTypeDD/Index')
    .then(res => {
     
      setStudents(res);
      

    })

  },[])
   
  

  const  studentOptions = students?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));


   const selectStudent = (label, value) => {
    setStudentLabel(label);
    setStudentValue(value);
  };



const   handleRegister = (e) => {
    e.preventDefault()
 
 


  }
  


    return (
      <Form  onSubmit={handleRegister}>


      <input
      type='hidden'
      name='consultantId'
      id='consultantId'
      value='1'
      
      />


        <FormGroup className="form-label-group">
        <Select
        options={studentOptions}
       value={{ label: studentLabel, value: studentValue }}
       onChange={(opt) => selectStudent(opt.label, opt.value)}
         
          name="CampusCountryId"
          id="CampusCountryId"
        />
        
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="First Name"
            required
            
        
          />
        
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Last Name"
            required
           
          
          />
      
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
         
           
          />
     
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
           
          
          />
       
        </FormGroup>
      
      
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            required
           
          
          />
        
        
        </FormGroup>
        
        <div className="d-flex justify-content-between">


        <div>
        <Link to="/" style={{ textDecoration: 'none'}}>Already Have an Account? Login</Link>
        </div>

       <div>
       <Button.Ripple className="uapp-submit-btn" color="primary" type="submit">
       Register
     </Button.Ripple>
       </div>
  
        </div>
      </Form>
    )
  }

const mapStateToProps = state => {
  return {
    values: state.auth.register
  }
}
export default connect(mapStateToProps, { signupWithJWT })(StudentRegisterJWT)
