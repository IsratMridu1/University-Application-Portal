import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
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
  FormGroup,
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import "antd/dist/antd.css";
import get from "../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../constants/constants";
import remove from "../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import post from "../../../helpers/post";
import ButtonForFunction from "../Components/ButtonForFunction";
import SpanButton from "../Components/SpanButton";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import put from "../../../helpers/put";

const ApplicationDetails = () => {
  const [activetab, setActivetab] = useState("1");
  const [applicationInfo, setApplicationInfo] = useState({});
  const [studentProInfo, setStudentProInfo] = useState({});

  const [uploadedDocuData, setUploadedDocuData] = useState([]);
  const [success, setSuccess] = useState(false);

  const [docuType, setDocuType] = useState([]);
  const [docuTypeLabel, setDocuTypeLabel] = useState("Select Document Type");
  const [docuTypeValue, setDocuTypeValue] = useState(0);
  const [docutypeError, setDocuTypeError] = useState(false);

  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [uniStdIdModalOpen, setUniStdIdModalOpen] = useState(false);
  const [deliveryDD, setDeliveryDD] = useState([]);
  const [deliveryLabel, setDeliveryLabel] = useState("");
  const [deliveryValue, setDeliveryValue] = useState(0);

  const [financeDD, setFinanceDD] = useState([]);
  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [financeLabel, setFinanceLabel] = useState("");
  const [financeValue, setFinanceValue] = useState(0);

  const [statusDD, setStatusDD] = useState([]);
  const [statusLabel, setStatusLabel] = useState("");
  const [statusValue, setStatusvalue] = useState(0);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [enrollDD, setEnrollDD] = useState([]);
  const [enrollLabel, setEnrollLabel] = useState("");
  const [enrollValue, setEnrollValue] = useState(0);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  const [offerDD, setOfferDD] = useState([]);
  const [offerLabel, setOfferLabel] = useState("");
  const [offerValue, setOfferValue] = useState(0);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  const [uniAppDateModalOpen, setUniAppDateModalOpen] = useState(false);

  //   for document upload
  const [FileList2, setFileList2] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [studentDocuId, setStudentDocuId] = useState(0);
  const [delDocData, setdelDocData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);

  const [FileList1, setFileList1] = useState([]);
  const [docLevel, setDocLevel] = useState("");
  const [uploadError, setUploadError] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");

  // ELPT modal
  const [elptModalOpen, setElptModalOpen] = useState(false);
  const [elptModalOpen1, setElptModalOpen1] = useState(false);
  const [elptStatusDD, setElptStatusDD] = useState([]);
  const [elptStatusLabel, setElptStatusLabel] = useState("Select ELPT status");
  const [elptStatusValue, setElptStatusValue] = useState(0);
  const [elptStatusError, setElptStatusError] = useState(false);
  const [elptDate, setElptDate] = useState("");
  const [etaDate, setEtaDate] = useState("");
  const [eatDeadLine, setEtaDeadLine] = useState("");

  const { addToast } = useToasts();
  const history = useHistory();
  const { id, stdId } = useParams();
  const location = useLocation();

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    setUploadError(false);
    setFileList1(fileList);
    
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  useEffect(() => {
    get(`Application/Get/${id}`).then((res) => {
      console.log("Application", res);
      setApplicationInfo(res);
      setElptDate(handleDate(res?.elpt?.elptDate));
      setEtaDate(handleDate(res?.elpt?.eta));
      setEtaDeadLine(handleDate(res?.elpt?.etaDeadline));
    });

    // document upload
    get(`StudentUploadDocument/Index/${stdId}`).then((res) => {
      setUploadedDocuData(res);
    });

    get("DocumentDD/Index").then((res) => {
      setDocuType(res);
    });

    get(`StudentProfile/StudentApplication/${stdId}`).then((res) => {
     
      setStudentProInfo(res);
    });
    get("DeliveryPatternDD/index").then((res) => {
      setDeliveryDD(res);
    });
    get("StudentFinanceStatusDD/Index").then((res) => {
      setFinanceDD(res);
    });
    get("ApplicationStatusDD/Index").then((res) => {
      setStatusDD(res);
    });
    get("EnrollmentStatusDD/Index").then((res) => {
      setEnrollDD(res);
    });
    get("OfferStatusDD/Index").then((res) => {
      setOfferDD(res);
    });
    get("ElptStatusDD/Index").then((res) => {
      setElptStatusDD(res);
    });
  }, [id, stdId, success]);

  const docuTypeDD = docuType.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));
  const selectDocumentType = (label, value) => {
    setDocuTypeLabel(label);
    setDocuTypeValue(value);
    setDocuTypeError(false);
  };
  const deliveryMenu = deliveryDD.map((delivery) => ({
    label: delivery?.name,
    value: delivery?.id,
  }));
  const selectDelivery = (label, value) => {
    setDeliveryLabel(label);
    setDeliveryValue(value);
  };
  const financeMenu = financeDD.map((finance) => ({
    label: finance?.name,
    value: finance?.id,
  }));
  const selectFinance = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
  };
  const statusMenu = statusDD.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));
  const selectStatus = (label, value) => {
    setStatusLabel(label);
    setStatusvalue(value);
  };
  const enrollMenu = enrollDD.map((enroll) => ({
    label: enroll?.name,
    value: enroll?.id,
  }));
  const selectEnroll = (label, value) => {
    setEnrollLabel(label);
    setEnrollValue(value);
  };
  const offerMenu = offerDD.map((offer) => ({
    label: offer?.name,
    value: offer?.id,
  }));
  const selectOffer = (label, value) => {
    setOfferLabel(label);
    setOfferValue(value);
  };
  const elptStatusMenu = elptStatusDD.map((elpt) => ({
    label: elpt?.name,
    value: elpt?.id,
  }));
  const selectElpt = (label, value) => {
    setElptStatusLabel(label);
    setElptStatusValue(value);
    setElptStatusError(false);
  };

  const toggle = (tab) => {
    setActivetab(tab);
    // if (tab == "1") {
    //   history.push("/addUniversityCampus");
    // }
    if (tab == "2") {
      setActivetab(tab);
      //   history.push("/addUniversityFinancial");
    }
    if (tab == "3") {
      setActivetab(tab);
      //   history.push("/addUniversityFeatures");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleDate2 = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    // const x = localeDate.split(",")[0];
    return localeDate;
  };

  const changeHandler = (e, doc) => {
    setFileList2(e.target.files[0]);
    setIsSelected(true);
    setStudentDocuId(doc?.studentDocumentLevelId);
  };

  const toggleDanger = (docu) => {
    
    setdelDocData(docu);
    // localStorage.setItem("delDocNam", docu?.documentLevelName);
    // localStorage.setItem("delDocId", docu?.studentDocumentLevelId);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    localStorage.removeItem("delDocNam");
    localStorage.removeItem("delDocId");
  };

  const handleDeleteDocument = () => {
  
    const returnValue = remove(
      `StudentUploadDocument/LevelDelete/${delDocData?.studentDocumentLevelId}`
    ).then((action) => {
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      localStorage.removeItem("delDocNam");
      localStorage.removeItem("delDocId");
    });
  };

  const toggleDangerFile = (docFile) => {
    
    localStorage.setItem("delFileName", docFile?.studentDocumentFile?.fileName);
    localStorage.setItem("delFileId", docFile?.studentDocumentLevelId);
    setDeleteModal2(true);
  };

  // on Close Delete Modal
  const closeDeleteModalFile = () => {
    setDeleteModal2(false);
    localStorage.removeItem("delFileName");
    localStorage.removeItem("delFileId");
  };

  const handleDeleteFile = (id) => {
    const returnValue = remove(`StudentUploadDocument/FileDelete/${id}`).then(
      (action) => {
        setDeleteModal2(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        localStorage.removeItem("delFileName");
        localStorage.removeItem("delFileId");
      }
    );
  };

  const handleCardUpload = () => {
    const subData = new FormData();

    subData.append("studentId", stdId);
    subData.append("studentDocument", FileList2);
    subData.append("studentDocumentLevelId", parseInt(studentDocuId));

    // for (var i of subData) {
    
    // }

    if (studentDocuId !== 0) {
      post("StudentUploadDocument/FileCreate", subData).then((res) => {
        
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList2(undefined);
          setIsSelected(false);
          setStudentDocuId(0);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }  
  };

  if (
    isSelected === true &&
    FileList2 !== undefined &&
    typeof FileList2 === "object"
  ) {
    handleCardUpload();
    setFileList2(undefined);
    setIsSelected(false);
    setStudentDocuId(0);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append(
      "studentDocument",
      FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    );

    for (var i of subData) {
     
    }

    if (docuTypeValue == 0) {
      setDocuTypeError(true);
    }
    // if (FileList1.length < 1) {
    //   setUploadError(true);
    // }
    else {
      post("StudentUploadDocument/Create", subData).then((res) => {
        
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          // history.push('/addUniversityRequiredDocument');
          setSuccess(!success);
          setFileList1([]);
          setDocLevel("");
          setDocuTypeLabel("Select Document Type");
          setDocuTypeValue(0);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleRedirectToAppliPage = () => {
    if(location.providerId != undefined && location.managerId != undefined){
      history.push(`/providerAdmissionManager/${location.managerId}/${location.providerId}`)
    }
    else{
      history.push("/applications");
    }
    
  };

  const handleUpdateTestScores = (data) => {
   
    console.log("datas", data);

    localStorage.setItem("applictionStudentId", data?.id);
    localStorage.setItem("applictionStudentTypeId", data?.studentTypeId);
    localStorage.setItem("method", "put");

    history.push(`/addTestScore/${data?.id}/${1}`);
  };

  const handleEdit = (data) => {
   
    localStorage.setItem("applictionStudentId", data?.id);
    localStorage.setItem("applictionStudentTypeId", data?.studentTypeId);
    localStorage.setItem("method", "put");

    history.push(`/addStudentApplicationInformation/${data?.id}/${1}`);
  };

  const handleEditDeliveryPattern = (name, id) => {
    setDeliveryLabel(name);
    setDeliveryValue(id);
    setDeliveryModalOpen(true);
  };

  const handleEditUniStdId = (id) => {
    setUniStdIdModalOpen(true);
  };

  // on Close Modal
  const closeModal = () => {
    setDeliveryModalOpen(false);
    setDeliveryLabel("");
    setDeliveryValue(0);
    setFinanceLabel("");
    setFinanceValue(0);
    setFinanceModalOpen(false);
    setStatusLabel("");
    setStatusvalue(0);
    setStatusModalOpen(false);
    setEnrollLabel("");
    setEnrollValue(0);
    setEnrollModalOpen(false);
    setOfferLabel("");
    setOfferValue(0);
    setOfferModalOpen(false);
    setUniStdIdModalOpen(false);
    setUniAppDateModalOpen(false);
  };

  const handleDeliveryPatternSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    // for (var i of subData.values()) {
    
    // }

    // const subData = {
    //   id: applicationInfo?.id,
    //   statusId: deliveryValue,
    // };

    const returnvalue = put(`Application/UpdateDeliveryPattern`, subData).then(
      (action) => {
        setSuccess(!success);
        setDeliveryModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setDeliveryLabel("");
        setDeliveryValue(0);
      }
    );
  };

  const handleUniStdIdSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    const returnvalue = put(
      `Application/UpdateUniversityStudentId`,
      subData
    ).then((action) => {
      setSuccess(!success);
      setUniStdIdModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const handleUniAppDateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    const returnvalue = put(
      `Application/UpdateUniversityApplicationDate`,
      subData
    ).then((action) => {
      setSuccess(!success);
      setUniAppDateModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const handleEditFinance = (name, id) => {
    setFinanceLabel(name);
    setFinanceValue(id);
    setFinanceModalOpen(true);
  };

  const handleFinanceUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    const returnvalue = put(`Application/UpdateStudentFinance`, subData).then(
      (action) => {
        setSuccess(!success);
        setFinanceModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setFinanceLabel("");
        setFinanceValue(0);
      }
    );
  };

  const handleApplicationEdit = (name, id) => {
    setStatusLabel(name);
    setStatusvalue(id);
    setStatusModalOpen(true);
  };

  const handleEditUniAppDate = (id) => {
    setUniAppDateModalOpen(true);
  };

  const handleApplicationUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    const returnvalue = put(
      `Application/UpdateApplicationStatus`,
      subData
    ).then((action) => {
      setSuccess(!success);
      setStatusModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setStatusLabel("");
      setStatusvalue(0);
    });
  };

  const handleEditEnrol = (name, id) => {
    setEnrollLabel(name);
    setEnrollValue(id);
    setEnrollModalOpen(true);
  };

  const handleEnrollUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    const returnvalue = put(`Application/UpdateEnrollmentStatus`, subData).then(
      (action) => {
        setSuccess(!success);
        setEnrollModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setEnrollLabel("");
        setEnrollValue(0);
      }
    );
  };

  const handleOfferEdit = (name, id) => {
    setOfferLabel(name);
    setOfferValue(id);
    setOfferModalOpen(true);
  };

  const handleOfferUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    const returnvalue = put(`Application/UpdateOfferStatus`, subData).then(
      (action) => {
        setSuccess(!success);
        setOfferModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setOfferLabel("");
        setEnrollValue(0);
      }
    );
  };

  const handleOpenELPTModal = () => {
    setElptModalOpen(true);
  };

  // on close ELPT modal
  const closeElptModal = () => {
    setElptModalOpen(false);
  };
  // on close ELPT modal
  const closeElptModal1 = () => {
    setElptModalOpen1(false);
    setElptStatusError(false);
  };

  const handleSubmitElpt = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    if (elptStatusValue === 0) {
      setElptStatusError(true);
    } else {
      const returnvalue = post(`ELPT/Create`, subData).then((action) => {
        setSuccess(!success);
        setOfferModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        // setElptStatusLabel("Select ELPT status");
        // setElptStatusValue(0);
      });
    }
  };

  const handleElptupdate = (e) => {
  
    setElptStatusLabel(applicationInfo?.elpt?.elptStatus?.name);
    setElptStatusValue(applicationInfo?.elpt?.elptStatus?.id);
    setElptModalOpen1(true);
  };

  const handleSubmitElptupdate = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    const returnvalue = put(`ELPT/Update`, subData).then((action) => {
      setSuccess(!success);
      setElptModalOpen1(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setElptStatusLabel("Select ELPT status");
      setElptStatusValue(0);
    });
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Application Details</h3>
          <div className="page-header-back-to-home">
            <span onClick={handleRedirectToAppliPage} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {
                location.providerId != undefined && location.managerId != undefined ?
                "Back to Admission Manager Details"
                :
                "Back to Application List"
              }
            </span>
          </div>
        </CardHeader>
      </Card>
      <Row>
        <Col md="7">
          <Card>
            <CardBody>
              <Nav tabs className="row row-cols-md-3 row-cols-sm-1 text-center">
                <NavItem>
                  <NavLink
                    active={activetab === "1"}
                    onClick={() => toggle("1")}
                  >
                    Application Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activetab === "2"}
                    onClick={() => toggle("2")}
                  >
                    Documents
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activetab === "3"}
                    onClick={() => toggle("3")}
                  >
                    Profile
                  </NavLink>
                </NavItem>
              </Nav>

              {activetab == 1 ? (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="1">
                    <div className="my-4">
                      <h2 className="text-secondary">
                        {applicationInfo?.student?.nameTittle?.name}{" "}
                        {applicationInfo?.student?.firstName}{" "}
                        {applicationInfo?.student?.lastName}
                      </h2>
                    </div>

                    <div className="hedding-titel d-flex justify-content-between">
                      <div>
                        <h5>
                          {" "}
                          <b>Application Status</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>
                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Status:</b>
                          </td>

                          <td width="60%">
                            <div className="d-flex justify-content-between">
                              {applicationInfo?.applicationStatus?.name}

                              <SpanButton
                                icon={
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="fas fa-pencil-alt pencil-style"
                                  ></i>
                                }
                                func={() =>
                                  handleApplicationEdit(
                                    applicationInfo?.applicationStatus?.name,
                                    applicationInfo?.applicationStatus?.id
                                  )
                                }
                                permission={6}
                              />

                              <Modal
                                isOpen={statusModalOpen}
                                toggle={closeModal}
                                className="uapp-modal"
                              >
                                <ModalHeader>
                                  Update Application Status
                                </ModalHeader>
                                <ModalBody>
                                  <Form
                                    onSubmit={handleApplicationUpdateSubmit}
                                  >
                                    <input
                                      type="hidden"
                                      name="id"
                                      id="id"
                                      value={applicationInfo?.id}
                                    />

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          Application Status{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Select
                                          options={statusMenu}
                                          value={{
                                            label: statusLabel,
                                            value: statusValue,
                                          }}
                                          onChange={(opt) =>
                                            selectStatus(opt.label, opt.value)
                                          }
                                          name="statusId"
                                          id="statusId"
                                        />
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      className="has-icon-left position-relative"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
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

                                      {/* }  */}
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Offer Status:</b>
                          </td>

                          <td width="60%">
                            <div className="d-flex justify-content-between">
                              {applicationInfo?.offerStatus?.name}
                              <SpanButton
                                icon={
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="fas fa-pencil-alt pencil-style"
                                  ></i>
                                }
                                func={() =>
                                  handleOfferEdit(
                                    applicationInfo?.offerStatus?.name,
                                    applicationInfo?.offerStatus?.id
                                  )
                                }
                                permission={6}
                              />
                              <Modal
                                isOpen={offerModalOpen}
                                toggle={closeModal}
                                className="uapp-modal"
                              >
                                <ModalHeader>Update Offer Status</ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={handleOfferUpdateSubmit}>
                                    <input
                                      type="hidden"
                                      name="id"
                                      id="id"
                                      value={applicationInfo?.id}
                                    />

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          Offer Status{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Select
                                          options={offerMenu}
                                          value={{
                                            label: offerLabel,
                                            value: offerValue,
                                          }}
                                          onChange={(opt) =>
                                            selectOffer(opt.label, opt.value)
                                          }
                                          name="statusId"
                                          id="statusId"
                                        />
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      className="has-icon-left position-relative"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
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

                                      {/* }  */}
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Enrolment Status:</b>
                          </td>

                          <td width="60%">
                            <div className="d-flex justify-content-between">
                              {applicationInfo?.enrollmentStatus?.name ===
                              "Withdrawn" ? (
                                <>
                                  <div className="d-flex flex-column">
                                    {applicationInfo?.enrollmentStatus?.name}{" "}
                                    <span style={{ color: "red" }}>
                                      {applicationInfo?.withdrawnReason}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>{applicationInfo?.enrollmentStatus?.name}</>
                              )}

                              <SpanButton
                                icon={
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="fas fa-pencil-alt pencil-style"
                                  ></i>
                                }
                                func={() =>
                                  handleEditEnrol(
                                    applicationInfo?.enrollmentStatus?.name,
                                    applicationInfo?.enrollmentStatus?.id
                                  )
                                }
                                permission={6}
                              />

                              <Modal
                                isOpen={enrollModalOpen}
                                toggle={closeModal}
                                className="uapp-modal"
                              >
                                <ModalHeader>
                                  Update Enrolment Status
                                </ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={handleEnrollUpdateSubmit}>
                                    <input
                                      type="hidden"
                                      name="id"
                                      id="id"
                                      value={applicationInfo?.id}
                                    />

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          Enrolment Status{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Select
                                          isDisabled={
                                            applicationInfo?.enrollmentStatus
                                              ?.name === "Registered"
                                              ? true
                                              : false
                                          }
                                          options={enrollMenu}
                                          value={{
                                            label: enrollLabel,
                                            value: enrollValue,
                                          }}
                                          onChange={(opt) =>
                                            selectEnroll(opt.label, opt.value)
                                          }
                                          name="statusId"
                                          id="statusId"
                                        />
                                        {applicationInfo?.enrollmentStatus
                                          ?.name === "Registered" ? (
                                          <div className="text-danger">
                                            Once the enrolment status is changed to "Registered" it can't be changed again.
                                          </div>
                                        ) : null}
                                      </Col>
                                    </FormGroup>

                                    {enrollValue === 4 ? (
                                      <FormGroup
                                        row
                                        className="has-icon-left position-relative"
                                      >
                                        <Col md="4">
                                          <span>
                                            Withdrwan Reason{" "}
                                            <span className="text-danger">
                                              *
                                            </span>{" "}
                                          </span>
                                        </Col>
                                        <Col md="8">
                                          <Input
                                            type="text"
                                            defaultValue={
                                              applicationInfo?.withdrawnReason
                                            }
                                            name="withdrawnReason"
                                            id="withdrawnReason"
                                            placeholder="Write Withdrwan Reason"
                                          />
                                        </Col>
                                      </FormGroup>
                                    ) : null}

                                    <FormGroup
                                      className="has-icon-left position-relative"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Button
                                        color="danger"
                                        className="mr-1 mt-3"
                                        onClick={closeModal}
                                      >
                                        Close
                                      </Button>

                                      <CustomButtonRipple
                                        isDisabled={
                                          applicationInfo?.enrollmentStatus
                                            ?.name === "Registered"
                                            ? true
                                            : false
                                        }
                                        color={"primary"}
                                        type={"submit"}
                                        className={"mr-1 mt-3"}
                                        name={"Submit"}
                                        permission={6}
                                      />

                                      {/* }  */}
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Finance</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Student Finance Status:</b>
                          </td>

                          <td width="60%">
                            <div className="d-flex justify-content-between">
                              {applicationInfo?.studentFinanceStatus?.name}
                              <SpanButton
                                icon={
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="fas fa-pencil-alt pencil-style"
                                  ></i>
                                }
                                func={() =>
                                  handleEditFinance(
                                    applicationInfo?.studentFinanceStatus?.name,
                                    applicationInfo?.studentFinanceStatus?.id
                                  )
                                }
                                permission={6}
                              />

                              <Modal
                                isOpen={financeModalOpen}
                                toggle={closeModal}
                                className="uapp-modal"
                              >
                                <ModalHeader>
                                  Update Student Finance Status
                                </ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={handleFinanceUpdateSubmit}>
                                    <input
                                      type="hidden"
                                      name="id"
                                      id="id"
                                      value={applicationInfo?.id}
                                    />

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          Student Finance{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Select
                                          options={financeMenu}
                                          value={{
                                            label: financeLabel,
                                            value: financeValue,
                                          }}
                                          onChange={(opt) =>
                                            selectFinance(opt.label, opt.value)
                                          }
                                          name="statusId"
                                          id="statusId"
                                        />
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      className="has-icon-left position-relative"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
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

                                      {/* }  */}
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Application Information</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Delivery Pattern:</b>
                          </td>

                          <td width="60%">
                            <div className="d-flex justify-content-between">
                              {applicationInfo?.deliveryPattern?.name}
                              <SpanButton
                                icon={
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="fas fa-pencil-alt pencil-style"
                                  ></i>
                                }
                                func={() =>
                                  handleEditDeliveryPattern(
                                    applicationInfo?.deliveryPattern?.name,
                                    applicationInfo?.deliveryPattern?.id
                                  )
                                }
                                permission={6}
                              />

                              <Modal
                                isOpen={deliveryModalOpen}
                                toggle={closeModal}
                                className="uapp-modal"
                              >
                                <ModalHeader>
                                  Update Delivery Pattern
                                </ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={handleDeliveryPatternSubmit}>
                                    <input
                                      type="hidden"
                                      name="id"
                                      id="id"
                                      value={applicationInfo?.id}
                                    />

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          Delivery Pattern{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Select
                                          options={deliveryMenu}
                                          value={{
                                            label: deliveryLabel,
                                            value: deliveryValue,
                                          }}
                                          onChange={(opt) =>
                                            selectDelivery(opt.label, opt.value)
                                          }
                                          name="statusId"
                                          id="statusId"
                                        />
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      className="has-icon-left position-relative"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
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

                                      {/* }  */}
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Application Type:</b>
                          </td>

                          <td width="60%">
                            {applicationInfo?.student?.studentType?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Uapp Application date:</b>
                          </td>

                          <td width="60%">
                            {applicationInfo?.applicationTime ? (
                              <>
                                {handleDate(applicationInfo?.applicationTime)}
                              </>
                            ) : null}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>University Student Id:</b>
                          </td>

                          <td width="60%">
                            <div className="d-flex justify-content-between">
                              {applicationInfo?.universityStudentId}
                              <SpanButton
                                icon={
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="fas fa-pencil-alt pencil-style"
                                  ></i>
                                }
                                func={() =>
                                  handleEditUniStdId(
                                    applicationInfo?.universityStudentId
                                  )
                                }
                                permission={6}
                              />

                              <Modal
                                isOpen={uniStdIdModalOpen}
                                toggle={closeModal}
                                className="uapp-modal"
                              >
                                <ModalHeader>
                                  Update University Student Id
                                </ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={handleUniStdIdSubmit}>
                                    <input
                                      type="hidden"
                                      name="id"
                                      id="id"
                                      value={applicationInfo?.id}
                                    />

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>University Student Id </span>
                                      </Col>
                                      <Col md="8">
                                        <Input
                                          type="text"
                                          defaultValue={
                                            applicationInfo?.universityStudentId
                                          }
                                          name="universityStudentId"
                                          id="universityStudentId"
                                        />
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      className="has-icon-left position-relative"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
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

                                      {/* }  */}
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>University Application Date:</b>
                          </td>

                          <td width="60%">
                            <div className="d-flex justify-content-between">
                              {applicationInfo?.universityApplicationDate ? (
                                <>
                                  {handleDate(
                                    applicationInfo?.universityApplicationDate
                                  )}
                                </>
                              ) : null}
                              <SpanButton
                                icon={
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="fas fa-pencil-alt pencil-style"
                                  ></i>
                                }
                                func={() =>
                                  handleEditUniAppDate(
                                    applicationInfo?.universityApplicationDate
                                  )
                                }
                                permission={6}
                              />

                              <Modal
                                isOpen={uniAppDateModalOpen}
                                toggle={closeModal}
                                className="uapp-modal"
                              >
                                <ModalHeader>
                                  Update University Application Date
                                </ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={handleUniAppDateSubmit}>
                                    <input
                                      type="hidden"
                                      name="id"
                                      id="id"
                                      value={applicationInfo?.id}
                                    />

                                    <FormGroup
                                      row
                                      className="has-icon-left position-relative"
                                    >
                                      <Col md="4">
                                        <span>
                                          University Application Date{" "}
                                        </span>
                                      </Col>
                                      <Col md="8">
                                        <Input
                                          type="Date"
                                          defaultValue={handleDate(
                                            applicationInfo?.universityApplicationDate
                                          )}
                                          name="universityApplicationDate"
                                          id="universityApplicationDate"
                                        />
                                      </Col>
                                    </FormGroup>

                                    <FormGroup
                                      className="has-icon-left position-relative"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
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

                                      {/* }  */}
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>University Name:</b>
                          </td>

                          <td width="60%">
                            {applicationInfo?.university?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Campus Name:</b>
                          </td>

                          <td width="60%">
                            {applicationInfo?.campus?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Program-level:</b>
                          </td>

                          <td width="60%">
                            {applicationInfo?.subject?.programLevel?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Course Name:</b>
                          </td>

                          <td width="60%">{applicationInfo?.subject?.name}</td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Intake:</b>
                          </td>

                          <td width="60%">{applicationInfo?.intake?.name}</td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Additional Message:</b>
                          </td>

                          <td width="60%">
                            {applicationInfo?.additionalMessage}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Interview</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Status:</b>
                          </td>

                          <td width="60%">
                            {applicationInfo?.interviewStatus?.name}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4 mt-5">
                      <div>
                        <h5>
                          {" "}
                          <b>ELPT</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      <div className="text-right">
                        {/* <span> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}
                        {
                          applicationInfo?.elpt !== null ?
                          <SpanButton
                          icon={
                            <i
                              style={{ cursor: "pointer" }}
                              className="fas fa-pencil-alt pencil-style"
                            ></i>
                          }
                          func={handleElptupdate}
                          permission={6}
                        />
                        :
                        null
                        }

                        <Modal
                          size="lg"
                          isOpen={elptModalOpen1}
                          toggle={closeElptModal1}
                          className="uapp-modal2"
                        >
                          <ModalHeader>Update ELPT</ModalHeader>
                          <ModalBody>
                            <Form onSubmit={handleSubmitElptupdate}>
                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Input
                                  type="hidden"
                                  id="applicationId"
                                  name="applicationId"
                                  value={id}
                                />
                                <Input
                                  type="hidden"
                                  id="id"
                                  name="id"
                                  value={applicationInfo?.elpt?.id}
                                />
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ELPT Date</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="date"
                                    name="ElptDate"
                                    id="ElptDate"
                                    defaultValue={elptDate}
                                  />
                                  {/* <div className="form-control-position">
                                <User size={15} />
                            </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ELPT Time</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="ElptTime"
                                    id="ElptTime"
                                    defaultValue={
                                      applicationInfo?.elpt?.elptTime
                                    }
                                    placeholder="Enter ELPT Time"
                                  />

                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ETA Date</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="date"
                                    name="eta"
                                    id="eta"
                                    defaultValue={etaDate}
                                  />

                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ETA Deadline</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="date"
                                    name="etaDeadLine"
                                    id="etaDeadLine"
                                    defaultValue={eatDeadLine}
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Reading</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="reading"
                                    id="reading"
                                    defaultValue={
                                      applicationInfo?.elpt?.reading
                                    }
                                    placeholder="Enter Reading Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Writting </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="writting"
                                    id="writting"
                                    defaultValue={
                                      applicationInfo?.elpt?.writting
                                    }
                                    placeholder="Enter Writting Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Listening </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="listening"
                                    id="listening"
                                    defaultValue={
                                      applicationInfo?.elpt?.listening
                                    }
                                    placeholder="Enter Listening Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Speaking </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="speaking"
                                    id="speaking"
                                    defaultValue={
                                      applicationInfo?.elpt?.speaking
                                    }
                                    placeholder="Enter Speaking Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Overall </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="overall"
                                    id="overall"
                                    defaultValue={
                                      applicationInfo?.elpt?.overall
                                    }
                                    placeholder="Enter Overall Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Result / Status </span>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </Col>
                                <Col md="7">
                                  <Select
                                    options={elptStatusMenu}
                                    value={{
                                      label: elptStatusLabel,
                                      value: elptStatusValue,
                                    }}
                                    onChange={(opt) =>
                                      selectElpt(opt.label, opt.value)
                                    }
                                    name="elptStatusId"
                                    id="elptStatusId"
                                  />
                                  {elptStatusError ? (
                                    <div className="text-danger">
                                      Please provide ELPT status
                                    </div>
                                  ) : null}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <Col md="5">
                                  <CustomButtonRipple
                                    color={"primary"}
                                    type={"submit"}
                                    className={"ml-5 mt-3"}
                                    name={"Submit"}
                                    permission={6}
                                  />
                                </Col>
                              </FormGroup>
                            </Form>
                          </ModalBody>

                          <ModalFooter>
                            {/* <Button
                              color="danger"
                              onClick={() =>
                                handleDeleteDocumentGroup(
                                  localStorage.getItem("delDocuGroupId")
                                )
                              }
                            >
                              YES
                            </Button> */}
                            <Button color="danger" onClick={closeElptModal1}>
                              Close
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </div>

                    {applicationInfo?.elpt === null ? (
                      <>
                        <ButtonForFunction
                          func={handleOpenELPTModal}
                          className={"badge-primary"}
                          name={<b>Add ELPT</b>}
                          permission={6}
                        />

                        <Modal
                          size="lg"
                          isOpen={elptModalOpen}
                          toggle={closeElptModal}
                          className="pt-5 uapp-modal2"
                        >
                          <ModalHeader>Add ELPT</ModalHeader>
                          <ModalBody>
                            <Form onSubmit={handleSubmitElpt}>
                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Input
                                  type="hidden"
                                  id="applicationId"
                                  name="applicationId"
                                  value={id}
                                />
                                {/* <Input
                                  type="hidden"
                                  id="Id"
                                  name="Id"
                                  value={selectedId}
                                /> */}
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ELPT Date</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="date"
                                    name="ElptDate"
                                    id="ElptDate"
                                    // defaultValue={sDate}
                                  />
                                  {/* <div className="form-control-position">
                                <User size={15} />
                            </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ELPT Time</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="ElptTime"
                                    id="ElptTime"
                                    // defaultValue={campObj?.campusCity}
                                    placeholder="Enter ELPT Time"
                                    required
                                  />

                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ETA Date</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="date"
                                    name="eta"
                                    id="eta"
                                    // defaultValue={sDate}
                                  />

                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>ETA Deadline</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="date"
                                    name="etaDeadLine"
                                    id="etaDeadLine"
                                    // defaultValue={sDate}
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Reading</span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="reading"
                                    id="reading"
                                    // defaultValue={campObj?.addressLine}
                                    placeholder="Enter Reading Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Writting </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="writting"
                                    id="writting"
                                    // defaultValue={campObj?.totalStudent}
                                    placeholder="Enter Writting Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Listening </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="listening"
                                    id="listening"
                                    // defaultValue={campObj?.internationalStudent}
                                    placeholder="Enter Listening Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Speaking </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="speaking"
                                    id="speaking"
                                    // defaultValue={campObj?.avarageTutionFee}
                                    placeholder="Enter Speaking Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Overall </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="text"
                                    name="overall"
                                    id="overall"
                                    // defaultValue={campObj?.avarageLivingCost}
                                    placeholder="Enter Overall Mark"
                                  />
                                  {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="2">
                                  <span>Result / Status </span>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </Col>
                                <Col md="7">
                                  <Select
                                    options={elptStatusMenu}
                                    value={{
                                      label: elptStatusLabel,
                                      value: elptStatusValue,
                                    }}
                                    onChange={(opt) =>
                                      selectElpt(opt.label, opt.value)
                                    }
                                    name="elptStatusId"
                                    id="elptStatusId"
                                  />
                                  {elptStatusError ? (
                                    <div className="text-danger">
                                      ELPT status is required
                                    </div>
                                  ) : null}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <Col md="5">
                                  <CustomButtonRipple
                                    color={"primary"}
                                    type={"submit"}
                                    className={"ml-5 mt-3"}
                                    name={"Submit"}
                                    permission={6}
                                  />
                                </Col>
                              </FormGroup>
                            </Form>
                          </ModalBody>

                          <ModalFooter>
                            {/* <Button
                              color="danger"
                              onClick={() =>
                                handleDeleteDocumentGroup(
                                  localStorage.getItem("delDocuGroupId")
                                )
                              }
                            >
                              YES
                            </Button> */}
                            <Button color="danger" onClick={closeElptModal}>
                              Close
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </>
                    ) : (
                      <Table className="table-bordered mt-4">
                        <tbody>
                          <tr>
                            <td width="40%">
                              <b>Status:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.elptStatus?.name}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Date:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.elptDate ? (
                                <>
                                  {handleDate(applicationInfo?.elpt?.elptDate)}
                                </>
                              ) : null}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Time:</b>
                            </td>

                            <td width="60%">
                              <>{applicationInfo?.elpt?.elptTime}</>
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>ETA:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.eta ? (
                                <>{handleDate(applicationInfo?.elpt?.eta)}</>
                              ) : null}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>ETA Deadline:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.etaDeadline ? (
                                <>
                                  {handleDate(
                                    applicationInfo?.elpt?.etaDeadline
                                  )}
                                </>
                              ) : null}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Reading:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.reading}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Writting:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.writting}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Listening:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.listening}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Speaking:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.speaking}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Overall:</b>
                            </td>

                            <td width="60%">
                              {applicationInfo?.elpt?.overall}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    )}
                  </TabPane>
                </TabContent>
              ) : activetab == 2 ? (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="2">
                    <div className="">
                      {uploadedDocuData.map((docu, i) => (
                        <div key={i} className="card mb-3 file-upload-border">
                          <div className="container  py-3 flex-style ">
                            <div>
                              <h5 className="document-title">
                                {docu?.documentLevelName}
                              </h5>

                              <h5 className="document-type-style">
                                Document Type: {docu?.document?.name}{" "}
                              </h5>
                            </div>

                            <div
                              className="row"
                              // onClick={() =>
                                
                              // }
                            >
                              {docu?.studentDocumentFile === null ? (
                                <div className="col-4">
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="image-upload"
                                  >
                                    <label for={i}>
                                      <i
                                        style={{
                                          fontSize: "50px",
                                          cursor: "pointer",
                                        }}
                                        className="fas fa-arrow-alt-circle-up text-danger"
                                      ></i>
                                    </label>

                                    <input
                                      name={i}
                                      id={i}
                                      type="file"
                                      onChange={(e) => changeHandler(e, docu)}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="col-4">
                                  <a
                                    className="text-decoration-none"
                                    href={
                                      rootUrl +
                                      docu?.studentDocumentFile?.fileUrl
                                    }
                                    target="_blank"
                                    download
                                  >
                                    <i
                                      style={{ fontSize: "50px" }}
                                      class="fas fa-arrow-alt-circle-down text-success"
                                    ></i>
                                  </a>
                                </div>
                              )}

                              <div className="col-4"></div>

                              <div className="col-4">
                                <Icon.XCircle
                                  onClick={() => toggleDanger(docu)}
                                  className=" ml-2 text-danger cross-icon-style"
                                />
                              </div>

                              <Modal
                                isOpen={deleteModal}
                                toggle={closeDeleteModal}
                                className="uapp-modal"
                              >
                                <ModalBody>
                                  <p>
                                    Are You Sure to Delete this{" "}
                                    <b>{localStorage.getItem("delDocNam")}</b> ?
                                    Once Deleted it can't be Undone!
                                  </p>
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    // onClick={() =>
                                    //   handleDeleteDocument(
                                    //     localStorage.getItem("delDocId")
                                    //   )
                                    // }
                                    onClick={handleDeleteDocument}
                                  >
                                    YES
                                  </Button>
                                  <Button onClick={closeDeleteModal}>NO</Button>
                                </ModalFooter>
                              </Modal>
                            </div>
                          </div>
                          <div class="card-footer uapp-card-bg text-white d-flex justify-content-between">
                            {docu?.studentDocumentFile != null ? (
                              <>
                                <div>
                                  1 file uploaded:{" "}
                                  <span className="ml-2  px-2">
                                    {docu?.studentDocumentFile?.fileName}{" "}
                                    <i
                                      onClick={() => toggleDangerFile(docu)}
                                      title="delete file"
                                      style={{ cursor: "pointer" }}
                                      className="fas fa-times text-warning "
                                    ></i>
                                  </span>
                                </div>
                                <div>
                                  {docu?.createdBy} at{" "}
                                  {handleDate2(docu?.createdOn)}
                                </div>
                              </>
                            ) : (
                              <div>0 file uploaded</div>
                            )}

                            {/* delete file modal */}
                            <Modal
                              isOpen={deleteModal2}
                              toggle={closeDeleteModalFile}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>{localStorage.getItem("delFileName")}</b> ?
                                  Once Deleted it can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() =>
                                    handleDeleteFile(
                                      localStorage.getItem("delFileId")
                                    )
                                  }
                                >
                                  YES
                                </Button>
                                <Button onClick={closeDeleteModalFile}>
                                  NO
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Form onSubmit={handleSubmit} className="mt-4 container">
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={stdId}
                      />

                      <FormGroup row>
                        <Col md="12">
                          <p>
                            Document Title{" "}
                            <span className="text-danger">*</span>{" "}
                          </p>

                          <Input
                            type="text"
                            value={docLevel}
                            name="documentLevelName"
                            id="documentLevelName"
                            placeholder="Write Document Title"
                            onChange={(e) => setDocLevel(e.target.value)}
                            required
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="12">
                          <p>
                            Document Type <span className="text-danger">*</span>{" "}
                          </p>

                          <Select
                            options={docuTypeDD}
                            value={{
                              label: docuTypeLabel,
                              value: docuTypeValue,
                            }}
                            onChange={(opt) =>
                              selectDocumentType(opt.label, opt.value)
                            }
                            name="documentId"
                            id="documentId"
                          />
                        </Col>

                        {docutypeError && (
                          <span className="text-danger ml-3">
                            Document type is required
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        {/* <Col md="2">
                        <span>
                          Upload Document <span className="text-danger">*</span>{" "}
                        </span>
                      </Col> */}
                        <Col md="8">
                          {/* <div className="row"> */}
                            <div className="mb-2">Upload Document</div>

                            {/* {applicationObject?.document ? (
                            <div className="col-md-3">
                              <Image
                                width={104}
                                height={104}
                                src={
                                  rootUrl + applicationObject?.document?.thumbnailUrl
                                }
                              />
                            </div>
                          ) : null} */}

                            <div className="col-md-3">
                              <Upload
                                listType="picture-card"
                                multiple={false}
                                fileList={FileList1}
                                onPreview={handlePreview1}
                                onChange={handleChange1}
                                beforeUpload={(file) => {
                                  return false;
                                }}
                              >
                                {FileList1.length < 1 ? (
                                  <div
                                    className="text-danger"
                                    style={{ marginTop: 8 }}
                                  >
                                    <Icon.Upload />
                                    <br />
                                    <span>Upload Here</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Upload>
                              <AntdModal
                                visible={previewVisible1}
                                title={previewTitle1}
                                footer={null}
                                onCancel={handleCancel1}
                              >
                                <img
                                  alt="example"
                                  style={{ width: "100%" }}
                                  src={previewImage1}
                                />
                              </AntdModal>
                            </div>
                          {/* </div> */}

                          {/* {uploadError && (
                      <span className="text-danger">
                        Document is required
                      </span>
                    )} */}
                        </Col>
                      </FormGroup>

                      <FormGroup
                        className="has-icon-left position-relative"
                        style={{ display: "flex" }}
                      >
                        <ButtonForFunction
                          type={"submit"}
                          className={"mr-1 mt-3 badge-primary"}
                          name={"Upload"}
                          permission={6}
                        />
                      </FormGroup>
                    </Form>
                  </TabPane>
                </TabContent>
              ) : (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="3">
                    <div className="hedding-titel d-flex justify-content-between">
                      <div className="my-4">
                        <h2 className="text-secondary">
                          {studentProInfo?.nameTittle}{" "}
                          {studentProInfo?.firstName} {studentProInfo?.lastName}
                        </h2>
                      </div>
                      <div className="text-right edit-style  p-3">
                        <SpanButton
                          icon={
                            <i className="fas fa-pencil-alt pencil-style"></i>
                          }
                          func={() => handleEdit(studentProInfo)}
                          permission={6}
                        />
                      </div>
                    </div>
                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Application Information</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>UAPP ID:</b>
                          </td>

                          <td width="60%">{studentProInfo?.studentViewId}</td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Application Type:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.applicationInfos?.studentTypeName}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Move in UK:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.applicationInfos?.dateOfMoveToUk}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>
                              Stayed in Outside UK/EU Territory in Last 3 Years:
                            </b>
                          </td>

                          <td width="60%">
                            {
                              studentProInfo?.applicationInfos
                                ?.isStayedOutsideEU_UkinLast3Years
                            }
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Pre-Settlement Status:</b>
                          </td>

                          <td width="60%">
                            {
                              studentProInfo?.applicationInfos
                                ?.isHavePre_Settlementstatus
                            }
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Share Code:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.applicationInfos?.code}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Personal Information</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Name:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.firstName}{" "}
                            {studentProInfo?.lastName}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Date of Birth:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.dateOfBirth ? (
                              <>{handleDate(studentProInfo?.dateOfBirth)}</>
                            ) : null}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Nationality:</b>
                          </td>

                          <td width="60%">{studentProInfo?.nationality}</td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Country of Birth:</b>
                          </td>

                          <td width="60%">{studentProInfo?.birthCountry}</td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Passport Number:</b>
                          </td>

                          <td width="60%">{studentProInfo?.passportNumber}</td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Gender:</b>
                          </td>

                          <td width="60%">{studentProInfo?.gender}</td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Marital Status:</b>
                          </td>

                          <td width="60%">{studentProInfo?.maritalStatus}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Correspondence Address</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>House No. :</b>
                          </td>

                          <td width="60%">
                            {/* {studentProInfo?.firstName}{" "}
                            {studentProInfo?.lastName} */}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Street Address:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.studentContactInfos?.addressLine}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>City:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.studentContactInfos?.city}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Post / Zip Code:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.studentContactInfos?.zipCode}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Country:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.studentContactInfos?.country}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Student Contact Information</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Mobile Number :</b>
                          </td>

                          <td width="60%">{studentProInfo?.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Email Address:</b>
                          </td>

                          <td width="60%">{studentProInfo?.email}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Education/Qualification</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    {studentProInfo?.educationInfos === null ? (
                      <Table className="table-bordered mt-4">
                        <tbody>
                          <tr>
                            <td width="40%">
                              <b>Have you ever studied?</b>
                            </td>

                            <td width="60%">No</td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : (
                      <Table className="table-bordered mt-4">
                        <tbody>
                          <tr>
                            <td width="40%">
                              <b>Qualification Level:</b>
                            </td>

                            <td width="60%">
                              {
                                studentProInfo?.educationInfos
                                  ?.educationLevelName
                              }
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Qualification Subject:</b>
                            </td>

                            <td width="60%">
                              {
                                studentProInfo?.educationInfos
                                  ?.qualificationSubject
                              }
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Final Grade Awarded:</b>
                            </td>

                            <td width="60%">
                              {studentProInfo?.educationInfos?.finalGrade}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>From Date:</b>
                            </td>

                            <td width="60%">
                              {handleDate(
                                studentProInfo?.educationInfos
                                  ?.attendedInstitutionFrom
                              )}
                            </td>
                          </tr>
                          {studentProInfo?.educationInfos?.stillStudying ? (
                            <tr>
                              <td width="40%">
                                <b>Still Studying:</b>
                              </td>

                              <td width="60%">Yes</td>
                            </tr>
                          ) : (
                            <tr>
                              <td width="40%">
                                <b>To Date:</b>
                              </td>

                              <td width="60%">
                                {handleDate(
                                  studentProInfo?.educationInfos
                                    ?.attendedInstitutionTo
                                )}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td width="40%">
                              <b>Name of Institution:</b>
                            </td>

                            <td width="60%">
                              {
                                studentProInfo?.educationInfos
                                  ?.nameOfInstitution
                              }
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Country of Completed Qualification:</b>
                            </td>

                            <td width="60%">
                              {studentProInfo?.educationInfos?.country}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    )}

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Test Scores</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                    </div>
                    <ButtonForFunction
                      className={"p-2"}
                      func={() => handleUpdateTestScores(studentProInfo)}
                      name={"View Test Scores"}
                      color={"primary"}
                      permission={6}
                    />

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Employment History</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Job Title:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.experienceinfo?.jobTitle}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Company Name:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.experienceinfo?.companyName}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Employeement Details:</b>
                          </td>

                          <td width="60%">
                            {
                              studentProInfo?.experienceinfo
                                ?.employeementDetails
                            }
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>From Date:</b>
                          </td>

                          <td width="60%">
                            {handleDate(
                              studentProInfo?.experienceinfo?.startDate
                            )}
                          </td>
                        </tr>
                        {studentProInfo?.experienceinfo?.isStillWorking ? (
                          <tr>
                            <td width="40%">
                              <b>Currently Working:</b>
                            </td>

                            <td width="60%">Yes</td>
                          </tr>
                        ) : (
                          <tr>
                            <td width="40%">
                              <b>To Date:</b>
                            </td>

                            <td width="60%">
                              {handleDate(
                                studentProInfo?.experienceinfo?.endDate
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Reference Details</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Reference Name:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.referenceName}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Relation:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.referenceTypeName}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Reference Institute/Company:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.institute_Company}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Phone Number:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.phoneNumber}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Email Address:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.emailAddress}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Country:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.country}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Street Address:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.addressLine}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>City:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.city}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>State:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.referenceInfo?.state}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Personal Statement</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>
                    {studentProInfo?.profilePersonalStatement ? (
                      <div
                        className="container py-3"
                        style={{ border: "1px solid rgb(222, 226, 230)" }}
                      >
                        {studentProInfo?.profilePersonalStatement?.statement}
                      </div>
                    ) : (
                      <div
                        className="container"
                        style={{ border: "1px solid rgb(222, 226, 230)" }}
                      >
                        Statement is not available.
                      </div>
                    )}

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Other Information</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>
                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Disability:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.profileOtherInfo
                              ?.isHaveDisability ? (
                              <>Yes</>
                            ) : (
                              <>No</>
                            )}
                          </td>
                        </tr>
                        {studentProInfo?.profileOtherInfo?.isHaveDisability ? (
                          <tr>
                            <td width="40%">
                              <b>Disability Description:</b>
                            </td>

                            <td width="60%">
                              {
                                studentProInfo?.profileOtherInfo
                                  ?.disabilityDescription
                              }
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td width="40%">
                            <b>Criminal Convictions:</b>
                          </td>

                          <td width="60%">
                            {studentProInfo?.profileOtherInfo
                              ?.isHaveCriminalConvictions ? (
                              <>Yes</>
                            ) : (
                              <>No</>
                            )}
                          </td>
                        </tr>
                        {studentProInfo?.profileOtherInfo
                          ?.isHaveCriminalConvictions ? (
                          <tr>
                            <td width="40%">
                              <b>Criminal Convictions Description:</b>
                            </td>

                            <td width="60%">
                              {
                                studentProInfo?.profileOtherInfo
                                  ?.criminalConvictionsDescription
                              }
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </Table>

                    <div className="hedding-titel d-flex justify-content-between my-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Consent</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    </div>

                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Status:</b>
                          </td>

                          <td width="60%">{studentProInfo?.email}</td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>Date and Time:</b>
                          </td>

                          <td width="60%">{studentProInfo?.email}</td>
                        </tr>
                        <tr>
                          <td width="40%">
                            <b>IP:</b>
                          </td>

                          <td width="60%">{studentProInfo?.email}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Table className="table-bordered mt-4">
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>PDF:</b>
                          </td>

                          <td width="60%">{studentProInfo?.email}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </TabPane>
                </TabContent>
              )}
            </CardBody>
          </Card>
        </Col>

        <Col md="5">
          <Card>
            <CardBody>
              <div className="hedding-titel d-flex justify-content-between mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Admission Manager</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
                {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <span>
                    <b>Name:</b> {applicationInfo?.admissionManager?.firstName}{" "}
                    {applicationInfo?.admissionManager?.lastName}
                  </span>{" "}
                  <br />
                  <span>
                    <b>Email:</b> {applicationInfo?.admissionManager?.email}
                  </span>
                  <br />
                  <span>
                    <b>Phone:</b>{" "}
                    {applicationInfo?.admissionManager?.phoneNumber}
                  </span>
                </div>
                <div>
                  <div className="uapp-circle-image margin-top-minus">
                    {/* {universityInfo?.provider?.providerLogoMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : ( */}


                    {/* <img
                      src={
                        rootUrl +
                        applicationInfo?.admissionManager?.providerLogoMedia
                          ?.fileUrl
                      }
                      alt="admission_manager_img"
                    /> */}


                    {/* )} */}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="hedding-titel d-flex justify-content-between mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Consultant</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
                {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <span>
                    <b>Name:</b> {applicationInfo?.consultant?.firstName}{" "}
                    {applicationInfo?.consultant?.lastName}
                  </span>{" "}
                  <br />
                  <span>
                    <b>Email:</b> {applicationInfo?.consultant?.email}
                  </span>
                  <br />
                  <span>
                    <b>Phone:</b> {applicationInfo?.consultant?.phoneNumber}
                  </span>
                </div>
                <div>
                  <div className="uapp-circle-image margin-top-minus">
                    {/* {universityInfo?.provider?.providerLogoMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : ( */}
                    <img
                      src={
                        rootUrl +
                        applicationInfo?.consultant?.consultantProfileImageMedia
                          ?.thumbnailUrl
                      }
                      alt="consultant_img"
                    />
                    {/* )} */}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="hedding-titel d-flex justify-content-between mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Message History</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
                {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
              </div>
              <div className="box arrow-left">Mistakenly apply</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="hedding-titel d-flex justify-content-between mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Note</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
                {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
              </div>
            </CardBody>
          </Card>

          {/* <div
            className="has-icon-left position-relative"
            style={{ display: "flex", justifyContent: "end" }}
          >
            

            <ButtonForFunction
              func={handleRedirectToAppliPage}
              className={"badge-primary"}
              name={<b>Back to Application Page</b>}
              permission={6}
            />
          </div> */}
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationDetails;
