import React, { createRef, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import post from "../../../../helpers/post";

import put from "../../../../helpers/put";
import Manager from "../IndividualComponent/Manager";
import Team from "../IndividualComponent/Team";
import AssignTeam from "../IndividualComponent/AssignTeam";

const BranchProfile = (props) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [employeeModal, setEmployeeModal] = useState(false);
  const [branchInfo, setBranchInfo] = useState({});
  const [branchManager, setBranchManager] = useState({});
  
  const [serialNum, setSerialNum] = useState(1);


  const [branchTeamEmployee, setBranchTeamEmployee] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [teamInfo, setTeamInfo] = useState({});

  const [success, setSuccess] = useState(false);





 

  

  // add on close

  // add on extra

  // submitting form
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setModalOpen(true);
  //   // //  watch form data values
  //   // for (var value of subData.values()) {

  //   //  }

  // }



  //



  useEffect(() => {
    get(`Branch/Get/${id}`).then((res) => {
     
      setBranchInfo(res);
    });

    
  }, [id]);

  const backToBranchList = () => {
    history.push("/branchList");
  };
  function closeModal(e) {
    e.preventDefault();
    setModalOpen(false);
  }


  const handleTeamUpdate = (id) => {
    get(`BranchTeam/Get/${id}`).then((res) => {
    
      setTeamInfo(res);
      setTeamName(res?.name);
      setIsUpdate(true);
      setModalOpen(true);
    });
  };
  const handleTeamSubmit = (e) => {
    e.preventDefault();
    const teamData = new FormData(e.target);
    // for(let  value of teamData.values()){
   
    // }
    if (!isUpdate) {
      post(`BranchTeam/Create`, teamData).then((action) => {
        setSuccess(!success);
        setModalOpen(false);
        addToast(action, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/branchList");
      });
    } else {
      for (let val of teamData.values()) {
        
      }
      put(`BranchTeam/Update`, teamData).then((res) => {
        
        setSuccess(!success);
        setModalOpen(false);
        addToast(res.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });

        history.push("/branchList");
      });
    }
  };

  const functionimplement = () => {
    setModalOpen(true);

  };

  const toggleDeleteTeam = (id) => {
    localStorage.setItem("teamId", id);
    setDeleteModal(true);
  };

 

  // const handleDeletebranchTeam = () => {
  //   const id = localStorage.getItem("teamId");
  //   remove(`BranchTeam/Delete/${id}`).then((res) => {
  //     setDeleteModal(false);
  //     addToast(res?.data?.message, {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
     
  //   });
  //    const newTeamData = branchTeam.filter((team) => team?.id != id);
  
  //     setBranchTeam(newTeamData);

  // };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

 

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Branch Details</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToBranchList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Branch List
            </span>
          </div>
        </CardHeader>
      </Card>

    

      <div className="uapp-employee-profile">
        <Row>
          <Col md="12">
            <Card className="uapp-employee-profile-right">
              <div className="uapp-profile-CardHeader">
                {/* <div className="uapp-circle-image margin-top-minus">
                  <img  alt='provider_image' />
                </div>     */}
                <div className="py-3">
                  <h5 className="py-1">
                    Branch Name:{" "}
                    <span className="text-primary">{branchInfo?.name}</span>{" "}
                  </h5>
                  <h5 className="py-1">
                    Branch Address:{" "}
                    <span className="text-primary">
                      {branchInfo?.addressLine}
                    </span>{" "}
                  </h5>
                  <h5 className="py-1">
                    {" "}
                    Email:{" "}
                    <span className="text-primary">
                      {branchInfo?.email}
                    </span>{" "}
                  </h5>
                  <h5 className="py-1">
                    {" "}
                    Phone Number:{" "}
                    <span className="text-primary">
                      {branchInfo?.phoneNumber}
                    </span>{" "}
                  </h5>
                </div>
              </div>
              <CardBody>
                <div>
                  <ul className="uapp-ul text-center">
                    <h5>
                      {" "}
                      Country:{" "}
                      <span className="text-primary">
                        {branchInfo?.country?.name}
                      </span>{" "}
                    </h5>
                    <h5>
                      {" "}
                      State:{" "}
                      <span className="text-primary">
                        {branchInfo?.state?.name}
                      </span>{" "}
                    </h5>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">

            <AssignTeam
            id ={id}
            success={success}
            setSuccess={setSuccess}
            >

            </AssignTeam>
          
          </Col>

          <Col md="4">
            <Manager 
            id={id}
            success={success}
            setSuccess={setSuccess}
            ></Manager>
        
            <Team
            id={id}
            success={success}
            setSuccess={setSuccess}
            
            />
           
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BranchProfile;
