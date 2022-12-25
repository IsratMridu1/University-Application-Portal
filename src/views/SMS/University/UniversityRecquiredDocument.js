import Axios from "axios";
import React, { useState, createRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
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
} from "reactstrap";
import get from "../../../helpers/get";
import { useToasts } from "react-toast-notifications";

import CustomButtonRipple from "../Components/CustomButtonRipple";
import post from "../../../helpers/post";
import ButtonForFunction from "../Components/ButtonForFunction";
import remove from "../../../helpers/remove";

const UniversityRecquiredDocument = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [activetab, setActivetab] = useState("8");

  const [document, setDocument] = useState([]);
  const [documentLabel, setDocumentLabel] = useState(
    "Select Requirement Document"
  );
  const [documentValue, setDocumentValue] = useState(0);
  const [documentError, setDocumentError] = useState(false);
  const [documentData, setDocumentData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    get(`DocumentDD/Index`).then((res) => {
      console.log("Checking document DD", res);
      setDocument(res);
    });

    if(localStorage.getItem("id")){
      // get(
      //   `UniversityRequiredDocuments/GetByUniversity/${localStorage.getItem(
      //     "id"
      //   )}`
      // ).then((res) => {
      //   console.log("Required document", res);
      //   setDocumentData(res);
      //   if (res.length > 0) {
      //     setShowForm(true);
      //   } else {
      //     setShowForm(false);
      //     // setSelectedId(0);
      //   }
      // });
    }
    
  }, [success]);

  const documentOptions = document?.map((doc) => ({
    label: doc?.name,
    value: doc?.id,
  }));

  const selectDocument = (label, value) => {
    setDocumentError(false);
    setDocumentLabel(label);
    setDocumentValue(value);
  };

  // redirect to university list
  const backToUniList = () => {
    history.push("/universityList");
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab === "1") {
      history.push("/addUniversity");
    }
    if (tab === "2") {
      history.push("/addUniversityCampus");
    }
    if (tab === "3") {
      history.push("/addUniversityFinancial");
    }
    if (tab === "4") {
      history.push("/addUniversityFeatures");
    }
    if (tab === "5") {
      history.push("/addUniversityGallery");
    }
    if (tab === "6") {
      history.push("/addUniversityApplicationDocument");
    }
    if (tab === "7") {
      history.push("/addUniversityTemplateDocument");
    }
  };

  // const toggleDanger = (p) => {
  //   localStorage.setItem('UniversityCampusId', p.id)
  //   localStorage.setItem('UniversityCampusName', p.name)

  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    // for(var i of subData){
    //   console.log("i", i);
    // }

    if (documentValue === 0) {
      setDocumentError(true);
    } else {
      post("UniversityRequiredDocuments/Create", subData).then((res) => {
        console.log("document data", res);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setShowForm(!showForm);
          // history.push('/universityList');
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

  const onShow = () => {
    setShowForm(false);
    setDocumentLabel("Select Requirement Document");
    setDocumentValue(0);
  };

  const cancel = () => {
    setShowForm(true);
    // setSelectedId(0);
    // setuniversityCampusObject({});
    setDocumentLabel("Select Requirement Document");
    setDocumentValue(0);
  };

  const toggleDanger = (p) => {
    console.log("dele", p);
    localStorage.setItem("documentId", p?.id);
    localStorage.setItem("documentName", p?.document?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (id) => {
    const returnValue = remove(`UniversityRequiredDocuments/Delete/${id}`).then(
      (action) => {
        setDeleteModal(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        localStorage.removeItem("documentId");
        localStorage.removeItem("documentName");
      }
    );
  };

  const onGoUniList = () => {
    // const id = localStorage.getItem("id");
    // localStorage.removeItem("id");
    history.push('/universityList')
    // console.log(id,localStorage.getItem("id"));
  }
  
  const onGoUniProfile = () => {
    const id = localStorage.getItem("id");
    // localStorage.removeItem("id");
    history.push(`/universityDetails/${id}`)
    // console.log(id,localStorage.getItem("id"));
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Add University Required Document</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToUniList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University List
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
                Required Document
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            {documentData.length > 0 ? (
              <div className="container test-score-div-1-style mt-4 mb-4">
                <span className="test-score-span-1-style">
                  University required documents are showing here.
                </span>
              </div>
            ) : null}

            <TabPane tabId="8">
              {showForm === false ? (
                <Form onSubmit={handleSubmit} className="mt-5">
                  <FormGroup row className="has-icon-left position-relative">
                    <Input
                      type="hidden"
                      id="universityId"
                      name="universityId"
                      value={localStorage.getItem("id")}
                    />
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Requirement Document
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={documentOptions}
                        value={{ label: documentLabel, value: documentValue }}
                        onChange={(opt) => selectDocument(opt.label, opt.value)}
                        name="documentId"
                        id="documentId"
                      />

                      {documentError && (
                        <span className="text-danger">
                          Select Required Document
                        </span>
                      )}

                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup
                    row
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Col md="5">
                      <CustomButtonRipple
                        color={"primary"}
                        type={"submit"}
                        className={"ms-lg-3 ms-sm-1 mt-3"}
                        name={"Save"}
                        permission={6}
                      />
                    </Col>

                    <div>
                      {documentData.length > 0 ? (

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
                  </FormGroup>
                </Form>
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

              {documentData.length > 0 ? (
                <div className="table-responsive mt-4 mb-3">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>SL/NO</th>
                        <th>Name</th>
                        <th>Description</th>
                        {/* <th>Status</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentData?.map((document, i) => (
                        <tr key={document?.id} style={{ textAlign: "center" }}>
                          <th scope="row">{i + 1}</th>
                          <td>{document?.document?.name}</td>
                          <td>{document?.document?.description}</td>
                          {/* <td>{application?.documentRequirementStatus?.name}</td> */}

                          <td>
                            <ButtonForFunction
                              className={"mx-1 btn-sm"}
                              func={() => toggleDanger(document)}
                              color={"danger"}
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
                                  <b>{localStorage.getItem("documentName")}</b>{" "}
                                  ? Once Deleted it can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() =>
                                    handleDeletePermission(
                                      localStorage.getItem("documentId")
                                    )
                                  }
                                >
                                  YES
                                </Button>
                                <Button onClick={() => setDeleteModal(false)}>
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

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                  }}
                >
                  
                  {
                    documentData.length>0?
                    <>
                       <ButtonForFunction
                          func={onGoUniList}
                          color={"primary uapp-form-button"}
                          name={"University list"}
                          permission={6}
                        />

                        <ButtonForFunction
                          func={onGoUniProfile}
                          color={"primary uapp-form-button"}
                          className={"ms-lg-2 ms-sm-2"}
                          name={"University Profile"}
                          permission={6}
                        />
                    </>
                    :
                    null
                  }

                </FormGroup>

            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
      <br /> <br /> <br />
    </div>
  );
};

export default UniversityRecquiredDocument;
