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
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
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

const AssignUniversity = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [providerUniList, setProviderUniList] = useState([]);
  const [uniLabel, setUniLabel] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [uniError, setUniError] = useState(false);

  const [uniList, setUniList] = useState([]);
  const [success, setSuccess] = useState(false);

  const [radioIsAcceptHome, setRadioIsAcceptHome] = useState("false");
  const [radioIsAcceptUk, setRadioIsAcceptUk] = useState("true");
  const [radioIsAcceptInt, setRadioIsAcceptInt] = useState("false");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(undefined);

  const [managerUniName, setManagerUniName] = useState("");
  const [managerUniId, setManagerUniId] = useState(0);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const { providerId, managerId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();

  const componentRef = useRef();

  useEffect(() => {
    get(`ProviderUniversityDD/Index/${providerId}`).then((res) => {
      setProviderUniList(res);
    });

    get(`AdmissionManagerUniversity/Index/${managerId}`).then((res) => {
      setUniList(res);
    });
  }, [providerId, managerId, success]);

  const universityMenu = providerUniList.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const selectUniversity = (label, value) => {
    setUniLabel(label);
    setUniValue(value);
    setUniError(false);
  };

  const backToProviderDetails = () => {
    if (location.managerList != undefined) {
      history.push(`/admissionManagerList`);
    } else {
      history.push(`/providerDetails/${providerId}`);
    }
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUniLabel("Select University");
    setUniValue(0);
    setSelectedId(undefined);
    setRadioIsAcceptHome("false");
    setRadioIsAcceptUk("true");
    setRadioIsAcceptInt("false");
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
      ws = XLSX.utils.json_to_sheet(uniList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  // on change radio button starts here
  const onValueChangeIsAcceptHome = (event) => {
    setRadioIsAcceptHome(event.target.value);
  };

  const onValueChangeIsAcceptUk = (event) => {
    setRadioIsAcceptUk(event.target.value);
  };

  const onValueChangeIsAcceptInt = (event) => {
    setRadioIsAcceptInt(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = {
      admissionManagerId: managerId,
      universityId: uniValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };

    const subData1 = {
      id: selectedId,
      admissionManagerId: managerId,
      universityId: uniValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };

    if (selectedId !== undefined) {
      put(`AdmissionManagerUniversity/Update`, subData1).then((res) => {
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setModalOpen(false);
          setUniLabel("Select University");
          setUniValue(0);
          setSelectedId(undefined);
          setRadioIsAcceptHome("false");
          setRadioIsAcceptUk("true");
          setRadioIsAcceptInt("false");
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      if (uniValue === 0) {
        setUniError(true);
      } else {
        setSelectedId(undefined);
        post(`AdmissionManagerUniversity/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setModalOpen(false);
            setUniLabel("Select University");
            setUniValue(0);
            setRadioIsAcceptHome("false");
            setRadioIsAcceptUk("true");
            setRadioIsAcceptInt("false");
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
      setManagerUniName("");
    });
  };

  const handleUpdate = (university) => {
    setModalOpen(true);
    setUniLabel(university?.university?.name);
    setUniValue(university?.university?.id);
    setRadioIsAcceptHome(`${university?.isAcceptHome}`);
    setRadioIsAcceptUk(`${university?.isAcceptEU_UK}`);
    setRadioIsAcceptInt(`${university?.isAcceptInternational}`);
    setSelectedId(university?.id);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedType = (e) => {
    setCheckType(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Assigned University</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToProviderDetails} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {location.managerList != undefined
                ? "Back to Admission Manager List"
                : "Back to Provider Details"}
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
                name={" Assign New University"}
                permission={6}
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
                    <DropdownMenu className="bg-dd-3">
                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">SL/NO</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
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
                          <p className="">University Name</p>
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
                          <p className="">Requirement Type</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedType(e);
                              }}
                              defaultChecked={checkType}
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

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="md"
            >
              <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                <span className="text-white">University</span>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup row className="has-icon-left position-relative">
                    {selectedId === undefined ? (
                      <>
                        <Col md="5">
                          <span>
                            University Name{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>

                        <Col md="7">
                          <Select
                            options={universityMenu}
                            value={{ label: uniLabel, value: uniValue }}
                            onChange={(opt) =>
                              selectUniversity(opt.label, opt.value)
                            }
                            name="universityId"
                            id="universityId"
                          />

                          {uniError && (
                            <span className="text-danger">
                               University is required
                            </span>
                          )}
                        </Col>
                      </>
                    ) : null}
                  </FormGroup>

                  {uniValue > 0 ? (
                    <>
                      <p className="pt-3">
                        <b>Recruitment Type :</b>
                      </p>

                      <FormGroup row>
                        <Col md="5">
                          <span>Is Accept Home </span>
                        </Col>

                        <Col md="7">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptHome"
                              onChange={onValueChangeIsAcceptHome}
                              name="isAcceptHome"
                              value="true"
                              checked={radioIsAcceptHome == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptHome"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptHome"
                              onChange={onValueChangeIsAcceptHome}
                              name="isAcceptHome"
                              value="false"
                              checked={radioIsAcceptHome == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptHome"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row className="">
                        <Col md="5">
                          <span>Is Accept EU/UK </span>
                        </Col>

                        <Col md="7">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptEU_UK"
                              onChange={onValueChangeIsAcceptUk}
                              name="isAcceptEU_UK"
                              value="true"
                              checked={radioIsAcceptUk == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptEU_UK"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptEU_UK"
                              onChange={onValueChangeIsAcceptUk}
                              name="isAcceptEU_UK"
                              value="false"
                              checked={radioIsAcceptUk == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptEU_UK"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row className="">
                        <Col md="5">
                          <span>Is Accept International </span>
                        </Col>

                        <Col md="7">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptInternational"
                              onChange={onValueChangeIsAcceptInt}
                              name="isAcceptInternational"
                              value="true"
                              checked={radioIsAcceptInt == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptInternational"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptInternational"
                              onChange={onValueChangeIsAcceptInt}
                              name="isAcceptInternational"
                              value="false"
                              checked={radioIsAcceptInt == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptInternational"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    </>
                  ) : null}

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
                    {checkSlNo ? <th>SL/NO</th> : null}
                    {checkName ? <th>University Name</th> : null}
                    {checkType ? <th>Requirement Type</th> : null}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {uniList?.map((uni, i) => (
                    <tr key={uni?.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{i + 1}</th> : null}

                      {checkName ? <td>{uni?.university?.name}</td> : null}
                      {checkType ? (
                        <td>
                          {uni?.isAcceptHome === true ? `Home,` : null}{" "}
                          {uni?.isAcceptEU_UK === true ? `EU/UK,` : null}{" "}
                          {uni?.isAcceptInternational === true
                            ? "International"
                            : null}
                          {uni?.isAcceptHome === false &&
                          uni?.isAcceptEU_UK === false &&
                          uni?.isAcceptInternational === false
                            ? "Not available"
                            : null}
                        </td>
                      ) : null}

                      {checkAction ? (
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
                              func={() => handleUpdate(uni)}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            />

                            <ButtonForFunction
                              color={"danger"}
                              func={() => toggleDanger(uni)}
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
                                  <b>{managerUniName}</b> ? Once Deleted it
                                  can't be Undone!
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
                                    setManagerUniName("");
                                  }}
                                >
                                  NO
                                </Button>
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

export default AssignUniversity;
