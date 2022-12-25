import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";

import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import LinkButton from "../../Components/LinkButton";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Loader from "../../Search/Loader/Loader";

const BranchList = () => {
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [delData, setDelData] = useState(null);
  const [success, setSuccess] = useState(false);

  // for hide/unhide table column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus,setButtonStatus] = useState(false);

  const history = useHistory();
  const backToDashboard = () => {
    history.push("/");
  };

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Branch/Index`).then((res) => {
      setBranchList(res);
      setLoading(false);
    });
  }, [success]);

  // const handleLocalStorage = () => {
  //   localStorage.removeItem("branchId");
  //   // localStorage.removeItem("branchManagerId");
  // };

  const handleUpdate = (id) => {
    history.push(`/branchInformation/${id}`);
  };

  const handleDeletebranch = () => {
    setButtonStatus(true);
    remove(`Branch/Delete/${delData}`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);

      setSuccess(!success);
    });
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
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
      ws = XLSX.utils.json_to_sheet(branchList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const redirectToBranchProfile = (branchId) => {
    history.push(`/branchProfile/${branchId}`);
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
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
     {
      loading?
      <Loader/>
      :
      <div>
         <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Branch List</h3>
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
              {permissions?.includes(permissionList?.Add_Branch) ? (
                <LinkButton
                  url={"/branchInformation"}
                  //  func={handleLocalStorage}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={"Add New Branch"}
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

                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {branchList?.map((singleBranch, i) => (
                    <tr key={singleBranch?.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <td>{serialNum + i}</td> : null}

                      {checkName ? <td>{singleBranch?.name}</td> : null}
                      {checkEmail ? <td>{singleBranch?.email}</td> : null}
                      {checkPhn ? <td>{singleBranch?.phoneNumber}</td> : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            <ButtonForFunction
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              func={() =>
                                redirectToBranchProfile(singleBranch?.id)
                              }
                              icon={<i className="fas fa-eye"></i>}
                              permission={6}
                            />

                            {/* <LinkButton 
                            url={`/branchProfile/${singleBranch?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          /> */}
                            {
                              singleBranch?.email  !== 'info@smsheg.co.uk' ?
                            <ButtonForFunction
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              func={() => handleUpdate(singleBranch?.id)}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            />
                            : 
                            null
                            }

                            {
                              singleBranch?.email !== 'info@smsheg.co.uk'?
                            <ButtonForFunction
                              color={"danger"}
                              func={() => toggleDanger(singleBranch?.id)}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                              
                              
                            />
                            :
                              null
                            }

                            <Modal
                              isOpen={deleteModal}
                              toggle={closeDeleteModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this? Once Deleted it
                                  can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={handleDeletebranch}
                                  disabled={buttonStatus}
                                >
                                  YES
                                </Button>
                                <Button onClick={closeDeleteModal} >NO</Button>
                              </ModalFooter>
                            </Modal>
                          </ButtonGroup>
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
      </div>
     }
    </div>
  );
};

export default BranchList;
