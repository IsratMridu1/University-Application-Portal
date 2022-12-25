import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav,NavLink, NavItem, UncontrolledTooltip, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Select from 'react-select';
import { Link, useHistory } from 'react-router-dom';
import get from '../../../helpers/get';
import { userTypes } from '../../../constants/userTypeConstant';
import Pagination from '../Pagination/Pagination';

import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx/xlsx.mjs";
import post from '../../../helpers/post';
import { useToasts } from 'react-toast-notifications';
import { transactionTypes } from '../../../constants/TransactionConstant';
import Loader from '../Search/Loader/Loader';

const Index = () => {

    const history = useHistory();
    const userType = localStorage.getItem("userType");
    const [success,setSuccess] = useState(false);
    const [data,setData] = useState([]);
    const [consultant,setConsultant] = useState([]);
    const [consultantLabel,setConsultantLabel] = useState('Select Consultant');
    const[consultantValue,setConsultantValue] = useState(0);
    const [transaction,setTransaction] = useState([]);
    const[transactionLabel,setTransactionLabel] = useState('Select Transaction Type');
    const [transactionValue,setTransactionValue] = useState(0);
    const [status,setStatus] = useState([]);
    const [statusLabel,setStatusLabel] = useState('Select Status')
    const [statusValue,setStatusValue] = useState(0);
    const [transactionCode,setTransactionCode] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [inflowConsultantError,setInflowConsultantError] = useState('');
    const[inflowTransactionError,setInflowTransactionError] = useState('');
    const {addToast} = useToasts();
    const [bonusTransaction,setBonusTransaction] = useState([]);
    const [bonusTransactionLabel,setBonusTransactionLabel] = useState('Select Transaction Type');
    const [bonusTransactionValue, setBonusTransactionValue] = useState(0);
    const [agree,setAgree] = useState(false);
    const [loading,setLoading] = useState(true);
    const [outflowConsultantLabel,setOutflowConsultantLabel] = useState('Select Consultant');
    const[outflowConsultantValue,setOutflowConsultantValue] = useState(0);
    const [outflowConsultantError,setOutflowConsultantError] = useState('');
    const [modal2Open,setModal2Open] = useState(false);
    const [label2,setLabel2] = useState('Select Consultant');
    const [value2,setValue2] = useState(0);
    const [amount,setAmount]  = useState(0);
    const [amountInput,setAmountInput] = useState('');
    const [tError, setTError] = useState('');
    const [tLabel,setTLabel] = useState('Select Transaction Type');
    const [tValue, setTValue] = useState(0);
    const [reference,setReference] = useState('');
    const [note,setNote] = useState('');
    const [cError,setCError] = useState('');
    const [buttonStatus,setButtonStatus] = useState(false);
    

    const customStyles2 = {
        control: (provided, state) => ({
          ...provided,
          background: '#fff',
          borderColor: '#9e9e9e',
          minHeight: '30px',
          height: '34px',
          boxShadow: state.isFocused ? null : null,
          
        }),
  
        // valueContainer: (provided, state) => ({
        //   ...provided,
        //   height: '30px',
        //   padding: '0 6px'
        // }),
    
        // input: (provided, state) => ({
        //   ...provided,
        //   margin: '0px',
        // }),
        // indicatorSeparator: state => ({
        //   display: 'none',
        // }),
        // indicatorsContainer: (provided, state) => ({
        //   ...provided,
        //   height: '30px',
        // }),
      };

      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background: '#fff',
          borderColor: '#9e9e9e',
          minHeight: '33px',
          height: '33px',
          boxShadow: state.isFocused ? null : null,
          
        }),
  
        // menu: () => ({
          
        //   overflowY: 'auto'
          
        // }),
       
       
     
      };
  
      

    const [currentPage, setCurrentPage] = useState(1);
    const [callApi, setCallApi] = useState(false);
    const [dataPerPage, setDataPerPage] = useState(15);
    const [entity, setEntity] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
     // user select data per page
     const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
     const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));
     const [orderLabel, setOrderLabel] = useState("Select order by");
     const [orderValue, setOrderValue] = useState(0);
     const [dropdownOpen1, setDropdownOpen1] = useState(false);
 
     const selectDataSize = (value) => {
       
       setDataPerPage(value);
       setCallApi((prev) => !prev);
     };

       // search handler
       const handleSearch = () => {
        setCurrentPage(1);
        setCallApi((prev) => !prev);
      };

     const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCallApi((prev) => !prev);
      };

      const handleAmount = (e) => {
        setAmountInput(e.target.value);
       }

      const selectConsultant2 = (label,value) => {
        setCError('');
          setLabel2(label);
          setValue2(value);
          get(`Balance/ConsultantBalance/${value}`)
          .then(res => {
          
            setAmount(res);
          })
      }

      const handleExportXLSX = () => {
        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    
        XLSX.writeFile(wb, "MyExcel.xlsx");
      };

      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          setCurrentPage(1);
          setCallApi((prev) => !prev);
        }
      };

      const toggle = () => {
        setDropdownOpen((prev) => !prev);
      };

      // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };


  const closeModal = () => {
    setConsultantLabel('Select Consultant');
    setConsultantValue(0);
    setBonusTransactionLabel('Select Transaction Type');
    setBonusTransactionValue(0);
    setAgree(false);
    setInflowTransactionError('');
    setModalOpen(false);
   
  
  };

  const closeModal2 = () => {
    setLabel2('Select Consyltant');
    setValue2(0);
    setTLabel('Select Transaction Type');
    setTValue(0);
    setTError('');
    setAmount(0);
    setAmountInput('');
    setNote('');
    setReference('');
    setModal2Open(false);
    
   
  
  };
 

      const componentRef = useRef();

      useEffect(()=>{

        get(`ConsultantDD/index`)
        .then(res =>{
        setConsultant(res);
        })

        get(`TransactionTypeDD/Index`)
        .then(res => {
          setTransaction(res);
        })

        get(`TransactionStatusDD/Index`)
        .then(res => {
          setStatus(res);
        })
        
        get(`AccountTransaction/Index?page=${currentPage}&pageSize=${dataPerPage}&consultantid=${consultantValue}&typeid=${transactionValue}&transactionStatusId=${statusValue}&code=${transactionCode == ''? 'emptystring' :  transactionCode}`)
        .then(res => {
          console.log(res);
          setEntity(res?.totalEntity);
          setData(res?.models);
          setLoading(false);
        })

        get(`BonusTransactionTypeDD/Index`)
        .then(res =>{
          setBonusTransaction(res);
        })


      },[success, consultantValue, transactionValue, statusValue, transactionCode, bonusTransactionValue])

      const gotoDetailsPage  = (data) => {
         if(data?.transactionTypeId == transactionTypes?.ApplicationTransaction){
          
          window.open(`/applicationTransactiondetails/${data?.baseTransactionId
          }`,'_blank');
         }
         else if(data?.transactionTypeId == transactionTypes?.BonusTransaction){
        
          window.open(`/inFlow/details/${data?.baseTransactionId
          }`,'_blank');
         }
         else if(data?.transactionTypeId == transactionTypes?.WithDrawnTransaction){
          window.open(`/withdrawTransactiondetails/${data?.baseTransactionId
          }`,'_blank');
         }
         else if(data?.transactionTypeId == transactionTypes?.CommissionTransaction){
          window.open(`/commissionTransactiondetails/${data?.baseTransactionId
          }`,'_blank');
         }

      }

      const backToDashboard = () =>{
        history.push('/');

    }

    const consultantOptions = consultant?.map(con => ({
        label: con?.name,
        value: con?.id
    }))

    const outflowConsultantOptions = consultant?.map(con => ({
      label: con?.name,
      value: con?.id
  }))

    const selectConsultant = (label,value) => {
      setInflowConsultantError('');
        setConsultantLabel(label);
        setConsultantValue(value);
    }

    const selectOutflowConsultant = (label,value) => {
      setOutflowConsultantError('');
        setOutflowConsultantLabel(label);
        setOutflowConsultantValue(value);
    }

    const transactionOptions = transaction?.map(trn => ({
        label: trn?.name,
        value: trn?.id
    }))

    const outflowTransactionOptions = transaction?.map(trn => ({
        label: trn?.name,
        value: trn?.id
    }))

    const selectTransaction = (label,value) => {
      setInflowTransactionError('');
        setTransactionLabel(label);
        setTransactionValue(value);
    }
    const selectOutflowTransaction = (label,value) => {
      setTError('');
        setTLabel(label);
        setTValue(value);
    }

   

    const bonusTransactionOptions = bonusTransaction?.map(trn => ({
        label: trn?.name,
        value: trn?.id
    }))

    const selectBonusTransaction = (label,value) => {
      setInflowTransactionError('');
        setBonusTransactionLabel(label);
        setBonusTransactionValue(value);
    }

    const statusOptions = status?.map(st => ({
        label: st?.name,
        value: st?.id
    }))

    const selectStatus = (label,value) => {
        setStatusLabel(label);
        setStatusValue(value);
    }

    const handleReset = () => {
        setTransactionCode('');
        setConsultantLabel('Select Consultant');
        setConsultantValue(0);
        setStatusLabel('Select Status');
        setStatusValue(0);
        setTransactionLabel('Select Transaction Type')
        setTransactionValue(0);
    }

    const handleInflowSubmit = (event) => {
        event.preventDefault();
        const subData = new FormData(event.target);
        if(consultantValue == 0){
          setInflowConsultantError('Consultant Must be Selected');
        }
        else if(bonusTransactionValue == 0){
          setInflowTransactionError('Transaction Type Must be Selected');
        }
        else{
          setButtonStatus(true);
          post(`BonusTransaction/Create`,subData)
        .then(res => {
          setButtonStatus(false);
          if(res?.status == 200 && res?.data?.isSuccess == true){
            addToast(res?.data?.message,{
              appearance: 'success',
              autoDismiss: true
            })
            setSuccess(!success);
            setConsultantValue(0);
            setConsultantLabel('Select Consultant');
            setBonusTransactionValue(0);
            setBonusTransactionLabel('Select TransactionType');
            setAgree(false);
            setModalOpen(false);
          }
        })

        }
        
    }


    const submitWithdrawRequest = (event) => {
      event.preventDefault();

      const subData = {
        consultantId: value2,
        amount: amountInput,
        transactionNote: note,
        paymentTypeId: tValue,
        reference: reference
        }

        if(value2 == 0){
          setCError('Consultant is required');
        }
        else if(tValue == 0){
          setTError('Transaction type is required');
        }

        else{
            setButtonStatus(true);
          post(`WithdrawTransaction/Create`,subData)
          .then(res => {
            setButtonStatus(false);
            if(res?.status == 200 && res?.data?.isSuccess == true)
              {
                addToast(res?.data?.message,{
                  appearance:  'success',
                  autoDismiss:true
                })
                setModal2Open(false);
              setLabel2('Select Consultant');
              setValue2(0);
              setTLabel('Select Transaction Type');
              setTValue(0);
              setAmount(0);
              setAmountInput('');
              setReference('');
              setNote('');
                setSuccess(!success);
                setModal2Open(false);
                
              }
              else{
                addToast(res?.data?.message,{
                  appearance:  'error',
                  autoDismiss:true
                })
              }
          }
          )

        }


     }



    return (
        <div>
                   {
                    loading?
                    <Loader/>
                    :
                    <div>
                       {/* Outflow Modal */}
                       <Modal
                    isOpen={modal2Open}
                    toggle={closeModal2}
                    className="uapp-modal2"
                    >
                    <ModalHeader>Create Withdraw Request</ModalHeader>
                    <ModalBody>
                        <Form onSubmit = {submitWithdrawRequest}>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Select Consultant <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                                    styles={customStyles}
                                    options={consultantOptions}
                                    value={{ label: label2, value: value2 }}
                                    onChange={(opt) => selectConsultant2(opt.label, opt.value)}
                                    name='consultantId'
                                    id='consultantId'
                                    />
                                    
                            </Col>
                        </FormGroup>

                         <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Amount Available to Pay <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input type="text"  value={amount} disabled
                            required
                             />
                            </Col>
                        </FormGroup>

                         <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Amount<span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input type="number" onChange={handleAmount}  value={amountInput} placeholder='Enter Amount'
                            required
                             />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Select Payment Type <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                                    styles={customStyles}
                                    options={outflowTransactionOptions}
                                    value={{ label: tLabel, value: tValue }}
                                    onChange={(opt) => selectOutflowTransaction(opt.label, opt.value)}
                                    />
                                      <span className='text-danger'>{tError}</span>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Ref/Invoice
                            </span>
                            </Col>
                            <Col md="8">
                            <Input type="text" value={reference} onChange={(e)=> setReference(e.target.value)}  placeholder='Enter Ref/Invoice'
                            
                             />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Note
                            </span>
                            </Col>
                            <Col md="8">
                            <Input type="textarea" onChange={(e)=> setNote(e.target.value)}  value={note}  rows={2} placeholder='Enter Note'
                            
                             />
                            </Col>
                        </FormGroup>

                        <div className='d-flex justify-content-end'>
                        <FormGroup className="has-icon-left position-relative">
                         <Button
                            color="primary"
                            className="mr-1 mt-3"
                            disabled={(amountInput <50 || amountInput>amount || amountInput == isNaN(amountInput) || buttonStatus )? true : false}
                            >
                              
                            Submit
                            </Button>
                          </FormGroup>
                        </div>

                        </Form>
                    </ModalBody>
                    </Modal>

                    {/* Inflow Modal */}
                    <Modal
                    isOpen={modalOpen}
                    toggle={closeModal}
                    className="uapp-modal2"
                    >
                    <ModalHeader>Inflow Transaction</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleInflowSubmit}>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Select Consultant <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                                    styles={customStyles2}
                                    options={consultantOptions}
                                    value={{ label: consultantLabel, value: consultantValue }}
                                    onChange={(opt) => selectConsultant(opt.label, opt.value)}
                                    name='consultantId'
                                    id='consultantId'
                                    />
                                    <span className='text-danger'>{inflowConsultantError}</span>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Transaction Type <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Select
                                    styles={customStyles2}
                                    options={bonusTransactionOptions}
                                    value={{ label: bonusTransactionLabel, value: bonusTransactionValue }}
                                    onChange={(opt) => selectBonusTransaction(opt.label, opt.value)}
                                    name='transactionTypeId'
                                    id='transactionTypeId'
                                    />
                                    <span className='text-danger'>{inflowTransactionError}</span>
                                    
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Amount <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            type='number'
                            placeholder='Enter Amount'
                            required
                            name='amount'
                            id='amount'
                            />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Reference <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input
                            placeholder='Enter Reference'
                            required
                            name='reference'
                            id='reference'
                            />
                            </Col>
                        </FormGroup>
                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="4">
                            <span>
                                Note <span className="text-danger">*</span>{" "}
                            </span>
                            </Col>
                            <Col md="8">
                            <Input type="textarea" rows={2} placeholder='Enter Note'
                            required
                            name='transactionNote'
                            id='transactionNote'
                             />
                            </Col>
                        </FormGroup>
                       
                        <FormGroup row className="has-icon-left position-relative">
                            <Col md="12">
                            <span>
                                <span className='text-danger'><b>Note:</b></span> Adding any inflow will add amount directly to the withdrawal balance.
                            </span>
                            </Col>
                            
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                            
                            <Col md="12">
                              <div className='d-flex flex-wrap ml-3 pl-1'>
                                <Input
                                type='checkbox'
                                checked={agree}
                                onChange={(e)=>setAgree(e.target.checked)}
                                />
                                <span>I acknowledge and understand the process.</span>

                              </div>
                            
                            </Col>
                            
                        </FormGroup>

                        <div className='d-flex justify-content-end'>
                        <FormGroup className="has-icon-left position-relative">
                         <Button.Ripple
                            color="primary"
                            className="mr-1 mt-3"
                            disabled = {!agree || buttonStatus}
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
                <h3 className="text-white">Accounts Transaction List</h3>
                <div className="page-header-back-to-home">
                  <span className="text-white" onClick={backToDashboard}>
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card>
                <CardBody>
                    <div className='row g-2'>
                        <div className='col-md-10'>
                            <div className='row'>
                                <div className='col-md-3'>
                                {
                                    (userType !== userTypes?.Consultant) ?

                                    <>

                                    <h6 className='mb-2'>Consultant</h6>

                                    <Select
                                   
                                    options={consultantOptions}
                                    value={{ label: consultantLabel, value: consultantValue }}
                                    onChange={(opt) => selectConsultant(opt.label, opt.value)}
                                    />

                                    </>

                                    :
                                    null
                                }

                                </div>
                                <div className='col-md-3'>
                                    <h6>Transaction Type</h6>
                                <Select
                                    
                                    options={transactionOptions}
                                    value={{ label: transactionLabel, value: transactionValue }}
                                    onChange={(opt) => selectTransaction(opt.label, opt.value)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <h6>Status</h6>
                                <Select
                                
                                    
                                    options={statusOptions}
                                    value={{ label: statusLabel, value: statusValue }}
                                    onChange={(opt) => selectStatus(opt.label, opt.value)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <h6>Transaction Code</h6>
                                 <Input
                                 style={{height: '38px'}}
                                 type='text'
                                 placeholder='Enter Transaction Code'
                                 value={transactionCode}
                                 onChange={(e)=> setTransactionCode(e.target.value)}
                                 />
                                    
                                </div>
                                

                            </div>

                        </div>

                        <div className='col-md-2'>
                            
                            <div className='d-flex flex-column'>
                            <button className='mb-1 acc-tran-btn-style' onClick={()=>setModalOpen(true)}>Inflow</button>
                            <button className='mt-1 acc-tran-btn-style' onClick={()=>setModal2Open(true)}>Outflow</button>
                            </div>

                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-12 d-flex justify-content-end'>
                        <div
                        className="mt-1 mx-1 d-flex btn-clear"
                        onClick={handleReset}
                      >
                      
                        <span className="text-danger">
                          <i className="fa fa-times"></i> Clear
                        </span>
                      </div>

                        </div>

                    </div>
                </CardBody>
            </Card>

            <Card  className='uapp-employee-search'>
              <CardBody>

              <div className=" row mb-3">
            <div className='col-lg-5 col-md-5 col-sm-4 col-xs-4'>
               <span className='mr-2'><b>CB: </b>Created By.</span>
               <span className='mr-2'><b>LUO: </b>Last Updated On.</span>
               <span><b>LUB: </b>Last Updated By.</span>
            </div>

            <div className='col-lg-7 col-md-7 col-sm-8 col-xs-8'>
              <div className="d-flex justify-content-end flex-wrap">
               
                
                <div className="ml-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div>
                      <Select
                      className='mr-2'
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='mr-2'>
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen}
                    toggle={toggle}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-print fs-7"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}
                          <ReactTableConvertToXl 
                            id="test-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            icon={<i className="fas fa-file-excel"></i>}
                          />
                        </div>
                        <div className="text-white cursor-pointer">
                          <ReactToPrint
                            trigger={() => (
                              <p>
                                <i className="fas fa-file-pdf"></i>
                              </p>
                            )}
                            content={() => componentRef.current}
                          />
                        </div>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* <div className="me-3">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p>
                        </div>
                        <div className="text-white cursor-pointer">
                          <ReactToPrint
                            trigger={() => (
                              <p>
                                <i className="fas fa-file-pdf"></i>
                              </p>
                            )}
                            content={() => componentRef.current}
                          />
                        </div>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div> */}
              </div>
            </div>
          </div>

              <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                    
                    <th>SL/NO</th>
                    <th>Date</th>
                     <th>Consultant</th>
                     <th>Transaction Code/Type</th>
                     <th>Details</th>
                     <th>Inflow/Credit</th>
                     <th>Outflow/Debit</th>
                     <th>Balance</th>
                     <th>Status</th>
                     <th>Log</th>
                     <th>Action</th>
                     
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((ls, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                    
                      
                      <td>
                        {i+1}
                      </td>
                      <td>
                       {ls?.transactionDate }
                      </td>
                      <td>
                        {ls?.consultantName}
                      </td>
                      <td>
                      <b>{ls?.transactionCode}</b>
                      <br/>
                      {ls?.transactionType}
                      </td>
                      <td>
                        {ls?.details}
                      </td>
                      <td>
                        {ls?.credit}
                      </td>
                      <td>
                        {ls?.debit}
                      </td>
                      <td>
                        Total: {ls?.balance}
                        <br/>
                        ATW: {ls?.withdrawBalance}
                      </td>
                      <td>
                        {ls?.status}
                      </td>
                      <td>
                        CB: {ls?.createdBy}{' '}
                        LUO: {ls?.updatedOn}{' '}
                        LUB: {ls?.updatedBy}{' '}
                      </td>
                     
                     
                      <td  className="text-center">
                        <ButtonGroup variant="text">
                       


                            <Button className='me-1 btn-sm' color='primary' onClick={()=>gotoDetailsPage(ls)}>
                            Details
                            </Button>

                          


                        </ButtonGroup>

                      </td>
                    </tr>
                  ))}

           
                    
                    </tbody>
                    </Table>

                    <Pagination
                    dataPerPage={dataPerPage}
                    totalData={entity}
                    paginate={paginate}
                    currentPage={currentPage}
                     />
              </CardBody>
            </Card>
                    </div>
                   }
            
        </div>
    );
};

export default Index;