import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Row,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import remove from "../../../../helpers/remove";

import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import loadingImages from '../../../../assets/img/data.svg'
import cardImage from '../../../../assets/img/Group.png';

const StudentTestScoreForm = () => {

    const [activetab, setActivetab] = useState("5");
  const [value, setValue] = useState(0);
  const [data, setData] = useState({});

  const {id} = useParams();

  const [greData, setGreData] = useState({});
  const [gmatData, setGmatData] = useState({});
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [deleteModal3, setDeleteModal3] = useState(false);

  // English Course Names

  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [pte, setPte] = useState({});

  const [ELqualificationLabel, setELQualificationLabel] = useState("Select");
  const [ELqualificationValue, ELsetQualificationValue] = useState(0);

  const { addToast } = useToasts();

  const [courseInfo, setCourseInfo] = useState([]);

  const [oneData, setOneData] = useState({});

  const [add, setAdd] = useState(false);

  const [updateIelts, setUpdateIelts] = useState(false);
  const [updateDuolingo, setUpdateDuolingo] = useState(false);
  const [updateToefl, setUpdateToefl] = useState(false);
  const [updateFunctions, setUpdateFunctions] = useState(false);
  const [updateGcse, setUpdateGcse] = useState(false);
  const [updatePearson, setUpdatePearson] = useState(false);
  const [updateOther, setUpdateOther] = useState(false);
  const [updatePte, setUpdatepte] = useState(false);

  const [qualificationLabel, setQualificationLabel] = useState("NO");
  const [qualificationValue, setQualificationValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);


  const [testError, setTestError] = useState(false);
  const [loading, setLoading] =useState(false);
  const [buttonStatus,setButtonStatus] = useState(false);

// Test Options

  const testOptions = [
    {
      id: 1,
      name: "Yes",
    },

    {
      id: 2,
      name: "No",
    },
  ];

  // Test Name Options

  const testNameOptions = [
    {
      id: 1,
      name: "IELTS",
    },

    {
      id: 2,
      name: "DUOLINGO",
    },

    {
      id: 3,
      name: "TOEFL",
    },

    {
      id: 4,
      name: "FUNCTION SKILLS",
    },

    {
      id: 5,
      name: "GCSE",
    },

    {
      id: 6,
      name: "PEARSON",
    },

    {
      id: 7,
      name: "OTHER SCORE",
    },

    {
      id: 8,
      name: "PTE SCORE",
    },
  ];


  const addNewScore = () => {
    setQualificationLabel('Yes');
    setQualificationValue(1);
  }

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const closeModal2 = () => {
    setModal2Open(false);
  };

  const closeModal3 = () => {
    setModal3Open(false);
  };




  const qualificationOptions = testNameOptions?.map((qual) => ({
    label: qual.name,
    value: qual.id,
  }));

  //  select  Student type
  const selectQualification = (label, value) => {
    setTestError(false);
    setELQualificationLabel(label);
    ELsetQualificationValue(value);

    setModalOpen(true);

    
  };


  const showGREForm = () => {
    setModal2Open(true);
  };

  const showGMATForm = () => {
    setModal3Open(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    if (ELqualificationLabel == "IELTS") {
        setButtonStatus(true);
        post("Ielts/Create", subData).then((res) => {
          setButtonStatus(false);
          
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
     
    } else if (ELqualificationLabel == "DUOLINGO") {
         setButtonStatus(true);
        post("Duolingo/Create", subData).then((res) => {
          setButtonStatus(false);
          
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });

    } else if (ELqualificationLabel == "TOEFL") {
        setButtonStatus(true);
        post("Toefl/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
 
    } else if (ELqualificationLabel == "FUNCTION SKILLS") {
         setButtonStatus(true);
        post("FunctionalSkill/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
   
    } else if (ELqualificationLabel == "GCSE") {
        setButtonStatus(true);
        post("Gcse/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
     
    } else if (ELqualificationLabel == "PEARSON") {
        setButtonStatus(true);
        post("Pearson/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
   
    } else if (ELqualificationLabel == "OTHER SCORE") {
        setButtonStatus(true);
        post("Other/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
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
        post("PTE/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            history.push(`/studentExperience/${id}`);
          }

          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }

        });
     
    }
  };

  console.log(qualificationLabel, qualificationValue, "dummy");

  const testSignleOptions = testOptions?.map((test) => ({
    label: test.name,
    value: test.id,
  }));

  //  select  quakification type
  const selectQualificationType = (label, value) => {
    console.log(label,value);
    setQualificationLabel(label);
    setQualificationValue(value);

    // console.log(label, value);
  };

  const history = useHistory();

 

  // Gre data update

  const handleSubmitUpdateGre = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    for (var x of subData.values()) {
      console.log(x);
    }

       setButtonStatus(true);
      post(`GreScore/Create`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoComplete: true,
          });
          setSuccess(!success);
          setModal2Open(false);
          history.push(`/studentExperience/${id}`);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  
  };

  // GMAT data update

  const handleSubmitUpdateGmat = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    for (var x of subData.values()) {
      console.log(x);
    }
        setButtonStatus(true);
      post(`GmatScore/Create`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoComplete: true,
          });
          setSuccess(!success);
          setModal3Open(false);
          history.push(`/studentExperience/${id}`);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  
  };




    return (
        <div>
        <Card className="uapp-card-bg">
          <CardHeader className="page-header">
            <h3 className="text-white">English Language / Test Score</h3>
            <div className="page-header-back-to-home">
              <span className="text-white" >
                {" "}
                 36% Completed
              </span>
            </div>
          </CardHeader>
        </Card>
  
       {
  
  
        loading?
  
        <div className="text-center">
  
          <img src={loadingImages} />
  
  
        </div>
  
        :
  
        <Card>
        <CardBody>
         
         
           
         
            <div className="container test-score-div-1-style mt-4">
              <span className="test-score-span-1-style">
                Do You Hold an English Language Qualification Such as GCSE
                English Language, IELTS, Pearson etc ?
              </span>
            </div>
         
  
       
          
              <FormGroup
                row
                className="has-icon-left position-relative ml-md-2 mt-3"
              >
                <Col md="2">
                  <span>
                    Please Select <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Select
                    options={testSignleOptions}
                    value={{
                      label: qualificationLabel,
                      value: qualificationValue,
                    }}
                    onChange={(opt) =>
                      selectQualificationType(opt.label, opt.value)
                    }
                    name=""
                    id=""
                    required
                  />
                </Col>
              </FormGroup>
       
  
            {qualificationLabel == "Yes" ? (
              <>
                <FormGroup
                  row
                  className="has-icon-left position-relative ml-md-2"
                >
                  <Col md="2">
                    <span>
                      Please Select The Type Of English Language Qualification{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={qualificationOptions}
                      value={{
                        label: ELqualificationLabel,
                        value: ELqualificationValue,
                      }}
                      onChange={(opt) =>
                        selectQualification(opt.label, opt.value)
                      }
                      name="examType"
                      id="examType"
                      required
                    />
  
                    {testError && (
                      <span className="text-danger">
                        Enlish language test is required{" "}
                      </span>
                    )}
                  </Col>
                </FormGroup>
              </>
            ) : null}
  
            <br />
  
            <div>
              <Modal
                isOpen={modalOpen}
                toggle={closeModal}
                className="uapp-modal"
              >
                <ModalHeader>English Test Score</ModalHeader>
  
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    {ELqualificationLabel == "IELTS" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
                       
  
                       
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Speaking
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="speaking"
                              id="speaking"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Reading
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="reading"
                              id="reading"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Writing
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="writing"
                              id="writing"
                      
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Listening
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="listening"
                              id="listening"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Exam Date
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="date"
                              name="examDate"
                              id="examDate"
                              
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Overall
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="overall"
                              id="overall"
                            
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>

                      </>
                    )}
  
                    {ELqualificationLabel == "TOEFL" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
                    
  
                        
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Speaking
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="speaking"
                              id="speaking"
                            
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Reading
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="reading"
                              id="reading"
                            
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Writing
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="writing"
                              id="writing"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Listening
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="listening"
                              id="listening"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Exam Date
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="date"
                              name="examDate"
                              id="examDate"
                             
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Overall
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="overall"
                              id="overall"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              IELTS Equivalent Score
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="ieltsEquivalent"
                              id="ieltsEquivalent"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                      </>
                    )}
  
                    {ELqualificationLabel == "FUNCTION SKILLS" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
                     
  
                       
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Speaking
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="speaking"
                              id="speaking"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Reading
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="reading"
                              id="reading"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Writing
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="writing"
                              id="writing"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Listening
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="listening"
                              id="listening"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Exam Date
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="date"
                              name="examDate"
                              id="examDate"
                            
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Overall
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="overall"
                              id="overall"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              IELTS Equivalent Score
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="ieltsEquivalent"
                              id="ieltsEquivalent"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                      </>
                    )}
  
                    {ELqualificationLabel == "GCSE" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
                      
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Result
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="result"
                              id="result"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              IELTS Equivalent Score
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="ieltsEquivalent"
                              id="result"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                      </>
                    )}
  
                    {ELqualificationLabel == "PEARSON" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
                      
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Result
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="result"
                              id="result"
                            
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              IELTS Equivalent Score
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="ieltsEquivalent"
                              id="ieltsEquivalent"
                            
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                      </>
                    )}
  
                    {ELqualificationLabel == "DUOLINGO" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
                       <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="3">
                            <span>
                              {" "}
                              Literacy
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="leteracy"
                              id="leteracy"
                            
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="3">
                            <span>
                              {" "}
                              Comprehension
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="comprehension"
                              id="comprehension"
                           
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="3">
                            <span>
                              {" "}
                              Conversation
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="conversation"
                              id="conversation"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="3">
                            <span>
                              {" "}
                              Production
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="production"
                              id="production"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="3">
                            <span>
                              {" "}
                              Exam Date
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="date"
                              name="examDate"
                              id="examDate"
                             
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="3">
                            <span>
                              {" "}
                              Overall
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="overall"
                              id="overall"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="3">
                            <span>
                              {" "}
                              IELTS Equivalent Score
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="ieltsEquivalent"
                              id="ieltsEquivalent"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-9 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                      </>
                    )}
  
                    {ELqualificationLabel == "OTHER SCORE" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Test Name
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="text"
                              name="testName"
                              id="testName"
                         
                              required
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Score Overall
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="scoreOverall"
                              id="scoreOverall"
                          
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              IELTS Equivalent Score
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="ieltsEquivalent"
                              id="ieltsEquivalent"
                          
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                      </>
                    )}
  
                    {ELqualificationLabel == "PTE SCORE" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={id}
                        />
  
  
                        
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Speaking
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="speaking"
                              id="speaking"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Reading
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="reading"
                              id="reading"
                             
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Writing
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="writing"
                              id="writing"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Listening
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="listening"
                              id="listening"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              Overall
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="overall"
                              id="overall"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="2">
                            <span>
                              {" "}
                              IELTS Equivalent Score
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <Input
                              type="number"
                              name="ieltsEquivalent"
                              id="ieltsEquivalent"
                              
                              min="0"
                            />
                          </Col>
                        </FormGroup>
  
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                      </>
                    )}
                  </Form>
                </ModalBody>
              </Modal>
            </div>
  
            {/* Showing English Test Score Forms */}
         
  
          {/* Showing English Test Result In Card */}
  
          <div className="row mt-3">
            <div className="hedding-titel d-flex justify-content-between ml-md-4 mb-3">
              <div>
                <h5>
                  {" "}
                  <b>English Test Score</b>{" "}
                </h5>
  
                <div className="bg-h"></div>
              </div>
            </div>
  
       
          </div>
  
          <section id="root">
            <div className="row mt-3">
              <div className="hedding-titel d-flex justify-content-between ml-md-4 mb-3">
                <div>
                  <h5>
                    {" "}
                    <b>GRE & GMAT Score</b>{" "}

                  </h5>
  
                  <div className="bg-h"></div>
                </div>
              </div>
  
           </div>
          
             <Button color="primary" className="ml-2" onClick={()=> setModal2Open(true)}>
             <i className="fas fa-plus"></i> <span>{' '}Add GRE Score</span>
             </Button>
             <br/>
             <br/>
             <Button color="primary" className="ml-2" onClick={()=> setModal3Open(true)}>
             <i className="fas fa-plus"></i> <span>{' '}Add GMAT Score</span>
             </Button>
          
          </section>
  
      
  
          {/* MOdals Start Section */}
  
        
              <div>
                <Modal
                  isOpen={modal2Open}
                  toggle={closeModal2}
                  className="uapp-modal"
                >
                
                    <ModalHeader>Add GRE Result</ModalHeader>
               
                  <ModalBody>
                    <Form onSubmit={handleSubmitUpdateGre}>
                      <Input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={id}
                      />
  
                     
  
                      <input
                        type="hidden"
                        name="haveGreExam"
                        id="haveGreExam"
                        checked={true}
                      />
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            GRE Exam Date <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="date"
                            id="greExamDate"
                            name="greExamDate"
                           
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Verbal Score <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="verbalScore"
                            name="verbalScore"
                            required
                         
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Verbal Rank <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="verbalRank"
                            name="verbalRank"
                            required
                          
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Quantitative Score{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="quantitativeScore"
                            name="quantitativeScore"
                            required
                          
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Quantitative Rank{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="quantitativeRank"
                            name="quantitativeRank"
                            required
                        
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Writing Score <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="writingScore"
                            name="writingScore"
                            required
                          
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Writing Rank <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="writingRank"
                            name="writingRank"
                            required
                          
                          />
                        </Col>
                      </FormGroup>
  
                      <div className="row">
                            <div className="col-md-11 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                    </Form>
                  </ModalBody>
                </Modal>
                <div></div>
              </div>
  
              <div>
                <Modal
                  isOpen={modal3Open}
                  toggle={closeModal3}
                  className="uapp-modal"
                >
                
                    <ModalHeader>Add GMAT Result</ModalHeader>
              
                  <ModalBody>
                    <Form onSubmit={handleSubmitUpdateGmat}>
                      <Input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={id}
                      />
  
                    
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Input
                          type="hidden"
                          name="haveGmatExam"
                          id="haveGmatExam"
                          value={true}
                        />
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            GMAT Exam Date{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="date"
                            id="gmatExamDate"
                            name="gmatExamDate"
                          
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Total Score <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="totalScore"
                            name="totalScore"
                            required
                          
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Total Rank <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="totalRank"
                            name="totalRank"
                            required
                           
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Verbal Score <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="verbalScore"
                            name="verbalScore"
                            required
                            
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Verbal Rank <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="verbalRank"
                            name="verbalRank"
                            required
                            
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Quantitative Score{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="quantitativeScore"
                            name="quantitativeScore"
                            required
                           
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Quantitative Rank{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="quantitativeRank"
                            name="quantitativeRank"
                            required
                           
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Writing Score <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="writingScore"
                            name="writingScore"
                            required
                           
                          />
                        </Col>
                      </FormGroup>
  
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Writing Rank <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            id="writingRank"
                            name="writingRank"
                            required
                            
                          />
                        </Col>
                      </FormGroup>
  
                      <div className="row">
                            <div className="col-md-11 d-flex justify-content-end">
                            <ButtonForFunction
                              name={"Save"}
                              className={" mt-3 badge-primary"}
                              type={"Save & Next"}
                              disable={buttonStatus}
                            />

                            </div>

                        </div>
                    </Form>
                  </ModalBody>
                </Modal>
                <div></div>
              </div>
  
          
        </CardBody>
      </Card>
       }
      </div>
    );
};

export default StudentTestScoreForm;