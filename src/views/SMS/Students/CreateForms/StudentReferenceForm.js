import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, FormGroup, Col, Input, Button, Row, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Select from "react-select";
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import remove from '../../../../helpers/remove';
import put from '../../../../helpers/put';
import ButtonForFunction from '../../Components/ButtonForFunction';

const StudentReferenceForm = () => {

    const history = useHistory();
    const {id} = useParams();
    

    const [activetab, setActivetab] = useState("7")
    const [deleteModal, setDeleteModal] = useState(false);

    const [country,setCountry] = useState([]);
    const [countryLabel, setCountryLabel] = useState("Select Country");
      const [countryValue, setCountryValue] = useState(0);

    const [reference,setReference] = useState([]);
    const [referenceLabel, setReferenceLabel] = useState("Select Reference type");
      const [referenceValue, setReferenceValue] = useState(0);
      const [refList, setRefList] = useState([]);
      const [showForm, setShowForm] = useState(false);
      const [oneData, setOneData] = useState({});

      const {addToast} = useToasts();
      const [delData,setDelData] = useState({});
  
     const [referenceError, setReferenceError] = useState(false);
     const [countryError, setCountryError] = useState(false);
     const [buttonStatus, setButtonStatus] = useState(false);

     useEffect(()=>{

        get('CountryDD/index')
        .then(res => {
            console.log(res);
            setCountry(res);
        })


        get(`ReferenceTypeDD/Index`)
        .then(res => {
            console.log(res);
            setReference(res);
        })




    },[])

    
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


      const referenceName = reference?.map((ref) => ({
        label: ref.name,
        value: ref.id,
      }));


           // select  reference
  const selectReference = (label, value) => {

    setReferenceError(false);
    setReferenceLabel(label);
    setReferenceValue(value);
    
   
   
  }



  const handleRegisterReference = (event) => {

    event.preventDefault();
    const subData = new FormData(event.target);

    if(referenceValue == 0){
      setReferenceError(true);
    }
   else if(countryValue ==0 ){
      setCountryError(true);
    }
     else{
      setButtonStatus(true);
         post('Reference/Create',subData)
      .then(res => {
        setButtonStatus(false);
        if(res?.status == 200 && res?.data?.isSuccess == true){
  
         
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          })
            history.push(`/StudentPersonalStatement/${id}`);

        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
  
      })
  

    }

  
  }


    return (
        <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Reference Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" >
              {" "}
              52% Completed
            </span>
          </div>
        </CardHeader>
      </Card>


      <Card>
      <CardBody>
      
     
        <Form onSubmit={handleRegisterReference} className="mt-5">
      <input 
        type='hidden'
        name='studentId'
        id='studentId'
        value={id}
        />

       
        <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>
             Reference Type <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
          <Select
            options={referenceName}
            value={{ label: referenceLabel, value: referenceValue }}
            onChange={(opt) => selectReference(opt.label, opt.value)}
            name="referenceTypeId"
            id="referenceTypeId"



          />
          {
            referenceError && 
            <span className='text-danger'>Reference type is required</span>
          }

          
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
      <Col md="2">
        <span>
          Reference Name <span className="text-danger">*</span>{" "}
        </span>
      </Col>
      <Col md="6">
       <Input
          type="text"
          name="referenceName"
          id="referenceName"
          placeholder="Enter Reference Name"
          required
      
        />

   
      </Col>
    </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
      <Col md="2">
        <span>
          Institute/Company <span className="text-danger">*</span>{" "}
        </span>
      </Col>
      <Col md="6">
       <Input
          type="text"
          name="institute_Company"
          id="institute_Company"
          placeholder="Enter Institute/Company"
          required
      
        />

   
      </Col>
    </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
      <Col md="2">
        <span>
          Phone Number <span className="text-danger">*</span>{" "}
        </span>
      </Col>
      <Col md="6">
       <Input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Enter Phone Number"
          required
       
        />

   
      </Col>
    </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
      <Col md="2">
        <span>
          Email <span className="text-danger">*</span>{" "}
        </span>
      </Col>
      <Col md="6">
       <Input
          type="text"
          name="emailAddress"
          id="emailAddress"
          placeholder="Enter Email"
          required
        
        />

   
      </Col>
    </FormGroup>

    <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>
             Country <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
          <Select
            options={countryName}
            value={{ label: countryLabel, value: countryValue }}
            onChange={(opt) => selectCountry(opt.label, opt.value)}
            name="countryId"
            id="countryId"
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
          Adress Line <span className="text-danger">*</span>{" "}
        </span>
      </Col>
      <Col md="6">
       <Input
          type="text"
          name="addressLine"
          id="addressLine"
          placeholder="Enter Address Line"
          required
       
        />

   
      </Col>
    </FormGroup>
    
      <FormGroup row className="has-icon-left position-relative">
      <Col md="2">
        <span>
          City <span className="text-danger">*</span>{" "}
        </span>
      </Col>
      <Col md="6">
       <Input
          type="text"
          name="city"
          id="city"
          placeholder="Enter City"
          required
      
        />


   
      </Col>
    </FormGroup>


      <FormGroup row className="has-icon-left position-relative">
      <Col md="2">
        <span>
          State <span className="text-danger">*</span>{" "}
        </span>
      </Col>
      <Col md="6">
       <Input
          type="text"
          name="state"
          id="state"
          placeholder="Enter State"
          required
       
        />

   
      </Col>
    </FormGroup>

   <div className='row'>

    <div className='col-md-8 d-flex justify-content-end'>
    <ButtonForFunction
     name={'Save & Next'}
     type={'submit'}
     className={"mt-3 badge-primary"}
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

export default StudentReferenceForm;