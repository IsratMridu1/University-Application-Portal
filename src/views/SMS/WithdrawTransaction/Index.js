import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav,NavLink, NavItem, UncontrolledTooltip, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from 'react-to-print';
import Select from 'react-select';
import get from '../../../helpers/get';
import Pagination from '../Pagination/Pagination';
import Loader from '../Search/Loader/Loader';
import { useHistory } from 'react-router-dom';
import ButtonForFunction from '../Components/ButtonForFunction';

import { useToasts } from 'react-toast-notifications';
import post from '../../../helpers/post';
import remove from '../../../helpers/remove';

const Index = () => {

  const [listData, setListData] = useState([]);

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
    

    const [label1,setLabel1] = useState('Select Consultant');
    const [label2,setLabel2] = useState('Select Consultant');
    const [consultant,setCounsultant] = useState([]);
    const [value1,setValue1] = useState(0);
    const [value2,setValue2] = useState(0);
    const [transactionCode, setTransactionCode] = useState('');
    const [success,setSuccess]= useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const history = useHistory();
    const [modal2Open,setModal2Open] = useState(false);
    const [amount,setAmount]  = useState(0);
    const [amountInput,setAmountInput] = useState('');
    const [transaction,setTransaction] = useState([]);
    const [tLabel,setTLabel] = useState('Select Transaction Type');
    const [tValue, setTValue] = useState(0);
    const [reference,setReference] = useState('');
    const [deleteModal,setDeleteModal] = useState(false);
    const [delData,setDelData] = useState({});
    const [buttonStatus,setButtonStatus] = useState(false);
   
   

   

    useEffect(()=>{

      get(`WithdrawTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&consultantid=${value1}&code=${transactionCode}`)
      .then(res => {
        console.log('data', res);
        setListData(res?.models);
        setEntity(res?.totalEntity)
        setLoading(false);
      })

      get(`ConsultantDD/index`)
      .then(res =>{
          setCounsultant(res);
      })

      get(`TransactionTypeDD/Index`)
        .then(res => {
          setTransaction(res);
        })

    },[value1,  success, transactionCode])

    const closeModal = () => {
      setModalOpen(false);
     
    
    };

    const toggleDanger = (data) => {

      setDelData(data);
      setDeleteModal(true);
    }

    const handleDeleteData = () => {
      setButtonStatus(true);
      remove(`WithdrawTransaction/Delete/${delData?.id}`)
      .then(res=> {
        setButtonStatus(false);
        addToast(res,{
          appearance: 'error',
          autoDismiss: true
        })
        setSuccess(!success);
        setDelData({});
        setDeleteModal(false);
      })

    }

    const backToDashboard = () => {
      history.pushState('/');
    }

    const consultantOptions = consultant?.map(con => ({
      label: con?.name,
      value: con?.id
  }))

    const transactionOptions = transaction?.map(con => ({
      label: con?.name,
      value: con?.id
  }))

  const selectConsultant1 = (label,value) => {
      setLabel1(label);
      setValue1(value);
  }
  const selectTransaction = (label,value) => {
    setTError('');
      setTLabel(label);
      setTValue(value);
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
   const [loading,setLoading] = useState(true);
   const {addToast} = useToasts();
   const [note,setNote] = useState('');
   const [cError,setCError] = useState('');
   const [tError, setTError] = useState('');

   const selectDataSize = (value) => {
     
     setDataPerPage(value);
     setCallApi((prev) => !prev);
   };

   const handleAmount = (e) => {
    setAmountInput(e.target.value);
   }

     // search handler
     const handleSearch = () => {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    };

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      setCallApi((prev) => !prev);
    };

    const handleReset = () => {
      setLabel1('Select Consultant');
      setValue1(0);
      setTransactionCode('');
  }

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

    const handleExportXLSX = () => {
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(listData);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
  
      XLSX.writeFile(wb, "MyExcel.xlsx");
    };

    const componentRef = useRef();
 
     const handleClear = () => {
         setLabel1('Select Consultant');
         setValue1(0);
        
         setTransactionCode('');
         
     }

     const closeModal2 = () => {
      setModal2Open(false);
      setLabel2('Select Consultant');
      setValue2(0);
      setTLabel('Select Transaction Type');
      setTValue(0);
      setAmount(0);
      setAmountInput('');
      setNote('');
      setReference('');

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
              setAmountInput(0);
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
               <Modal
                    isOpen={modalOpen}
                    toggle={closeModal}
                    className="uapp-modal2"
                    >
                    <ModalHeader>Withdraw Transaction</ModalHeader>
                    <ModalBody>
                    <Form >





              <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                  <span>
                      Amount Available To Pay
                  </span>
                  </Col>
                  <Col md="8">
                  <Input
                  
                  value={50}
                  disabled={true}
                  />
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


              <div className='d-flex justify-content-end'>
             
               

              <Button
                  color="primary"
                  className="mr-1 mt-3"
                  disabled={buttonStatus}
                  
                  >
                  Submit
                  </Button>
                
              </div>

              </Form>
                    </ModalBody>
                    </Modal>

                    {/* create new withdraw transaction */}
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
                                    options={transactionOptions}
                                    value={{ label: tLabel, value: tValue }}
                                    onChange={(opt) => selectTransaction(opt.label, opt.value)}
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
                            disabled={(amountInput <50 || amountInput>amount || amountInput == isNaN(amountInput) || buttonStatus)? true : false}
                            >
                              
                            Submit
                            </Button>
                          </FormGroup>
                        </div>

                        </Form>
                    </ModalBody>
                    </Modal>

                    <Card className="uapp-card-bg">
                <CardHeader className="page-header">
                  <h3 className="text-white">Withdraw Transaction List</h3>
                  <div className="page-header-back-to-home">
                    <span onClick={backToDashboard} className="text-white">
                      {" "}
                      <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                    </span>
                  </div>
                </CardHeader>
            </Card>


            <Card>
                <CardBody>
               <div className='row'>
                <div className='col-md-6'>
                <Select
                styles={customStyles}
                options={consultantOptions}
                                
                value={{ label: label1, value: value1 }}
                onChange={(opt) => selectConsultant1(opt.label, opt.value)}
                    />

                </div>

                <div className='col-md-6'>
                  <Input
                  styles={{height: '40px'}}
                  type='text'
                  placeholder='Enter Transaction Code'
                  value={transactionCode}
                  onChange={(e)=> setTransactionCode(e.target.value)}
                  />
                

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

            <Card className='uapp-employee-search'>
                <CardBody>

          
           

                <div className=" row mb-3">
            <div className='col-lg-5 col-md-5 col-sm-4 col-xs-4'>

            <ButtonForFunction className ={"btn btn-uapp-add "}
                 icon ={<i className="fas fa-plus"></i>}
                 func={()=> setModal2Open(true)} 
                 name={' Add New Withdatw Transaction'}
                 
                 ></ButtonForFunction>

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
                    <th>Transaction Date</th>
                    <th>Consultant Name</th>
                    <th>Transaction Code</th>
                    <th>Amount</th>
                    <th>Reference/Invoice No.</th>
                    <th>Payment Type</th>
                    <th>Action</th>
                   
                 
                  </tr>
                </thead>
                <tbody>
                {listData?.map((ls, i) => (
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
                      <td>{ls?.reference}</td>
                      <td>{ls?.paymentType}</td>
                    
                     
                     
                     
                      <td style={{ width: "15%" }} className="text-center">
                        <ButtonGroup variant="text">
                       

                           {
                             (ls?.canDelete) && 
                             <Button className='ml-1' color='danger' onClick={()=>toggleDanger(ls)}>
                             <i className="fas fa-trash-alt"></i>
                             </Button>
                           }

                            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                        <ModalBody>
                          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                        </ModalBody>
        
                        <ModalFooter>
                          <Button  color="danger" onClick={handleDeleteData} buttonStatus>YES</Button>
                          <Button onClick={() => setDeleteModal(false)}>NO</Button>
                        </ModalFooter>
                     </Modal>

                          


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