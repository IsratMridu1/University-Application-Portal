import React, { useEffect, useState } from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Checkbox from "../../../../components/core/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions"
import { history } from "../../../../history"
import axios from "axios"
import { rootUrl } from "../../../ReusableFunction/Api/ApiFunc"
import { store } from "react-notifications-component"
import { Link } from "react-router-dom"
import get from "../../../../helpers/get"
import Select from 'react-select';

const ProviderRegisterJWT = () => {

  const [title, settitle] = useState([]);
  const [titleLabel,setTitleLabel] = useState('Select Title');
  const [titleValue, setTitleValue] = useState(0);

  useEffect(()=>{

    get('NameTittleDD/index')
    .then(res => {
      
      settitle(res);

    })

  },[])

  const  titleOptions = title?.map((tl) => ({
    label: tl?.name,
    value: tl?.id,
  }));


   const selectTitle = (label, value) => {
    setTitleLabel(label);
    setTitleValue(value);
  };

const   handleRegister = e => {
    e.preventDefault()
    
  


  }
  


    return (
      <Form  onSubmit={handleRegister}>


      <FormGroup className="form-label-group">
      <Select
      options={titleOptions}
     value={{ label: titleLabel, value: titleValue }}
     onChange={(opt) => selectTitle(opt.label, opt.value)}
       
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
            type="number"
            placeholder="Phone Number"
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
     
        <FormGroup>
         
        </FormGroup>
        <div className="d-flex justify-content-between">

        <div>
        <Link to="/" style={{textDecoration: 'none'}}>Already Have an Account? Login</Link>
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
export default connect(mapStateToProps, { signupWithJWT })(ProviderRegisterJWT)
