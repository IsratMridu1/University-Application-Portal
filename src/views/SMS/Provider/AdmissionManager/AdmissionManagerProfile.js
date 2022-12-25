import React, { createRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Select from "react-select";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import CustomButtonRipple from "../../Components/CustomButtonRipple";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";

const AdmissionManagerProfile = () => {
  const { managerId, providerId } = useParams();
  const [managerData, setManagerData] = useState({});
  const [applicationData, setApplicationData] = useState([]);
  const [admissionOfficer, setAdmissionOfficer] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const [officerDD, setOfficerDD] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState('Select Country');
  const [uniCountryValue, setUniCountryValue] = useState(0);

  const [universityStates, setUniversityStates] = useState([]);

  
  const [deleteModal, setDeleteModal] = useState(false);

  const [officerLabel, setOfficerLabel] = useState("Select Admission Officer");
  const [officerValue, setOfficerValue] = useState(0);
  const [officerError, setOfficerError] = useState(false);

  const [countryError, setCountryError] = useState(false);

  const [uniStateLabel, setUniStateLabel] = useState('Select State');
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);

  const [nameTitleDD, setNameTitleDD] = useState([]);

  const [nameTitleLabel, setNameTitleLabel] = useState("Select Title");
  const [nameTitleValue, setNameTitleValue] = useState(0);

  const [nameTitleError, setNameTitleError] = useState(false);

  const [providerDD, setProviderDD] = useState([]);
  // const [providerLabel, setProviderLabel] = useState("Select Provider");
  // const [providerValue, setProviderValue] = useState(0);
  // const [providerError, setProviderError] = useState(false);

  const [success, setSuccess] = useState(false);

  const [existsNote, setExistsNote] = useState();

  const [emailError, setEmailError] = useState(true);
  const [officerObj, setOfficerObj] = useState({});
  const [selectedId, setSelectedId] = useState(undefined);
  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteName, setDeleteName] = useState("");

  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();
  const [buttonStatus,setButtonStatus] = useState(false);

  const tableStyle = {
    overflowX: "scroll",
  };

  const backToProviderDetails = () => {
    if (location.managerList != undefined) {
      history.push(`/admissionManagerList`);
    } 
    else if(location.officerId != undefined){
      history.push(`/admissionOfficerDetails/${location.officerId}`)
    }
    else {
      history.push(`/providerDetails/${providerId}`);
    }
  };

  useEffect(() => {

    get(`AdmissionOfficerDD/Index/${providerId}/${managerId}`).then((res) => {
      console.log("rsdsd", res);
      setOfficerDD(res);
      // setManagerDDForm(res);
    });

    get("CountryDD/index").then(res =>{
        setCountryList(res);
      });

    get("NameTittleDD/index").then(res =>{
        setNameTitleDD(res);
      });

    get("ProviderDD/Index").then(res =>{
        setProviderDD(res);
      });

    get(`AdmissionManager/Profile/${managerId}`).then((res) => {
      setManagerData(res);
      setApplicationData(res?.admissionManagerApplications);
      setAdmissionOfficer(res?.admissionOfficers);
      console.log("admission mnager", res);
    });
  }, [managerId, success, providerId]);

  const handlRedirectToApplicationDetails = (applicationId, studentId) => {
    history.push({
      pathname: `/applicationDetails/${applicationId}/${studentId}`,
      managerId: managerId,
      providerId: providerId
    });
  }

   // on Close Modal
   const closeModal = () => {
    setSelectedId(undefined);
    setOfficerObj(null);
    setNameTitleLabel("Select Title");
    setNameTitleValue(0);
    setUniCountryLabel("Select Country");
    setUniCountryValue(0);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    // setProviderLabel("Select Provider");
    // setProviderValue(0);
    // setManagerFormLabel("Select Admission Manager");
    // setManagerFormValue(0);
    setCountryError(false);
    setUniStateError(false);
    setNameTitleError(false);
    // setProviderError(false);
    // setManagerFormError(false);
    setEmailError(true);
    setModalOpen(false);
  }

  const assignCloseModal = () => {
    setOfficerError(false);
    setExistsNote();
    setOfficerLabel("Select Admission Officer");
    setOfficerValue(0);
    setAssignModalOpen(false);
  }

  const handleSubmit = event =>{
    event.preventDefault();
    const subdata = new FormData(event.target);

    for(var i of subdata){
        console.log(i);
    }

    if(nameTitleValue === 0){
      setNameTitleError(true);
    }
    else if(emailError == false){
      setEmailError(emailError);
    }
    else if(uniCountryValue === 0){
      setCountryError(true);
    }
    else if(unistateValue === 0){
      setUniStateError(true);
    }
    else{
      if(selectedId === undefined){
        setOfficerObj({});
        setButtonStatus(true);
        post(`AdmissionOfficer/Create`, subdata)
        .then(res => {
          setSuccess(!success);
          setModalOpen(false);
          console.log("ressss", res);
          setNameTitleLabel("Select Title");
          setNameTitleValue(0);
          setUniCountryLabel("Select Country");
          setUniCountryValue(0);
          setUniStateLabel("Select State");
          setUniStateValue(0);
          setButtonStatus(false);

        //   setuniversityId(res?.data?.result?.universityId)
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            // setSubmitData(false);
            addToast(res.data.message, {
              appearance: 'success',
              autoDismiss: true,
            })
          }
        })
        }
        else{
          put(`AdmissionOfficer/Update`, subdata)
          .then(res => {
            
            if (res.status === 200 && res.data.isSuccess === true) {
              addToast(res.data.message, {
                appearance: 'success',
                autoDismiss: true,
              })
              setOfficerObj({});
              setSelectedId(undefined);
              setSuccess(!success);
              setModalOpen(false);
              setNameTitleLabel("Select Title");
              setNameTitleValue(0);
              setUniCountryLabel("Select Country");
              setUniCountryValue(0);
              setUniStateLabel("Select State");
              setUniStateValue(0);
            }
          
          })
        }
    }
  }

  const handleSubmitAssign = (event) => {
    event.preventDefault();
    const subdata = {
      admissionManagerId: managerId,
      admissionOfficerId: officerValue
    }

    if(officerValue === 0){
      setOfficerError(true);
    }
    else{
      setButtonStatus(true);
      post("AdmissionOfficerOfManager/Create", subdata).then(res => {
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setAssignModalOpen(false);
          setOfficerLabel("Select Admission Officer");
          setOfficerValue(0);
          setExistsNote();
          setButtonStatus(false);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
    }

  }

  const officerMenu = officerDD.map((manager) => ({
    label: manager?.name,
    value: manager?.id,
  }));

  const selectOfficer = (label, value) => {
    setOfficerError(false);
    setOfficerLabel(label);
    setOfficerValue(value);

    get(`AdmissionOfficerOfManager/OfficerExists/${value}`).then(res=>{
      setExistsNote(res);
    })
  }

  const countryDD = countryList.map(countryOptions =>({
    label:countryOptions?.name, 
    value:countryOptions?.id
  }));

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setCountryError(false);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    get(`StateDD/Index/${value}`)
      .then(res => {
        // setUniStateLabel(res.name)
        // setUniStateValue(res.id)
        setUniversityStates(res);
      })
  }

  const universityStateName = universityStates?.map(uniState => ({ 
    label: uniState.name, 
    value: uniState.id 
  }));

  // select University State
  const selectUniState = (label, value) => {
    setUniStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  }

  const nameTitleMenu = nameTitleDD?.map(nameTitle => ({
    label: nameTitle?.name,
    value: nameTitle?.id
  }))

//   select name title
const selectNameTitle = (label, value) => {
    setNameTitleError(false);
    setNameTitleLabel(label);
    setNameTitleValue(value);
  }

  const handleEmail = (e) => {
    console.log(e.target.value);

    get(`Consultant/OnChangeEmail/${e.target.value}`)
    .then(res => {
      setEmailError(res);
    })
  }

  const handleAddNew = () =>{
    setOfficerObj({});
    setModalOpen(true);
  }

  const handleUpdate = (officer) =>{

    console.log("officer", officer);
    setOfficerObj(officer);
    setNameTitleLabel(officer?.nameTittleName);
    setNameTitleValue(officer?.nameTittleId);
    setUniCountryLabel(officer?.countryName);
    setUniCountryValue(officer?.countryId);
    setUniStateLabel(officer?.stateName);
    setUniStateValue(officer?.stateId);
    setSelectedId(officer?.id);
    setModalOpen(true);
  }

  const toggleDanger = (officer) => {
    console.log(officer);
    setDeleteName(officer?.firstName);
    setDeleteId(officer?.officermanagerId);
    setDeleteModal(true);
    
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDeleteName("");
    setDeleteId(undefined);
  };

  const handleDeleteAdmissionOfficer = (id) =>{
    setButtonStatus(true);
    remove(`AdmissionOfficerOfManager/Delete/${id}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setDeleteName("");
      setDeleteId(undefined);
      setSuccess(!success);
      setButtonStatus(false);
    });
  }

  const handlRedirectToAdmissionofficerDetails = (officerId) => {
    history.push({
      pathname: `/admissionOfficerDetails/${officerId}`,
      managerId: managerId,
      providerId: providerId
    });
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Admission Manager Details</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToProviderDetails} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {location.managerList != undefined
                ? "Back to Admission Manager List"
                : 
                location.officerId != undefined ? 
                "Back to Admission Officer Details"
                :
                "Back to Provider Details"}
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="uapp-employee-profile">
        <Card className="uapp-employee-profile-right">
          <div className="uapp-profile-CardHeader">
            {/* <div className="uapp-circle-image margin-top-minus">
                  <img  alt='provider_image' />
                </div>     */}
            <div className="py-3">
              <h5 className="py-1">
                Name:{" "}
                <span className="text-primary">
                  {managerData?.nameTittleName} {managerData?.firstName} {}{" "}
                  {managerData?.lastName}{" "}
                </span>{" "}
              </h5>
              <h5 className="py-1">
                Provider:{" "}
                <span className="text-primary">
                  {managerData?.providerName}
                </span>{" "}
              </h5>
              <h5 className="py-1">
                {" "}
                Email:{" "}
                <span className="text-primary">{managerData?.email}</span>{" "}
              </h5>
              <h5 className="py-1">
                {" "}
                Phone Number:{" "}
                <span className="text-primary">
                  {managerData?.phoneNumber}
                </span>{" "}
              </h5>
            </div>
          </div>
          <CardBody>
            <div>
              <ul className="uapp-ul text-center">
                <h5>
                  {" "}
                  State:{" "}
                  <span className="text-primary">
                    {managerData?.stateName}
                  </span>{" "}
                </h5>
                <h5>
                  {" "}
                  City:{" "}
                  <span className="text-primary">{managerData?.city}</span>{" "}
                </h5>
              </ul>
            </div>
          </CardBody>
        </Card>

        <div className=" info-item mt-4">
          <Card>
            <CardBody>
              <div className="hedding-titel d-flex justify-content-between">
                <div>
                  <h5>
                    {" "}
                    <b>Assigned Universities</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>

              <div className="table-responsive pt-3">
                <Table className="table-sm striped" style={tableStyle}>
                  <thead className="">
                    <tr style={{ textAlign: "center" }}>
                      <th>#</th>
                      <th>Accept EU_UK</th>
                      <th>Accept Home</th>
                      <th>Accept International</th>
                      <th>Name</th>
                      <th>Short Name</th>
                      <th>City</th>
                      <th>Description</th>
                      <th>Founded</th>
                      <th>Global Ranking</th>
                      <th>Part Time Work Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managerData?.admissionManagerUniversities?.map(
                      (uni, i) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <th scope="row">{1 + i}</th>
                          <td>
                            {uni?.isAcceptEU_UK ? (
                              <span>True</span>
                            ) : (
                              <span>False</span>
                            )}
                          </td>

                          <td>
                            {uni?.isAcceptHome ? (
                              <span>True</span>
                            ) : (
                              <span>False</span>
                            )}
                          </td>

                          <td>
                            {uni?.isAcceptInternational ? (
                              <span>True</span>
                            ) : (
                              <span>False</span>
                            )}
                          </td>

                          <td>{uni?.university?.name}</td>

                          <td>{uni?.university?.shortName}</td>

                          <td>{uni?.university?.universityCity}</td>

                          <td>{uni?.university?.description}</td>

                          <td>{uni?.university?.foundationYear}</td>

                          <td>{uni?.university?.globalRankNumber}</td>
                          <td>{uni?.university?.partTimeWorkInformation}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className=" info-item mt-4">
          <Card>
            <CardBody>
              <div className="hedding-titel d-flex justify-content-between">
                <div>
                  <h5>
                    {" "}
                    <b>Applications</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>

              <div className="table-responsive pt-3">
                <Table className="table-sm striped" style={tableStyle}>
                  <thead className="">
                    <tr style={{ textAlign: "center" }}>
                      <th>#</th>
                      <th>University</th>
                      <th>Campus Name</th>
                      <th>Student Name</th>
                      <th>Subject Name</th>
                      <th>Intake</th>
                      {/* <th>City</th>
                         <th>Description</th>
                         <th>Founded</th>
                         <th>Global Ranking</th>
                         <th>Part Time Work Information</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationData?.map((appli, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        <th scope="row">{1 + i}</th>
                        <td>{appli?.application?.university?.name}</td>

                        <td>{appli?.campus?.name}</td>

                        <td>
                          {appli?.application?.student?.firstName}{" "}
                          {appli?.application?.student?.lastName}
                        </td>

                        <td>{appli?.application?.subject?.name}</td>

                        <td>{appli?.application?.intake?.name}</td>

                        <td>
                          <ButtonGroup variant="text">
                        
                            <ButtonForFunction
                              func={() =>
                                handlRedirectToApplicationDetails(appli?.applicationId, appli?.application?.studentId)
                              }
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-eye"></i>}
                              permission={6}
                            />

                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className=" info-item mt-4">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
              <div className="hedding-titel d-flex justify-content-between">
                <div>
                  <h5>
                    {" "}
                    <b>Admission Officers</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>

              <div>
                {/* <Button color="primary" className="me-1">Add New Admission Officer</Button> */}
                <ButtonForFunction
                func={handleAddNew}
                className={"btn btn-uapp-add mr-1"}
                // icon={<i className="fas fa-plus"></i>}
                name={"Add New Admission Officer"}
                permission={6}
              />
                {/* <Button color="primary" className="ms-1">Assign Admission Officer</Button> */}
                <ButtonForFunction
                func={() => setAssignModalOpen(true)}
                className={"btn btn-uapp-add ml-1"}
                // icon={<i className="fas fa-plus"></i>}
                name={"Assign Admission Officer"}
                permission={6}
              />

              {/* assign admission officer */}
              <Modal
              isOpen={assignModalOpen}
              toggle={assignCloseModal}
              className="uapp-modal2"
              size="lg"
            >
              <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                <span className="text-white">Admission Officer</span>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmitAssign}>
                  

                  <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                      <span>
                        Admission Officer <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    
                      <Col md="5">
                      <Select
                        options={officerMenu}
                        value={{ label: officerLabel, value: officerValue }}
                        onChange={(opt) =>
                          selectOfficer(opt.label, opt.value)
                        }
                        name="admissionOfficerId"
                        id="admissionOfficerId"
                      />

                      {
                        existsNote === true ? 
                        <span className="text-danger">
                          Admission officer is already working with another admission manager.
                        </span>
                        :
                        existsNote === false ?
                        <span className="text-danger">
                          Admission officer is not working with another admission manager.
                        </span>
                        :
                        null
                      }

                      {officerError && (
                        <span className="text-danger">
                          Admission officer is required
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
                      onClick={assignCloseModal}
                    >
                      Close
                    </Button>

                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"mr-1 mt-3"}
                      name={"Submit"}
                      permission={6}
                      isDisabled={buttonStatus}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>

              {/* add new admission officer */}
              <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal4" style={{height: '5px'}} size='lg'>
              <ModalHeader style={{backgroundColor: '#1d94ab'}}><span className='text-white'>Admission Officer</span></ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit} >

                <Input type="hidden" id="providerId" name="providerId" value={providerId} />
                <Input type="hidden" id="admissionManagerId" name="admissionManagerId" value={managerId} />

                {
                  selectedId != undefined ?
                  <FormGroup row className="has-icon-left position-relative">
                  <Input type="hidden" id="id" name="id" value={selectedId} />
                </FormGroup>
                :
                null
                }

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Title <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">

                    <Select
                      options={nameTitleMenu}
                      value={{ label: nameTitleLabel, value: nameTitleValue }}
                      onChange={opt => selectNameTitle(opt.label, opt.value)}
                      name="nameTittleId"
                      id="nameTittleId"
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    {
                        nameTitleError ? <span className="text-danger">Title is required</span>
                        :
                        null
                    }
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>First Name <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"  
                      
                      defaultValue={officerObj?.firstName}
                      placeholder="Type First Name"
                      required
                    />
                    {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Last Name <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      defaultValue={officerObj?.lastName}
                      placeholder="Type Last Name"
                      required
                    />
                    {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                  </Col>
                </FormGroup>

                {
                  selectedId === undefined ?
                  <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Email <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="email"
                      name="email"
                      id="email"  
                      onBlur={handleEmail}
                      defaultValue={officerObj?.email}
                      placeholder="Type Your Email"
                      required
                    />
                   {
                      !emailError ? 

                      <span className='text-danger'>Email already exists.</span>
                      :
                      null

                    }
                  </Col>
                </FormGroup>
                :
                null
                }

                {
                  selectedId != undefined ?
                  null
                  :
                  <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Password <span className="text-danger">*</span></span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Type Your Password"
                      required
                    />
                  </Col>
                </FormGroup>
                }

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Phone Number <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"  
                      
                      defaultValue={officerObj?.phoneNumber}
                      placeholder="Type Your Phone Number"
                      required
                    />
                    {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Country <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">

                    <Select
                      options={countryDD}
                      value={{ label: uniCountryLabel, value: uniCountryValue }}
                      onChange={opt => selectUniCountry(opt.label, opt.value)}
                      name="countryId"
                      id="countryId"
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    {
                        countryError ? <span className="text-danger">Country is required</span>
                        :
                        null
                    }
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>State <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">

                    <Select
                      options={universityStateName}
                      value={{ label: uniStateLabel, value: unistateValue }}
                      onChange={opt => selectUniState(opt.label, opt.value)}
                      name="stateId"
                      id="stateId"
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    {
                        uniStateError ? <span className="text-danger">State is required</span>
                        :
                        null
                    }
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>City <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={officerObj?.city}
                      placeholder="Type City Name"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Post Code <span className="text-danger">*</span> </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="postCode"
                      id="postCode"
                      defaultValue={officerObj?.postCode}
                      placeholder="Type Post Code"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                  <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>Close</Button>

                    
                    {/* localStorage.getItem("updateUni") ? */}
                      {/* <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> : */}

                      {/* <Button.Ripple
                        color="warning"
                        type="submit"
                        className="mr-1 mt-3"
                       
                      >
                        Submit
                      </Button.Ripple> */}

                      <CustomButtonRipple
                        color={"primary"}
                        type={"submit"}
                        className={"mr-1 mt-3"}
                        name={"Submit"}
                        permission={6}
                        isDisabled={buttonStatus}
                      />

                  </FormGroup>

                </Form>
              </ModalBody>

            </Modal>

              </div>

              </div>

              <div className="table-responsive pt-3">
                <Table className="table-sm striped" style={tableStyle}>
                  <thead className="">
                    <tr style={{ textAlign: "center" }}>
                      <th>#</th>
                      <th>UAPP Id</th>
                      <th>Name</th>
                      <th>Provider</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Country</th>
                      {/* <th>City</th>
                         <th>Description</th>
                         <th>Founded</th>
                         <th>Global Ranking</th>
                         <th>Part Time Work Information</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissionOfficer?.map((officer, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        <th scope="row">{1 + i}</th>
                        <td>{officer?.sequenceId}</td>

                        <td>{officer?.nameTittleName}{" "}{officer?.firstName}{" "}{officer?.lastName}</td>

                        <td>
                          {officer?.providerName}
                        </td>

                        <td>{officer?.email}</td>

                        <td>{officer?.phoneNumber}</td>

                        <td>{officer?.countryName} ({officer?.stateName})</td>

                        <td>
                          <ButtonGroup variant="text">
                        
                          <ButtonForFunction
                          func={() =>
                            handlRedirectToAdmissionofficerDetails(officer?.id)
                          }
                          color={"primary"}
                          className={"mx-1 btn-sm"}
                          icon={<i className="fas fa-eye"></i>}
                          permission={6}
                        />

                            <ButtonForFunction
                              func={() => handleUpdate(officer)}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                              
                            />
      
                            <ButtonForFunction
                              color={"danger"}
                              func={() => toggleDanger(officer)}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />

                        <Modal
                          isOpen={deleteModal}
                          toggle={closeDeleteModal}
                          className="uapp-modal"
                        >
                          <ModalBody>
                            <p>
                              Are You Sure to Delete <b>{deleteName}</b> ? Once Deleted it can't
                              be Undone!
                            </p>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              color="danger"
                              onClick={() => handleDeleteAdmissionOfficer(deleteId)}
                              disabled={buttonStatus}
                            >
                              YES
                            </Button>
                            <Button color="primary" onClick={closeDeleteModal}>NO</Button>
                          </ModalFooter>
                        </Modal>

                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdmissionManagerProfile;
