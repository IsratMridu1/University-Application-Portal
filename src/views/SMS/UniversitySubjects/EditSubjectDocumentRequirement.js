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
} from "reactstrap";
import Axios from "axios";
import { rootUrl } from "../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../Components/ButtonForFunction";
import get from "../../../helpers/get";

const EditSubjectDocumentRequirement = () => {
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

  const { id } = useParams();
  

  useEffect(() => {
    get("DocumentGroupDD/Index").then((res) => {
   
      setDocuDD(res);
    });
    get("ApplicationTypeDD/Index").then((res) => {
     
      setApplicationTypeDD(res);
    });
    get(`SubjectDocumentRequirement/GetBySubject/${id}`).then((res) => {
     
      setDocumentGrpList(res);
    });
  }, [id, success]);

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
    history.push("/subjectList");
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/editSubject/${id}`);
    }
    if (tab == "2") {
      history.push(`/editSubjectFee/${id}`);
    }
    if (tab == "3") {
      history.push(`/editDeliveryPattern/${id}`);
    }
    if (tab == "4") {
      history.push(`/editSubjectRequirements/${id}`);
    }
    if (tab == "5") {
      history.push(`/editSubjectDocumentRequirement/${id}`);
    }
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (var value of subdata) {
      
    }

    if (docuValue === 0) {
      setDocuError(true);
    } else if (appliValue === 0) {
      setAppliError(true);
    } else {
      if (update != 0) {
        Axios.put(`${rootUrl}SubjectDocumentRequirement/Update`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
         
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
        Axios.post(`${rootUrl}SubjectDocumentRequirement/Create`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
         
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
  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Add Subject Delivery Pattern</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToSubjecList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Subject List
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
                        value={id}
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
                        name={"Submit"}
                        permission={6}
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
                              <ButtonForFunction
                                func={() => handleUpdate(document)}
                                className={"mx-1 btn-sm"}
                                color={"warning"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditSubjectDocumentRequirement;
