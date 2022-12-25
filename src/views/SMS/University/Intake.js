import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import get from "../../../helpers/get";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import remove from '../../../helpers/remove';
import { useToasts } from 'react-toast-notifications';

import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import * as XLSX from 'xlsx/xlsx.mjs';
import ReactToPrint from 'react-to-print';
import ButtonForFunction from '../Components/ButtonForFunction';
import LinkButton from '../Components/LinkButton';
import { permissionList } from '../../../constants/AuthorizationConstant';
import Loader from '../Search/Loader/Loader';
import CustomButtonRipple from "../Components/CustomButtonRipple";
import post from "../../../helpers/post";


const Intake = () => {
  const [intakeList, setIntakeList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [dataPerPage, setDataPerPage] = useState(15);
  // const [searchStr, setSearchStr] = useState("");
  const [serialNum, setSerialNum] = useState(1);
  const [entity, setEntity] = useState(0);
  // const [callApi, setCallApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [intakeId, setIntakeId] = useState(0);
  const [intakeName, setIntakeName] = useState("");
  const [month,setMonth] = useState([]);
  const [year,setYear] = useState([]);
  const [smTitle,setsmTitle] = useState('Select Month');
  const [emTitle,setemTitle] = useState('Select Month');
  const [syTitle,setsyTitle] = useState('Select Year');
  const [eyTitle,seteyTitle] = useState('Select Year');
  const [syValue,setsyValue] = useState(0);
  const [eyValue,seteyValue] = useState(0);
  const [smValue,setsmValue] = useState(0);
  const [emValue,setemValue] = useState(0);
  const [smError,setsmError] = useState('');
  const [emError,setemError] = useState('');
  const [syError,setsyError] = useState('');
  const [eyError,seteyError] = useState('');


  // for hide/unhide table column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const history = useHistory();
  const { addToast } = useToasts();
  const [modalOpen,setModalopen] = useState(false);

  const handleAddNewButton = () => {
    history.push("/addNewIntakes");
  };

  // useEffect(()=>{
  //     get(
  //         `Intake/GetPaginated?page=${currentPage}&pageSize${dataPerPage}&search=${searchStr}`
  //       ).then((res) => {
  //           setIntakeList(res?.models);
  //           setSerialNum(res?.firstSerialNumber);
  //           setEntity(res?.totalEntity);
  //           setLoading(false);
  //       });
  // },[])

  useEffect(() => {
    get(`Intake/Index`).then((res) => {
      console.log("checkng intake list", res);
      setIntakeList(res);
      setEntity(res?.totalEntity);
      setLoading(false);
    });

    get('MonthDD/Index').then(res=> {
      setMonth(res);
    })
    .catch();

    get('YearDD/Index').then(res=> {
        setYear(res);
      })
  }, [success]);

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  const monthMenu = month.map(monthOptions =>({label:monthOptions.name, value:monthOptions.id}));
      const yearMenu = year.map(yearOptions =>({label:yearOptions.name, value:yearOptions.id}));

      
    const selectSMonthType = (label, value) => {
      setsmError('');
        setsmTitle(label);
        setsmValue(value); 
      }
    const selectEMonthType = (label, value) => {
      setemError('');
        setemTitle(label);
        setemValue(value); 
      }

      const selectSYearType = (label, value) => {
        setsyError('');
        setsyTitle(label);
        setsyValue(value); 
      }

      const selectEYearType = (label, value) => {
        seteyError('');
        seteyTitle(label);
        seteyValue(value); 
      }

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const toggleDanger = (name, id) => {
    //  localStorage.setItem('intakeName',name)
    //  localStorage.setItem('intakeId',id)
    setIntakeName(name);
    setIntakeId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setIntakeName("");
    setIntakeId(0);
  };

  const closeOpenModal = () => {
    setModalopen(false);
    setsmTitle('Select Month')
    setemTitle('Select Month')
    setsmValue(0);
    setemValue(0);
    setsyTitle('Select Year');
    setsyValue(0);
    seteyTitle('Select Year');
    seteyValue(0);
  }

 

  const handleDelete = (id) => {
    const returnValue = remove(`Intake/Delete/${id}`).then((action) => {
      console.log(action, "kdkfjdfhdhdjhfd");
      setSuccess(!success);
      setDeleteModal(false);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setIntakeName("");
      setIntakeId(0);
    });
  };

  const handleGenerateIntake = () => {
    setModalopen(true);
  }

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(intakeList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const redirecttoUpdateIntake = (id) => {
    history.push(`/updateIntake/${id}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if(smValue == 0){
      setsmError('Month is required');
    }
    else if(emValue == 0){
      setemError('Month is required');
    }
    else if(syValue == 0){
      setsyError('Year is required')
    }
    else if( eyValue == 0){
      seteyError('Year is required');
    }

    else{
      post(`Intake/Generate`,subData)
      .then(res => {
        if(res?.status ==200 && res?.data?.isSuccess == true){
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          })
          setSuccess(!success);
          closeOpenModal();
          
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
      {
        loading ? 
        <Loader/>
        :
        <>
         <Modal
                            isOpen={modalOpen}
                            toggle={closeOpenModal}
                            className="uapp-modal2"
                          >
                            <ModalHeader>Generate Intake</ModalHeader>
                            <ModalBody>
                            <Form onSubmit={submitForm}>
                    <FormGroup row>
                        <Col md="4">
                            <span>
                               <span >Start Month</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="6">
                        <Select
                            options={monthMenu}
                            value={{ label: smTitle, value: smValue }}
                            onChange={(opt) => selectSMonthType(opt.label, opt.value)}
                            name="startMonthId"
                            id="startMonthId"
                        />
                        
                           <span className='text-danger'>{smError}</span>
                        
                        </Col>

                        <Col md="4">

                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md="4">
                            <span>
                               <span >End Month</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="6">
                        <Select
                            options={monthMenu}
                            value={{ label: emTitle, value: emValue }}
                            onChange={(opt) => selectEMonthType(opt.label, opt.value)}
                            name="endMonthId"
                            id="endMonthId"
                        />
                        
                           <span className='text-danger'>{emError}</span>
                        
                        </Col>

                        <Col md="4">

                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-3'>
                        <Col md="4">
                            <span>
                               <span >Start Year</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="6">
                        <Select
                            options={yearMenu}
                            value={{ label: syTitle, value: syValue }}
                            onChange={(opt) => selectSYearType(opt.label, opt.value)}
                            name="startYearId"
                            id="startYearId"
                        />
                        
                           <span className='text-danger'>{syError}</span>
                        


                          
                        </Col>

                       
                    </FormGroup>

                    <FormGroup row className='mt-3'>
                        <Col md="4">
                            <span>
                               <span >End Year</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="6">
                        <Select
                            options={yearMenu}
                            value={{ label: eyTitle, value: eyValue }}
                            onChange={(opt) => selectEYearType(opt.label, opt.value)}
                            name="endYearId"
                            id="endYearId"
                        />
                        
                           <span className='text-danger'>{eyError}</span>
                        


                          
                        </Col>

                       
                    </FormGroup>

                    <FormGroup row>

                    <Col md="10" className="d-flex justify-content-end align-items-end">
                            <div>

                            <Button
                                  onClick={closeOpenModal}
                                  className='mt-md-3 mr-1'
                                  color='danger'                                 
                                
                                >
                                  Cancel
                                  </Button>

                                <ButtonForFunction
                                 type={'submit'}
                                  className={'mt-md-3 ml-1'}
                                  color={'primary'}
                                  name={"Submit"}
                                  permission={6}
                                />

                               

                            </div>
                        </Col>
                    </FormGroup>

                    
                </Form>
                            </ModalBody>

                           
                          </Modal>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Intake List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="6" md="5" sm="6" xs="4">
              {permissions?.includes(permissionList?.Add_subject_intake) ? (
                <ButtonForFunction
                  func={handleAddNewButton}
                  className={"btn btn-uapp-add mr-1"}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add New Intake"}
                />
              ) : null}

                  <ButtonForFunction
                  func={handleGenerateIntake}
                  className={"btn btn-uapp-add ml-1"}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Generate Intake"}
                />

            </Col>

            <Col lg="6" md="7" sm="6" xs="8">
              <div className="d-md-flex justify-content-end">
                <div className="mr-3">
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

                {/* column hide unhide starts here */}

                <div className="">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd-2">
                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">SL/NO</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id=""
                              name="isAcceptHome"
                              onChange={(e) => {
                                handleCheckedSLNO(e);
                              }}
                              defaultChecked={checkSlNo}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Name</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedName(e);
                              }}
                              defaultChecked={checkName}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Action</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAction(e);
                              }}
                              defaultChecked={checkAction}
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkSlNo ? <th>SL/NO</th> : null}
                    {checkName ? <th>Name</th> : null}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {intakeList?.map((intake, i) => (
                    <tr key={intake.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{serialNum + i}</th> : null}

                      {checkName ? <td>{intake?.name}</td> : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            <ButtonForFunction
                              func={() => redirecttoUpdateIntake(intake?.id)}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            />

                            {/* <LinkButton
                              url={`/updateIntake/${intake?.id}`}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            /> */}

                            <ButtonForFunction
                              func={() =>
                                toggleDanger(intake?.name, intake?.id)
                              }
                              color={"danger"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                          </ButtonGroup>

                          {/* modal for delete */}
                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this <b>{intakeName}</b>{" "}
                                ? Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              {/* onClick={()=>handleDelete(sub?.id)} */}
                              <Button
                                color="danger"
                                onClick={() => handleDelete(intakeId)}
                              >
                                YES
                              </Button>
                              <Button onClick={closeDeleteModal}>NO</Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <div className="d-flex justify-content-end mt-3">
            <h5>Total Results Found: {intakeList.length}</h5>
          </div>
        </CardBody>
      </Card>
        </>
      }
    </div>
  );
};

export default Intake;
