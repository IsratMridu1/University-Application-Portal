import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane, Label, Row, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Select from "react-select";
import get from '../../../../helpers/get';
import { useHistory, useParams } from 'react-router-dom';
import post from '../../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import remove from '../../../../helpers/remove';
import put from '../../../../helpers/put';
import ButtonForFunction from '../../Components/ButtonForFunction';


const StudentEducationForm = () => {

    const {id} = useParams();
    const [activetab, setActivetab] = useState("4");
    const history = useHistory();
    const [educationLevel, setEducationLevel] = useState([]);
  const [educationLevelLabel, setEducationLevelLabel] = useState('Select Education Level');
  const [educationLevelValue, setEducationLevelValue] = useState(0);
 
  const [deleteData, setDeleteData]  = useState({});


  const [deleteModal, setDeleteModal] = useState(false);
  const [showForm,setShowForm]=useState(false);

  const [success, setSuccess] = useState(false);

  const [country,setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
    const [countryValue, setCountryValue] = useState(0);

    const [eduDetails, setEduDetails] = useState([]);
    const [ oneData, setOneData] = useState([]); 


    const {addToast} = useToasts();

    const [from, setFrom] = useState('');
    const [to,setTo] = useState('');

    

    const [programError, setProgramError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false);

    useEffect(()=>{

        get(`EducationLevelDD/Index`)
        .then(res => {
            setEducationLevel(res);
        })

      get('CountryDD/index')
        .then(res => {
            console.log(res);
            setCountry(res);
        })
    
       
    
      },[success])

      // date handling

const handleDate = (e) =>{
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  }

  const styleLabelBold = {
    // fontWeight: "bold"
  };





const educationLevelName = educationLevel?.map((edu) => ({
  label: edu.name,
  value: edu.id,
}));


     // select  Student type
const selectEducationLevel = (label, value) => {

setProgramError(false);
setEducationLevelLabel(label);
setEducationLevelValue(value);
console.log(value);


}


const countryName = country?.map((branchCountry) => ({
label: branchCountry.name,
value: branchCountry.id,
}));


   // select  Country
const selectCountry = (label, value) => {

setCountryError(false);
setCountryLabel(label);
setCountryValue(value);

}


const handleSubmit = (event) => {

event.preventDefault();

const subData = new FormData(event.target);

if(educationLevelValue == 0){
setProgramError(true);
}

else if(countryValue == 0){
setCountryError(true);
}

else{

 setButtonStatus(true);
  post('EducationInformation/Create',subData)
  .then(res => {
    setButtonStatus(false);
    
    addToast(res?.data?.message,{
      appearance: 'success',
      autoDismiss: true
    })
    setSuccess(!success);
    history.push(`/studentTestScore/${id}`);

    
  })



 }

}






    return (

        
        <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Educational Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" >
              {" "}
               36% Completed
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
      <CardBody>
    

              <Form onSubmit={handleSubmit}   className="mt-5">

            <input
            type='hidden'
             name='studentId'
             id='studentId'
             value={id}          
            />

      
            <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
              <span>
                Name of Institution <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="6">
             <Input
                type="text"
                name="nameOfInstitution"
                id="nameOfInstitution"
               
                placeholder="Enter Name Of Institution"
                required
              />

         
            </Col>
          </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Attended From <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="date"
                      name="attendedInstitutionFrom"
                      id="attendedInstitutionFrom"
                    
                      
                    
                    />

                  </Col>

                </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Attended To <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="date"
                      name="attendedInstitutionTo"
                      id="attendedInstitutionTo"
                
                      
                  
                    />

                  </Col>
                </FormGroup>
            

            <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Education Level <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                <Select
                    options={educationLevelName}
                    value={{ label: educationLevelLabel, value: educationLevelValue }}
                    onChange={(opt) => selectEducationLevel(opt.label, opt.value)}
                    name="educationLevelId"
                    id="educationLevelId"
                    required

                  />
                  {

                    programError && 

                    <span className = 'text-danger'>Education level is required</span>
                  }

                 
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Qualification Subject <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
               <Input
                  type="text"
                  name="qualificationSubject"
                  id="qualificationSubject"
                  placeholder="Enter Qualification Subject"
                  required
                 
                />
  
           
              </Col>
            </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Duration <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
               <Input
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="Enter Duration"
                  required
            
                  
                />
  
           
              </Col>
            </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Result In Percentage <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
               <Input
                  type="text"
                  name="finalGrade"
                  id="finalGrade"
                  placeholder="Enter Percentage"
                  required
                 

                />
  
           
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
              <span>
                Country of Education <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="6">
            <Select
            options={countryName}
            value={{ label: countryLabel, value: countryValue }}
            onChange={(opt) => selectCountry(opt.label, opt.value)}
            name="countryOfEducationId"
            id="countryOfEducationId"
            required

          />
          {
            countryError && 
            <span className='text-danger'>Country is required</span>
          }
           

         
            </Col>
          </FormGroup>

            
             

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Language of Institution <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="languageOfInstitution"
                    id="languageOfInstitution"
                    placeholder="Enter Language Of Institution"
                    required
                    
                  />

             
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Institute Contact Number <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="instituteContactNumber"
                    id="instituteContactNumber"
                    placeholder="Enter Institute Contact Number"
                    required
                  
                  />

             
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Institute Address <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="instituteAddress"
                    id="instituteAddress"
                    placeholder="Enter Institute Address"
                    required
                  
                  />

             
                </Col>
              </FormGroup>

             <div className='row'>

                <div className='col-md-8 d-flex justify-content-end'>
                <ButtonForFunction
        name={'Save & Next'}
        type={'submit'}
        className={'mt-3 badge-primary'}
        disable={buttonStatus}
        />

                </div>

             </div>

            </Form>
   

      </CardBody>
    </Card>

            
        </div>
    );
};

export default StudentEducationForm;