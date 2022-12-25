import Axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
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
// import { useDropzone } from "react-dropzone"
import { rootUrl } from "../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import put from "../../../helpers/put";
import ButtonForFunction from "../Components/ButtonForFunction";

const AddUniversityFeatures = () => {
  const history = useHistory();
  const [activetab, setActivetab] = useState("4");
  const [radioPracticalTraining, setRadioPracticalTraining] = useState("false");
  const [radioIntershipParticipation, setRadioIntershipParticipation] =
    useState("false");
  const [radioWorkWhileStudying, setRadioWorkWhileStudying] = useState("false");
  const [radioConditionalOfferLetter, setRadioConditionalOfferLetter] =
    useState("false");
  const [radioAccommodations, setRadioAccommodations] = useState("false");

  const [features, setFeatures] = useState({});
  const [featureId, setFeatureId] = useState(undefined);

  const [buttonStatus,setButtonStatus] = useState(false);

  // const method = localStorage.getItem("editMethod");

  const myForm = createRef();
  const location = useLocation();

  const { addToast } = useToasts();
  const { univerId } = useParams();

  let uniId;
  if (location.id) {
    uniId = location.id;
  } else {
    uniId = "";
  }

  useEffect(() => {
    // get(`UniversityFeatures/GetByUniversity/${localStorage.getItem('editUniId')}`)
    get(`UniversityFeatures/GetByUniversity/${univerId}`).then((res) => {
      console.log("unifeatures", res?.id);
      setFeatures(res);
      setFeatureId(res?.id);
      setRadioPracticalTraining(`${res?.practicalTraining}`);
      setRadioIntershipParticipation(`${res?.intershipParticipation}`);
      setRadioWorkWhileStudying(`${res?.workWhileStudying}`);
      setRadioConditionalOfferLetter(`${res?.conditionalOfferLetter}`);
      setRadioAccommodations(`${res?.accommodations}`);
    });
  }, [univerId]);

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    //  watch form data values
    for (var value of subdata.values()) {
    }

    //const config = {
    //  headers: {
    //    'content-type': 'multipart/form-data'
    //  }
    //}

    if (featureId !== undefined) {
      setButtonStatus(true);
      put("UniversityFeatures/Update", subdata).then((res) => {
        console.log("1st put response", res);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });

          history.push({
            pathname: `/addUniversityGallery/${univerId}`,
            id: localStorage.getItem("editUniId"),
          });
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
      Axios.post(`${rootUrl}UniversityFeatures/Create`, subdata, {
        headers: {
          "authorization": AuthStr,
        },
      }).then((res) => {
        const uniID = res.data.result.universityId;
        setButtonStatus(false);

        if (res.status === 200 && res.data.isSuccess === true) {
          // setSubmitData(true);
          history.push({
            pathname: `/addUniversityGallery/${univerId}`,
            id: uniID,
          });

          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "warning",
            autoDismiss: true,
          });
        }
      });
    }
  };
  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addUniversity/${univerId}`);
    }
    if (tab == "2") {
      history.push(`/addUniversityCampus/${univerId}`);
    }
    if (tab == "3") {
      history.push(`/addUniversityFinancial/${univerId}`);
    }
    if (tab == "4") {
      history.push(`/addUniversityFeatures/${univerId}`);
    }
    if (tab == "5") {
      history.push(`/addUniversityGallery/${univerId}`);
    }
    if (tab == "6") {
      history.push(`/addUniversityTestScore/${univerId}`);
    }
    if (tab == "7") {
      history.push(`/addUniversityApplicationDocument/${univerId}`);
    }
    if (tab == "8") {
      history.push(`/addUniversityTemplateDocument/${univerId}`);
    }
    if (tab == "9") {
      history.push(`/addUniversityCommission/${univerId}`);
    }
  };

  // on change radio button

  // onValueChangePracticalTraining
  const onValueChangePracticalTraining = (event) => {
    setRadioPracticalTraining(event.target.value);
  };

  // onValueChangeIntershipParticipation
  const onValueChangeIntershipParticipation = (event) => {
    setRadioIntershipParticipation(event.target.value);
  };

  // onValueChangeWorkWhileStudying
  const onValueChangeWorkWhileStudying = (event) => {
    setRadioWorkWhileStudying(event.target.value);
  };

  // onValueChangeConditionalOfferLetter
  const onValueChangeConditionalOfferLetter = (event) => {
    setRadioConditionalOfferLetter(event.target.value);
  };

  // onValueChangeAccommodations
  const onValueChangeAccommodations = (event) => {
    setRadioAccommodations(event.target.value);
  };

  const styleLabelBold = {
    // fontWeight: "bold"
  };

  // redirect to dashboard
  const backToUniList = () => {
    history.push("/universityList");
  };

  const goFront = () => {
    history.push(`/addUniversityGallery/${univerId}`);
  };

  const goBack = () => {
    history.push(`/addUniversityFinancial/${univerId}`);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Features Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToUniList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University
              List
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
              {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Financial
              </NavLink>
            </NavItem>

            <NavItem>
              {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Features
              </NavLink>
            </NavItem>

            <NavItem>
              {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Gallery
              </NavLink>
            </NavItem>

            <NavItem>
              {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Test Score
              </NavLink>
            </NavItem>

            <NavItem>
              {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Application Document
              </NavLink>
            </NavItem>

            <NavItem>
              {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Template Document
              </NavLink>
            </NavItem>
            <NavItem>
              {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
              <NavLink active={activetab === "9"} onClick={() => toggle("9")}>
                Commission
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="4">
              <Form ref={myForm} onSubmit={handleSubmit} className="mt-5">
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Features Information</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
                </div>
                {
                  //   method == 'put' ?
                  featureId !== undefined ? (
                    <>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={featureId}
                      />
                    </>
                  ) : null
                }

                <FormGroup row className="has-icon-left position-relative">
                  <Input
                    type="hidden"
                    id="UniversityId"
                    name="UniversityId"
                    value={univerId}
                  />
                  {/* <Input type="hidden" id="UniversityId" name="UniversityId" value={localStorage.getItem("editUniId")} /> */}
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Practical Training</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="PracticalTraining"
                        value="true"
                        onChange={onValueChangePracticalTraining}
                        name="PracticalTraining"
                        checked={radioPracticalTraining == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="PracticalTraining"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="PracticalTraining"
                        onChange={onValueChangePracticalTraining}
                        name="PracticalTraining"
                        value="false"
                        checked={radioPracticalTraining == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="PracticalTraining"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Internship Participation</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="IntershipParticipation"
                        onChange={onValueChangeIntershipParticipation}
                        name="IntershipParticipation"
                        value="true"
                        checked={radioIntershipParticipation == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="IntershipParticipation"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="IntershipParticipation"
                        onChange={onValueChangeIntershipParticipation}
                        name="IntershipParticipation"
                        value="false"
                        checked={radioIntershipParticipation == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="IntershipParticipation"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Work While Studying</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="WorkWhileStudying"
                        onChange={onValueChangeWorkWhileStudying}
                        name="WorkWhileStudying"
                        value="true"
                        checked={radioWorkWhileStudying == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="WorkWhileStudying"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="WorkWhileStudying"
                        onChange={onValueChangeWorkWhileStudying}
                        name="WorkWhileStudying"
                        value="false"
                        checked={radioWorkWhileStudying == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="WorkWhileStudying"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Conditional Offer Letter</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="ConditionalOfferLetter"
                        onChange={onValueChangeConditionalOfferLetter}
                        name="ConditionalOfferLetter"
                        value="true"
                        checked={radioConditionalOfferLetter == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="ConditionalOfferLetter"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="ConditionalOfferLetter"
                        onChange={onValueChangeConditionalOfferLetter}
                        name="ConditionalOfferLetter"
                        value="false"
                        checked={radioConditionalOfferLetter == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="ConditionalOfferLetter"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Accommodations</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="Accommodations"
                        onChange={onValueChangeAccommodations}
                        name="Accommodations"
                        value="true"
                        checked={radioAccommodations == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="ConditionalOfferLetter"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="Accommodations"
                        onChange={onValueChangeAccommodations}
                        name="Accommodations"
                        value="false"
                        checked={radioAccommodations == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="Accommodations"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="5">
                    <ButtonForFunction
                      type={"submit"}
                      className={"mr-1 mt-3 badge-primary"}
                      name={"Save"}
                      disable={buttonStatus}
                      permission={6}
                    />
                  </Col>
                </FormGroup>
              </Form>

              <div className="d-flex justify-content-between">
                <Button color="warning" onClick={goBack}>
                  Previous Page
                </Button>

                <Button color="warning" onClick={goFront}>
                  Next Page
                </Button>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(AddUniversityFeatures);
