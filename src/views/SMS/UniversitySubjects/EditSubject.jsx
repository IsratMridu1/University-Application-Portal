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
import { rootUrl } from "../../../constants/constants";
import get from '../../../helpers/get';
import put from '../../../helpers/put';
import { useToasts } from 'react-toast-notifications';
import CustomButtonRipple from '../Components/CustomButtonRipple';

const EditSubject = () => {

    const [universityList, setUniversityList] = useState([]);
    const [subject, setSubject] = useState({});
    const [programLevel, setProgramLevel] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [subDepList, setSubDepList] = useState([]);
    const [subId, setSubId] = useState(0);
    const [subName, setSubName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");

    const [uniLabel, setUniLabel] = useState("Select University...");
    const [uniValue, setUniValue] = useState(0);
    const [programLabel, setProgramLabel] = useState("Select Program Level...");
    const [programValue, setProgramValue] = useState(0);
    const [depLabel, setDepLabel] = useState("Select Department...");
    const [depValue, setDepValue] = useState(0);
    const [subDepLabel, setSubDepLabel] = useState("Select Sub Department...");
    const [subDepValue, setSubDepValue] = useState(0);
    const [submitData, setSubmitData] = useState(false);
    const [activetab, setActivetab] = useState("1");


    const history = useHistory();
    const { addToast } = useToasts();
    const {id}  = useParams();

    useEffect(()=>{

      get(`Subject/Get/${id}`).then(res=> {
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
         
      })
      .catch();

      get('University/GetAll').then(res=> {
        setUniversityList(res);
      })
      .catch();

      get('ProgramLevel/Index').then(res=> {
        setProgramLevel(res);
      })
      .catch();

      get('Department/Index').then(res=> {
        setDepartmentList(res);
      })
      .catch();

      get('SubDepartment/Index').then(res=> {
        setSubDepList(res);
      })
      .catch();


    },[])


    // redirect to dashboard
    const backToDashboard = () => {
      history.push("/subjectList");
    };

    const selectUniversity = (label, value) => {
        setUniLabel(label);
        setUniValue(value);
      }
    
      const selectProgramLevel = (label, value) => {
        setProgramLabel(label);
        setProgramValue(value);
      }
    
      const selectDepartment = (label, value) => {
        setDepLabel(label);
        setDepValue(value);
      }
    
      const selectSubDepartment = (label, value) => {
        setSubDepLabel(label);
        setSubDepValue(value);
      }
    
      const uniMenu = universityList.map(universityOptions =>({label:universityOptions.name, value:universityOptions.id}) );
    
      const programLevelMenu = programLevel.map(programOptions =>({label:programOptions.name, value:programOptions.id}) );
    
      const departmentMenu = departmentList.map(depOptions =>({label:depOptions.name, value:depOptions.id}) );
    
      const subDepMenu = subDepList.map(subDepOptions =>({label:subDepOptions.name, value:subDepOptions.id}) );

      // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);


    put('Subject/Update', subdata).then((res) => {
  

      if (res.status === 200 && res.data.isSuccess === true) {
        addToast(res?.data?.message, {
            appearance:'success',
            autoDismiss: true,
          });
        // history.push({
        //   pathname: `/editSubjectFee/${id}`,
        // });
      }
    });
  };

  const handleNextPage = () =>{
    history.push({
      pathname: `/editSubjectFee/${id}`,
    });
  }

   // tab toggle
   const toggle = (tab) => {
    setActivetab(tab);
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

    return (
        <div>
            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Update Subject Information</h3>
                <div className="page-header-back-to-home">
                  <span onClick={backToDashboard} className="text-white">
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
                   <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                     Subject Information
                   </NavLink>
                 </NavItem>

                 <NavItem>
                   
                     <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                       Subject Fee Information
                     </NavLink>
                   
                 </NavItem>
                 <NavItem>
                   
                     <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                       Delivery Pattern
                     </NavLink>
                   
                 </NavItem>
                 <NavItem>
                   
                     <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
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
                 <TabPane tabId="1">
                    <Form  onSubmit={handleSubmit} className="mt-5">
                      <input type='hidden'
                      name='id'
                      id='id'
                      value={subId} />

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
                            id="name"
                            defaultValue={subName}
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
                            placeholder='Enter description'
                            defaultValue={description}
                            required
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
                            defaultValue={duration}
                            name="duration"
                            id="duration"
                            placeholder="Enter duration"
                            required
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row className="has-icon-left position-relative">
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
                        </Col>
                      </FormGroup>

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
                        </Col>
                      </FormGroup>

                      {/* <FormGroup
                        className="has-icon-left position-relative"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      ></FormGroup> */}
                      <FormGroup row
                        className="has-icon-left position-relative"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Col md="5">

                          <CustomButtonRipple
                            type={"submit"}
                            className={"mr-1 mt-3 badge-primary"}
                            name={"Update"}
                            permission={6}
                          />

                        </Col>

                        
                      </FormGroup>

                      <FormGroup row
                        className="has-icon-left position-relative"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                       <Col md="2">

                        <CustomButtonRipple
                          className={"mr-1 mt-3 badge-primary"}
                          func={handleNextPage}
                          name={"Next page"}
                          permission={6}
                        />

                       </Col>
                      </FormGroup>

                    </Form>
                  </TabPane>
                </TabContent>
        </CardBody>
      </Card>

        </div>
    );
};

export default EditSubject;