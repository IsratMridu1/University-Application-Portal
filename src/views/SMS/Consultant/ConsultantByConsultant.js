import React, { useEffect, useRef } from "react";
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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import { useHistory, useLocation, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import { useState } from "react";

import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import remove from "../../../helpers/remove.js";
import LinkButton from "../Components/LinkButton.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";

const ConsultantByConsultant = () => {
  const { id } = useParams();

  const [consultantList, setConsultantList] = useState([]);

  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const [delData,setDelData] = useState({});

  useEffect(() => {
    get(
      `Consultant/GetAssociate?page=${currentPage}&pageSize=${dataPerPage}&id=${id}`
    ).then((res) => {
      console.log("wdwdwdwd", res);
      setConsultantList(res?.models);
      setEntity(res?.totalEntity);
      setSerialNum(res?.firstSerialNumber);
      console.log(res?.models);
      setLoading(false);
    });
  }, [id,currentPage,dataPerPage,callApi,entity,loading, success]);

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

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const toggleDanger = (p) => {

    setDelData(p);

    setDeleteModal(true)
  }

  const handleDeleteData = () => {

     

    remove(`Consultant/Delete/${delData?.id}`)
    .then(res => {
      // console.log(res);
      addToast(res,{
        appearance: 'error',
        autoDismiss: true
      })
      setDeleteModal(false);
      setSuccess(!success);
    })
    
  }

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(consultantList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const handleEdit = (data) =>{

    console.log(data);
    
    history.push(`/consultantInformation/${data?.id}`);

  }

  const componentRef = useRef();

  const handleView = (consultantId) => {
    history.push(`/consultantProfile/${consultantId}`)
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Consultant list</h3>
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
          

          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="4" xs="4">
            {/* {
                    permissions?.includes(permissionList?.Add_subject) ?
              <ButtonForFunction
                func={handleAddSubject}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                name={" Add New Subject"}
                permission={6}
              />
              :
              null
              } */}
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
            </Col>
          </Row>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive mb-2" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    <th>SL/NO</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Password</th>
                    <th>Branch</th>
                    <th>Parent Consultant</th>
                    <th>Consultant Type</th>
                    <th>Joining Date</th>
                    <th>Account status</th>
                    <th>Student</th>
                    <th>Application</th>
                    <th>Associates</th>
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {consultantList?.map((consultant, i) => (
                    <tr key={consultant?.id} style={{ textAlign: "center" }}>
                      <th scope="row">{serialNum + i}</th>

                      <td style={{ width: "10px" }}>
                        {consultant?.firstName} {consultant?.lastName}
                      </td>
                      <td>{consultant?.email}</td>
                      <td>{consultant?.phoneNumber}</td>

                      <td>
                        <Link to="/">Change</Link>
                      </td>
                      <td>{consultant?.branch?.name}</td>
                      <td>{consultant?.parentConsultantName}</td>
                      <td>{consultant?.consultantType?.name}</td>
                      <td>{handleDate(consultant?.createdOn)}</td>
                      <td>{consultant?.accountStatus?.statusName}</td>

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

                      <td>
                        {" "}
                        <span
                          className="badge badge-primary"
                          style={{ cursor: "pointer" }}
                        >
                          {0}
                        </span>{" "}
                      </td>
                      <td>
                        {" "}
                        <span
                          className="badge badge-warning"
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/associates/${consultant?.id}`}
                          >
                            {consultant?.childConsultantCount}
                          </Link>
                        </span>{" "}
                      </td>

                      <td style={{ width: "8%" }} className="text-center">
                        <ButtonGroup variant="text">
                          {/* <LinkButton
                            url={`/consultantProfile/${consultant?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          /> */}

                          <ButtonForFunction
                            func={()=>handleView(consultant?.id)}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          />

                          <ButtonForFunction
                            func={()=>handleEdit(consultant)}
                            color={"warning"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                            permission={6}
                          />

                          {consultant?.id !== 1 ? (
                            <ButtonForFunction
                              color={"danger"}
                              className={"mx-1 btn-sm"}
                              func={()=> toggleDanger(consultant)}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                          ) : // <Button color="danger" className="mx-1 btn-sm" disabled><i className="fas fa-trash-alt"></i></Button>
                          null}
                        </ButtonGroup>
                        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                        <ModalBody>
                          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                        </ModalBody>
        
                        <ModalFooter>
                          <Button  color="danger" onClick={handleDeleteData}>YES</Button>
                          <Button onClick={() => setDeleteModal(false)}>NO</Button>
                        </ModalFooter>
                     </Modal>
                      </td>
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

export default ConsultantByConsultant;
