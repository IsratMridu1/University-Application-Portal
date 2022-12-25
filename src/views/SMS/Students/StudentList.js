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
  FormGroup,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import get from '../../../helpers/get';
import remove from '../../../helpers/remove.js';
import ButtonForFunction from '../Components/ButtonForFunction';
import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import LinkButton from '../Components/LinkButton.js';
import * as XLSX from 'xlsx/xlsx.mjs';
import ReactToPrint from 'react-to-print';
import { userTypes } from '../../../constants/userTypeConstant.js';
import put from '../../../helpers/put.js';
import Loader from '../Search/Loader/Loader.js';
import { Switch } from "antd";
import ToggleSwitch from "../Components/ToggleSwitch.js";


const StudentList = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const { cId, type } = useParams();



  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    "Select Student Type"
  );
  const [studentTypeValue, setStudentTypeValue] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [date, setDate] = useState("");
  const [delData, setDelData] = useState({});

  const referenceId = localStorage.getItem("referenceId");

  const userTypeId = localStorage.getItem("userType");

  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);

  const [accountStatus, setAccountStatus] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Select Account Status");
  const [statusValue, setStatusValue] = useState(0);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);

  const [orderLabel, setOrderLabel] = useState("Select order by");
  const [orderValue, setOrderValue] = useState(0);

  // const [check, setChecked] = useState("");

  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    get("StudentTypeDD/Index").then((res) => {
      console.log("res", res);
      setStudentList(res);
    });

    get("ConsultantDD/index").then((res) => {
      setConsultant(res);
    });
  }, []);

  useEffect(() => {
    type
      ? get(
          `Student/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&StudentType=${type}&searchstring=${searchStr}&consultantId=${
            userTypeId == userTypes?.Consultant ? referenceId : consultantValue
          }&status=${statusValue}&sortby=${orderValue}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
          setStudentTypeLabel(res?.models[0]?.studentType?.name);
         
        })
      : 

        cId? 
        get(
          `Student/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&StudentType=${studentTypeValue}&searchstring=${searchStr}&consultantId=${
            userTypeId == userTypes?.Consultant ? referenceId : cId
          }&status=${statusValue}&sortby=${orderValue}`
        ).then((res) => {
          console.log(res);
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
          setConsultantLabel(res?.models[0]?.consultant?.firstName + ' ' +  res?.models[0]?.consultant?.lastName)
        })
        :
        get(
          `Student/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&StudentType=${studentTypeValue}&searchstring=${searchStr}&consultantId=${
            userTypeId == userTypes?.Consultant ? referenceId : consultantValue
          }&status=${statusValue}&sortby=${orderValue}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
        });


    

  }, [
    currentPage,
    dataPerPage,
    callApi,
    searchStr,
    studentTypeValue,
    success,
    orderValue,
  ]);

  // student dropdown options
  const studentTypeOption = studentList?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const selectStudentType = (label, value) => {
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
    handleSearch();
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // user select order
  const orderArr = [
    {
      label: "Newest",
      value: 1,
    },
    {
      label: "Oldest",
      value: 2,
    },
    {
      label: "A-Z",
      value: 3,
    },
    {
      label: "Z-A",
      value: 4,
    },
  ];
  // const orderName = orderArr.map((dsn) => ({ label: dsn.label, value: dsn.value }));
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    // console.log("value", label, value);
    
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

  const passValidate = (e) => {
    setPass(e.target.value);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const status = [
    {
      id: 1,
      name: "Active",
    },

    {
      id: 2,
      name: "Incative",
    },
  ];

  const statusOption = status?.map((s) => ({
    label: s?.name,
    value: s?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    handleSearch();
  };

  const consultantOption = consultant?.map((c) => ({
    label: c?.name,
    value: c?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
    handleSearch();
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
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

  // on clear
  const handleClearSearch = () => {
    setStudentTypeLabel("Select Student Type");
    setStudentTypeValue(0);
    setStatusValue(0);
    setStatusLabel("Select Account Status");
    setConsultantValue(0);
    setConsultantLabel("Select Consultant");
    setSearchStr("");
    setCallApi((prev) => !prev);
  };

  const handleEdit = (data) => {
    console.log(data);

    history.push(`/addStudentApplicationInformation/${data?.id}/${1}`);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  // add university handler
  const handleAddStudent = () => {
    history.push("/addStudentRegister");
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(studentData);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  // Delete Modal

  const toggleDanger = (data) => {
    setDelData(data);

    setDeleteModal(true);
  };

  const handlePass = (data) => {
    setPassData(data);
    console.log(data);
    setPassModal(true);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("studentId", passData?.id);
    subData.append("password", pass);
    if (pass.length < 6) {
      setError("Password length can not be less than six digits");
    } else if (pass !== cPass) {
      setPassError("Passwords do not match");
    } else {
      setButtonStatus(true);
      put(`Password/Change`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    remove(`Student/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleBlacklist = (e, id) => {
    console.log(e.target.checked, id);
    // setChecked(e.target.checked);
    // console.log(check);

    const subData = {
      id: id,
    };
    setButtonStatus(true);

    put(`Student/UpdateAccountStatus/${id}`, subData).then((res) => {
      setButtonStatus(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        // setPassData({});
        // setPassModal(false);
      }
      else{
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const redirectToStudentProfile = (studentId) => {
    history.push(`/studentProfile/${studentId}`);
  };

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
      {
        loading? 
        <Loader/>
        :
        <>
        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Student List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row className="mb-3">
            <Col lg="6" md="6" sm="12" xs="12">
              <Select
                options={studentTypeOption}
                value={{ label: studentTypeLabel, value: studentTypeValue }}
                onChange={(opt) => selectStudentType(opt.label, opt.value)}
                name="UniversityTypeId"
                id="UniversityTypeId"
                isDisabled={type ? true : false}
              />
            </Col>

            <Col lg="6" md="6" sm="12" xs="12">
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="search"
                value={searchStr}
                id="search"
                placeholder="Uapp Id, Name, Email"
                onChange={searchValue}
                onKeyDown={handleKeyDown}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="6" md="6" sm="12" xs="12">
                    <Select
                    options={consultantOption}
                    value={{ label: consultantLabel, value: consultantValue }}
                    onChange={(opt) => selectConsultant(opt.label, opt.value)}
                    name="consultantId"
                    id="consultantId"
                    isDisabled={cId}
                      
                    />
                  </Col>

            <Col lg="6" md="6" sm="12" xs="12">
              <Select
                options={statusOption}
                value={{ label: statusLabel, value: statusValue }}
                onChange={(opt) => selectStatusType(opt.label, opt.value)}
                name="status"
                id="status"
              />
            </Col>
          </Row>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >
                  {/* <Icon.X  className='text-danger' />*/}
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="4" xs="4">
              <ButtonForFunction
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                func={handleAddStudent}
                name={" Add New Student"}
              ></ButtonForFunction>
            </Col>

            <Col lg="7" md="7" sm="8" xs="8">
              <div className="d-md-flex justify-content-end">
                {/* <Col lg="2">
                    
                    <div className='ms-2'>
                      <ReactToPrint
                        trigger={()=><div className="uapp-print-icon">
                          <div className="text-right">
                            <span title="Print to pdf"> <i className="fas fa-print"></i> </span>
                          </div>
                        </div>}
                        content={() => componentRef.current}
                      />
                    </div>
                </Col> */}
                <div className="me-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Order By :</div>
                    <div>
                      <Select
                        className="mr-2"
                        options={orderName}
                        value={{ label: orderLabel, value: orderValue }}
                        onChange={(opt) => selectOrder(opt.label, opt.value)}
                      />
                    </div>
                  </div>
                </div>

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
                              disabled={buttonStatus}
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
                    {userTypeId == userTypes?.SystemAdmin ||
                    userTypeId == userTypes?.Admin ? (
                      <>{checkPass ? <th>Password</th> : null}</>
                    ) : null}
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
                  {studentData?.map((student, i) => (
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

                      {userTypeId == userTypes?.SystemAdmin ||
                      userTypeId == userTypes?.Admin ? (
                        <>
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
                                          <Button color="primary" type="submit" disabled={buttonStatus}>
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
                        </>
                      ) : null}

                      {checkBlackList ? (
                        <td>
                          {/* <label className="switch">
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
                          </label> */}

                          <ToggleSwitch 
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
        </>
      }
            </div>
          
    
  );
};

export default StudentList;
