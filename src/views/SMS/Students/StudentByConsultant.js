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
  Input,
  FormGroup,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import get from "../../../helpers/get";
import remove from "../../../helpers/remove.js";
import ButtonForFunction from "../Components/ButtonForFunction";
import LinkButton from "../Components/LinkButton.js";

import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import put from "../../../helpers/put.js";

const StudentByConsultant = () => {
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData,setDelData] = useState({});

  const [passModal, setPassModal] = useState(false);
  const[passData,setPassData] = useState({});
  const [passError,setPassError] = useState('');
  const [pass, setPass] = useState('');
  const [cPass,setCPass] = useState('');
  const [error,setError] = useState('');

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkId, setCheckId] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkCons, setCheckCons] = useState(true);
  const [checkDate, setCheckDate] = useState(true);
  const [checkPass, setCheckPass] = useState(true);
  const [checkBlackList, setCheckBlacklist] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus,setButtonStatus] = useState(false);
  

  const history = useHistory();
  const {id} = useParams();
  const { addToast } = useToasts();

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/consultantList");
  };

  useEffect(()=>{
    get(`Student/GetByConsultant?page=${currentPage}&pageSize=${dataPerPage}&id=${id}`).then(res=>{
        setStudentList(res?.models);
        setEntity(res?.totalEntity);
        setSerialNum(res?.firstSerialNumber);
        console.log(res?.models);
        setLoading(false);
    })
  }, [id,currentPage,dataPerPage,callApi,entity,loading,success])

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(studentList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const handleEdit = (data) => {
    history.push(`/addStudentApplicationInformation/${data?.id}/${1}`);
  }

  const toggleDanger = (data) => {
    setDelData(data)
    setDeleteModal(true);
  }

  const passValidate = (e) => {
    setPass(e.target.value);
    
  }

  const verifyPass = (e) => {
        
    setPassError('');
  }

  const handleToggle = () => {
    setPassError('');
    setError('');
    setPassModal(!passModal);
  }

  const confirmPassword = (e) => {
    setCPass(e.target.value);
 
}

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append('studentId', passData?.id);
    subData.append('password', pass);
    if(pass.length < 6){
      setError('Password length can not be less than six digits');
    }
    else if(pass !== cPass){
      setPassError('Passwords do not match');
    }
    else{
      put(`Password/Change`,subData)
      .then(res => {
        if(res?.status ==200 && res.data?.isSuccess == true){
          addToast(res?.data?.message,{
            appearance:'success',
            autoDismiss: true
          })
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
        }
        else{
          addToast(res?.data?.message,{
            appearance:'error',
            autoDismiss: true
          })
          setSuccess(!success);
          
          
        }
      })

    }

  
  }

  const handleBlacklist = (e, id) => {
    console.log(e.target.checked, id);
    // setChecked(e.target.checked);
    // console.log(check);

    const subData = {
      id: id
    }

    put(`Student/UpdateAccountStatus/${id}`, subData)
    .then(res => {
      if(res?.status ==200){
        addToast(res?.data?.message,{
          appearance:'success',
          autoDismiss: true
        })
        setSuccess(!success);
        // setPassData({});
        // setPassModal(false);
      }
    })
  }

  const handleDeleteData = (data) => {
    setButtonStatus(true);
    remove(`Student/Delete/${delData?.id}`)
    .then(res => {
      setButtonStatus(false);
      console.log(res);
      addToast(res,{
        appearance: 'error',
        autoDismiss: true
      })
      setDeleteModal(false);
      setSuccess(!success);
    })
    
  }

  const handlePass = (data) => {
    setPassData(data);
    console.log(data);
    setPassModal(true);
  }

  const componentRef = useRef();

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

   //  change page
   const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const redirectToStudentProfile = studentId => {
    history.push(`/studentProfile/${studentId}`);
  }

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedId = (e) => {
    setCheckId(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedEmail = (e) => {
    setCheckEmail(e.target.checked);
  };
  const handleCheckedPhn = (e) => {
    setCheckPhn(e.target.checked);
  };
  const handleCheckedCons = (e) => {
    setCheckCons(e.target.checked);
  };
  const handleCheckedDate = (e) => {
    setCheckDate(e.target.checked);
  };
  const handleCheckedPass = (e) => {
    setCheckPass(e.target.checked);
  };
  const handleCheckedBlackList = (e) => {
    setCheckBlacklist(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Student List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Consultant List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          

          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="4" xs="4">
           
            </Col>

            <Col lg="7" md="7" sm="8" xs="8">
              <div className="d-md-flex justify-content-end">

                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div>
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>

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

                          {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                            /> */}

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
                    <DropdownMenu className="bg-dd-1">
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
                          <p className="">UAPP Id</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedId(e);
                              }}
                              defaultChecked={checkId}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Full Name</p>
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
                          <p className="">Email</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedEmail(e);
                              }}
                              defaultChecked={checkEmail}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Phone No</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedPhn(e);
                              }}
                              defaultChecked={checkPhn}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Consultant</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedCons(e);
                              }}
                              defaultChecked={checkCons}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">UAPP Reg Date</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedDate(e);
                              }}
                              defaultChecked={checkDate}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Password</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedPass(e);
                              }}
                              defaultChecked={checkPass}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Black List</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedBlackList(e);
                              }}
                              defaultChecked={checkBlackList}
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
            <div className="table-responsive mb-3" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                  {checkSlNo ? <th>SL/NO</th> : null}
                    {checkId ? <th>UAPP Id</th> : null}
                    {checkName ? <th>Full Name</th> : null}
                    {checkEmail ? <th>Email</th> : null}
                    {checkPhn ? <th>Phone No</th> : null}
                    {checkCons ? <th>Consultant</th> : null}
                    {checkDate ? <th>UAPP Reg Date</th> : null}
                    {
                      checkPass ? <th>Password</th> : null
                    }
                    {checkBlackList ? <th>Black List</th> : null}

                    {/* <th>Intakes</th> */}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {studentList?.map((student, i) => (
                    <tr key={student.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{serialNum + i}</th> : null}
                      {checkId ? <td>{student?.studentViewId}</td> : null}

                      {checkName ? (
                        <td>
                          {student?.nameTittle?.name} {student?.firstName}{" "}
                          {student?.lastName}
                        </td>
                      ) : null}

                      {checkEmail ? <td>{student?.email}</td> : null}

                      {checkPhn ? <td>{student?.phoneNumber}</td> : null}

                      {checkCons ? (
                        <td>
                          {student?.consultant?.firstName}{" "}
                          {student?.consultant?.lastName}
                        </td>
                      ) : null}

                      {checkDate ? (
                        <td>{handleDate(student?.createdOn)}</td>
                      ) : null}

                      
                          {checkPass ? (
                            <td>
                              <Link
                                to="/studentList"
                                onClick={() => handlePass(student)}
                              >
                                Change
                              </Link>
                              <Modal
                                isOpen={passModal}
                                toggle={() => handleToggle}
                                className="uapp-modal2"
                              >
                                <ModalHeader>
                                  <div className="text-center mt-3">
                                    <span>
                                      Change password for {passData?.firstName}{" "}
                                      {passData?.lastName} (
                                      {passData?.studentViewId}){" "}
                                    </span>
                                  </div>
                                </ModalHeader>
                                <ModalBody>
                                  <form
                                    onSubmit={submitModalForm}
                                    className="mt-3"
                                  >
                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          Password{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Input
                                          type="password"
                                          onBlur={passValidate}
                                          onChange={() => setError("")}
                                        />
                                        <span className="text-danger">
                                          {error}
                                        </span>
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          Confirm Password{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Input
                                          type="password"
                                          onChange={verifyPass}
                                          onBlur={confirmPassword}
                                        />

                                        <br />
                                        {
                                          <span className="text-danger">
                                            {passError}
                                          </span>
                                        }
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="12">
                                        <div className="d-flex justify-content-between">
                                          <Button
                                            color="danger"
                                            onClick={() => setPassModal(false)}
                                          >
                                            Cancel
                                          </Button>
                                          <Button color="primary" type="submit">
                                            Submit
                                          </Button>
                                        </div>
                                      </Col>
                                    </FormGroup>
                                  </form>
                                </ModalBody>
                              </Modal>
                            </td>
                          ) : null}
                        

                      {checkBlackList ? (
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              defaultChecked={
                                student?.blacklisted == null
                                  ? false
                                  : student?.blacklisted == false
                                  ? false
                                  : true
                              }
                              onChange={(e) => {
                                handleBlacklist(e, student?.id);
                              }}
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            <ButtonForFunction
                              icon={<i className="fas fa-eye"></i>}
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              func={() => redirectToStudentProfile(student?.id)}
                            />

                            {/* <LinkButton
                        url={`/studentProfile/${student?.id}`}
                        color="primary"
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-eye"></i>}

                        /> */}

                            <ButtonForFunction
                              icon={<i className="fas fa-edit"></i>}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              func={() => handleEdit(student)}
                            />

                            {/* <Button onClick={() => toggleDanger(student?.name, student?.id)} color="danger" className="mx-1 btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </Button> */}

                            <ButtonForFunction
                              icon={<i className="fas fa-trash-alt"></i>}
                              color={"danger"}
                              className={"mx-1 btn-sm"}
                              func={() => toggleDanger(student)}
                            />
                          </ButtonGroup>

                          <Modal
                            isOpen={deleteModal}
                            toggle={() => setDeleteModal(!deleteModal)}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this ? Once Deleted it
                                can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button color="danger" onClick={handleDeleteData} disabled={buttonStatus}>
                                YES
                              </Button>
                              <Button onClick={() => setDeleteModal(false)}>
                                NO
                              </Button>
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

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentByConsultant;
