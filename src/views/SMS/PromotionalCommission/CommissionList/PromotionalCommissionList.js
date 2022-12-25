import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import get from '../../../../helpers/get';
import Select from "react-select";
import post from '../../../../helpers/post';
import ButtonForFunction from '../../Components/ButtonForFunction';
import remove from '../../../../helpers/remove';
import put from '../../../../helpers/put';


const PromotionalCommissionList = () => {


    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal,setDeleteModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const {addToast} = useToasts();

    const [university,setUniversity] = useState([]);
    const [universityLabel, setUniversityLabel] = useState('Select University');
    const [universityValue, setUniversityValue] = useState(0);

    const [intake, setIntake] = useState([]);
    const [intakeLabel,setIntakeLabel] = useState('Select Intake');
    const [intakeValue, setIntakeValue] = useState(0);

    const [commission,setCommission] = useState([]);
    const [commissionLabel,setCommissionLabel] = useState('Select Commission');
    const [commissionValue,setCommissionvalue] = useState(0);

    const [uniError,setUniError] = useState('');
    const [intakeError,setIntakeError] = useState('');
    const [commissionError,setCommissionError] = useState('');

    const [promotion,setPromotion] = useState([]);
    const [currDeleteData, setCurrDeleteData] = useState({});
    const [update, setUpdate] = useState(false);
    const [data,setData] = useState({});

    const [date,setDate] = useState('');
    const [amount,setAmount] = useState('');
    const [min,setMin] = useState('');

    

    useEffect(()=>{

        get(`PromotionalCommission/Index`)
        .then(res =>{
          
          setPromotion(res);
          
        })

        get(`UniversityDD/Index`)
        .then(res => {
           
          setUniversity(res);
        })

        get(`AccountIntake/Index`)
        .then(res => {
        
          
          setIntake(res);
        })

        get(`CommissionGroupDD/Index`)
        .then(res =>{
          
          setCommission(res);
        })

    },[success])

    const handleDate = e =>{
      var datee = e;
      var utcDate = new Date(datee);
      var localeDate = utcDate.toLocaleString("en-CA");
      const x = localeDate.split(",")[0];
      return x;
    }

    const uniOptions = university?.map(uni => ({
      label: uni?.name,
      value: uni?.id
    }))

    const selectUniversity = (label,value) =>{
      setUniError('');
      setUniversityLabel(label);
      setUniversityValue(value);
    }

    const accountIntakeOptions = intake?.map(acc => ({
      label: acc?.intakeName,
      value: acc?.id
    }))

    const selectAccountIntake = (label,value) =>{
      setIntakeError('');
      setIntakeLabel(label);
      setIntakeValue(value);
    }
    
    const commissionGroupOptions = commission?.map(com => ({
      label: com?.name,
      value: com?.id
    }))

    const selectCommissionGroup = (label,value) =>{
      setCommissionError('');
      setCommissionLabel(label);
      setCommissionvalue(value);
    }

    const backToDashboard = () => {
        history.push('/');
    }

    const closeModal = () => {
        setModalOpen(false);
        setUniversityLabel('Select University');
        setUniversityValue(0);
        setIntakeLabel("Select Intake");
        setIntakeValue(0);
        setCommissionLabel('Select Commission');
        setCommissionvalue(0);
       
      
      };

    const openModal = () => {
        setModalOpen(true);
      }

      const handleUpdate = (data) => {
        setUpdate(true);
        setData(data);
        console.log(data);
        get(`PromotionalCommission/Get/${data?.id}`)
        .then(res => {
           setUniversityLabel(res?.university?.name);
           setUniversityValue(res?.universityId);
           setIntakeValue(res?.accountIntakeId);
           setIntakeLabel(res?.accountIntake?.intakeName);
           setDate(res?.startFrom);
           setAmount(res?.commissionAmount);
           setCommissionvalue(res?.commissionGroupId);
           setCommissionLabel(commission?.find(com => com?.id == res?.commissionGroupId)?.name);
           setMin(res?.minumumStudentRequirement);
           setModalOpen(true);

         
        })
      }  


      
    const toggleDanger = (data) => {
     
      setCurrDeleteData(data);
      setDeleteModal(true);
  }


  const handleDeleteData = () => {

      remove(`PromotionalCommission/Delete/${currDeleteData?.id}`)
      .then(res => {
          addToast(res,{
              appearance: 'error',
              autoDismiss: true
          })
          setSuccess(!success);
          setDeleteModal(false);
      })
  }

    const handleSubmit = (event) =>{
        event.preventDefault();

        const subData = new FormData(event.target);

        if(universityValue == 0){
          setUniError('University Must be Selected');
        }
        else if(intakeValue == 0){
          setIntakeError('Account Intake Must be Selected');
        }
        else if(commissionValue == 0){
          setCommissionError('Commission Group Must be Selected');
        }
        else{
          
          if(!update){

            post(`PromotionalCommission/Create`,subData)
          .then(res => {
            if(res?.status == 200 && res?.data?.isSuccess == true){
              addToast(res?.data?.message,{
                appearance: 'success',
                autoDismiss: true
              })
              setSuccess(!success);
              setModalOpen(false);
              setCommissionLabel('Select Commission Group')
              setCommissionvalue(0);
              setIntakeLabel('Select Account Intake');
              setIntakeValue(0);
              setUniversityLabel('Select University');
              setUniversityValue(0);
              setMin('');
              setAmount('');
              setDate('');
            }
          })

          }

          else{

            put(`PromotionalCommission/Update`,subData)
          .then(res => {
            if(res?.status == 200 && res?.data?.isSuccess == true){
              addToast(res?.data?.message,{
                appearance: 'success',
                autoDismiss: true
              })
              setSuccess(!success);
              setModalOpen(false);
              setCommissionLabel('Select Commission Group')
              setCommissionvalue(0);
              setIntakeLabel('Select Account Intake');
              setIntakeValue(0);
              setUniversityLabel('Select University');
              setUniversityValue(0);
              setMin('');
              setAmount('');
              setDate('');
              setUpdate(false);
            }
          })

          }

        }

    }

    return (
        <div>

<Modal
                    isOpen={modalOpen}
                    toggle={closeModal}
                    className="uapp-modal2"
                    >
                    <ModalHeader>Add Promotional Commission</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                          {
                            update?

                            <input
                            type='hidden'
                            name='id'
                            id='id'
                            value={data?.id}
                            />
                            :
                            null
                          }

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                University <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                            options={uniOptions}
                            value={{ label: universityLabel, value: universityValue }}
                            onChange={(opt) => selectUniversity(opt.label, opt.value)}
                            name="universityId"
                            id="universityId"
                        />
                          <span className='text-danger'>{uniError}</span>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Minimum Student Requirement <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='number'
                            name='minumumStudentRequirement'
                            id='minumumStudentRequirement'
                            placeholder='Enter Minimum Student Requirement'
                            defaultValue={min}
                            required
                            />
                         
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Start From <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='date'
                            name='startFrom'
                            id='startFrom'
                            required
                            defaultValue={handleDate(date)}
                            />
                         
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Account Intake <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                            options={accountIntakeOptions}
                            value={{ label: intakeLabel, value: intakeValue }}
                            onChange={(opt) => selectAccountIntake(opt.label, opt.value)}
                            name="accountIntakeId"
                            id="accountIntakeId"
                        />
                          <span className='text-danger'>{intakeError}</span>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Commission Amount <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='number'
                            name='commissionAmount'
                            id='commissionAmount'
                            placeholder='Enter Commission Amount'
                            defaultValue={amount}
                            required
                            />
                         
                            </Col>
                        </FormGroup>

                         
                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Commission Group <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                            options={commissionGroupOptions}
                            value={{ label: commissionLabel, value: commissionValue }}
                            onChange={(opt) => selectCommissionGroup(opt.label, opt.value)}
                            name="commissionGroupId"
                            id="commissionGroupId"
                        />
                          <span className='text-danger'>{commissionError}</span>
                            </Col>
                        </FormGroup>

                    

                        

                    
                        

                        <div className='d-flex justify-content-end'>
                        <FormGroup
                            className="has-icon-left position-relative"
                            style={{ display: "flex", justifyContent: "space-between" }}
                        >
                            

                    
                        <Button.Ripple
                            color="primary"
                            
                            className="mr-1 mt-3"
                        
                            >
                            Submit
                            </Button.Ripple>
                

                        </FormGroup>
                        </div>

                        </Form>
                    </ModalBody>
                    </Modal>
           

            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Promotional Commission List</h3>
                <div className="page-header-back-to-home">
                  <span className="text-white" onClick={backToDashboard}>
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card className='uapp-employee-search'>
     
     <CardHeader>

     <div className=''>
         <Button className ="btn btn-uapp-add" onClick={openModal}>
            <i className="fas fa-plus"></i>
          {' '}
           Add New Promotional Commission
                      
              </Button>
         </div>
     </CardHeader>

     <CardBody className="search-card-body">
     <Table className="table-sm table-bordered">
             <thead className="thead-uapp-bg">
               <tr style={{ textAlign: "center" }}>
                 
                 <th>SL/NO</th>
                  <th>Account Intake</th>
                  <th>University</th>
                  <th>Commission Amount</th>
                  <th>Commission Group</th>
                  <th>Action</th>
              </tr>
             </thead>
             <tbody>
             {promotion?.map((prom, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                      <th scope='row'>{i+1}</th>
                      <td>
                        {prom?.accountIntake?.intakeName}
                      </td>
                      
                      <td>
                        {prom?.university?.name}
                      </td>

                      <td>
                      {prom?.commissionAmount}
                      </td>

                      <td>
                      {(commission?.find(p => p?.id == prom?.commissionGroupId))?.name}
                      </td>

                   
                      <td  className="text-center">
                        <ButtonGroup variant="text">
                       
                            
                                
                                <ButtonForFunction
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                func={()=> handleUpdate(prom)}
                                
                                />
                             

                  
                            
                              <ButtonForFunction
                              icon={<i className="fas fa-trash-alt"></i>}
                              color={'danger'}
                              className={"mx-1 btn-sm"}
                              func= {()=> toggleDanger(prom)}
                              
    
                              />
                        

                        </ButtonGroup>

                     
                        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                        <ModalBody>
                          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                        </ModalBody>
        
                        <ModalFooter>
                          <Button  color="danger" onClick={handleDeleteData}>YES</Button>
                          <Button onClick={() => setDeleteModal(false)}>NO</Button>
                        </ModalFooter>
                     </Modal>



                      </td>
                    </tr>
                  ))}
              
             </tbody>
           </Table>

     </CardBody>
   </Card>
            
        </div>
    );
};

export default PromotionalCommissionList;