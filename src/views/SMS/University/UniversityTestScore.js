import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
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
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';

const UniversityTestScore = () => {

    const history = useHistory();
    const {univerId} = useParams();

    const [activetab, setActivetab] = useState("6");
    const [ielts,setIelts] = useState(false);
    const [required,setRequired] = useState(false);
    const [buttonStatus,setButtonStatus] = useState(false);
    const [score,setScore] = useState(null);
    const {addToast} = useToasts();
    const [data,setData] = useState({});

    useEffect(()=>{
        get(`TestScoreRequirement/Index/${univerId}`)
        .then(res => {
            console.log(res);
            setData(res);
            setRequired(res?.isTestScoreRequired);
            setIelts(res?.isIeltsMandatory);
            
        })

    },[])

    const backToUniList = () => {
        history.push("/universityList");
      };

      const goBack = () => {
        history.push(`/addUniversityGallery/${univerId}`);
      };
    
      const goFront = () => {
        history.push(`/addUniversityApplicationDocument/${univerId}`);
      };

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

      const handleIelts  = (e) => {
            setIelts(e.target.checked);
      }

      const handleRequired = (e) => {
        setRequired(e.target.checked);
      }

      const handleScore = (e) => {
        setScore(e.target.value);
      }

      const  submitTestScore = (event) => {
        event.preventDefault();

        const subData  = new FormData(event.target);

        subData.append('isTestScoreRequired',required);
        subData.append('isIeltsMandatory',ielts);

        if(data?.id){
            put(`TestScoreRequirement/Update`,subData)
        .then(res => {
            if(res?.status == 200 && res?.data?.isSuccess == true){
                addToast(res?.data?.message,{
                    appearance: 'success',
                    autoDismiss: true
                })
                history.push(`/addUniversityApplicationDocument/${univerId}`);
            }
            else{
                addToast(res?.data?.message,{
                    appearance: 'error',
                    autoDismiss: true
                }) 
            }

        })


        }

        else{
            post(`TestScoreRequirement/Create`,subData)
        .then(res => {
            if(res?.status == 200 && res?.data?.isSuccess == true){
                addToast(res?.data?.message,{
                    appearance: 'success',
                    autoDismiss: true
                })
                history.push(`/addUniversityApplicationDocument/${univerId}`);
            }
            else{
                addToast(res?.data?.message,{
                    appearance: 'error',
                    autoDismiss: true
                }) 
            }

        })

        }

      }

      
    

    return (
        <div>
            <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Test Score</h3>
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
            <TabPane tabId="6">

                 <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Test Score Infomration</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  
                </div>

              <Form onSubmit={submitTestScore}  className="mt-5">

                <input
                type='hidden'
                name='universityId'
                id='universityId'
                value={univerId}
                />

               {
                (data?.id)?
                <input
                type='hidden'
                name='id'
                id='id'
                value={data?.id}
                />
                :
                null
               }
               

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Is Test Score Required
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                    className='ml-1'
                      type="checkbox"
                    //   name='isTestScoreRequired'
                    //   id='isTestScoreRequired'
                      onChange={handleRequired}
                      checked={required}
                      
                    />
                    
                  </Col>
                </FormGroup>

                {
                    required? 
                    <>
                    <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Is IELTS Mandatory 
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                    className='ml-1'
                      type="checkbox"
                    //   name='isIeltsMandatory'
                    //   id='isIeltsMandatory'
                      onChange={handleIelts}
                      checked={ielts}
                      
                    />
                    
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      {
                        ielts?
                        'IELTS Score'
                        :
                        'IELTS Equivalent Score'

                      }
                    </span>
                  </Col>
                  <Col md="3">
                    <Input

                    
                      type="number"
                      name='score'
                      id='score'
                      placeholder='Enter Score'
                      defaultValue={data?.score}
                      required
                      onChange={handleScore}
                      
                    />
                    
                  </Col>
                </FormGroup>
                    </>

                    :

                    null
                }

                <div className='row'>
                    <div className='col-md-5 d-flex justify-content-end'>
                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
                      name={"Save"}
                      disable={!(required && score> '1')}
                      permission={6}
                    />

                    </div>

                </div>

              
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

export default UniversityTestScore;