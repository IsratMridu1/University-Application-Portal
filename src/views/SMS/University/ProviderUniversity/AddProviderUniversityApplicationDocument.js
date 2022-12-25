import Axios from "axios";
import React, { useState, createRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import MediaPictures from "./UniversityMedia";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
} from "reactstrap";
import get from "../../../../helpers/get";

import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import "antd/dist/antd.css";
import { Image } from "antd";

import CustomButtonRipple from "../../Components/CustomButtonRipple";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import LinkSpanButton from "../../Components/LinkSpanButton";
import { rootUrl } from "../../../../constants/constants";
import remove from "../../../../helpers/remove";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddProviderUniversityApplicationDocument = () => {
    const { addToast } = useToasts();
  const history = useHistory();
  const {providerProfileId, univerId} = useParams();
  const [activetab, setActivetab] = useState("6");

  const [document, setDocument] = useState([]);
  const [documentLabel, setDocumentLabel] = useState("Select Document");
  const [applicationLabel, setApplicationLabel] = useState(
    "Select Application Type"
  );
  const [documentValue, setDocumentValue] = useState(0);
  const [applicationValue, setApplicationValue] = useState(0);
  const [documentError, setDocumentError] = useState(false);
  const [applicationTypeError, setApplicationTypeError] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [applicationObject, setApplicationObject] = useState({});

  const [isMandatory, setIsMandatory] = useState(null);
  const [applicationError, setApplicationError] = useState(false);
  const [applicationTypeId, setApplicationTypeId] = useState([]);

  const [applicationName, setApplicationName] = useState('');
  const [applicationId, setApplicationId] = useState(0);

  const [buttonStatus,setButtonStatus] = useState(false);

  const permissions = JSON.parse(localStorage.getItem('permissions'));

  useEffect(() => {
    get("ApplicationTypeDD/Index").then((res) => {
      setApplicationTypeId(res);
    });

    get(`DocumentDD/Index`).then((res) => {
      console.log("Checking document requirement Status", res);
      setDocument(res);
    });

    if (univerId != undefined) {
      get(
        `UniversityApplicationDocument/GetByUniversity/${univerId}`
      ).then((res) => {
        console.log("appDocuData", res);
        setApplicationList(res);
        if (res.length > 0) {
          setShowForm(true);
        } else {
          setShowForm(false);
          setSelectedId(0);
        }
      });
    }
  }, [success, univerId]);

  const documentOptions = document?.map((doc) => ({
    label: doc?.name,
    value: doc?.id,
  }));

  const applicationOptions = applicationTypeId?.map((app) => ({
    label: app?.name,
    value: app?.id,
  }));

  const selectDocument = (label, value) => {
    setDocumentError(false);
    setDocumentLabel(label);
    setDocumentValue(value);
  };

  const selectApplicationType = (label, value) => {
    setApplicationTypeError(false);
    setApplicationLabel(label);
    setApplicationValue(value);
  };

  // redirect to
  const backToProviderDetails = () => {
    history.push(`/providerDetails/${providerProfileId}`);
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addProviderUniversity/${providerProfileId}/${univerId}`);
    }
    if (tab == "2") {
      history.push(`/addProviderUniversityCampus/${providerProfileId}/${univerId}`);
    }
    if (tab == "3") {
      history.push(`/addProviderUniversityFinancial/${providerProfileId}/${univerId}`);
    }
    if (tab == "4") {
      history.push(`/addProviderUniversityFeatures/${providerProfileId}/${univerId}`);
    }
    if (tab == "5") {
      history.push(`/addProviderUniversityGallery/${providerProfileId}/${univerId}`);
    }
    if (tab == "6") {
      history.push(`/addProviderUniversityApplicationDocument/${providerProfileId}/${univerId}`);
    }
    if (tab == "7") {
      history.push(`/addProviderUniversityTemplateDocument/${providerProfileId}/${univerId}`);
    }
    if (tab == "8") {
      history.push(`/addProviderUniversityCommission/${providerProfileId}/${univerId}`);
    }
  };

  const toggleDanger = (p) => {
    console.log("dele", p);
    setApplicationId(p?.id);
    setApplicationName(p?.document?.name);
    setDeleteModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);

    for (var i of subData) {
      console.log("i", i);
    }

    if (documentValue == 0) {
      setDocumentError(true);
    }
    else if (applicationValue == 0) {
      setApplicationTypeError(true);
    }
    else if (isMandatory === null) {
      setApplicationError(true);
    } else {
      if (selectedId === 0) {
        setButtonStatus(true);
        post("UniversityApplicationDocument/Create", subData).then((res) => {
          console.log("document data", res);
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            // history.push('/addUniversityRequiredDocument');
            setSuccess(!success);
            setShowForm(!showForm);
            // setDocumentLabel("Select Requirement Status")
            // setDocumentValue(0);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put(`UniversityApplicationDocument/Update`, subData).then((res) => {
          // setuniversityId(res.data.result.universityId)
          setButtonStatus(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            // setSubmitData(false);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setShowForm(true);
            setSelectedId(0);

            setApplicationObject({});
            setSuccess(!success);
          }
        });
      }
    }
  };

  const onShow = () => {
    setShowForm(false);
    setDocumentLabel("Select Document");
    setDocumentValue(0);
    setApplicationValue(0);
    setApplicationLabel("Select Application Type");
    setIsMandatory(null);
    setApplicationObject({});
    // setFileList1(action?.document?.fileUrl);
    setSelectedId(0);
  };

  const back = () => {
    history.push(`/addProviderUniversityGallery/${providerProfileId}/${univerId}`);
  }
  const front = () => {
    history.push(`/addProviderUniversityTemplateDocument/${providerProfileId}/${univerId}`);
  }

  // redirect to Next Page
  const onNextPage = () => {
    history.push({
      pathname: `/addProviderUniversityTemplateDocument/${providerProfileId}/${univerId}`,
      id: univerId,
    });
  };

  const cancel = () => {
    setShowForm(true);
    setSelectedId(0);
    setDocumentLabel("Select Document");
    setDocumentValue(0);
    setApplicationValue(0);
    setApplicationLabel("Select Application Type");
    setIsMandatory(null);
    setApplicationObject({});
  };

  const handleDeletePermission = (id) => {
    setButtonStatus(true);
    const returnValue = remove(
      `UniversityApplicationDocument/Delete/${id}`
    ).then((action) => {
      setButtonStatus(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setApplicationId(0);
      setApplicationName('');
    });
  };

  const handleUpdate = (id) => {
    // setCampusId(id);
    setShowForm(false);

    get(`UniversityApplicationDocument/Get/${id}`).then((action) => {
      console.log("application update object", action);
      setApplicationObject(action);
      setDocumentLabel(action?.document?.name);
      setDocumentValue(action?.documentId);
      setApplicationValue(action?.applicationTypeId);
      setApplicationLabel(
        action?.applicationTypeId === 1
          ? "Home"
          : action?.applicationTypeId === 2
          ? "EU/UK"
          : "International"
      );
      setIsMandatory(`${action?.isMandatory}`);
      // setFileList1(action?.document?.fileUrl);
      setSelectedId(action?.id);
      console.log(action?.id);
    });
  };

  const handleIsMandatory = (event) => {
    console.log(event.target.value);
    setIsMandatory(event.target.value);
    setApplicationError(false);
  };
    return (
        <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Application Document</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToProviderDetails} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Provider Details
            </span>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                University Information
              </NavLink>
            </NavItem>
            <NavItem>
              {/* <NavLink disabled
                              active={activetab === '2'}
                              onClick={() =>toggle('2')}
                              > */}
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Campus Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Financial
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Features
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Gallery
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Application Document
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Template Document
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Commission
              </NavLink>
            </NavItem>

            {/* <NavItem>
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Required Document
              </NavLink>
            </NavItem> */}
          </Nav>

          <TabContent activeTab={activetab}>
            {applicationList.length > 0 ? (
              <div className="container test-score-div-1-style mt-4 mb-4">
                <span className="test-score-span-1-style">
                University application information is shown here.
                </span>
              </div>
            ) : null}

            <TabPane tabId="6">
              {showForm === false ? (
                <>
                  <Form onSubmit={handleSubmit} className="mt-5">
                    <div className="hedding-titel d-flex justify-content-between mb-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Application Document</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                    </div>

                    <FormGroup row className="has-icon-left position-relative">
                      <Input
                        type="hidden"
                        id="universityId"
                        name="universityId"
                        value={univerId}
                      />
                      {selectedId !== 0 ? (
                        <Input
                          type="hidden"
                          id="Id"
                          name="Id"
                          value={selectedId}
                        />
                      ) : null}
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Document Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={documentOptions}
                          value={{ label: documentLabel, value: documentValue }}
                          onChange={(opt) =>
                            selectDocument(opt.label, opt.value)
                          }
                          name="documentId"
                          id="documentId"
                        />

                        {documentError && (
                          <span className="text-danger">
                            Document is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Application Type{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={applicationOptions}
                          value={{
                            label: applicationLabel,
                            value: applicationValue,
                          }}
                          onChange={(opt) =>
                            selectApplicationType(opt.label, opt.value)
                          }
                          name="applicationTypeId"
                          id="applicationTypeId"
                        />

                        {applicationTypeError && (
                          <span className="text-danger">
                           Application type is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Is Mandatory <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isMandatory"
                            onChange={handleIsMandatory}
                            name="isMandatory"
                            value="true"
                            checked={isMandatory == "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isMandatory"
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isMandatory"
                            onChange={handleIsMandatory}
                            name="isMandatory"
                            value="false"
                            checked={isMandatory == "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isMandatory"
                          >
                            No
                          </Label>
                        </FormGroup>

                        <br />

                        {applicationError && (
                          <span className="text-danger">
                             Yes or no is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup className="has-icon-left position-relative">
                      {selectedId !== 0 ? (
                        <>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <Col md="5">
                              {
                                permissions?.includes(permissionList?.Add_universityApplicationdocument || permissionList?.Update_universityApplicationdocument) ?
                                <ButtonForFunction
                                color={"primary"}
                                type={"submit"}
                                className={"ml-lg-3 ml-sm-1 mt-3"}
                                name={"Save"}
                                disable={buttonStatus}
                              />
                              :
                              null
                              
                              }

                              <div>
                                <ButtonForFunction
                                  func={cancel}
                                  color={"danger uapp-form-button float-right"}
                                  name={"Cancel"}
                                  permission={6}
                                />
                              </div>
                            </Col>

                            
                          </FormGroup>
                        </>
                      ) : (
                        <>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <Col md="5">
                              <ButtonForFunction
                                color={"primary"}
                                type={"submit"}
                                className={"ml-lg-2 ml-sm-1 mt-3"}
                                name={"Save"}
                                disable={buttonStatus}
                                permission={6}
                              />

                            <div>
                              {selectedId !== 0 ||
                              applicationList.length > 0 ? (
                                <ButtonForFunction
                                  func={cancel}
                                  color={"danger uapp-form-button float-right"}
                                  name={"Cancel"}
                                  permission={6}
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                            
                            </Col>
                          </FormGroup>
                        </>
                      )}
                    </FormGroup>
                  </Form>
                </>
              ) : (
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                  }}
                >
                  <ButtonForFunction
                    func={onShow}
                    color={"primary uapp-form-button"}
                    name={"Add Another"}
                    permission={6}
                  />
                </FormGroup>
              )}

              {applicationList.length > 0 ? (
                <div className="table-responsive mt-4 mb-3">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>SL/NO</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicationList?.map((application, i) => (
                        <tr
                          key={application?.id}
                          style={{ textAlign: "center" }}
                        >
                          <th scope="row">{i + 1}</th>
                          <td>{application?.document?.name}</td>
                          <td>
                            {application?.applicationTypeId === 1
                              ? "Home"
                              : application?.applicationTypeId === 2
                              ? "EU/UK"
                              : "International"}
                          </td>

                          {/* <td>
                            <a
                              href={rootUrl + application?.document?.fileUrl}
                              target="_blank"
                              download
                            >
                              Download
                            </a>
                          </td> */}

                          <td>
                            <ButtonGroup>
                              <ButtonForFunction
                                func={() => handleUpdate(application?.id)}
                                className={"mx-1 btn-sm"}
                                color={"warning"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />

                              <ButtonForFunction
                                className={"mx-1 btn-sm"}
                                func={() => toggleDanger(application)}
                                color={"danger"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            </ButtonGroup>

                            <Modal
                              isOpen={deleteModal}
                              toggle={() => {
                                setDeleteModal(false);
                                setApplicationName('');
                                setApplicationId(0);
                              }}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>
                                    {applicationName}
                                  </b>{" "}
                                  ? Once Deleted it can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() =>
                                    handleDeletePermission(applicationId)
                                  }
                                  disabled={buttonStatus}
                                >
                                  YES
                                </Button>
                                <Button onClick={() => {
                                  setDeleteModal(false);
                                  setApplicationName('');
                                  setApplicationId(0);
                                }}>
                                  NO
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : null}

              {/* {applicationList?.length > 0 ? (
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                  }}
                >
                  <ButtonForFunction
                    func={onNextPage}
                    color={"warning uapp-form-button float-right"}
                    name={"Next Page"}
                    permission={6}
                  />
                </FormGroup>
              ) : null} */}
            </TabPane>
          </TabContent>
          <div className="d-flex justify-content-between">
            <Button color="warning" onClick={back}>
                    Previous Page
            </Button>

            <Button color="warning" onClick={front}>
                    Next Page
            </Button>

          </div>

        </CardBody>
      </Card>
      <br /> <br /> <br />
    </div>
    );
};

export default AddProviderUniversityApplicationDocument;