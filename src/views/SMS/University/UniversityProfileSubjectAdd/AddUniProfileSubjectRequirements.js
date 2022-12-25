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
import { rootUrl } from "../../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import get from "../../../../helpers/get";

const AddUniProfileSubjectRequirements = () => {
    const [activetab, setActivetab] = useState("4");
  const [eduLevelDD, setEduLevelDD] = useState([]);
  const [eduLabel, setEduLabel] = useState("Select Education Level");
  const [eduValue, setEduValue] = useState(0);
  const [eduError, setEduError] = useState(false);
  const [requiredRes, setRequiredRes] = useState("");
  const [requiredId, setRequiredId] = useState(0);

  const [buttonStatus,setButtonStatus] = useState(false);

  const { id, subjId } = useParams();

  console.log("requiredId", requiredId);

  useEffect(() => {
    get("EducationLevelDD/Index").then((res) => {
      console.log(res, "response");
      setEduLevelDD(res);
    });

    
      get(`SubjectRequirement/GetBySubject/${subjId}`).then(res=>{
        console.log("subReq", res);
        setEduLabel(res?.id != undefined ? res?.educationLevel?.name : "Select Education Level");
        setEduValue(res?.id != undefined ? res?.educationLevel?.id : 0);
        setRequiredId(res?.id);
        setRequiredRes(res?.requiredResultInPercent);
    })
    
  }, [subjId]);

  const eduLevelMenu = eduLevelDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  //   const financeMenu = financeDD.map((finance) => ({
  //     label: finance?.name,
  //     value: finance?.id,
  //   }));

  const selectEduLevel = (label, value) => {
    setEduError(false);
    setEduLabel(label);
    setEduValue(value);
  };

  const history = useHistory();
  const { addToast } = useToasts();

  // redirect to SubjecList
  const backToUniDetails = () => {
    history.push(`/universityDetails/${id}`);
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addUniProfileSubject/${id}/${subjId}`);
    }
    if (tab == "2") {
      history.push(`/addUniProfileSubjectFee/${id}/${subjId}`);
    }
    if (tab == "3") {
      history.push(`/addUniProfileSubjectDeliveryPattern/${id}/${subjId}`);
    }
    if (tab == "5") {
      history.push(`/addUniProfileSubjectDocumentRequirement/${id}/${subjId}`);
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

    if(eduValue === 0){
        setEduError(true);
    }
    else{
        if(requiredId != undefined){
          setButtonStatus(true);
          Axios.put(`${rootUrl}SubjectRequirement/Update`, subdata, {
            headers: {
              "Content-Type": "application/json",
              authorization: AuthStr,
            },
          }).then((res) => {
            setButtonStatus(false);
            if (res.status === 200 && res.data.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              history.push({
                pathname: `/addUniProfileSubjectDocumentRequirement/${id}/${subjId}`,
              });
            }
          });
        }
        else{
          setButtonStatus(true);
          Axios.post(`${rootUrl}SubjectRequirement/Create`, subdata, {
            headers: {
              "Content-Type": "application/json",
              authorization: AuthStr,
            },
          }).then((res) => {
            setButtonStatus(false);
            if (res.status === 200 && res.data.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              history.push({
                pathname: `/addUniProfileSubjectDocumentRequirement/${id}/${subjId}`,
              });
            }
          });
        }
    }
  };

  // redirect to Next Page
  const onNextPage = () => {
    history.push({
      pathname: `/addUniProfileSubjectDocumentRequirement/${id}/${subjId}`,
    });
  };

  const onPreviousPage = () => {
    history.push(`/addUniProfileSubjectDeliveryPattern/${id}/${subjId}`);
  }

    return (
        <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Subject Requirement</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToUniDetails} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University Details
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
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Requirement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink  active={activetab === "5"} onClick={() => toggle("5")}>
                Document Requirement
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="4">
              <Form onSubmit={handleSubmit} className="mt-5">
                
                  <Input
                    type="hidden"
                    id="subjectId"
                    name="subjectId"
                    value={subjId}
                  />
               
                  <Input
                    type="hidden"
                    id="id"
                    name="id"
                    value={requiredId}
                  />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Education Level <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={eduLevelMenu}
                      value={{ label: eduLabel, value: eduValue }}
                      onChange={(opt) => selectEduLevel(opt.label, opt.value)}
                      name="educationLevelId"
                      id="educationLevelId"
                      placeholder="Select Education Level"
                    />

                    {eduError && (
                      <span className="text-danger">
                        You must select education level
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Required Result In Percent{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      id="requiredResultInPercent"
                      name="requiredResultInPercent"
                      defaultValue={requiredRes}
                      placeholder="Write Required Result"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                  <Col md="5">
                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-3 mt-3 badge-primary"}
                      name={"Save"}
                      permission={6}
                      disable={buttonStatus}
                    />
                  </Col>
                </FormGroup>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                />
                <ButtonForFunction
                  func={onNextPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
              </FormGroup>

            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
    );
};

export default AddUniProfileSubjectRequirements;