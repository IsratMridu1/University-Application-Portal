import React, { useEffect, useState, useRef } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import Select from "react-select";

import { useHistory } from "react-router";
import * as Icon from "react-feather";
import { useToasts } from "react-toast-notifications";

import get from "../../../helpers/get.js";

import { Link } from "react-router-dom";
import remove from "../../../helpers/remove.js";
import { useDispatch } from "react-redux";

import { StoreUniversityProviderData } from "../../../redux/actions/SMS/Provider/UniversityProvider.js";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import LinkButton from "../Components/LinkButton.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import Loader from "../Search/Loader/Loader.js";

const ProviderList = () => {
  const history = useHistory();
  const [providerList, setProviderList] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [providerLabel, setProviderLabel] = useState("Select Provider Type ");
  const [providerValue, setProviderValue] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [entity, setEntity] = useState(0);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckSlName] = useState(true);
  const [checkEmail, setCheckSlEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkUniCount, setCheckuniCount] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const { addToast } = useToasts();
  const [providerType, setProviderType] = useState([]);
  const [delData, setDelData] = useState({});
  const [success, setSuccess] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [provider,setProvider] = useState(false);
  const [buttonStatus,setButtonStatus] = useState(false);

  useEffect(() => {
    const providerTypeId = 0;
    const pageSize = 15;
    //  get(`Provider/Index?page=${currentPage}&pagesize=${pageSize}&providerTypeId=${providerTypeId? providerTypeId : providerValue}&searchstring=${searchStr}`).then((action) => {
    //   setProviderList(action?.models);
    get(
      `Provider/Index?providerTypeId=${
        providerTypeId ? providerTypeId : providerValue
      }&searchstring=${searchStr}`
    ).then((action) => {
      setProviderList(action?.models);
      console.log("aaaaaa", action);
      // console.log('aaaaaa',action);

      // console.log(searchStr);
      // console.log(providerValue);
      setLoading(false);
      setEntity(action?.totalEntity);
      setSerialNum(action?.firstSerialNumber);
    });

    get(`ProviderType/GetAll`).then((res) => {
      // console.log('provider',res);
      setProviderType(res);
    });
  }, [providerValue, searchStr, currentPage, success]);

  // console.log(providerValue);
  // console.log(searchStr);

  const toggleDeleteProvider = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    get(`Provider/Index`).then((res) => {
      dispatch(StoreUniversityProviderData(res));
      // console.log('provider',res);
      //  setProviderList(res?.models)
    });
  }, []);

  const deleteProvider = () => {
    setButtonStatus(true);
    remove(`Provider/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  // console.log(providerlist);
  const providertype = providerType.map((list) => ({
    label: list.name,
    value: list.id,
  }));
  // console.log(providertype);

  // select University State

  const selectProviderTypeState = (label, value) => {
    setProviderLabel(label);
    setProviderValue(value);

    handleSearch();
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setSearchStr("");
    setProviderLabel("Select Provider Type");
    setProviderValue(0);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
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
      ws = XLSX.utils.json_to_sheet(providerList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const redirectToProviderDetails = (providerId) => {
    history.push(`/providerDetails/${providerId}`);
  };

  const redirectToProviderDashboard = (providerId) => {
    history.push(`/providerDashboard/${providerId}`);
  };

  const redirectToUpdateProvider = (providerId) => {
    history.push(`/updateProvider/${providerId}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckSlName(e.target.checked);
  };
  const handleCheckedEmail = (e) => {
    setCheckSlEmail(e.target.checked);
  };
  const handleCheckedPhn = (e) => {
    setCheckPhn(e.target.checked);
  };
  const handleCheckedUniCount = (e) => {
    setCheckuniCount(e.target.checked);
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
          <h3 className="text-white">Providers List</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToDashboard}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <Row>
            <Col lg="6" md="6" sm="12" xs="12">
              <Select
                options={providertype}
                value={{ label: providerLabel, value: providerValue }}
                onChange={(opt) =>
                  selectProviderTypeState(opt.label, opt.value)
                }
                name="providerTypeId"
                id="providerTypeId"
              />
            </Col>
            <Col lg="6" md="6" sm="12" xs="12">
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="searchstring"
                value={searchStr}
                id="searchstring"
                placeholder="Name, Email"
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

          <Row className="mt-4">
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

      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="6" md="5" sm="6" xs="4">
              {permissions?.includes(permissionList?.Provider_List) ? (
                <LinkButton
                  url={"/providerForm"}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add New Provider"}
                  permission={6}
                />
              ) : null}
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
                      {/* <DropdownItem> */}
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          {/* <p onClick={handleExportXLSX}><i className="fas fa-file-excel"></i></p> */}
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

                      {/* <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button"
                          table="table-to-xls"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Download as XLS"/> */}

                      {/* <Button onClick={onDownload}> Export excel </Button> */}

                      {/* </DropdownItem> */}

                      {/* <DropdownItem> */}

                      {/* </DropdownItem> */}
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
                          <p className="">University Count</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedUniCount(e);
                              }}
                              defaultChecked={checkUniCount}
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
                    {checkEmail ? <th>Email</th> : null}
                    {checkPhn ? <th>Phone No</th> : null}
                    {checkUniCount ? <th>University Count</th> : null}

                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {providerList?.map((prov, i) => (
                    <tr key={prov.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{serialNum + i}</th> : null}

                      {checkName ? (
                        <td>
                          {prov?.nameTittle?.name} {prov?.name}
                        </td>
                      ) : null}
                      {checkEmail ? <td>{prov?.email}</td> : null}
                      {checkPhn ? <td>{prov?.phoneNumber}</td> : null}

                      {checkUniCount ? (
                        <td>
                          <Link
                            to={{
                              pathname: "/universityList",
                              providerName: prov?.name,
                              providervalue: prov?.id,
                            }}
                            style={{ textDecoration: "none" }}
                          >
                            {/* <td className='hovv  badge-primary'>{prov?.universityCount}</td> */}
                            <span className="badge badge-pill badge-primary">
                              {" "}
                              {prov?.universityCount}{" "}
                            </span>
                          </Link>
                        </td>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <LinkButton 
                              url={`/providerDetails/${prov?.id}`}
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-eye"></i>}
                              permission={6}
                            /> */}

                            <ButtonForFunction
                              color={"primary"}
                              func={() => redirectToProviderDetails(prov?.id)}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-eye"></i>}
                              permission={6}
                            />

                            <ButtonForFunction
                              color={"primary"}
                              func={() => redirectToProviderDashboard(prov?.id)}
                              className={"mx-1 btn-sm"}
                              icon={
                                <i className="fas fa-tachometer-alt-fast"></i>
                              }
                              permission={6}
                            />

                            {prov?.id !== 1 ? (
                              // <LinkButton
                              //   url={`/updateProvider/${prov?.id}`}
                              //   color={"warning"}
                              //   className={"mx-1 btn-sm"}
                              //   icon={<i className="fas fa-edit"></i>}
                              //   permission={6}
                              // />

                              <ButtonForFunction
                                color={"warning"}
                                func={() => redirectToUpdateProvider(prov?.id)}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {prov?.id !== 1 ? (
                              // <Button color="danger" onClick={toggleDeleteProvider} className="mx-1 btn-sm"><i class="fas fa-trash-alt"></i></Button>

                              <ButtonForFunction
                                color={"danger"}
                                func={() => toggleDeleteProvider(prov)}
                                className={"mx-1 btn-sm"}
                                icon={<i class="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}
                          </ButtonGroup>
                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this ? Once Deleted it
                                can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button color="danger" onClick={deleteProvider} disabled={buttonStatus}>
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
        </CardBody>
      </Card>
        </>
      }
    </div>
  );
};

export default ProviderList;
