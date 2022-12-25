import React, { useState } from 'react';
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
import Axios from 'axios';
import { rootUrl } from "../../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from 'react-toast-notifications';
import ButtonForFunction from '../../Components/ButtonForFunction';
import { useEffect } from 'react';
import get from '../../../../helpers/get';
import put from '../../../../helpers/put';

const AddUniProfileSubjectFee = () => {
    const [activetab, setActivetab] = useState('2');
    const [localTutionFee, setLocalTutionFee] = useState("");
    const [intTutionFee, setIntTutionFee] = useState("");
    const [euTutionFee, setEuTutionFee] = useState("");
    const [sId, setSId] = useState("");
    const [id1, setId] = useState(undefined);

    const [buttonStatus,setButtonStatus] = useState(false);

    console.log("id1",id1);

    const history = useHistory();
    const { addToast } = useToasts();
    const {id, subjId} = useParams();

    // redirect to dashboard
    const backToUniDetails = () => {
      history.push(`/universityDetails/${id}`);
    };

    useEffect(()=>{
      
      
        
          get(`SubjectFeeStructure/GetBySubject/${subjId}`)
        .then(res=>{
          console.log("subjectFeeget",res);
          setLocalTutionFee(res?.localTutionFee);
          setIntTutionFee(res?.internationalTutionFee);
          setEuTutionFee(res?.eU_TutionFee);
          setSId(res?.subjectId);
          setId(res?.id);
        })
        
      
      
    },[subjId,id1])

    // tab toggle
    const toggle = (tab) => {
      setActivetab(tab);
      if (tab == '1') {
        history.push(`/addUniProfileSubject/${id}/${subjId}`);
      }
      if (tab == "2") {
        history.push(`/addUniProfileSubjectFee/${id}/${subjId}`);
      }
      if(tab == '3'){
        history.push(`/addUniProfileSubjectDeliveryPattern/${id}/${subjId}`)
      }
      if(tab == '4'){
        history.push(`/addUniProfileSubjectRequirements/${id}/${subjId}`)
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

    for (var value of subdata.values()) { 
      console.log("values",value);
     }

     if(id1 != undefined){
      setButtonStatus(true);
      put("SubjectFeeStructure/Update", subdata)
      .then(res=>{
        setButtonStatus(false);
       if (res.status === 200 && res.data.isSuccess === true) {
           addToast(res?.data?.message, {
             appearance:'success',
             autoDismiss: true,
           });
           history.push({
             pathname: `/addUniProfileSubjectDeliveryPattern/${id}/${subjId}`,
           });
          }
       })
     }
     else{
      setButtonStatus(true);
      Axios.post(`${rootUrl}SubjectFeeStructure/Create`, subdata, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': AuthStr,
        },
      }).then((res) => {
        setButtonStatus(false);
        console.log("post response", res);
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance:'success',
            autoDismiss: true,
          });
          history.push({
            pathname: `/addUniProfileSubjectDeliveryPattern/${id}/${subjId}`,
          });
        }
        else{
          addToast(res?.data?.message, {
            appearance:'success',
            autoDismiss: true,
          });
        }
      });
     }
    
  };

   // redirect to Next Page
   const onNextPage = () => {
    history.push({
      pathname: `/addUniProfileSubjectDeliveryPattern/${id}/${subjId}`,
    });
  };

  const onPreviousPage = () => {
    history.push(`/addUniProfileSubject/${id}/${subjId}`);
  }

    return (
        <div>
            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Subject Fee Information</h3>
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
              <NavLink  active={activetab === "1"} onClick={() => toggle("1")}>
                Subject Information
              </NavLink>
            </NavItem>

            <NavItem>
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Subject Fee Information
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink  active={activetab === "3"} onClick={() => toggle("3")}>
                  Delivery Pattern
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink  active={activetab === "4"} onClick={() => toggle("4")}>
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
            <TabPane tabId="2">
              <Form  onSubmit={handleSubmit} className="mt-5">

              {
                id1 != undefined ?
                 <input type='hidden'
                 name='id'
                 id='id'
                 value={id1} />
                 :
                 null
              }
                
      
                
                <FormGroup row className="has-icon-left position-relative">
                  {/* <Input type="hidden" id="subjectId" name="subjectId" value={localStorage.getItem("subjectId")} /> */}
                  <Input type="hidden" id="subjectId" name="subjectId" value={subjId} />
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Local Tution Fee <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      defaultValue={localTutionFee}
                      name="localTutionFee"
                      id="localTutionFee"
                      placeholder="Tution Fee"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      International Tution Fee <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type='number'
                      min="0"
                      defaultValue={intTutionFee}
                      placeholder='Enter International Tution Fee '
                      required
                      name="internationalTutionFee"
                      id="internationalTutionFee"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      EU Tution Fee <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="eU_TutionFee"
                      id="eU_TutionFee"
                      defaultValue={euTutionFee}
                      placeholder="Enter EU Tution Fee"
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

export default AddUniProfileSubjectFee;