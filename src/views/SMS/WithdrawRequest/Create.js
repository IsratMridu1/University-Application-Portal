import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav,NavLink, NavItem, UncontrolledTooltip, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Select from 'react-select';
import { Link, useHistory } from 'react-router-dom';
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import { useToasts } from 'react-toast-notifications';

const Create = () => {

    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [consultant,setConsultant] = useState([]);
    const [consultantLabel,setConsultantLabel] = useState('Select Consultant');
    const[consultantValue,setConsultantValue] = useState(0);
    const [consultantError, setConsultantError] = useState('');
    const [amount,setAmount] = useState(null);
    const [amountInput, setAmountInput] = useState('');
    const {addToast} = useToasts();
    const [buttonStatus,setButtonStatus] = useState(false);

    useEffect(()=>{

        get(`ConsultantDD/index`)
        .then(res =>{
        setConsultant(res);
        })

        get(`Balance/ConsultantBalance/${consultantValue}`)
        .then(res => {
            
            setAmount(res);
        })

    },[success,consultantValue])

    const backToList = () =>{
        history.push('/withdrawRequestList');
    }

    const consultantOptions = consultant?.map(con => ({
        label: con?.name,
        value: con?.id
    }))

    const selectConsultant = (label,value) => {
      setConsultantError('');
        setConsultantLabel(label);
        setConsultantValue(value);
    }

    const handleInputAmount = (e) => {
        
        setAmountInput(e.target.value);

    }

  
    

    const handleSubmit = (event) => {
            event.preventDefault();
            const subData = new FormData(event.target);
            if(consultantValue ==0) {
                setConsultantError('Consultant Must be Selected');
            }
            else{
                setButtonStatus(true);
                post(`WithdrawRequest/Create`,subData)
                .then(res => {
                    setButtonStatus(false);
                    if(res?.status == 200 && res?.data?.isSuccess == true){
                        addToast(res?.data?.message,{
                            appearance: 'success',
                            autoDismiss: true
                        })
                        setConsultantLabel('Select Consultant');
                        setConsultantValue(0);
                        setAmountInput('');
                        history.push('/withdrawRequestList');
                    }
                    else{
                        addToast(res?.data?.message,{
                            appearance: 'error',
                            autoDismiss: true
                        })
                    }
                })

            }
    }


    return (
        <div>
            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Create Withdraw Request</h3>
                <div className="page-header-back-to-home">
                  <span className="text-white" onClick={backToList}>
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Withdraw List
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card>
                <CardBody>

                    <div className='row'>
                        <div className='col-md-9'>
                        <form onSubmit={handleSubmit}>
                    <FormGroup row className="has-icon-left position-relative">
                            <Col md="2">
                            <span>
                                Select Consultant <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                                    
                                    options={consultantOptions}
                                    value={{ label: consultantLabel, value: consultantValue }}
                                    onChange={(opt) => selectConsultant(opt.label, opt.value)}
                                    name='consultantId'
                                    id='consultantId'
                                    />
                                    <span className='text-danger'>{consultantError}</span>
                                    
                            </Col>
                        </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                            <Col md="2">
                            <span>
                                Amount <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='number'
                            name='amount'
                            id='amount'
                            placeholder='Enter Amount'
                            required
                            onChange={handleInputAmount}
                            
                            />
                                    
                            </Col>
                        </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                            <Col md="10">
                            <div className='d-flex justify-content-end'>
                                <Button color='primary' type='submit'
                                disabled={(amountInput <50 || amountInput>amount || amountInput == isNaN(amountInput) || buttonStatus )? true : false}
                                >
                                    Submit
                                </Button>

                            </div>
                            </Col>
                           
                        </FormGroup>

                    </form>

                        </div>

                        <div className='col-md-3'>
                            <div className='d-flex justify-content-end'>
                            <h5>Balance Available to Withdraw</h5>
                            </div>
                            <br/>
                            <h2 className='text-center' style={{color: '#1e98b0'}}>&#xA3; {amount}</h2>

                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                            <div>
                                <ul>
                                    <li>
                                        <span style={{fontWeight: '500'}}>Minimum withdraw limit is &#xA3; 50 </span>
                                    </li>

                                    <li>
                                        <span style={{fontWeight: '500'}}>You can have only one withdraw request at a time</span>
                                    </li>

                                    <li>
                                        <span style={{fontWeight: '500'}}>Deposit to your withdrawal account may take upto 7 business days</span>
                                    </li>
                                </ul>

                            </div>

                        </div>

                    </div>
                   
                </CardBody>
            </Card>
            
        </div>
    );
};

export default Create;