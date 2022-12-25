import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import Axios from "axios";
import { rootUrl } from "../../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";

const AddUniversitySubjectDocumentRequirement = () => {
  const [activetab, setActivetab] = useState("5");
  const [docuDD, setDocuDD] = useState([]);
  const [docuLabel, setDocuLabel] = useState("Select Document Group");
  const [docuValue, setDocuValue] = useState(0);
  const [docuError, setDocuError] = useState(false);
  const [applicationTypeDD, setApplicationTypeDD] = useState([]);
  const [appliLabel, setAppliLabel] = useState("Select Application type");
  const [appliValue, setAppliValue] = useState(0);
  const [appliError, setAppliError] = useState(false);
  const [documentGrpList, setDocumentGrpList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delRequiredDocuId, setDelRequiredDocuId] = useState(0);
  const [delRequiredDocuName, setDelRequiredDocuName] = useState('');

  const [buttonStatus,setButtonStatus] = useState(false);
  const [buttonStatus1,setButtonStatus1] = useState(false);

  const { id, subjId } = useParams();

  useEffect(() => {
    get("DocumentGroupDD/Index").then((res) => {
      console.log(res, "response");
      setDocuDD(res);
    });
    get("ApplicationTypeDD/Index").then((res) => {
      console.log(res, "response");
      setApplicationTypeDD(res);
    });
    get(`SubjectDocumentRequirement/GetBySubject/${subjId}`).then((res) => {
      console.log(res, "ssxcsxs");
      setDocumentGrpList(res);
    });
  }, [subjId, success]);

  const DocumentGroupMenu = docuDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));
  const ApplicationMenu = applicationTypeDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  //   const financeMenu = financeDD.map((finance) => ({
  //     label: finance?.name,
  //     value: finance?.id,
  //   }));

  const selectDocumentGroup = (label, value) => {
    setDocuError(false);
    setDocuLabel(label);
    setDocuValue(value);
  };
  const selectApplicationType = (label, value) => {
    setAppliError(false);
    setAppliLabel(label);
    setAppliValue(value);
  };

  const history = useHistory();
  const { addToast } = useToasts();

  // redirect to SubjecList
  const backToSubjecList = () => {
    history.push(`/universitySubjectList/${id}`);
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addUniversitySubject/${id}/${subjId}`);
    }
    if (tab == "2") {
      history.push(`/addUniversitySubjectFee/${id}/${subjId}`);
    }
    if (tab == "3") {
      history.push(`/addUniversitySubjectDeliveryPattern/${id}/${subjId}`);
    }
    if (tab == "4") {
      history.push(`/addUniversitySubjectRequirements/${id}/${subjId}`);
    }
    if (tab == "5") {
      history.push(`/addUniversitySubjectDocumentRequirement/${id}/${subjId}`);
    }
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (var value of subdata) {
      console.log("values", value);
    }

    if (docuValue === 0) {
      setDocuError(true);
    } else if (appliValue === 0) {
      setAppliError(true);
    } else {
      if (update != 0) {
        setButtonStatus(true);
        Axios.put(`${rootUrl}SubjectDocumentRequirement/Update`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          console.log(res);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setSuccess(!success);
            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
            setUpdate(0);
            // history.push({
            //   pathname: "/subjectList",
            // });
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
            setUpdate(0);
          }
        });
      } else {
        setButtonStatus(true);
        Axios.post(`${rootUrl}SubjectDocumentRequirement/Create`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          console.log(res);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setSuccess(!success);
            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
            // history.push({
            //   pathname: "/subjectList",
            // });
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
          }
        });
      }
    }
  };

  const handleUpdate = (document) => {
    console.log("documentList", document);
    setUpdate(document?.id);
    setDocuLabel(document?.documentGroup?.title);
    setDocuValue(document?.documentGroup?.id);
    setAppliLabel(
      document?.applicationTypeId === 1
        ? "Home"
        : document?.applicationTypeId === 2
        ? "EU/UK"
        : "International"
    );
    setAppliValue(document?.applicationTypeId);
  };

  const toggleDanger = (document) => {
    console.log(document);
    setDelRequiredDocuName(document?.documentGroup?.title);
    setDelRequiredDocuId(document?.id);
    setDeleteModal(true);
   }

   // on Close Delete Modal
const closeDeleteModal = () => {
  setDeleteModal(false);
  setDelRequiredDocuName('');
  setDelRequiredDocuId(0);
}

const handleDeleteDocuRequired = (id) => {
  setButtonStatus1(true);
  const returnValue = remove(`SubjectDocumentRequirement/Delete/${id}`).then((action)=> {
    setButtonStatus1(false);
    setDeleteModal(false);
    setSuccess(!success);
    // console.log(action);
     addToast(action, {
       appearance: 'error',
       autoDismiss: true,
     })
     setDelRequiredDocuName('');
     setDelRequiredDocuId(0);
  })
}

const onPreviousPage = () => {
  history.push(`/addUniversitySubjectRequirements/${id}/${subjId}`);
}

const redirectToSubjectProfile = () => {
  history.push({
    pathname: `/subjectProfile/${subjId}`,
    unnniId: id
  })
}

    return (
        <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Subject Document Requirement</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToSubjecList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University Subject List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                
                active={activetab === "1"}
                onClick={() => toggle("1")}
              >
                Subject Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                
                active={activetab === "2"}
                onClick={() => toggle("2")}
              >
                Subject Fee Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                
                active={activetab === "3"}
                onClick={() => toggle("3")}
              >
                Delivery Pattern
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                
                active={activetab === "4"}
                onClick={() => toggle("4")}
              >
                Requirement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Document Requirement
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="5">
              <div className="row mt-5">
                <div className="col-6">
                  <div className="hedding-titel d-flex justify-content-between mb-2">
                    <div>
                      <h5>
                        {" "}
                        <b>Add Document Required</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>
                  <Form onSubmit={handleSubmit} className="">
                    {update != 0 ? (
                      <Input type="hidden" id="id" name="id" value={update} />
                    ) : null}
                    <FormGroup row className="has-icon-left position-relative">
                      <Input
                        type="hidden"
                        id="subjectId"
                        name="subjectId"
                        value={subjId}
                      />
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Document Group <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={DocumentGroupMenu}
                          value={{ label: docuLabel, value: docuValue }}
                          onChange={(opt) =>
                            selectDocumentGroup(opt.label, opt.value)
                          }
                          name="documentGroupId"
                          id="documentGroupId"
                        />

                        {docuError && (
                          <span className="text-danger">
                            Document group is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Application Type{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={ApplicationMenu}
                          value={{ label: appliLabel, value: appliValue }}
                          onChange={(opt) =>
                            selectApplicationType(opt.label, opt.value)
                          }
                          name="applicationTypeId"
                          id="applicationTypeId"
                        />

                        {appliError && (
                          <span className="text-danger">
                            Application type is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    ></FormGroup>
                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}

                      <ButtonForFunction
                        type={"submit"}
                        className={"mt-3 badge-primary"}
                        name={"Save"}
                        permission={6}
                        disable={buttonStatus}
                      />
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-6">
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Document Requirement List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>

                  {
                    documentGrpList<1 ?
                    <div>No data available</div>
                    :
                    <div className="table-responsive">
                    <Table className="table-sm table-bordered">
                      <thead className="thead-uapp-bg">
                        <tr style={{ textAlign: "center" }}>
                          <th>SL/NO</th>
                          <th>Document Group</th>
                          <th className="text-center">Application Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documentGrpList?.map((document, i) => (
                          <tr key={document.id} style={{ textAlign: "center" }}>
                            <th scope="row">{i + 1}</th>
                            <td>{document?.documentGroup?.title}</td>
                            <td className="text-center">
                              {document?.applicationTypeId === 1
                                ? "Home"
                                : document?.applicationTypeId === 2
                                ? "EU/UK"
                                : "International"}
                            </td>
                            <td>
                              <ButtonGroup>
                              <ButtonForFunction
                                func={() => handleUpdate(document)}
                                className={"mx-1 btn-sm"}
                                color={"warning"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                              <ButtonForFunction
                                className={"mx-1 btn-sm"}
                                func={() => toggleDanger(document)}
                                color={"danger"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                               />
                              </ButtonGroup> 

                               <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="uapp-modal">

                      <ModalBody>
                        <p>Are You Sure to Delete this <b>{delRequiredDocuName}</b> ? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button disabled={buttonStatus1} color="danger" onClick={() => handleDeleteDocuRequired(delRequiredDocuId)}>YES</Button>
                        <Button onClick={closeDeleteModal}>NO</Button>
                      </ModalFooter>

                    </Modal>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  }
                  
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                />
                </div>
                <div className="d-flex justify-content-end">
                <Link to={`/universitySubjectList/${id}`}>
                <Button color="primary" className="mr-2">
                    Go to University Subject List
                  
                </Button></Link>

                 {/* <Link to={`/subjectProfile/${subjId}`}>
                 <Button color="primary" className="ms-1">
                    Go to Subject Profile
                  
                </Button>
               </Link> */}
               
               <ButtonForFunction
                  func={redirectToSubjectProfile}
                  color={"primary"}
                  name={"Go to Subject Profile"}
                  permission={6}
                />

              </div>
              </div>

            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
    );
};

export default AddUniversitySubjectDocumentRequirement;