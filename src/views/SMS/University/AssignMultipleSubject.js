import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Label,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import "antd/dist/antd.css";
import { Image } from "antd";
import get from "../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../constants/constants";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import remove from "../../../helpers/remove";
import post from "../../../helpers/post";
import put from "../../../helpers/put";

const AssignMultipleSubject = () => {
  const [multipleSubAssign, setMultipleSubAssign] = useState([]);
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [success, setSuccess] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [subId, setSubId] = useState(0);
  const [subName, setSubName] = useState('');
  const [disable, setDisable] = useState(true);
  const [checkboxData, setCheckboxData] = useState([]);
  const [sub, setSub] = useState(0);

  // console.log("datas", checkboxData)

  const { id } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    get(`UniversityCampusSubject/GetAllSubjectByCampus/${id}`).then((res) => {
      console.log("MultipleSubList", res);
      setMultipleSubAssign([]);
      setMultipleSubAssign(res);
    });
  }, [id, success]);

  // const getFunction = (id) =>{
  //   get(`UniversityCampusSubject/GetAllSubjectByCampus/${id}`).then((res) => {
  //     console.log("MultipleSubList", res);
  //     setMultipleSubAssign(res);
  //   });
  // }

  const handleAssignSubjects = (e, sub) => {
    // setCheckboxData[1](...checkboxData, homeAccept, ukAccept, intAccept);
    
    // checkboxData[1].push(ukAccept);
    // checkboxData[1].push(intAccept);

    

    e.preventDefault();

    // const x = checkboxData[1].slice(0,3)

    const subdata = [
      [subId], [checkboxData.slice(0,3)]
  ]

  console.log("subdata", subdata);

    const subData = {
      campusId: sub?.campusId,
      subjectId: sub?.subjectId,
      isAcceptHome: homeAccept,
      isAcceptEU_UK: ukAccept,
      isAcceptInternational: intAccept,
    };

    // if(e.target.id === subId){
    //   setDisable(false);
    // }

    // if(sub?.subjectId === subId){
      post("UniversityCampusSubject/Create", subData).then((res) => {
        if (res?.data?.isSuccess == true && res?.status == 200) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          get(`UniversityCampusSubject/GetAllSubjectByCampus/${id}`).then((res) => {
            console.log("MultipleSubList", res);
            setMultipleSubAssign([]);
            setMultipleSubAssign(res);
          });
          setHomeAccept(false);
          setUkAccept(false);
          setIntAccept(false);
        }
      });
    // }
    // else{
    //   alert("Click the right button");
    // }
    console.log("subdataaaaa", subData);
  };

  const backToDashboard = () => {
    history.push(`/campusDetails/${id}`);
  };

  const toggleDanger = (p) => {
    console.log("ppppp", p);
    // setHomeAccept(p?.isAcceptHome);
    // setUkAccept(p?.isAcceptEU_UK);
    // setIntAccept(p?.isAcceptInternational);
    localStorage.setItem("subjeId", p?.id);
    localStorage.setItem("subjeName", p?.subjectName);
    setDeleteModal(true);
  };

  const handleDeletePermission = (campusSubjectId) => {
    const returnValue = remove(`UniversityCampusSubject/Delete/${campusSubjectId}`).then(
      (action) => {
        
        // setHomeAccept(homeAccept === true ? !homeAccept : homeAccept);
        // setUkAccept(ukAccept === true ? !ukAccept : ukAccept);
        // setIntAccept(intAccept === true ? !intAccept : intAccept);
        setHomeAccept(false);
        setUkAccept(false);
        setIntAccept(false);
        
        setDeleteModal(false);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setMultipleSubAssign([]);
        console.log("multiple array",multipleSubAssign);
        get(`UniversityCampusSubject/GetAllSubjectByCampus/${id}`).then((res) => {
          console.log("MultipleSubList", res);
          
          setMultipleSubAssign(res);
        });
        localStorage.removeItem("subjeId");
        localStorage.removeItem("subjeName");
        // window.location.reload(false);
        console.log("checkboxDelete", homeAccept, ukAccept, intAccept);
      }
    );
  };

  console.log("checkbox", homeAccept, ukAccept, intAccept);

  // console.log("successBefore post", success);

  const handleAssignAll = () =>{
    put(`UniversityCampusSubject/AssignAllSubject/${id}`)
    .then(res => {
      if (res.status === 200 && res.data.isSuccess === true) {
        addToast(res.data.message, {
          appearance: 'success',
          autoDismiss: true,
        })
        get(`UniversityCampusSubject/GetAllSubjectByCampus/${id}`).then((res) => {
          console.log("MultipleSubList", res);
          setMultipleSubAssign([]);
          setMultipleSubAssign(res);
        });
        setOpenModal(false);
      }
    
    })
  }

  // console.log("successAfter post", success);

  // for feature checkboxes
  const handleFeatureHome = e =>{
    const {name, id, checked, disabled} = e.target;
    let val = e.target.checked;

    setCheckboxData([...checkboxData, val]);
    // setSub(id);

    // if (val == true) {
    //   checkboxData[0].push(id);
    //   checkboxData[1].push(val);
    // } 
    //   else {
    //   const index = checkboxData.indexOf(id);
    //   if (index > -1) {
    //     checkboxData.splice(index, 1);
    //   }
    // }

    console.log("dataHome", checkboxData);
    
}

const handleFeatureUk = e =>{
  const {name, id, checked} = e.target;
  let val = e.target.checked;

  setCheckboxData([...checkboxData, val]);
  // setSub(id);

  // if (val == true) {
  //   setCheckboxData([...checkboxData, val]);
  // } else {
  //   const index = checkboxData.indexOf(id);
  //   if (index > -1) {
  //     checkboxData.splice(index, 1);
  //   }
  // }
 
  console.log("dataUk", checkboxData)
}

const handleFeatureInt = e =>{
  const {name, id, checked} = e.target;
  let val = e.target.checked;

  setCheckboxData([...checkboxData, val]);
  // setSub(id);

  // if (val == true) {
  //   setCheckboxData([...checkboxData, val]);
  // } else {
  //   const index = checkboxData.indexOf(id);
  //   if (index > -1) {
  //     checkboxData.splice(index, 1);
  //   }
  // }

  console.log("dataInt", checkboxData)
}

console.log("data", checkboxData)

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Assign Subject to Campus</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Campus
              Details
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* new assign multiple subject starts here */}

      <div className=" info-item mt-4">
        <Card className="uapp-employee-search">
          <CardBody className="search-card-body">
            {/* <div className="hedding-titel d-flex justify-content-between mb-4">
              <div>
                <h5>
                  {" "}
                  <b>Assign Subject</b>{" "}
                </h5>

                <div className="bg-h"></div>
              </div>
            </div> */}

          <div className="container test-score-div-1-style mt-1 mb-4">
            <div className="d-flex justify-content-between">
            <span className="test-score-span-1-style my-auto">
              Assign all subjects on this campus with all application types. [Is not recommended]
            </span>
              <Button onClick={()=>setOpenModal(true)} color="primary">
                  Assign All
              </Button>
            </div>
          </div>

                   <Modal
                      isOpen={openModal}
                      toggle={() => setOpenModal(!deleteModal)}
                      className="uapp-modal"
                    >
                      <ModalBody>
                        <p>
                        Are You Sure to Assign All Subjects?
                        </p>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          onClick={handleAssignAll}
                          color="danger"
                        >
                          YES
                        </Button>
                        <Button color="primary" onClick={() => setOpenModal(false)}>
                          NO
                        </Button>
                      </ModalFooter>
                    </Modal>

           <div className="container test-score-div-1-style mt-1 mb-4">
            <span className="test-score-span-1-style">
            <div>
              <span>Assign an individual subject with specific application types.</span>
              <div>
                <span className="text-danger">N.B : Select the checkboxes of a particular subject only.</span>
              </div>
            </div>
            </span>
           </div>

            <Form>
              {/* <Card>
                  <CardHeader className="page-header">
                  <CardHeader>Select Subject</CardHeader>
                  </CardHeader>
              </Card> */}

              {/* <Input
                        type='hidden'
                        name='campusId'
                        id='campusId'
                        value={id}
                        
                        /> */}

              <Row className="text-center">
                <Col xs="6" sm="4" md="2"></Col>

                <Col xs="6" sm="4" md="3">
                  <span>Is Accept Home </span>
                </Col>

                <Col xs="6" sm="4" md="2">
                  <span>Is Accept EU/UK </span>
                </Col>

                <Col xs="6" sm="4" md="3">
                  <span>Is Accept International</span>
                </Col>

                <Col xs="6" sm="4" md="2"></Col>
              </Row>

              {/* Map ongoing  */}

              {multipleSubAssign?.map((sub, i) => (
                <Row key={i}>
                  <Col xs="6" sm="4" md="2" key={i} className="mt-2">
                    <div className="">{sub?.subjectName}</div>
                  </Col>

                  <Col xs="6" sm="4" md="3" className="text-center mt-2">
                    {/* <span>Is accept home </span><br /> */}
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id={sub?.subjectId}
                        name='isAcceptHome'
                        // disabled={sub?.isChecked ? false : true}
                        onChange={(e) => {
                          setHomeAccept(false);
                          setHomeAccept(!homeAccept);
                          // handleFeatureHome(e);
                          // setHomeAccept(e.target.checked);
                          setSubId(sub?.subjectId);
                          setSubName(sub?.subjectName);
                          localStorage.setItem("subjectIdCheck", sub?.subjectName);
                        }}
                        defaultChecked={sub?.isAcceptHome}
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="6" sm="4" md="2" className="text-center mt-2">
                    {/* <span>Is accept EU_UK  </span><br /> */}
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id={sub?.subjectId}
                        name='isAcceptEU_UK'
                        // disabled={sub?.isChecked ? false : true}
                        onChange={(e) => {
                          setUkAccept(false);
                          setUkAccept(!ukAccept);
                          // handleFeatureUk(e);
                          // setUkAccept(e.target.checked);
                          setSubId(sub?.subjectId);
                          setSubName(sub?.subjectName);
                          localStorage.setItem("subjectIdCheck", sub?.subjectName);
                        }}
                        defaultChecked={sub?.isAcceptEU_UK}
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="6" sm="4" md="3" className="text-center mt-2">
                    {/* <span>Is accept international</span> */}

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id={sub?.subjectId}
                        name='isAcceptInternational'
                        // disabled={sub?.isChecked ? false : true}
                        onChange={(e) => {
                          setIntAccept(false);
                          setIntAccept(!intAccept);
                          // handleFeatureInt(e);
                          // setIntAccept(e.target.checked);
                          setSubId(sub?.subjectId);
                          setSubName(sub?.subjectName);
                          localStorage.setItem("subjectIdCheck", sub?.subjectName);
                        }}
                        defaultChecked={sub?.isAcceptInternational}
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="6" sm="4" md="2" className="text-center mt-2">
                    {/* <span>Is accept international</span> */}

                    <FormGroup check inline>
                      {sub?.isAssigned ? (
                        <Button onClick={() => toggleDanger(sub)} color="danger">
                          Remove
                        </Button>
                      ) : (
                          
                          <Button id={sub?.subjectId} onClick={(e)=>handleAssignSubjects(e, sub)} color="primary">
                          Add
                        </Button> 
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              ))}

                   <Modal
                      isOpen={deleteModal}
                      toggle={() => setDeleteModal(!deleteModal)}
                      className="uapp-modal"
                    >
                      <ModalBody>
                        <p>
                          Are You Sure to Remove this{" "}
                          <b>{localStorage.getItem("subjeName")}</b> ? Once
                          Deleted it can't be Undone!
                        </p>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          onClick={() =>
                            handleDeletePermission(
                              localStorage.getItem("subjeId")
                            )
                          }
                          color="danger"
                        >
                          YES
                        </Button>
                        <Button onClick={() => setDeleteModal(false)}>
                          NO
                        </Button>
                      </ModalFooter>
                    </Modal>

              {/* <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button.Ripple
                        type="submit"
                        className="mr-1 mt-3 badge-primary"
                      >
                        Submit
                      </Button.Ripple>
                    </FormGroup> */}
            </Form>
          </CardBody>
        </Card>
      </div>

      {/* new assign multiple subject ends here */}
    </div>
  );
};

export default AssignMultipleSubject;
