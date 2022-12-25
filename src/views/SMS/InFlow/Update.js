import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import get from '../../../helpers/get';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav,NavLink, NavItem, UncontrolledTooltip, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Select from 'react-select';
import ButtonForFunction from '../Components/ButtonForFunction';
import put from '../../../helpers/put';
import { useToasts } from 'react-toast-notifications';

const Update = () => {

    const {id} = useParams();
    const history = useHistory();
    const {addToast} = useToasts();

    const [transactionInfo,setTransactionInfo] = useState({});
    const [consultant,setConsultant] = useState([]);
    const [transaction,setTransaction] = useState([]);
    const [cLabel,setCLabel] = useState('Select Consultant');
    const [cValue, setCValue] = useState(0);
    const [tLabel,setTLabel] = useState('Select Transaction Type');
    const [tValue,setTValue] = useState(0);
    const [success,setSuccess] = useState(false);
    const [buttonStatus,setButtonStatus] = useState(false);

    useEffect(()=>{
      
        get(`BonusTransaction/Details/${id}`)
        .then( res => {
            console.log(res);
            setTransactionInfo(res);
            setCLabel(res?.consultant);
            setCValue(res?.consultantId);
            setTLabel(res?.transactionType);
            setTValue(res?.transactionTypeId);
        })

        get(`BonusTransactionTypeDD/Index`)
        .then( res => {
          
          setTransaction(res);
        })

    },[success])

    const backToDashboard = () => {
        history.push('/inFlowTransaction');
    }

    const transactionOptions = transaction?.map(tran => ({
      label: tran?.name,
      value: tran?.id
    }))

    const selectTransaction = (label,value) => {
       
      setTLabel(label);
      setTValue(value);
    }

    const submitUpdateForm  = (event) => {

      event.preventDefault();

      const subData = new FormData(event.target);
      setButtonStatus(true);
      put(`BonusTransaction/UPdate`,subData)
      .then(res => {
        setButtonStatus(false);
        if(res?.status == 200 && res?.data?.isSuccess == true){
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          })
          setSuccess(!success);
        }
        else{
          addToast(res?.data?.message,{
            appearance: 'error',
            autoDismiss: true
          })
        }

      })
    }



    return (
        <div>
            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Update Inflow Transaction</h3>
                <div className="page-header-back-to-home">
                  <span className="text-white" onClick={backToDashboard}>
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Inflow Transaction List
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card>

                <CardBody>
                    <span className='mr-1'><b>Code:</b></span><span className=''>{' '}{transactionInfo?.transactionCode}</span>
                    <br/>
                    <span className='mr-1'><b>Date:</b></span><span className=''>{' '}{transactionInfo?.transactionDate}</span>
                    <br/>
                    <span className='mr-1'><b>Consultant:</b></span><span className=''>{' '}{cLabel}</span>

                    <Form className='mt-3' onSubmit={submitUpdateForm}>

                      <input
                      type='hidden'
                      name='id'
                      id='id'
                      value={transactionInfo?.id}
                      />

                      <input
                      type='hidden'
                      name='consultantId'
                      id='consultantId'
                      value={cValue}
                      />

             

             <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Transaction Type <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={transactionOptions}
                  value={{ label: tLabel, value: tValue }}
                  onChange={(opt) => selectTransaction(opt.label, opt.value)}
                  name="transactionTypeId"
                  id="transactionTypeId"
                />
                
             </Col>

            </FormGroup>

             <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Amount <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                type='number'
                defaultValue={transactionInfo?.amount}
                name='amount'
                id='amount'
                
                />
                
             </Col>

            </FormGroup>

             <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Reference
                </span>
              </Col>
              <Col md="6">
                <Input
                type='text'
                defaultValue={transactionInfo?.reference}
                name='reference'
                id='reference'

                />
                
             </Col>

            </FormGroup>
             <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Note
                </span>
              </Col>
              <Col md="6">
                <Input
                type='text'
                defaultValue={transactionInfo?.transactionNote}
                name='transactionNote'
                id='transactionNote'

                />
                
             </Col>

            </FormGroup>

            <FormGroup row
              className="has-icon-left position-relative"
              
            >

             <Col md='8'>

              <div
              style={{ display: "flex", justifyContent: "end" }}
              >
                


              <ButtonForFunction

                className={''}
                color={'primary'}
                name={'Submit'}
                type={'submit'}
                disable={buttonStatus}
                

              />

              </div>
            

             </Col>

            </FormGroup>
            

                    </Form>

                </CardBody>

            </Card>
            
        </div>
    );
};

export default Update;