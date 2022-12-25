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
import get from "../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../Components/ButtonForFunction";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";

const AdmissionOfficerDetails = () => {
  const [officerObj, setOfficerObj] = useState({});
  const [admissionManagerList, setAdmissionManagerList] = useState([]);

  const { officerId } = useParams();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    get(`AdmissionOfficer/Profile/${officerId}`).then((res) => {
   
      setOfficerObj(res);
      setAdmissionManagerList(res?.admissionManager);
    });
  }, [officerId]);

  const backToAdmissionofficerList = () => {
    if(location.managerId != undefined && location.providerId != undefined){
        history.push(`/providerAdmissionManager/${location.managerId}/${location.providerId}`)
    }
    else{
        history.push("/admissionOfficerList");
    }
  };

  const tableStyle = {
    overflowX: "scroll",
  };

  const handlRedirectToAdmissionManagerDetails = (manager) => {
   
    history.push({
        pathname: `/providerAdmissionManager/${manager?.id}/${officerObj?.providerId}`,
        officerId: officerId
    });
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Admission Officer Details</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToAdmissionofficerList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {
                location.managerId != undefined && location.providerId != undefined ?
                "Back to Admission Manager Details"
                :
                "Back to Admission Officer List"
              }
              
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="row">
        <div className="col-md-8 col-sm-12">
          <Card className="uapp-employee-profile-right">
            <div className="uapp-profile-CardHeader">
              {/* <div className="uapp-circle-image margin-top-minus">
                  <img  alt='provider_image' />
                </div>     */}
              <div className="py-3">
                <h5 className="py-1">
                  Name:{" "}
                  <span className="text-primary">
                    {officerObj?.nameTittleName} {officerObj?.firstName}{" "}
                    {officerObj?.lastName}
                  </span>{" "}
                </h5>
                <h5 className="py-1">
                  Provider:{" "}
                  <span className="text-primary">
                    {officerObj?.providerName}
                  </span>{" "}
                </h5>
                <h5 className="py-1">
                  {" "}
                  Email:{" "}
                  <span className="text-primary">{officerObj?.email}</span>{" "}
                </h5>
                <h5 className="py-1">
                  {" "}
                  Phone Number:{" "}
                  <span className="text-primary">
                    {officerObj?.phoneNumber}
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
                      {officerObj?.stateName}
                    </span>{" "}
                  </h5>
                  <h5>
                    {" "}
                    City:{" "}
                    <span className="text-primary">
                      {officerObj?.city}
                    </span>{" "}
                  </h5>
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-4 col-sm-12" style={{ marginTop: "40px" }}>
          <Card className="container py-4">
            <div className="hedding-titel d-flex justify-content-between ms-1">
              <div>
                <h5>
                  {" "}
                  <b>Admission Manager List</b>{" "}
                </h5>

                <div className="bg-h"></div>
              </div>
              {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
            </div>

            {admissionManagerList?.map((manager, i) => (
              <div
                key={i}
                className="customCard rounded mt-3">
                {/* <td>
                  {manager?.nameTittleName} {manager?.firstName}{" "}
                  {manager?.lastName}
                </td>

                <td>{manager?.email}</td>

                <td>{manager?.university?.universityCity}</td> */}
                <div className="d-flex justify-content-between">
                  <div>
                    <span>
                      {manager?.nameTittleName} {manager?.firstName}{" "}
                      {manager?.lastName}
                    </span>
                    <br />
                    <span>{manager?.email}</span>
                  </div>

                  <div>
                  <ButtonForFunction
                      func={() =>
                        handlRedirectToAdmissionManagerDetails(manager)
                      }
                      color={"primary"}
                      className={"mx-1 btn-sm"}
                      icon={<i className="fas fa-eye"></i>}
                      permission={6}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdmissionOfficerDetails;
