import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav,NavLink, NavItem, UncontrolledTooltip, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Select from 'react-select';
import { Link, useHistory } from 'react-router-dom';
import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import * as XLSX from 'xlsx/xlsx.mjs';
import ReactToPrint from 'react-to-print';
import ButtonForFunction from '../Components/ButtonForFunction';
import get from '../../../helpers/get';
import Pagination from '../Pagination/Pagination';
import { userTypes } from '../../../constants/userTypeConstant';
import post from '../../../helpers/post';
import { AddPhotoAlternateSharp } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import Assets from '../../../assets/img/UappLogo.png';
import Loader from '../Search/Loader/Loader';


const List = () => {

  const current_user = JSON.parse(localStorage.getItem('current_user'));
 
    
    const history = useHistory();
    const [serialNum, setSerialNum] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(15);
    const [callApi, setCallApi] = useState(false);
    const [entity, setEntity] = useState(0);
    const [consultant,setConsultant] = useState([]);
    const [consultantLabel,setConsultantLabel] = useState('Select Consultant');
    const [consultantValue,setConsultantValue] = useState(0);
    const [transaction,setTransaction] = useState([]);
    const [transactionLabel,setTransactionLabel] = useState('Select Transaction Status');
    const [transactionValue,setTransactionValue] = useState(0);
    const [payment,setPayment] = useState([]);
    const [paymentLabel,setPaymentLabel] = useState('Select Payment Status');
    const [paymentValue,setPaymentValue] = useState(0);
    const [transactionCode, setTransactionCode] = useState('');
    const [success, setSuccess] = useState(false);
    const [data,setData] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [currData,setCurrData] = useState({});
    const [currData2,setCurrData2] = useState({});
    const [modalTLabel,setModalTLabel] = useState('Select Transaction Status');
    const [modalTValue,setModalTValue] = useState(0);
    const [mTError, setMTerror] = useState('');
    const [mPError, setMPerror] = useState('');
    const {addToast} = useToasts();
    const [modalOpen2,setModalOpen2] = useState(false);
    const [modalPLabel,setModalPLabel] = useState('Select Payment Status');
    const [modalPValue,setModalPValue] = useState(0);
    const [buttonStatus,setButtonStatus] = useState(false);
    
    

    useEffect(()=>{

         get(`ConsultantDD/index`)
        .then(res =>{
            setConsultant(res);
        })

        get(`TransactionStatusDD/Index`)
        .then(res => {
          setTransaction(res);
        })

        get(`PaymentStatusDD/Index`)
        .then(res => {
            setPayment(res);
        })

        get(`WithdrawRequest/Index?page=${currentPage}&pagesize=${dataPerPage}&consultantid=${consultantValue}&transactionStatus=${transactionValue}&paymentStatuas=${paymentValue}&code=${transactionCode}`)
        .then(res => {
          console.log(res?.models);
          setData(res?.models);
          setEntity(res?.totalEntity);
          setLoading(false);
        })

    },[consultantValue, transactionValue, paymentValue, success, transactionCode])

    

    const backToDashboard = () =>{
        history.push('/');
    }

    const handleAddWithdrawRequest = () => {
        history.push('/createWithdrawRequest');
    }

    const closeModal = () => {
      setModalTLabel('Select Transaction Status');
      setModalTValue(0);
      setModalOpen(false);
    }

    const closeModal2 = () => {
      setModalPLabel('Select Payment Status');
      setModalPValue(0);
      setModalOpen2(false);
    }

    const consultantOptions = consultant?.map(con => ({
        label: con?.name,
        value: con?.id
    }))

    const selectConsultant = (label,value) => {
        setConsultantLabel(label);
        setConsultantValue(value);
    }

    const transactionOptions = transaction?.map(st => ({
        label: st?.name,
        value: st?.id
    }))

    const selectTransaction = (label,value) => {
        setTransactionLabel(label);
        setTransactionValue(value);
    }

    const selectTransaction2 = (label,value) => {
      setMTerror('');
        setModalTLabel(label);
        setModalTValue(value);
    }

    const handleUpdate = (data) => {
      setCurrData(data);
      setModalTLabel(data?.transactionStatus);
      setModalTValue(data?.transactionStatusId);
      setModalOpen(true);
    }


    const handleUpdate2 = (data) => {
      setCurrData2(data);
      setModalPLabel(data?.paymentStatus);
      setModalPValue(data?.paymentStatusId);
      setModalOpen2(true);
    }

    const paymentOptions = payment?.map(st => ({
        label: st?.name,
        value: st?.id
    }))

    const selectPayment = (label,value) => {
        setPaymentLabel(label);
        setPaymentValue(value);
    }

    const selectPayment2 = (label,value) => {
        setModalPLabel(label);
        setModalPValue(value);
    }

     // user select data per page
     const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
     const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));
 
     const selectDataSize = (value) => {
       
       setDataPerPage(value);
       setCallApi((prev) => !prev);
     };

      // toggle dropdown
      const toggle = () => {
        setDropdownOpen((prev) => !prev);
      };

      //  change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCallApi((prev) => !prev);
      };
      
       // search handler
       const handleSearch = () => {
         setCurrentPage(1);
         setCallApi((prev) => !prev);
       };

       const handleExportXLSX = () => {
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    
        XLSX.writeFile(wb, "MyExcel.xlsx");
      };

    const componentRef = useRef();
    const componentRef2 = useRef();

    const handleClear = () => {
        setConsultantLabel('Select Consultant');
        setConsultantValue(0);
        setTransactionLabel('Select Transaction Status');
        setTransactionValue(0);
        setPaymentLabel('Select Payment Status');
        setPaymentValue(0);
        setTransactionCode('');
        
    }

    const handleTransactionStatusChange = (event) => {
      event.preventDefault(); 
      

      if(modalTValue == 0){
        setMTerror('Transaction status is required');
      }
      else{
        setButtonStatus(true);
        get(`WithdrawRequest/TransactionStatus/${currData?.id}/${modalTValue}`)
        .then(res => {
          setButtonStatus(false);
          if(res == true){
            addToast('Status changed successfully',{
              appearance:'success',
              autoDismiss: true
            })
            closeModal();
            setCurrData({});
            setSuccess(!success);
          }
          else{
            addToast('Something went wrong',{
              appearance:'error',
              autoDismiss: true
            })
          }
        })

      }

    }


    const handlePaymentStatusChange = (event) => {
      event.preventDefault(); 
      

      if(modalPValue == 0){
        setMPerror('Transaction status is required');
      }
      else{
        setButtonStatus(true);
        get(`WithdrawRequest/PaymentStatus/${currData2?.id}/${modalPValue}`)
        .then(res => {
          setButtonStatus(false);
          if(res == true){
            addToast('Status changed successfully',{
              appearance:'success',
              autoDismiss: true
            })
            closeModal2();
            setCurrData2({});
            setSuccess(!success);
          }
          else{
            addToast('Something went wrong',{
              appearance:'error',
              autoDismiss: true
            })
          }
        })

      }

    }
    


    return (
        <div>

          {
            loading? 
            <Loader/>
            :
            <>
            {/* Update withdraw request status modal selected Transaction Status  */}

          <Modal
                    isOpen={modalOpen}
                    toggle={closeModal}
                    className="uapp-modal2"
                    >
                    <ModalHeader>Update Withdraw Request Status</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={handleTransactionStatusChange}>

                      <input
                      type='hidden'
                      
                      value={currData?.id}
                      />



                  <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                  <span>
                      Amount Available To Pay {' '} <span className='text-danger'>*</span>
                  </span>
                  </Col>
                  <Col md="8">
                  <Select
                                    
                    options={transactionOptions}
                     value={{ label: modalTLabel, value: modalTValue }}
                      onChange={(opt) => selectTransaction2(opt.label, opt.value)}
                      
                    />
                  </Col>
              </FormGroup>
              

              <span className='text-danger'><b>Note:</b></span>
              <span className='ml-1'>By authorizing transaction, account officer will be able to make payment</span>

              <div className='d-flex justify-content-between mt-3'>

                <Button color='danger' onClick={closeModal}>
                  Cancel
                </Button>

                <Button color='primary'>
                  Update
                </Button>

              </div>





              </Form>
                    </ModalBody>
                    </Modal>

                    {/* 2md modal to update */}

                    <Modal
                    isOpen={modalOpen2}
                    toggle={closeModal2}
                    className="uapp-modal2"
                    >
                    <ModalHeader>Update Payment Status</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={handlePaymentStatusChange}>

                      <input
                      type='hidden'
                      
                      value={currData2?.id}
                      />



                  <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                  <span>
                      Amount Available To Pay {' '} <span className='text-danger'>*</span>
                  </span>
                  </Col>
                  <Col md="8">
                  <Select
                                    
                    options={paymentOptions}
                     value={{ label: modalPLabel, value: modalPValue }}
                      onChange={(opt) => selectPayment2(opt.label, opt.value)}
                      
                    />
                  </Col>
              </FormGroup>
              

              <span className='text-danger'><b>Note:</b></span>
              <span className='ml-1'>Make sure that the withdraw request is paid or rejected</span>

              <div className='d-flex justify-content-between mt-3'>

                <Button color='danger' onClick={closeModal2}>
                  Cancel
                </Button>

                <Button color='primary' type='submit'>
                  Update
                </Button>

              </div>





              </Form>
                    </ModalBody>
                    </Modal>


            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Withdraw Request List</h3>
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
                    <div className='row'>
                        <div className='col-md-3'>
                        
                        <Select
                                options={consultantOptions}
                                
                                value={{ label: consultantLabel, value: consultantValue }}
                                onChange={(opt) => selectConsultant(opt.label, opt.value)}
                                />

                        </div>

                        <div className='col-md-3'>
                        <Select
                                    
                                    options={transactionOptions}
                                    value={{ label: transactionLabel, value: transactionValue }}
                                    onChange={(opt) => selectTransaction(opt.label, opt.value)}
                                    />

                        </div>

                        <div className='col-md-3'>
                        <Select
                                   
                        options={paymentOptions}
                         value={{ label: paymentLabel, value: paymentValue }}
                        onChange={(opt) => selectPayment(opt.label, opt.value)}
                        />

                        </div>

                        <div className='col-md-3'>
                            <Input
                            style={{height: '38px'}}
                            type='text'
                            name=''
                            id=''
                            placeholder='Enter Transaction Code'
                            value={transactionCode}
                            onChange={(e)=> setTransactionCode(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='d-flex justify-content-end btn-clear'>
                            <span className="text-danger" onClick={handleClear}>
                            <i className="fa fa-times"></i> Clear
                            </span>

                            </div>

                        </div>

                    </div>
                </CardBody>
            </Card>

            <Card className='uapp-employee-search'>
                <CardBody>

                <div className=" row mb-3">
            <div className='col-lg-5 col-md-5 col-sm-4 col-xs-4'>

                <Button color='primary' onClick={handleAddWithdrawRequest}>
                <i className="fas fa-plus"></i>
                    <span> Add New Withdraw Request</span>

                </Button>
              
            </div>

            <div className='col-lg-7 col-md-7 col-sm-8 col-xs-8'>
              <div className="d-flex justify-content-end flex-wrap">
               
                
                <div className="me-3">
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

                <div className="mr-2">
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

                <div className="me-3">
              
                </div>
              </div>
            </div>
          </div>

                <div className='table-responsive' ref={componentRef}>
                <Table id="table-to-xls" className="table-sm table-bordered" >
                    <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                    
                    <th>SL/NO</th>
                     <th>Request Date</th>
                     <th>Consultant Name</th>
                     <th>Transaction Code</th>
                     <th>Amount</th>
                     <th>Payment Type</th>
                     <th>Payment Date</th>
                     <th>Status</th>
                     <th>Payment Status</th>
                     <th>Invoice</th>
                     </tr>
                     </thead>
                     <tbody>
                    {data?.map((ls, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                    
                      <td>
                        {i+1}
                      </td>
                      <td>
                        {ls?.transactionDate}
                      </td>
                      <td>
                        {ls?.consultantName}
                      </td>
                      <td>
                        {ls?.transactionCode}
                      </td>
                      <td>{ls?.amount}</td>
                      <td>{ls?.paymentType}</td>
                      <td></td>
                      <td>{ls?.transactionStatus}
                      {
                        (!(ls?.paymentStatusId == 2) && current_user?.userTypeId == userTypes?.SystemAdmin) && 
                        <Button color='warning' className='ml-2 btn-sm' onClick={()=>handleUpdate(ls)} disabled={buttonStatus}>
                          <i className='fas fa-edit'></i>

                        </Button>
                      }
                      </td>
                      <td>{ls?.paymentStatus}
                      {
                        (ls?.transactionStatusId ==2 && !(ls?.paymentStatusId ==2) && current_user?.userTypeId == userTypes?.SystemAdmin) && 
                        <Button color='warning' className='ml-2 btn-sm' onClick={()=>handleUpdate2(ls)}disabled={buttonStatus}>
                          <i className='fas fa-edit'></i>

                        </Button>
                      }
                      </td>
                    
                      <td  className="text-center">
                        {/* {
                          ls?.paymentStatusId == 2 && */}
                          <ButtonGroup variant="text">
                          <ReactToPrint
        trigger={() =>     <Button className='me-1 btn-sm' color='primary'>
        Download
        </Button>}
        content={() => componentRef2.current}
      />
                      
                          </ButtonGroup>
                        {/* } */}
                        
                      </td>
                      </tr>
                  ))}
                    </tbody>
                    </Table>
                </div>

                    <Pagination
                    dataPerPage={dataPerPage}
                    totalData={entity}
                    paginate={paginate}
                    currentPage={currentPage}
                    />

                </CardBody>
            </Card>

            <div style={{display: 'none'}}>
              <div ref={componentRef2}>

                <div className='d-flex justify-content-between'>

                  <div>
                    <img height={100} src={Assets} />
                  </div>

                </div>
              </div>

            </div>


            </>
          }
            
        </div>
    );
};

export default List;