import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import put from '../../../helpers/put';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { rootUrl } from "../../../constants/constants";
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import { useToasts } from 'react-toast-notifications';
import remove from '../../../helpers/remove';
import ButtonForFunction from '../Components/ButtonForFunction';
import { userTypes } from '../../../constants/userTypeConstant';

const BankDetails = () => {
 

  const history = useHistory();
  const {addToast} = useToasts();
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const {consultantRegisterId} = useParams();

  const userTypeId = localStorage.getItem('userType');

  const [bankDetailsData, setBankDetailsData] = useState([]);
  const [fetchedData, setFetchedData] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [addNewButton, setAddNewButton] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [activetab, setActivetab] = useState("2");
  const [buttonStatus,setButtonStatus] = useState(false);
  
  useEffect(()=>{

    get(`BankDetails/Index/${consultantRegisterId}`)
    .then(res => {
      console.log('Get Response For Bank Details in Array', res);
      setBankDetailsData(res);

    })

  },[success])


  const backToConsultantList = () =>{

    history.push('/consultantList');

  }


  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/consultantInformation/${consultantRegisterId}`);
    }

    if (tab == "2") {
      history.push(`/consultantBankDetails/${consultantRegisterId}`);
    }

    if (tab == "3") {
      history.push(`/consultantCommission/${consultantRegisterId}`);
    }

    if (tab == "4") {
      history.push(`/consultantConscent/${consultantRegisterId}`);
    }

  };


  const toggleDanger = (p) => {

    console.log(p);
    setDeleteData(p);

    setDeleteModal(true);
  }

  const back = () => {
    history.push(`/consultantInformation/${consultantRegisterId}`);
  }

  const front = () => {
    history.push(`/consultantCommission/${consultantRegisterId}`);

  }

  const addNewData = () => {

    setShowForm(false);
    setFetchedData({});

  }

      // on Close Modal
const closeModal = () => {

  setModalOpen(false);
  setFetchedData({});


}


const handleEdit = (data) => {

  console.log(data);
  setModalOpen(true);

  get(`BankDetails/Get/${data?.id}`)
  .then(res => {
    setFetchedData(res);
  })

}


  //  Update Bank Details 

  const handleSubmitUpdate = (event) =>{

    event.preventDefault();
    

    const subData = new FormData(event.target);
    setButtonStatus(true);
    put('BankDetails/Update',subData)
    .then( res => {
      setButtonStatus(false);
      addToast(res?.data?.message, {
        appearance: 'success',
        autoDismiss: true
      })
      setFetchedData({});
      setModalOpen(false);
      setSuccess(!success);

    })

  }


  // Delete Bank Details 

  const handleDeletePermission = () => {

    setButtonStatus(true);
    remove(`BankDetails/Delete/${deleteData?.id}`)
    .then(res => {
      setButtonStatus(false);
      
      addToast(res, {
        appearance: 'error',
        autoDismiss: true
      })
      setDeleteModal(false);
      setSuccess(!success);
     
      
     
  
    })
 
  
   
  }



  // Post Bank Details

  const handleSubmit = (event) =>{

    event.preventDefault();

    const subData = new FormData(event.target);
      setButtonStatus(true);
      post('BankDetails/Create',subData)
    .then(res => {
      setButtonStatus(false);
      console.log('Bank Data Post Resonse', res);
      if(res?.status ==200){
        addToast(res?.data?.message,{
          appearance:'success',
          autoDismiss: true
        })
        
        setShowForm(true);
        setSuccess(!success);
       

      }

    })

    
  }
   



    return (
        <div>

        <div>

        <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
          <ModalHeader>Update Bank Details</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitUpdate} >
  
            <input
            type='hidden'
            name='consultantId'
            id='consultantId'
            value={consultantRegisterId}
            
            />

            <input
            type='hidden'
            name='id'
            id='id'
            value={fetchedData?.id}
            
            />
  
           
  
            <FormGroup row className="has-icon-left position-relative">
                <Col md="3">
                  <span>
                    Account Name <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="accountName"
                    id="accountName"
                    placeholder="Enter Account Name"
                    required
                    defaultValue={fetchedData?.accountName}
                  
                  />
  
                  
                </Col>
              </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
                <Col md="3">
                  <span>
                    Account Number <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    placeholder="Enter Account Number"
                    required
                    defaultValue={fetchedData?.accountNumber}
                   
                  />
  
                  
                </Col>
              </FormGroup>
  
            <FormGroup row className="has-icon-left position-relative">
                <Col md="3">
                  <span>
                    Sort Code <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="sortCode"
                    id="sortCode"
                    placeholder="Enter Sort Code"
                    required
                    defaultValue={fetchedData?.sortCode}
                  
                  />
  
                  
                </Col>
              </FormGroup>
  
            <FormGroup row className="has-icon-left position-relative">
                <Col md="3">
                  <span>
                    Bank Name <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="bankName"
                    id="bankName"
                    placeholder="Enter Bank Name"
                    required
                    defaultValue={fetchedData?.bankName}
                    
                  />
  
                  
                </Col>
              </FormGroup>
  
  
            <FormGroup row className="has-icon-left position-relative">
                <Col md="3">
                  <span>
                    BIC <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="bIC"
                    id="bIC"
                    placeholder="Enter BIC"
                    required
                    defaultValue={fetchedData?.bic}
                   
                  />
  
                  
                </Col>
              </FormGroup>
  
            <FormGroup row className="has-icon-left position-relative">
                <Col md="3">
                  <span>
                    Swift <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="swift"
                    id="swift"
                    placeholder="Enter Swift"
                    required
                    defaultValue={fetchedData?.swift}
                  
                  />
  
                  
                </Col>
              </FormGroup>
  
            <FormGroup row className="has-icon-left position-relative">
                <Col md="3">
                  <span>
                    Bank Address <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                 <Input
                    type="text"
                    name="bankAddress"
                    id="bankAddress"
                    placeholder="Enter Bank Address"
                    required
                    defaultValue={fetchedData?.bankAddress}
                   
                  />
  
                  
                </Col>
              </FormGroup>
  
  
    
              <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>
    
                <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>Close</Button>
    
                
               
                  <Button.Ripple
                    color="warning"
                    type="submit"
                    className="mr-1 mt-3"
                    disable={buttonStatus}
                  >
                    Submit
                  </Button.Ripple>
    
              
    
              </FormGroup>
    
            </Form>
          </ModalBody>
    
        </Modal>
        <div>
    
        </div>
      </div>
        

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white"> Consultant Bank Details</h3>
          {
            !(userTypeId == userTypes?.Consultant) ?
            <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToConsultantList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Consultant List
            </span>
          </div>
          :
          null
          }
        </CardHeader>
      </Card>

      <Card>
      <CardBody>


        {/* nav tabs start */}

        <Nav tabs>
              <NavItem>
                <NavLink
                 
                  active={activetab === "1"}
                  onClick={() => toggle("1")}
                >
                  Information
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                 
                  active={activetab === "2"}
                  onClick={() => toggle("2")}
                >
                  Bank  Details
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                
                  active={activetab === "3"}
                  onClick={() => toggle("3")}
                >
                  Commission
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                
                  active={activetab === "4"}
                  onClick={() => toggle("4")}
                >
                  Conscent
                </NavLink>
              </NavItem>


            </Nav>

          {/* nav tabs end */}

    


      <div className='row'>

      {
          bankDetailsData.map(details => 

            <div className='col-md-6 col-sm-12 mt-2' key={details?.id}>

            <Card className='CampusCard bank-details-card-size'>

            <CardBody>
            
       

            <Row>
            
            <Col className='md-8'>
            <span className='bank-name-style'>{details?.bankName}</span>

              <br/>

            <span  className='bank-account-info-text'>Account Name: {details?.accountName}</span>
            <br/>
            <span className='bank-account-info-text'>Bank Address: {details?.bankAddress}</span>
            <br/>
            <span  className='bank-account-info-text'>BIC: {details?.bic}</span>
            <br/>
            <span  className='bank-account-info-text'>Sort Code: {details?.sortCode}</span>
            <br/>
            <span  className='bank-account-info-text'>swift: {details?.swift}</span>
            <br/>
            <span className='account-number-style'>{details?.accountNumber}</span>
            <br/>

            
            </Col>
            
            <Col className='md-3'>

            <div className="CampusCardAction">
                 <div className=""> 
                    {/* <button type="button" className="btn btn-outline-info" onClick={()=>handleEdit(details)} > <i className="fas fa-edit"></i> </button> */}

                    <ButtonForFunction 
                      type={"button"}
                      color={"primary"}
                      func={()=>handleEdit(details)}
                      icon={<i className="fas fa-edit"></i>}
                      className={'bankCard-style'}
                      
                    />

                 </div>

                 <div className=""> 
                    {/* <button type="button" className="btn btn-outline-danger" onClick={()=>toggleDanger(details)}  ><i className="fas fa-trash-alt"></i></button> */}

                    <ButtonForFunction 
                      type={"button"}
                      color={"danger"}
                      func={()=>toggleDanger(details)}
                      icon={<i className="fas fa-trash-alt"></i>}
                      permission={6}
                      className={'bankCard-style'}
                      
                    />

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

             </div>
            
            )

      }
      

      </div>
             {

              (bankDetailsData?.length <1 || !showForm) ? 

              <Form  onSubmit={handleSubmit} className="mt-5">

              <input
              type='hidden'
              name='consultantId'
              id='consultantId'
              value={consultantRegisterId}
              
              />
  
             
  
              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Account Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="accountName"
                      id="accountName"
                      placeholder="Enter Account Name"
                      required
                    
                    />
  
                    
                  </Col>
                </FormGroup>
              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Account Number <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="accountNumber"
                      id="accountNumber"
                      placeholder="Enter Account Number"
                      required
                     
                    />
  
                    
                  </Col>
                </FormGroup>
  
              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Sort Code <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="sortCode"
                      id="sortCode"
                      placeholder="Enter Sort Code"
                      required
                    
                    />
  
                    
                  </Col>
                </FormGroup>
  
              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Bank Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="bankName"
                      id="bankName"
                      placeholder="Enter Bank Name"
                      required
                      
                    />
  
                    
                  </Col>
                </FormGroup>
  
  
              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      BIC <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="bIC"
                      id="bIC"
                      placeholder="Enter BIC"
                      required
                     
                    />
  
                    
                  </Col>
                </FormGroup>
  
              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Swift <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="swift"
                      id="swift"
                      placeholder="Enter Swift"
                      required
                    
                    />
  
                    
                  </Col>
                </FormGroup>
  
              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Bank Address <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="bankAddress"
                      id="bankAddress"
                      placeholder="Enter Bank Address"
                      required
                     
                    />
  
                    
                  </Col>
                </FormGroup>
  
  
              
             
  
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup>
                <FormGroup row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}

                  <Col md="5">
                  <ButtonForFunction 
                    type={"submit"}
                    className={"mr-1 mt-3 badge-primary"}
                    name={"Submit"}
                    permission={6}
                    disable={buttonStatus}
                  />
                  </Col>

                </FormGroup>
              </Form>

              :

              null

             }

             {

              (showForm && bankDetailsData?.length > 0) ?

              <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              

              <ButtonForFunction 
                func={addNewData}
                className={"mr-1 mt-3 badge-primary"}
                name={"Add New Bank Details"}
                permission={6}
              />

            </FormGroup>

            :

            null


             }

             <div className='d-flex justify-content-between'>
              <Button color='warning' onClick={back}>
                Previous Page

              </Button>
              <Button color='warning' onClick={front}>
                Next Page

              </Button>

             </div>
           
      </CardBody>
    </Card>
           

        </div>
    );
};

export default BankDetails;