import React, { useEffect, useState } from 'react';
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
import { useToasts } from 'react-toast-notifications';
import get from '../../../helpers/get';
import put from '../../../helpers/put';
import CustomButtonRipple from '../Components/CustomButtonRipple';

const EditSubjectFee = () => {

    const [activetab, setActivetab] = useState("2");
    const [localTutionFee, setLocalTutionFee] = useState("");
    const [intTutionFee, setIntTutionFee] = useState("");
    const [euTutionFee, setEuTutionFee] = useState("");
    const [sId, setSId] = useState("");
    const [id, setId] = useState("");

    const history = useHistory();
    const { addToast } = useToasts();

    // redirect to dashboard
    const backToDashboard = () => {
        history.push("/subjectList");
      };
    
    const {subId} = useParams();

    useEffect(()=>{
      get(`SubjectFeeStructure/GetBySubject/${subId}`)
      .then(res=>{
      
        setLocalTutionFee(res?.localTutionFee);
        setIntTutionFee(res?.internationalTutionFee);
        setEuTutionFee(res?.eU_TutionFee);
        setSId(res?.subjectId);
        setId(res?.id);
      })
    },[])

    // tab toggle
    const toggle = (tab) => {
     setActivetab(tab);
     if (tab == "1") {
        history.push(`/editSubject/${subId}`);
       }
     if (tab == "2") {
       history.push(`/editSubjectFee/${subId}`);
      }
     if (tab == "3") {
       history.push(`/editDeliveryPattern/${subId}`);
      }
     if (tab == "4") {
       history.push(`/editSubjectRequirements/${subId}`);
      }
      if (tab == "5") {
        history.push(`/editSubjectDocumentRequirement/${subId}`);
      }
    };

    const handleSubjectFeeUpdate = e =>{
      e.preventDefault();
      const subdata = new FormData(e.target);

      put("SubjectFeeStructure/Update", subdata)
      .then(res=>{
       if (res.status === 200 && res.data.isSuccess === true) {
           addToast(res?.data?.message, {
             appearance:'success',
             autoDismiss: true,
           });
          //  history.push({
          //    pathname: `/subjectList`,
          //  });
          }
       })
    }

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
            <TabPane tabId="2">
              <Form  onSubmit={handleSubjectFeeUpdate} className="mt-5">
              <input type='hidden'
                      name='id'
                      id='id'
                      value={id} />
                <FormGroup row className="has-icon-left position-relative">
                <input type='hidden'
                      name='subjectId'
                      id='subjectId'
                      value={sId} />
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
                      name="localTutionFee"
                      id="localTutionFee"
                      defaultValue={localTutionFee}
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
                      placeholder='Enter international tution fee '
                      required
                      name="internationalTutionFee"
                      id="internationalTutionFee"
                      defaultValue={intTutionFee}
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
                      placeholder="Enter EU tution fee"
                      defaultValue={euTutionFee}
                      required
                    />
                  </Col>
                </FormGroup>

                
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
              </Form>
            </TabPane>
          </TabContent>

             </CardBody>
            </Card>
        </div>
    );
};

export default EditSubjectFee;