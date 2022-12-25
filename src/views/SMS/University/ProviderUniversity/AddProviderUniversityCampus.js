import Axios from "axios";
import React, { useState, createRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
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

import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import { rootUrl } from "../../../../constants/constants";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";
import ButtonForFunction from "../../Components/ButtonForFunction";

const AddProviderUniversityCampus = (props) => {
    const [universityCampusList, setuniversityCampusList] = useState([]);
    const [universityCampusObject, setuniversityCampusObject] = useState({});
    // const univerSityCountries = props.univerSityCountryList[0];
    const [univerSityCountries, setUniverSityCountries] = useState([]);
    // const universityTypes = props.univerSityTypeList[0];
    // const universityStates = props.univerSityStateList[0];
    const [universityStates, setUniversityStates] = useState([]);
  
    const [loading, setLoading] = useState(false);
    const myForm = createRef();
    const [uniStateLabel, setUniStateLabel] = useState(
      "Select Campus State"
    );
    const [unistateValue, setUniStateValue] = useState(0);
    const [uniStateError, setUniStateError] = useState(false);
  
    const [uniCountryLabel, setUniCountryLabel] = useState(
      "Select Campus Country"
    );
    const [uniCountryValue, setUniCountryValue] = useState(0);
    const [uniCountryError, setUniCountryError] = useState(false);
  
    const [radioHomeVal, setRadioHomeVal] = useState(false);
    const [radioEuUkVal, setRadioEuUkVal] = useState(false);
    const [radioInternationalVal, setRadioInternationalVal] = useState(false);
  
    const [activetab, setActivetab] = useState("2");
    const [submitData, setSubmitData] = useState(false);
    const history = useHistory();
    const [universityId, setuniversityId] = useState(0);
    const location = useLocation();
    const {providerProfileId, univerId} = useParams();
    const [success, setSuccess] = useState(false);
    const { addToast } = useToasts();
    const [selectedId, setSelectedId] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [universityCampus, setUniversityCampus] = useState([]);
    const [campusId, setCampusId] = useState(0);
    const [UniversityCampusName, setUniversityCampusName] = useState('');
    const [UniversityCampusId, setUniversityCampusId] = useState(0);

    const [buttonStatus,setButtonStatus] = useState(false);
  
    let uniId;
    // let uniId = "10019";
    if (location.id) {
      uniId = location.id;
    } else {
      uniId = "";
    }
  
    useEffect(()=>{
      get(`UniversityCountryDD/Index`)
      .then(res => {
        // console.log('all Campuses',res)
        setUniverSityCountries(res);
      })
    },[])
  
    useEffect(() => {
      setuniversityId(uniId);
      
      get(`UniversityCampus/GetByUniversity/${univerId}`).then(
        (action) => {
          setuniversityCampusList(action);
          if (action.length > 0) {
            setShowForm(true);
          } else {
            setShowForm(false);
            setSelectedId(0);
          }
          console.log("actionnnn", action);
        }
      );
    }, [success, uniId, universityId, univerId]);
  
    // tab toggle
    const toggle = (tab) => {
      setActivetab(tab);
      if (tab === "1") {
        history.push(`/addProviderUniversity/${providerProfileId}/${univerId}`);
      }
      if (tab === "2") {
        history.push(`/addProviderUniversityCampus/${providerProfileId}/${univerId}`);
      }
      if (tab === "3") {
        history.push(`/addProviderUniversityFinancial/${providerProfileId}/${univerId}`);
      }
      if (tab === "4") {
        history.push(`/addProviderUniversityFeatures/${providerProfileId}/${univerId}`);
      }
      if (tab === "5") {
        history.push(`/addProviderUniversityGallery/${providerProfileId}/${univerId}`);
      }
      if (tab === "6") {
        history.push(`/addProviderUniversityApplicationDocument/${providerProfileId}/${univerId}`);
      }
      if (tab === "7") {
        history.push(`/addProviderUniversityTemplateDocument/${providerProfileId}/${univerId}`);
      }
      if (tab === "8") {
        history.push(`/addProviderUniversityCommission/${providerProfileId}/${univerId}`);
      }
    };
  
    // select University Country
    const selectUniCountry = (label, value) => {
      setUniStateLabel('Select Campus State')
      setUniCountryValue(0);
      setUniCountryError(false);
      setUniCountryLabel(label);
      setUniCountryValue(value);
      get(`UniversityStateDD/Index/${value}`).then((res) => {
        console.log("uni states",res);
        setUniversityStates(res);
      });
    };
  
    // select University State
    const selectUniState = (label, value) => {
      setUniStateError(false);
      setUniStateLabel(label);
      setUniStateValue(value);
    };
  
    const AuthStr = localStorage.getItem("token");
  
    //   on submit form
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const subdata = new FormData(event.target);
      //  for (var value of subdata.values()) {
      //   console.log(value);
      //  }
  
      if(uniCountryValue == 0){
        setUniCountryError(true);
      }
      else if(unistateValue === 0){
        setUniStateError(true);
      }
      else{
        if (selectedId === 0) {
          setButtonStatus(true);
          Axios.post(`${rootUrl}UniversityCampus/Create`, subdata, {
            headers: {
              'Content-Type': 'application/json',
              'authorization': AuthStr,
            },
          }).then((res) => {
            setButtonStatus(false);
            console.log(res);
            setuniversityId(res.data.result.universityId);
            if (res.status === 200 && res.data.isSuccess === true) {
              setSubmitData(false);
              addToast(res.data.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setUniCountryLabel("Select Campus Country");
              setUniCountryValue(0);
              setUniStateLabel("Select Campus State");
              setUniStateValue(0);
              setSuccess(!success);
            }
          });
        } else {
          setButtonStatus(true);
          put(`UniversityCampus/Update`, subdata).then((res) => {
            // setuniversityId(res.data.result.universityId)
            setButtonStatus(false);
            if (res.status === 200 && res.data.isSuccess === true) {
              setSubmitData(false);
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setShowForm(true);
              setSelectedId(0);
              setuniversityCampusObject({});
              setUniCountryLabel("Select Campus Country");
              setUniCountryValue(0);
              setUniStateLabel("Select Campus State");
              setUniStateValue(0);
              setSuccess(!success);
            }
          });
        }
      }
  
    };
  
    // onValueChangeHome
    const onValueChangeHome = (event) => {
      setRadioHomeVal(event.target.value);
    };
    // onValueChangeEuUk
    const onValueChangeEuUk = (event) => {
      setRadioEuUkVal(event.target.value);
    };
    // onValueChangeInternational
    const onValueChangeInternational = (event) => {
      setRadioInternationalVal(event.target.value);
    };
  
    const universityCountryName = univerSityCountries?.map((uniCountry) => ({
      label: uniCountry.name,
      value: uniCountry.id,
    }));
    const universityStateName = universityStates?.map((uniState) => ({
      label: uniState.name,
      value: uniState.id,
    }));
  
    const styleLabelBold = {
      // fontWeight: "bold"
    };
    // redirect to dashboard
    const backToProviderDetails = () => {
      history.push(`/providerDetails/${providerProfileId}`);
    };
  
    // redirect to Next Page
    const onNextPage = () => {
      const uniID = universityId;
      history.push({
        pathname: `/addProviderUniversityFinancial/${providerProfileId}/${univerId}`,
        id: uniID,
      });
    };

    const onPreviousPage = () => {
      const uniID = universityId;
      history.push({
        pathname: `/addProviderUniversity/${providerProfileId}/${univerId}`,
        id: uniID,
      });
    };
  
    const toggleDanger = (p) => {
      setUniversityCampusId(p?.id);
      setUniversityCampusName(p?.name); 
      setDeleteModal(true);
    };
  
    const handleDeletePermission = (id) => {
      setButtonStatus(true);
      const returnValue = remove(`UniversityCampus/Delete/${id}`).then(
        (action) => {
          setButtonStatus(false);
          setDeleteModal(false);
          setSuccess(!success);
          addToast(action, {
            appearance: "error",
            autoDismiss: true,
          });
          setUniversityCampusId(0);
          setUniversityCampusName('');
        }
      );
    };
  
    const handleUpdate = (id) => {
      setCampusId(id);
      setShowForm(false);
  
      get(`UniversityCampus/Get/${id}`).then((action) => {
        console.log(
          "asjskdjskdskdjskdjskdjskdjskdjskdjskdjskdjskdjskdjskdjs",
          action
        );
        setuniversityCampusObject(action);
        setUniCountryLabel(action?.universityCountry?.name);
        setUniCountryValue(action?.universityCountry?.id);
        setUniStateLabel(action?.universityState?.name);
        setUniStateValue(action?.campusStateId);
        setSelectedId(action?.id);
        console.log(id);
      });
    };
  
    // const handleChange=(event) => {
    //   event.preventDefault();
    //   universityCampusObject[event.target.name] = event.target.value;
    //   setuniversityCampusObject({universityCampusObject})
  
    // }
  
    const onShow = () => {
      setShowForm(false);
    };
  
    const cancel = () => {
      setShowForm(true);
      setSelectedId(0);
      setuniversityCampusObject({});
      setUniCountryLabel("Select Campus Country");
      setUniCountryValue(0);
      setUniStateLabel("Select Campus State");
      setUniStateValue(0);
    };
    return (
        <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Campus Information</h3>
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
          </Nav>

          <TabContent activeTab={activetab}>

            {universityCampusList.length > 0 ? (

              <div className="container test-score-div-1-style mt-4 mb-4">
                <span className="test-score-span-1-style">
                  University campus information is shown here.
                </span>
              </div>

            ) : null}

            <TabPane tabId="2">
              {showForm === false ? (
                <>

                  

                  <Form onSubmit={handleSubmit} className="mt-5">

                    <div className="hedding-titel d-flex justify-content-between mb-3">
                      <div>
                        <h5> <b>Campus Information</b> </h5>

                        <div className="bg-h"></div>
                      </div>
                        {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}

                    </div>

                    <FormGroup row className="has-icon-left position-relative">
                      <Input
                        type="hidden"
                        id="universityId"
                        name="universityId"
                        value={univerId}
                      />
                      <Input
                        type="hidden"
                        id="Id"
                        name="Id"
                        value={selectedId}
                      />
                    </FormGroup>

                    {/* <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>University Id </span>
        </Col>
        <Col md="6">
          <Input
            type="number"
            name="universityId"
            id="universityId"
            // placeholder="Enter Total Student"
            required
          />
        </Col>
      </FormGroup> */}

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Campus Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="Name"
                          id="Name"
                          defaultValue={universityCampusObject?.name}
                          placeholder="Write The Campus Name"
                          required
                        />
                        {/* <div className="form-control-position">
                                      <User size={15} />
                                  </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Campus Country <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={universityCountryName}
                          value={{
                            label: uniCountryLabel,
                            value: uniCountryValue,
                          }}
                          required
                          onChange={(opt) =>
                            selectUniCountry(opt.label, opt.value)
                          }
                          name="CampusCountryId"
                          id="CampusCountryId"
                        />

                        {
                          uniCountryError && <span className="text-danger">Campus country is required</span>
                        }

                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Campus State <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={universityStateName}
                          value={{ label: uniStateLabel, value: unistateValue }}
                          required
                          onChange={(opt) =>
                            selectUniState(opt.label, opt.value)
                          }
                          name="CampusStateId"
                          id="CampusStateId"
                        />

                        {
                          uniStateError && <span className="text-danger">Campus state is required</span>
                        }

                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Campus City <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="CampusCity"
                          id="CampusCity"
                          defaultValue={universityCampusObject?.campusCity}
                          placeholder="Write Campus City Name"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Address Line<span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="AddressLine"
                          id="AddressLine"
                          defaultValue={universityCampusObject?.addressLine}
                          placeholder="Write Address Line"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Total Student </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="number"
                          name="TotalStudent"
                          id="TotalStudent"
                          min="0"
                          defaultValue={universityCampusObject?.totalStudent}
                          placeholder="Write Total Student in Number"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>International Student </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="number"
                          min="0"
                          name="InternationalStudent"
                          id="InternationalStudent"
                          defaultValue={
                            universityCampusObject?.internationalStudent
                          }
                          placeholder="Write International Student in Number"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Average Tution Fee </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="number"
                          min="0"
                          name="AvarageTutionFee"
                          id="AvarageTutionFee"
                          defaultValue={
                            universityCampusObject?.avarageTutionFee
                          }
                          placeholder="Avarage Tution Fee"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Average Living Cost </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="number"
                          min="0"
                          name="AvarageLivingCost"
                          id="AvarageLivingCost"
                          defaultValue={
                            universityCampusObject?.avarageLivingCost
                          }
                          placeholder="Avarage Living Cost"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Average Application Fee </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="number"
                          min="0"
                          name="AvarageApplicationFee"
                          id="AvarageApplicationFee"
                          defaultValue={
                            universityCampusObject?.avarageApplicationFee
                          }
                          placeholder="Avarage Application Fee"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Estimated Total Cost </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="number"
                          min="0"
                          name="EstimatedTotalCost"
                          id="EstimatedTotalCost"
                          defaultValue={
                            universityCampusObject?.estimatedTotalCost
                          }
                          placeholder="Estimated Total Cost"
                          required
                        />
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Campus on Map </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="textarea"
                          rows="4"
                          name="EmbededMap"
                          id="EmbededMap"
                          defaultValue={universityCampusObject?.embededMap}
                          placeholder="Location on Google Map"
                        />
                        <span className="text-danger">Note: Please type the "src" link only from the embed map</span>
                        {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup className="has-icon-left position-relative">
                      {selectedId !== 0 ? (
                        <>
                          <FormGroup row
                            className="has-icon-left position-relative"
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            
                          <Col md="5">
                          <ButtonForFunction
                              color={"primary"}
                              type={"submit"}
                              className={"ml-lg-3 ml-sm-1 mt-3"}
                              name={"Save"}
                              disable={buttonStatus}
                              permission={6}
                            />

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
                                className={"ml-lg-3 ml-sm-1 mt-3"}
                                name={"Save"}
                                disable={buttonStatus}
                                permission={6}
                              />

                            <div>
                              {selectedId !== 0 ||
                              universityCampusList.length > 0 ? (

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
                    name={"Add another"}
                    permission={6}
                  />
                </FormGroup>
              )}

              {universityCampusList?.map((uniCampus, i) => (
                <div key={uniCampus.id} style={{ textAlign: "left" }}>
                  <Card className="CampusCard">
                    <CardBody className="shadow">
                      <div className="CampusCardAction">
                        <div className="">
                          <ButtonForFunction
                            type={"button"}
                            color={"primary"}
                            func={() => handleUpdate(uniCampus?.id)}
                            icon={<i className="fas fa-edit"></i>}
                            permission={6}
                          />
                        </div>

                        <div className="">
                          <ButtonForFunction
                            type={"button"}
                            color={"danger"}
                            func={() => toggleDanger(uniCampus)}
                            icon={<i className="fas fa-trash-alt"></i>}
                            permission={6}
                          />
                        </div>
                      </div>

                      <Row>
                        <Col md="6">
                          <h5> {uniCampus?.name} </h5>
                          <h6>
                            {" "}
                            {uniCampus?.university?.name} (
                            {uniCampus?.university?.shortName}){" "}
                          </h6>
                          <p>
                            {" "}
                            {uniCampus?.campusCity},{" "}
                            {uniCampus?.universityState?.name},{" "}
                            {uniCampus?.universityCountry?.name}{" "}
                          </p>
                          <p> {uniCampus?.addressLine}</p>
                          <p> {uniCampus?.addressLine}</p>
                        </Col>

                        <Col md="6">
                          <p>Total Student : {uniCampus?.totalStudent}</p>
                          <p>
                            International Student :{" "}
                            {uniCampus?.internationalStudent}
                          </p>
                          <p>
                            Avarage Tution Fee : {uniCampus?.avarageTutionFee}
                          </p>
                          <p>
                            Avarage Living Cost : {uniCampus?.avarageLivingCost}
                          </p>
                          <p>
                            Avarage Application Fee :{" "}
                            {uniCampus?.avarageApplicationFee}
                          </p>
                          <p>
                            Estimated TotalCost :{" "}
                            {uniCampus?.estimatedTotalCost}
                          </p>
                        </Col>
                      </Row>
                    </CardBody>

                    <Modal
                      isOpen={deleteModal}
                      toggle={() => {
                        setDeleteModal(false);
                        setUniversityCampusId(0);
                        setUniversityCampusName('');
                      }}
                      className="uapp-modal"
                    >
                      <ModalBody>
                        <p>
                          Are You Sure to Delete this{" "}
                          <b>{UniversityCampusName}</b> ? Once
                          Deleted it can't be Undone!
                        </p>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          onClick={() =>
                            handleDeletePermission(UniversityCampusId)
                           }
                          color="danger"
                          disabled={buttonStatus}
                        >
                          YES
                        </Button>
                        <Button onClick={() => {
                          setDeleteModal(false);
                          setUniversityCampusId(0);
                          setUniversityCampusName('');
                        }}>
                          NO
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Card>
                </div>
              ))}

              
                <FormGroup
                className="has-icon-left position-relative"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button color="warning" onClick={onPreviousPage}>Previous Page</Button>
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

export default AddProviderUniversityCampus;