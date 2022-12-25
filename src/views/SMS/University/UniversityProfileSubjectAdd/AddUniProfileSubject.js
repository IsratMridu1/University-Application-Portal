import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory, useParams } from "react-router";
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
import { rootUrl } from "../../../../constants/constants";
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import ButtonForFunction from '../../Components/ButtonForFunction';
import { useToasts } from "react-toast-notifications";
import put from '../../../../helpers/put';
import { userTypes } from '../../../../constants/userTypeConstant';

const AddUniProfileSubject = () => {
    const [submitData, setSubmitData] = useState(false);
    const [activetab, setActivetab] = useState("1");
    const [universityList, setUniversityList] = useState([]);
    const [programLevel, setProgramLevel] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [subDepList, setSubDepList] = useState([]);
    const [uniLabel, setUniLabel] = useState("Select University");
    const [uniValue, setUniValue] = useState(0);
    const [programLabel, setProgramLabel] = useState("Select Program Level");
    const [programValue, setProgramValue] = useState(0);
    const [depLabel, setDepLabel] = useState("Select Department");
    const [depValue, setDepValue] = useState(0);
    const [subDepLabel, setSubDepLabel] = useState("Select Sub Department");
    const [subDepValue, setSubDepValue] = useState(0);

    const [subject, setSubject] = useState({});
    const [subId, setSubId] = useState(0);
    const [subName, setSubName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");

    const [providerValue, setProviderValue] = useState(0);

    const [uniDropError, setUniDropError] = useState(false);
    const [progLvlError, setProgLvlError] = useState(false);
    const [deptDropError, setDeptDropError] = useState(false);
    const [subDeptDropError, setSubDeptDropError] = useState(false);
    const [subjectId, setSubjectId] = useState(undefined);

    const [buttonStatus,setButtonStatus] = useState(false);

    const {addToast} = useToasts();
    const {id, subjId} = useParams();
    console.log("idddd", id);
    const history = useHistory();

    const userType = localStorage.getItem("userType");
    const referenceId = localStorage.getItem("referenceId");

    console.log("subId", subId);

    useEffect(()=>{
      get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(res=>{
        console.log("providerHelper",typeof(res));
          setProviderValue(res != 0 ? res : 0);
          // if(res != 0){
          //   localStorage.setItem("providerValue", res);
          // }
      })
    },[userType, referenceId]);

    useEffect(()=>{

      if(subjId != undefined){
        get(`Subject/Get/${subjId}`).then(res=> {
          setSubject(res);
          setSubId(res?.id);
          setSubName(res?.name);
          setDescription(res?.description);
          setDuration(res?.duration);
          setUniLabel(res?.university?.name);
          setUniValue(res?.university?.id);
          setProgramLabel(res?.programLevel?.name);
          setProgramValue(res?.programLevel?.id);
          setDepLabel(res?.department?.name);
          setDepValue(res?.department?.id);
          setSubDepLabel(res?.subDepartment?.name);
          setSubDepValue(res?.subDepartment?.id);
          console.log(res);
      })
      .catch();
      }
      else{
        get(`Subject/Get/${subjectId}`).then(res=> {
          setSubject(res);
          setSubId(res?.id);
          setSubName(res?.name);
          setDescription(res?.description);
          setDuration(res?.duration);
          setUniLabel(res?.university?.name);
          setUniValue(res?.university?.id);
          setProgramLabel(res?.programLevel?.name);
          setProgramValue(res?.programLevel?.id);
          setDepLabel(res?.department?.name);
          setDepValue(res?.department?.id);
          setSubDepLabel(res?.subDepartment?.name);
          setSubDepValue(res?.subDepartment?.id);
          console.log(res);
      })
      .catch();
      }

      

      if(userType == userTypes?.ProviderAdmin || userType == userTypes?.AdmissionManager){
        get(`ProviderUniversityDD/Index/${providerValue}`).then(res=> {
          setUniversityList(res);
        })
        .catch();
      }
      else{
        get('UniversityDD/Index').then(res=> {
          setUniversityList(res);
        })
        .catch();
      }

      get('ProgramLevelDD/Index').then(res=> {
        setProgramLevel(res);
      })
      .catch();

      get('DepartmentDD/Index').then(res=> {
        setDepartmentList(res);
      })
      .catch();

      // get(`SubDepartmentDD/Index`).then(res=> {
      //   setSubDepList(res);
      // })
      // .catch();


    },[providerValue])

    const selectSubDepByDepartment = (depValue) => {
      get(`SubDepartmentDD/Index/${depValue}`).then(res=> {
        setSubDepList(res);
      })
    }

  // redirect to dashboard
  const backToUniversityDetails = () => {
    history.push(`/universityDetails/${id}`);
  };

//   const selectUniversity = (label, value) => {
//     setUniDropError(false);
//     setUniLabel(label);
//     setUniValue(value);
//   }

  const selectProgramLevel = (label, value) => {
    setProgLvlError(false);
    setProgramLabel(label);
    setProgramValue(value);
  }

  const selectDepartment = (label, value) => {
    setSubDepLabel('Select Sub Department');
    setSubDepValue(0);
    setDeptDropError(false);
    setDepLabel(label);
    setDepValue(value);
    selectSubDepByDepartment(value);
  }

  const selectSubDepartment = (label, value) => {
    setSubDeptDropError(false);
    setSubDepLabel(label);
    setSubDepValue(value);
  }

  const uniMenu = universityList.map(universityOptions =>({label:universityOptions.name, value:universityOptions.id}) );

  const programLevelMenu = programLevel.map(programOptions =>({label:programOptions.name, value:programOptions.id}) );

  const departmentMenu = departmentList.map(depOptions =>({label:depOptions.name, value:depOptions.id}) );

  const subDepMenu = subDepList.map(subDepOptions =>({label:subDepOptions.name, value:subDepOptions.id}) );

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if(id != undefined){
      if (tab == "2") {
        history.push(`/addUniProfileSubjectFee/${id}/${subjId}`);
      }
      if (tab == "3") {
        history.push(`/addUniProfileSubjectDeliveryPattern/${id}/${subjId}`);
      }
      if (tab == "4") {
        history.push(`/addUniProfileSubjectRequirements/${id}/${subjId}`);
      }
      if (tab == "5") {
        history.push(`/addUniProfileSubjectDocumentRequirement/${id}/${subjId}`);
      }
    }
    else{
      if (tab == "2") {
        history.push(`/addUniProfileSubjectFee/${id}/${subjectId}`);
      }
      if (tab == "3") {
        history.push(`/addUniProfileSubjectDeliveryPattern/${id}/${subjectId}`);
      }
      if (tab == "4") {
        history.push(`/addUniProfileSubjectRequirements/${id}/${subjectId}`);
      }
      if (tab == "5") {
        history.push(`/addUniProfileSubjectDocumentRequirement/${id}/${subjectId}`);
      }
    }
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    // if(uniValue == 0){
    //   setUniDropError(true);
    // }
    if(programValue == 0){
      setProgLvlError(true);
    }
    else if(depValue == 0){
      setDeptDropError(true);
    }
    else if(subDepValue == 0){
      setSubDeptDropError(true);
    }
    else{
      if(subId != 0){
        setButtonStatus(true);
        put('Subject/Update', subdata).then((res) => {
          console.log(res);
          setButtonStatus(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
                appearance:'success',
                autoDismiss: true,
              });
            history.push({
              pathname: `/addUniProfileSubjectFee/${id}/${subjId}`,
            });
          }
        });
      }
      else{
        setButtonStatus(true);
        Axios.post(`${rootUrl}Subject/Create`, subdata,{
          headers: {
            'Content-Type': 'application/json',
            'authorization': AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          // localStorage.setItem("subjectId",res?.data?.result?.id);
          const subjeId = res?.data?.result?.id;
          setSubjectId(subjeId);
    
          if (res.status === 200 && res.data.isSuccess === true) {
            setSubmitData(true);
            addToast(res?.data?.message, {
              appearance: 'success',
              autoDismiss: true,
            })
            history.push({
              pathname: `/addUniProfileSubjectFee/${id}/${subjeId}`,
              id: subId,
            });
          }
        });
      }
    }
    
  };

  const handleCancelAdd = () => {
    history.push(`/universityDetails/${id}`);
  }

  // redirect to Next Page
  const onNextPage = () => {
    // const uniID = universityId;
    if (subId != 0){
      history.push({
        pathname: `/addUniProfileSubjectFee/${id}/${subjId}`,
      });
    }
    else{
      history.push({
        pathname: `/addUniProfileSubjectFee/${id}/${subjectId}`,
      });
    }
  };

    return (
        <div>
            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Subject Information</h3>
                <div className="page-header-back-to-home">
                  <span onClick={backToUniversityDetails} className="text-white">
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
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Subject Information
              </NavLink>
            </NavItem>

            {
              subjId != undefined ?
              <>
              <NavItem>
              {submitData || subjId ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Subject Fee Information
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
                  Subject Fee Information
                </NavLink>
              )}
            </NavItem>
            <NavItem>
            {submitData || subjId ? (
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Delivery Pattern
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Delivery Pattern
                </NavLink>
              )}
            </NavItem>
            <NavItem>
            {submitData || subjId ? (
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  Requirement
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Requirement
                </NavLink>
              )}
            </NavItem>
            <NavItem>
            {submitData || subjId ? (
                <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                  Document Requirement
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "5"}>
                  Document Requirement
                </NavLink>
              )}
            </NavItem>
            </>
              :
              <>
              <NavItem>
              {submitData || subjectId ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Subject Fee Information
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
                  Subject Fee Information
                </NavLink>
              )}
            </NavItem>
            <NavItem>
            {submitData || subjectId ? (
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Delivery Pattern
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Delivery Pattern
                </NavLink>
              )}
            </NavItem>
            <NavItem>
            {submitData || subjectId ? (
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  Requirement
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Requirement
                </NavLink>
              )}
            </NavItem>
            <NavItem>
            {submitData || subjectId ? (
                <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                  Document Requirement
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "5"}>
                  Document Requirement
                </NavLink>
              )}
            </NavItem>
            </>
            }

          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form  onSubmit={handleSubmit} className="mt-5">
                {
                  subId != 0 ?
                  <input type='hidden'
                      name='id'
                      id='id'
                      value={subId} />
                      :
                      null
                }
                <Input 
                  type="hidden"
                  name="universityId"
                  id="universityId"
                  value={id}
                />
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Subject Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="name"
                      defaultValue={subName}
                      id="name"
                      placeholder="Enter Subject Name"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Description <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type='textarea'
                      rows='4'
                      defaultValue={description}
                      placeholder='Enter Description'
                      required
                    //   options={universityTypeName}
                    //   value={{ label: uniTypeLabel, value: uniTypeValue }}
                    //   onChange={(opt) => selectUniType(opt.label, opt.value)}
                      name="description"
                      id="description"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Duration <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="duration"
                      id="duration"
                      defaultValue={duration}
                      placeholder="Enter Duration"
                      required
                    />
                  </Col>
                </FormGroup>

                {/* <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={uniMenu}
                      value={{ label: uniLabel, value: uniValue }}
                      onChange={(opt) => selectUniversity(opt.label, opt.value)}
                      name="universityId"
                      id="universityId"
                    />

                    {uniDropError && (
                      <span className="text-danger">You must select university.</span>
                    )}

                  </Col>
                </FormGroup> */}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Program level <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={programLevelMenu}
                      value={{ label: programLabel, value: programValue }}
                      onChange={(opt) => selectProgramLevel(opt.label, opt.value)}
                      name="programLevelId"
                      id="programLevelId"
                    />
                    {progLvlError && (
                      <span className="text-danger">You must select program level.</span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Department <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={departmentMenu}
                      value={{ label: depLabel, value: depValue }}
                      onChange={(opt) => selectDepartment(opt.label, opt.value)}
                      name="departmentId"
                      id="departmentId"
                    />
                    {deptDropError && (
                      <span className="text-danger">You must select department.</span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Sub-department <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={subDepMenu}
                      value={{ label: subDepLabel, value: subDepValue }}
                      onChange={(opt) => selectSubDepartment(opt.label, opt.value)}
                      name="subDepartmentId"
                      id="subDepartmentId"
                    />
                    {subDeptDropError && (
                      <span className="text-danger">You must select sub-department.</span>
                    )}
                  </Col>
                </FormGroup>

                {/* <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup> */}
                <FormGroup row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}

                  <Col md="1">
                  <ButtonForFunction
                      func={handleCancelAdd}
                      className={"mr-0 mt-3"}
                      name={"Cancel"}
                      color={"danger"}
                    />
                  </Col>

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
                  justifyContent: "end",
                }}
              >
                {/* <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                /> */}

                
                  <ButtonForFunction
                  func={onNextPage}
                  disable = {(subId == 0) ? true : false}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
                
              </FormGroup>

            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
      <br/>
      <br/>
    </div>
    );
};

export default AddUniProfileSubject;