import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, FormGroup, Col, Input, Button, Row, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Select from "react-select";
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import remove from '../../../helpers/remove';
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';


const Reference = () => {

    const history = useHistory();
    const {applicationStudentId, update} = useParams();
    

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

        get(`Reference/GetByStudentId/${applicationStudentId}`)
        .then(res => {
            console.log(res);
            setRefList(res);
        })

        get(`ReferenceTypeDD/Index`)
        .then(res => {
            console.log(res);
            setReference(res);
        })




    },[])


    const backToStudentProfile = () => {
      history.push(`/studentProfile/${applicationStudentId}`);
  }
  

    const toggle = (tab) => {
        setActivetab(tab);
        if (tab == "1") {
          history.push(`/addStudentApplicationInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "2") {
          history.push(`/addStudentInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "3") {
          history.push(`/addStudentContactInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "4") {
          history.push(`/addStudentEducationalInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "5") {
          history.push(`/addTestScore/${applicationStudentId}/${1}`);
        }
      
        if (tab == "6") {
          history.push(`/addExperience/${applicationStudentId}/${1}`);
        }
      
        if (tab == "7") {
          history.push(`/addReference/${applicationStudentId}`);
        }
      
        if (tab == "8") {
          history.push(`/addPersonalStatement/${applicationStudentId}`);
        }
        if (tab == "9") {
          history.push(`/addOtherInformation/${applicationStudentId}`);
        }
        if (tab == "10") {
          history.push(`/uploadDocument/${applicationStudentId}`);
        }
        if (tab == "11") {
          history.push(`/studentDeclaration/${applicationStudentId}`);
        }

        
      };

  

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

      
  const toggleDanger = (id) => {
    setDelData(id);
    
  
   setDeleteModal(true)
 }
 
 const handleDeletePermission = () => {
 
  setButtonStatus(true);
 remove(`Reference/Delete/${delData?.id}`)
 .then(res => {
  setButtonStatus(false);
  addToast(res,{
    appearance: 'error',
    autoDismiss: true
  })
  setDeleteModal(false);
  get(`Reference/GetByStudentId/${applicationStudentId}`)
  .then(res => {
      console.log(res);
      setRefList(res);
  })

 })
  
 
  
 }
 
 const handleUpdate = (id) => {
  
  setShowForm(true);
 
   console.log(id);
   get(`Reference/Get/${id}`)
   .then(res => {
    console.log(res);

    setOneData(res);
    setCountryLabel(res?.country?.name);
    setCountryValue(res?.country?.id);
    setReferenceLabel(res?.referenceType?.name);
    setReferenceValue(res?.referenceType?.id);
   })
 
  
    
    
 }
 


// redirect to Next Page
const onNextPage = () => {
  
  history.push(`/addPersonalStatement/${applicationStudentId}`);
};


const onPreviousPage = () => {

  history.push(`/addExperience/${applicationStudentId}/${1}`
   
  );

}



const onShow=()=>{
  setShowForm(true);


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

      if(oneData?.id){
        setButtonStatus(true);
        put('Reference/Update',subData)
        .then(res => {
          setButtonStatus(false);
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          })
          setShowForm(false);
          setOneData({});
          get(`Reference/GetByStudentId/${applicationStudentId}`)
          .then(res => {
              console.log(res);
              setRefList(res);
              setReferenceLabel('Select Reference Type');
              setReferenceValue(0);
              setCountryLabel('Select Country');
              setCountryValue(0);
          })
  
        })
  
      }
  
      else{
        setButtonStatus(true);
        post('Reference/Create',subData)
      .then(res => {
        setButtonStatus(false);
        if(res?.status == 200 && res?.data?.isSuccess == true){
  
          setShowForm(false);
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          })
          get(`Reference/GetByStudentId/${applicationStudentId}`)
          .then(res => {
              console.log(res);
              setRefList(res);
              setReferenceLabel('Select Reference Type');
              setReferenceValue(0);
              setCountryLabel('Select Country');
              setCountryValue(0);
          })
  
  
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

    

  }



    return (
        <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Reference Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToStudentProfile}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Student Profile
            </span>
          </div>
        </CardHeader>
      </Card>


      <Card>
      <CardBody>
      
     
       <Nav tabs>

       <NavItem>
       <NavLink  active={activetab === "1"} onClick={() => toggle("1")}>
         Application 
       </NavLink>
     </NavItem>

         <NavItem>
           <NavLink  active={activetab === "2"} onClick={() => toggle("2")}>
             Personal 
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink   active={activetab === "3"} onClick={() => toggle("3")}>
             Contact 
           </NavLink>
         </NavItem>

        
         <NavItem>
           <NavLink   active={activetab === "4"} onClick={() => toggle("4")}>
             Educational 
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink   active={activetab === "5"} onClick={() => toggle("5")}>
             Test Score
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink    active={activetab === "6"} onClick={() => toggle("6")}>
             Experience 
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink   active={activetab === "7"} onClick={() => toggle("7")}>
             Reference
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink   active={activetab === "8"} onClick={() => toggle("8")}>
             Personal Statement
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink   active={activetab === "9"} onClick={() => toggle("9")}>
             Others
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink  active={activetab === "10"} onClick={() => toggle("10")}>
             Documents
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink  active={activetab === "11"} onClick={() => toggle("11")}>
             Declaration
           </NavLink>
         </NavItem>
        

       </Nav>

      

      <div className='row'>

{
      refList?.map((ref, i) => <div className='col-md-6 mt-2' key={ref.id} style={{ textAlign: "left" }}>
      <Card className="CampusCard shadow-style test-score-card-style-2">
        <CardBody className="shadow">

        

        <Row>
          <Col md="4">
              <h5 className='test-score-title-styles'>Reference Name: {ref?.referenceName}   </h5>
              
              <p className="bank-account-info-text">Reference Type: {ref?.referenceType?.name}  </p>

              <p className="bank-account-info-text">Email: {ref?.emailAddress}  </p>
             
              
          </Col>

            <Col md="5">
              <p className="bank-account-info-text">Address Line : {ref?.addressLine}  </p>
              <p className="bank-account-info-text">Institute Company : {ref?.institute_Company}  </p>
             
             
         
              
          </Col>

          <Col md="3">

          <div className="CampusCardAction">
          <div className=""> 
             <Button type="button" color='primary' className="bankCard-style" onClick={() => handleUpdate(ref.id)} disabled={buttonStatus}> <i className="fas fa-edit"></i> </Button>
          </div>

          <div className=""> 
             <Button type="button" color='danger' className="bankCard-style" onClick={()=>toggleDanger(ref)} ><i className="fas fa-trash-alt"></i></Button>
          </div>
         </div>

          </Col>


        </Row>           
    
        </CardBody>

        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
          <ModalBody>
            <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDeletePermission} color="danger" disabled={buttonStatus}>YES</Button>
            <Button onClick={() => setDeleteModal(false)}>NO</Button>
          </ModalFooter>
       </Modal>

      </Card>
    </div>)

    

  }

  </div>

       {
        (showForm ||   refList?.length < 1) ?  

        <Form onSubmit={handleRegisterReference} className="mt-5">

            
                
        <input 
        type='hidden'
        name='studentId'
        id='studentId'
        value={applicationStudentId}
        />

        {
          (oneData?.id) ?

          <input
          type='hidden'
          name='id'
          id='id'
          value={oneData?.id}
          />

          :

          null

        }

        
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
          defaultValue={oneData?.referenceName}
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
          defaultValue={oneData?.institute_Company}
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
          defaultValue={oneData?.phoneNumber}
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
          defaultValue={oneData?.emailAddress}
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
          defaultValue={oneData?.addressLine}
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
          defaultValue={oneData?.city}
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
          defaultValue={oneData?.state}
        />

   
      </Col>
    </FormGroup>

   
    <FormGroup row
    className="has-icon-left position-relative"
    style={{ display: "flex", justifyContent: "end" }}
  >
    
<Col md="5">



<ButtonForFunction
name={'Submit'}
type={'submit'}
className={"mr-1 mt-3 badge-primary"}
disable={buttonStatus}
/>

</Col>

   
  </FormGroup>
    </Form>


    :
       
      

      
      

    <FormGroup className="has-icon-left position-relative" style={{ display: 'flex',width:"100%", justifyContent: 'space-between' }}>

   
    <Button onClick={onShow} color="primary uapp-form-button">Add Another</Button>
   
    </FormGroup>

       }

       <FormGroup className="has-icon-left position-relative" style={{ display: 'flex',width:"100%", justifyContent: 'space-between' }}>

       
       

       <ButtonForFunction
       name={'Previous'}
       className={"ms-md-1 mt-3 btn-warning"}
       icon={<i className="fas fa-arrow-left-long mr-1"></i>}
       func={onPreviousPage}

       
       />

       <Button onClick={onNextPage} className="me-md-1 mt-3 btn-warning"
       
       >

       Next
       <i className="fas fa-arrow-right-long ml-1"></i>
       </Button>
       </FormGroup>
      
      </CardBody>
    </Card>
        
            
        </div>
    );
};

export default Reference;