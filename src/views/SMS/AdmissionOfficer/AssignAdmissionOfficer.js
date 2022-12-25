import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Label,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";
import Select from "react-select";
import ReactTableConvertToXl from '../ReactTableConvertToXl/ReactTableConvertToXl';
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import { useToasts } from "react-toast-notifications";
import { useHistory, useLocation, useParams } from "react-router-dom";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import ButtonForFunction from "../Components/ButtonForFunction";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import put from "../../../helpers/put";

const AssignAdmissionOfficer = () => {
    const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [managerDD, setManagerDD] = useState([]);
  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);
  const [managerError, setManagerError] = useState(false);

  const [managerList, setManagerList] = useState([]);
  const [success, setSuccess] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(undefined);

  const [managerUniName, setManagerUniName] = useState('');
  const [managerUniId, setManagerUniId] = useState(0);

  const { officerId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();

  const componentRef = useRef();

  useEffect(() => {
    get(`AdmissionManagerDD/Index`).then((res) => {
      setManagerDD(res);
    });

    get(`AdmissionOfficerOfmanager/byAdmissionofficer/${officerId}`).then((res) => {
      setManagerList(res);
   
    });
  }, [success, officerId]);

  const managerMenu = managerDD.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const selectManager = (label, value) => {
    setManagerLabel(label);
    setManagerValue(value);
    setManagerError(false);
  };

  const backToAdmissionOfficerList = () => {
    
      history.push(`/admissionOfficerList`);
    
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
    setSelectedId(undefined);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(managerList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = {
      admissionManagerId: managerValue,
      admissionOfficerId: officerId,
    };

    const subData1 = {
      id: selectedId,
    //   admissionManagerId: managerId,
    //   universityId: uniValue,
    };


    if(selectedId !== undefined){
      put(`AdmissionManagerUniversity/Update`, subData1).then((res) => {
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setModalOpen(false);
          setManagerLabel("Select Admission Manager");
          setManagerValue(0);
          setSelectedId(undefined);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
    else{
      if (managerValue === 0) {
        setManagerError(true);
      } else {
        setSelectedId(undefined);
        post(`AdmissionOfficerOfManager/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setModalOpen(false);
            setManagerLabel("Select Admission Manager");
            setManagerValue(0);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const toggleDanger = (p) => {
    setManagerUniId(p?.id);
    setManagerUniName(p?.university?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (managerUniId) => {
    const returnValue = remove(
      `AdmissionManagerUniversity/Delete/${managerUniId}`
    ).then((action) => {
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setManagerUniId(0);
      setManagerUniName('');
    });
  };

  const handleUpdate = (manager) => {

    setModalOpen(true);
    // setManagerLabel(university?.university?.name);
    // setManagerValue(university?.university?.id);
    // setSelectedId(university?.id);
  }
    return (
        <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Assigned Admission Manager List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToAdmissionOfficerList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              
                Back to Admission Officer List
                
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="6" md="5" sm="6" xs="4">
              <ButtonForFunction
                func={() => setModalOpen(true)}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                name={" Assign Admission Manager"}
                permission={6}
              />
            </Col>

            <Col lg="6" md="7" sm="6" xs="8">
              <Row>
                <Col lg="5" md="6"></Col>
                <Col lg="2" md="3" sm="5" xs="5" className="mt-2">
                  {/* Showing */}
                </Col>
                <Col md="3" sm="7" xs="7">
                  {/* <Select
                    options={dataSizeName}
                    value={{ label: dataPerPage, value: dataPerPage }}
                    onChange={(opt) => selectDataSize(opt.value)}
                  /> */}
                </Col>
                <Col lg="2">
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
                </Col>
              </Row>
            </Col>
          </Row>

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="lg"
            >
              <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                <span className="text-white">Admission Officer</span>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  

                  <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                      <span>
                        Admission Manager <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    
                      <Col md="5">
                      <Select
                        options={managerMenu}
                        value={{ label: managerLabel, value: managerValue }}
                        onChange={(opt) =>
                            selectManager(opt.label, opt.value)
                        }
                        name="admissionmanagerId"
                        id="admissionmanagerId"
                      />

                      {managerError && (
                        <span className="text-danger">
                          Admission manager is required
                        </span>
                      )}
                    </Col>
                  </FormGroup>

                  <br />
                  <br />

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      color="danger"
                      className="mr-1 mt-3"
                      onClick={closeModal}
                    >
                      Close
                    </Button>

                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"mr-1 mt-3"}
                      name={"Submit"}
                      permission={6}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            <div></div>
          </div>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    <th>SL/NO</th>
                    <th>University Name</th>
                    {/* <th>Requirement Type</th> */}
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {managerList?.map((manager, i) => (
                    <tr key={manager?.id} style={{ textAlign: "center" }}>
                      <th scope="row">{i + 1}</th>

                      <td>{manager?.admissionManager?.firstName}{" "}{manager?.admissionManager?.lastName}</td>

                      <td style={{ width: "8%" }} className="text-center">
                        <ButtonGroup variant="text">
                          {/* <LinkButton
                            url={`/campusDetails/${campus?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          /> */}

                          <ButtonForFunction
                            func={() => handleUpdate(manager)}
                            color={"warning"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                            permission={6}
                          />

                          <ButtonForFunction
                            color={"danger"}
                            func={() => toggleDanger(manager)}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-trash-alt"></i>}
                            permission={6}
                          />

                          <Modal
                            isOpen={deleteModal}
                            toggle={() => setDeleteModal(!deleteModal)}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this{" "}
                                <b>{managerUniName}</b>{" "}
                                ? Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                color="danger"
                                onClick={() =>
                                  handleDeletePermission(managerUniId)
                                }
                              >
                                YES
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => {
                                  setDeleteModal(false);
                                  setManagerUniId(0);
                                  setManagerUniName('');
                                }}
                              >
                                NO
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          /> */}
        </CardBody>
      </Card>
    </div>
    );
};

export default AssignAdmissionOfficer;