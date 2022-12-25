import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import ButtonForFunction from '../../Components/ButtonForFunction';
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import get from '../../../../helpers/get';
import loadingImages from '../../../../assets/img/data.svg'
import post from '../../../../helpers/post';
import put from '../../../../helpers/put';
import remove from '../../../../helpers/remove';
import { permissionList } from '../../../../constants/AuthorizationConstant';
import Loader from '../../Search/Loader/Loader';

const AccountIntake = () => {


    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const { addToast } = useToasts();
    const [loading,setLoading] = useState(true);
    const [month,setMonth] = useState([]);
    const [year,setYear] = useState([]);

    const [currUpdateData, setCurrUpdateData] = useState({});
    const [currDeleteData, setCurrDeleteData] = useState({});

    const [intakeList,setIntakeList] = useState([]);

    const [sMonthLabel, setSMonthLabel] = useState('Select Start Month');
    const [sMonthValue,setSMonthValue] = useState(0);

    const [eMonthLabel, setEMonthLabel] = useState('Select End Month');
    const [eMonthValue,setEMonthValue] = useState(0);

    const [sYearLabel,setSYearLabel] = useState('Select Start Year');
    const [sYearValue,setSYearValue] = useState(0);
    
    const [eYearLabel,setEYearLabel] = useState('Select End Year');
    const [eYearValue,setEYearValue] = useState(0);

    const [startMError,setStartMError] = useState('');
    const [endMError,setEndMError] = useState('');

    const [startYError,setStartYError] = useState('');
    const [endYError,setEndYError] = useState('');
    const [name,setName] = useState('');

    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const [buttonStatus,setButtonStatus] = useState(false);




    useEffect(()=>{

        get(`MonthDD/Index`)
        .then(res => {
            setMonth(res);
            setLoading(false);

        })

        get(`YearDD/Index`)
        .then(res => {
            setYear(res);
            setLoading(false);

        })

        get(`AccountIntake/Index`)
        .then(res => {
            setIntakeList(res);
          
            setLoading(false);

        })


    },[success])

    const handleDate = e =>{
        var datee = e;
        var utcDate = new Date(datee);
        var localeDate = utcDate.toLocaleString("en-CA");
        const x = localeDate.split(",")[0];
        return x;
      }

      const handleName = (e) => {
          setName(e.target.value);
      }

      const handleUpdate = (data) => {
      
        get(`AccountIntake/Get/${data?.id}`)
        .then(res => {
            
            const startMonth = month.find(data => data?.id == res?.startMonthId);
            const endMonth = month.find(data => data?.id == res?.endMonthId);
            const startYear = year.find(data => data?.id == res?.startYearId);
            const endYear = year.find(data => data?.id == res?.endYearId);

           setSMonthLabel(startMonth?.name);
           setSMonthValue(startMonth?.id);

           setEMonthLabel(endMonth?.name);
           setEMonthValue(endMonth?.id);

           setSYearLabel(startYear?.name);
           setSYearValue(startYear?.id);

           setEYearLabel(endYear?.name);
           setEYearValue(endYear?.id);

           setCurrUpdateData(res);
           setModalOpen(true);
           setName(res?.intakeName);
        })
      }

    const monthOptions = month?.map((mon)=> (
        {
            label: mon?.name,
            value: mon?.id
        }
    ))

    const yearOptions = year?.map((y)=> (
        {
            label: y?.name,
            value: y?.id
        }
    ))

    const selectEndMonth = (label,value) => {

        setEMonthLabel(label);
        setEMonthValue(value);
        setEndMError('');

    }

    const selectStartMonth = (label,value) => {

        setSMonthLabel(label);
        setSMonthValue(value);
        setStartMError('');

    }

    const selectStartYear = (label,value) => {

        setSYearLabel(label);
        setSYearValue(value);
        setStartYError('');

    }

    const selectEndYear = (label,value) => {

        setEYearLabel(label);
        setEYearValue(value);
        setEndYError('');

    }

    const backToDashboard = () => {
        history.push("/")
    }

    const closeModal = () => {
        setModalOpen(false);
        setCurrUpdateData({});
       
      
      };

      const openModal = () => {
        setSMonthLabel('Select Start Month');
           setSMonthValue(0);

           setEMonthLabel('Select End Month');
           setEMonthValue(0);

           setSYearLabel('Select Start Year');
           setSYearValue(0);

           setEYearLabel('Select End Year');
           setEYearValue(0);
           setName('');
        setModalOpen(true);
      }

      const handleSubmit = (event) => {

        event.preventDefault();

        const subData = new FormData(event.target); 

        if(sMonthValue ==0){
            setStartMError('Start month is required');
        }
        else if(sYearValue == 0){
            setStartYError('Start year is required');
        }
        else if(eMonthValue ==0){
            setEndMError('End month must me selected');
        }
        
        else if(eYearValue == 0){
            setEndYError('End year is required');
        }
        
        else{
            if(!currUpdateData?.id){
                setButtonStatus(true);
                post(`AccountIntake/Create`,subData)
                .then(res => {
                    setButtonStatus(false);
                    if(res?.status ==200){
                        addToast(res?.data?.message,{
                            appearance: 'success',
                            autoDismiss: true
                        })
                        setSuccess(!success);
                        setModalOpen(false);
                        setSMonthLabel('');
                        setSMonthValue(0);
                        setEMonthLabel('');
                        setEMonthValue(0);
                        setSYearLabel('');
                        setSYearValue(0);
                        setEMonthLabel('');
                        setEMonthValue(0);
                    }
                })
            }

            else{
                setButtonStatus(true);
                put(`AccountIntake/Update`,subData)
                .then(res => {
                    setButtonStatus(false);
                    if(res?.status == 200 && res?.data?.isSuccess == true){
                        addToast(res?.data?.message,{
                            appearance: 'success',
                            autoDismiss: true
                        })
                        setSMonthLabel('Select');
                        setSMonthValue(0);
                        setEMonthLabel('Select');
                        setEMonthValue(0);
                        setSYearLabel('Select');
                        setSYearValue(0);
                        setEYearLabel('Select');
                        setEYearValue(0);
                        setCurrUpdateData({});
                        setModalOpen(false);
                        setSuccess(!success);
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



    const toggleDanger = (data) => {
       
        setCurrDeleteData(data);
        setDeleteModal(true);
    }


    const handleDeleteData = () => {
        setButtonStatus(true);
        remove(`AccountIntake/Delete/${currDeleteData?.id}`)
        .then(res => {
            setButtonStatus(false);
            addToast(res,{
                appearance: 'error',
                autoDismiss: true
            })
            setSuccess(!success);
            setDeleteModal(false);
        })
    }


    return (
        <div>

          {
            loading?
            <Loader/>
            :
            <div>
                
                <Card className="uapp-card-bg">

                <CardHeader className="page-header">
                <h3 className="text-white">Account Intake List</h3>
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
                {
                    permissions?.includes(permissionList?.Add_AccountIntake) ?
                    <div className='d-flex jusity-content-end'>
                    <ButtonForFunction className ={"btn btn-uapp-add "}
                        icon ={<i className="fas fa-plus"></i>}
                        func={openModal} 
                        name={' Add New Intake'}
                                
                        ></ButtonForFunction>
                    </div>
                    :
                    null
                }

                </CardHeader>

                <CardBody className="search-card-body">

                    {/* account intake form modal */}
                    <div>

                    <Modal
                    isOpen={modalOpen}
                    toggle={closeModal}
                    className="uapp-modal2"
                    >
                    <ModalHeader> Account Intake</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>

                          {
                            (currUpdateData?.id) ?
                              <input
                              type='hidden'
                              name='id'
                              id='id'
                              value={currUpdateData?.id}
                              />
                              :
                              null
                          }
                        

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Name <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='text'
                            name='IntakeName'
                            id='IntakeName'
                            placeholder='Enter Intake Name'
                            value={name}
                            required
                            onChange={handleName}
                            />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                            Start Date <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='date'
                            name='StartDate'
                            id='StartDate'
                            defaultValue={handleDate(currUpdateData?.startDate)}
                        
                        
                            />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                            End Date <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='date'
                            name='EndDate'
                            id='EndDate'
                            defaultValue={handleDate(currUpdateData?.endDate)}
                        
                        
                            />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Start Month <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                            options={monthOptions}
                            value={{ label: sMonthLabel, value: sMonthValue }}
                            onChange={(opt) => selectStartMonth(opt.label, opt.value)}
                            
                            name="StartMonthId"
                            id="StartMonthId"
                        />
                          <span className='text-danger'>{startMError}</span>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Start Year <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                            options={yearOptions}
                            value={{ label: sYearLabel, value: sYearValue }}
                            onChange={(opt) => selectStartYear(opt.label, opt.value)}
                            name="StartYearId"
                            id="StartYearId"
                        />
                        <span className='text-danger'>{startYError}</span>
                            </Col>
                            
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                End Month <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                            options={monthOptions}
                            value={{ label: eMonthLabel, value: eMonthValue }}
                            onChange={(opt) => selectEndMonth(opt.label, opt.value)}
                            name="EndMonthId"
                            id="EndMonthId"
                        />
                          <span className='text-danger'>{endMError}</span>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                End Year <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                            options={yearOptions}
                            value={{ label: eYearLabel, value: eYearValue }}
                            onChange={(opt) => selectEndYear(opt.label, opt.value)}
                            name="EndYearId"
                            id="EndYearId"
                        />
                          <span className='text-danger'>{endYError}</span>
                            </Col>
                        </FormGroup>

                    

                        

                    
                        

                        <div className='d-flex justify-content-end'>
                        <FormGroup
                            className="has-icon-left position-relative"
                            style={{ display: "flex", justifyContent: "space-between" }}
                        >
                            

                    
                        <Button.Ripple
                            color="danger"
                            onClick={closeModal}
                            className="mr-1 mt-3"
                        
                            >
                            Cancel
                            </Button.Ripple>

                        <Button
                            color="primary"
                            
                            className="mr-1 mt-3"
                            disabled={buttonStatus}
                            >
                            Submit

                            </Button>
                

                        </FormGroup>
                        </div>

                        </Form>
                    </ModalBody>
                    </Modal>

                    </div>

                <Table className="table-sm table-bordered">
                        <thead className="thead-uapp-bg">
                        <tr style={{ textAlign: "center" }}>
                            <th>SL/NO</th>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Application</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {intakeList?.map((list, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                      <th scope='row'>{i+1}</th>
                      <td>
                        {list?.intakeName}
                      </td>
                      
                      <td>
                        {handleDate(list?.startDate)}
                      </td>

                      <td>
                      {handleDate(list?.endDate)}
                      </td>

                      <td>
                        <span className='badge badge-pill badge-primary' style={{cursor: 'pointer'}}>{list?.applications}</span>
                      </td>

                    
                      <td  className="text-center">
                        <ButtonGroup variant="text">
                       
                            {
                                permissions?.includes(permissionList?.Update_AccountIntake) ?
                                <ButtonForFunction
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                func={()=> handleUpdate(list)}
                                
                                />
                                :
                                null
                            }
                      

                        {
                            permissions?.includes(permissionList?.Delete_AccountIntake) ?
                              <ButtonForFunction
                              icon={<i className="fas fa-trash-alt"></i>}
                              color={'danger'}
                              className={"mx-1 btn-sm"}
                              func= {()=> toggleDanger(list)}
                              
    
                              />
                              :
                              null
                        }

                        </ButtonGroup>

                     
                        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                        <ModalBody>
                          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                        </ModalBody>
        
                        <ModalFooter>
                          <Button  color="danger" onClick={handleDeleteData} disabled={buttonStatus}>YES</Button>
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
          }
            
        </div>
    );
};

export default AccountIntake;