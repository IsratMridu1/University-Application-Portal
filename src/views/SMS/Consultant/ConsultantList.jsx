import React, { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Input,
  ModalHeader,
  FormGroup,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import { useHistory, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";

import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import { useState } from "react";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import remove from "../../../helpers/remove.js";
import LinkButton from "../Components/LinkButton.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import SpanButton from "../Components/SpanButton.js";
import put from "../../../helpers/put.js";
import load from '../../../assets/img/uappLoader.gif';
import Loader from "../Search/Loader/Loader.js";

const ConsultantList = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [consultantList, setConsultantList] = useState([]);
  const { type } = useParams();

  console.log("checking type", type);

  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [delData, setDelData] = useState({});
  const [data, setData] = useState({});
  // const [uniStateLabel, setUniStateLabel] = useState("State");
  // const [unistateValue, setUniStateValue] = useState(0);
  // const [providerLabel, setProviderLabel] = useState("Provider");
  // const [providerValue, setProviderValue] = useState(0);

  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkPass, setCheckPass] = useState(true);
  const [checkBranch, setCheckBranch] = useState(true);
  const [checkCons, setCheckCons] = useState(true);
  const [checkConsType, setCheckConsType] = useState(true);
  const [checkDate, setCheckDate] = useState(true);
  const [checkSts, setCheckSts] = useState(true);
  const [checkStd, setCheckStd] = useState(true);
  const [checkAppli, setCheckAppli] = useState(true);
  const [checkAsso, setCheckAsso] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus,setButtonStatus] = useState(false);

  const history = useHistory();

  // const selectConsType = (label, value) => {
  //     setConsTypeLabel(label);
  //     setConsTypeValue(value);
  //     handleSearch();
  //   };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

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

  // on clear
  const handleClearSearch = () => {
    setSearchStr("");
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
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

  useEffect(() => {
    get(
      `Consultant/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&searchstring=${searchStr}`
    ).then((res) => {
      console.log("consultant List", res);
      setConsultantList(res?.models);
      setSerialNum(res?.firstSerialNumber);
      setEntity(res?.totalEntity);
      setLoading(false);
    });
  }, [currentPage, dataPerPage, callApi, searchStr, entity, loading, success]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  // Edit Consultant Information

  const handleEdit = (data) => {
    console.log(data);

    history.push(`/consultantInformation/${data?.id}`);
  };

  // Delete Modal

  const toggleDanger = (p) => {
    setDelData(p);

    setDeleteModal(true);
  };

  const passValidate = (e) => {
    setPass(e.target.value);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
  };

  const handlePass = (data) => {
    setPassData(data);
    console.log(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
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
      put(`Password/Change`, subData).then((res) => {
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

  // Delete Data

  const handleDeleteData = () => {
    setButtonStatus(true);
    remove(`Consultant/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      // console.log(res);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(consultantList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const redirectToApplications = (consultantId) => {
    history.push({
      pathname: "/applications",
      consultantIdFromConsultantList: consultantId,
    });
  };

  const redirectToConsultantProfile = (consultantId) => {
    history.push(`/consultantProfile/${consultantId}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
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
  const handleCheckedPass = (e) => {
    setCheckPass(e.target.checked);
  };
  const handleCheckedBranch = (e) => {
    setCheckBranch(e.target.checked);
  };
  const handleCheckedCons = (e) => {
    setCheckCons(e.target.checked);
  };
  const handleCheckedConsType = (e) => {
    setCheckConsType(e.target.checked);
  };
  const handleCheckedDate = (e) => {
    setCheckDate(e.target.checked);
  };
  const handleCheckedSts = (e) => {
    setCheckSts(e.target.checked);
  };
  const handleCheckedStd = (e) => {
    setCheckStd(e.target.checked);
  };
  const handleCheckedAppli = (e) => {
    setCheckAppli(e.target.checked);
  };
  const handleCheckedAsso = (e) => {
    setCheckAsso(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      {
        loading ? 
        <Loader/>
        :
        <>
        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Consultant List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* filter starts here */}
      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row>
            {/* <Col lg="4" md="4" sm="6" xs="6">
                  
                </Col>

                <Col lg="4" md="4" sm="6" xs="6">
                  
                </Col> */}

            <Col lg="12">
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="search"
                value={searchStr}
                id="search"
                placeholder="Name , Email"
                onChange={searchValue}
                onKeyDown={handleKeyDown}
              />
            </Col>

            {/* <Col lg="3" md="3" sm="6" xs="6">
                  <div className="uapp-Search-div">
                    <span>Reset</span>

                  </div>
                </Col> */}
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

                {/* <div className="mt-2 mx-1">
                    <span className="btn btn-primary">Export</span>
                  </div> */}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* filter starts here */}

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="4" xs="4">
              {permissions?.includes(permissionList?.Add_Consultant) ? (
                <LinkButton
                  url={"/addConsultant"}
                  className={"btn btn-uapp-add "}
                  name={"Add New Consultant"}
                  icon={<i className="fas fa-plus"></i>}
                  // permission={6}
                />
              ) : null}
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
                          <p className="">Branch</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedBranch(e);
                              }}
                              defaultChecked={checkBranch}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Parent Consultant</p>
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
                          <p className="">Consultant Type</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedConsType(e);
                              }}
                              defaultChecked={checkConsType}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Joining date</p>
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
                          <p className="">Account Status</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedSts(e);
                              }}
                              defaultChecked={checkSts}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Student</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedStd(e);
                              }}
                              defaultChecked={checkStd}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Applications</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAppli(e);
                              }}
                              defaultChecked={checkAppli}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Associates</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAsso(e);
                              }}
                              defaultChecked={checkAsso}
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
            <div className="table-responsive mb-2" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkSlNo ? <th>SL/NO</th> : null}
                    {checkName ? <th>Name</th> : null}
                    {checkEmail ? <th>Email</th> : null}
                    {checkPhn ? <th>Phone No</th> : null}
                    {checkPass ? <th>Password</th> : null}
                    {checkBranch ? <th>Branch</th> : null}
                    {checkCons ? <th>Parent Consultant</th> : null}
                    {checkConsType ? <th>Consultant Type</th> : null}
                    {checkDate ? <th>Joining Date</th> : null}
                    {checkSts ? <th>Account status</th> : null}
                    {checkStd ? <th>Student</th> : null}
                    {checkAppli ? <th>Applications</th> : null}
                    {checkAsso ? <th>Associates</th> : null}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {consultantList?.map((consultant, i) => (
                    <tr key={consultant?.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{serialNum + i}</th> : null}

                      {checkName ? (
                        <td>
                          {consultant?.nameTitle?.name} {consultant?.firstName}{" "}
                          {consultant?.lastName}
                        </td>
                      ) : null}

                      {checkEmail ? <td>{consultant?.email}</td> : null}

                      {checkPhn ? <td>{consultant?.phoneNumber}</td> : null}

                      {checkPass ? (
                        <td>
                          <span
                            className="passwordChangeStyle"
                            onClick={() => handlePass(consultant)}
                          >
                            Change
                          </span>
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
                              <form onSubmit={submitModalForm} className="mt-3">
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
                                    <span className="text-danger">{error}</span>
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
                      {checkBranch ? <td>{consultant?.branch?.name}</td> : null}
                      {checkCons ? (
                        <td>{consultant?.parentConsultantName}</td>
                      ) : null}
                      {checkConsType ? (
                        <td>{consultant?.consultantType?.name}</td>
                      ) : null}
                      {checkDate ? (
                        <td>{handleDate(consultant?.createdOn)}</td>
                      ) : null}
                      {checkSts ? (
                        <td>{consultant?.accountStatus?.statusName}</td>
                      ) : null}

                      {checkStd ? (
                        <td>
                          <span
                            className="badge badge-secondary"
                            style={{ cursor: "pointer" }}
                          >
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/studentByConsultant/${consultant?.id}`}
                            >
                              {consultant?.studentCount}
                            </Link>
                          </span>
                        </td>
                      ) : null}

                      {checkAppli ? (
                        <td>
                          <SpanButton
                            func={() => redirectToApplications(consultant?.id)}
                            className={"badge badge-primary"}
                            style={{ cursor: "pointer" }}
                            data={consultant?.applicationCount}
                            permission={6}
                          />
                        </td>
                      ) : null}

                      {checkAsso ? (
                        <td>
                          {" "}
                          <span
                            className="badge badge-warning"
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/associates/${consultant?.id}`}
                            >
                              {consultant?.childConsultantCount}
                            </Link>
                          </span>{" "}
                        </td>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <LinkButton
                            url={`/consultantProfile/${consultant?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                         
                          /> */}

                            <ButtonForFunction
                              func={() =>
                                redirectToConsultantProfile(consultant?.id)
                              }
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-eye"></i>}
                            />

                            {consultant?.id !== 1 ? (

                               <>
                                   <ButtonForFunction
                                   func={() => handleEdit(consultant)}
                                   color={"warning"}
                                   className={"mx-1 btn-sm"}
                                   icon={<i className="fas fa-edit"></i>}
                                   />

                                  <ButtonForFunction
                                    color={"danger"}
                                    className={"mx-1 btn-sm"}
                                    func={() => toggleDanger(consultant)}
                                    icon={<i className="fas fa-trash-alt"></i>}
                                    
                                  />
                               </>

                            ) : // <Button color="danger" className="mx-1 btn-sm" disabled><i className="fas fa-trash-alt"></i></Button>
                            null}
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

export default ConsultantList;
