import React, { useEffect } from "react";
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
import { useToasts } from "react-toast-notifications";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import get from "../../../helpers/get";
import { useState } from "react";
import { borderRadius } from "@mui/system";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import ButtonForFunction from "../Components/ButtonForFunction";

const SubjectIntake = () => {
  const { camId } = useParams();
  const { subbId } = useParams();



  const [intake, setIntake] = useState([]);
  const [status, setStatus] = useState([]);

  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const [subIntake, setSubIntake] = useState([]);
  const [success, setSuccess] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);

  const [intId, setIntId] = useState(0);
  const [intName, setIntName] = useState('');

  const [intakeError, setIntakeError] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();



  // localStorage.setItem("camppId", location?.campusId);
  // localStorage.setItem("subbId", location?.subjectId);

  useEffect(() => {
    get("Intake/Index").then((res) => {
     
      setIntake(res);
    });

    get("IntakeStatus/GetAll").then((res) => {
     
      setStatus(res);
    });

    get(
      `SubjectIntake/GetAllSubjectIntake?subjectId=${subbId}&campusId=${camId}`
    ).then((res) => {
     
      setSubIntake(res);
    });
  }, [success]);

  const intakes = intake.map((intakeOptions) => ({
    label: intakeOptions?.name,
    value: intakeOptions?.id,
  }));
  const statuss = status.map((statusOptions) => ({
    label: statusOptions?.name,
    value: statusOptions?.id,
  }));

  const selectIntake = (label, value) => {
    setIntakeError(false);
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  const selectStatus = (label, value) => {
    setStatusError(false);
    setStatusLabel(label);
    setStatusValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    // for (var x of subData) {
     
    // }

    if (intakeValue === 0) {
      setIntakeError(true);
    }
    if (statusValue === 0) {
      setStatusError(true);
    } else {
      post(`SubjectIntake/AssignToSubject`, subData).then((res) => {
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setIntakeLabel("Select Intake");
          setIntakeValue(0);
          setStatusLabel("Select Status");
          setStatusValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "warning",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const toggleDanger = (name, id) => {
    setIntName(name);
    setIntId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setIntName('');
    setIntId(0);
  };

  const handleDelete = (id) => {
    const returnValue = remove(`SubjectIntake/DeleteById/${id}`).then(
      (action) => {
     
        setSuccess(!success);
        setDeleteModal(false);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setIntName('');
        setIntId(0);
      }
    );
  };

  const backToList = () => {
    history.push(`/campusSubjectList/${camId}`);
  };

  const handleReset = () => {
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
    setStatusLabel("Select Status");
    setStatusValue(0);
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Subject Intake List</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Campus Subject List
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="">
        <Card>
          <Row className="pt-3 gx-4">
            <Col md="4">
            <div className="hedding-titel d-flex justify-content-between ml-3 mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Add Subject Intake</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

              <Form className="mt-2 ml-4" onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="campusId"
                  id="campusId"
                  value={camId}
                />

                <input
                  type="hidden"
                  name="subjectId"
                  id="subjectId"
                  value={subbId}
                />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={intakes}
                      value={{ label: intakeLabel, value: intakeValue }}
                      onChange={(opt) => selectIntake(opt.label, opt.value)}
                      defaultValue={intakeValue}
                      name="intakeId"
                      id="intakeId"
                    />

                    {intakeError && (
                      <span className="text-danger">
                        Intake is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Status <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={statuss}
                      value={{ label: statusLabel, value: statusValue }}
                      onChange={(opt) => selectStatus(opt.label, opt.value)}
                      name="statusId"
                      id="statusId"
                    />

                    {statusError && (
                      <span className="text-danger">
                        Status is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >

                  <Button 
                    color="danger"
                    className={"mr-0 mt-3"}
                    onClick={handleReset}
                    >Reset
                  </Button>

                  <CustomButtonRipple
                    type={"submit"}
                    className={"mr-0 mt-3 ml-1 badge-primary"}
                    name={"Submit"}
                    permission={6}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col md="8">
            <div className="hedding-titel d-flex justify-content-between ml-3 mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Intake List</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>
              <div className="table-responsive page-header ">
                <Table className="table-sm table-bordered rounded">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subIntake?.map((int, i) => (
                      <tr key={int?.id} style={{ textAlign: "center" }}>
                        <th scope="row">{serialNum + i}</th>
                        <td>{int?.intake?.name}</td>
                        <td>{int?.intakeStatus?.name}</td>

                        <td style={{ width: "8%" }} className="text-center">
                          {/* <ButtonGroup variant="text">
                        <Link to= "">
                          <Button color="primary" className="mx-1 btn-sm">
                            {" "}
                            <i className="fas fa-eye"></i>{" "}
                          </Button>
                        </Link>

                          <Link to=''>
                            <Button color="dark" className="mx-1 btn-sm">
                              {" "}
                              <i className="fas fa-edit"></i>{" "}
                            </Button>
                          </Link>

                          <Button onClick='' color="danger" className="mx-1 btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </ButtonGroup> */}

                          {/* <Button className="mx-1 btn-sm" onClick={() => toggleDanger(int?.intake?.name, int?.intake?.id)} color="danger"><i className="fas fa-trash-alt"></i></Button> */}

                          <ButtonForFunction
                            className={"mx-1 btn-sm"}
                            func={() =>
                              toggleDanger(int?.intake?.name, int?.intake?.id)
                            }
                            color={"danger"}
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
                                Are You Sure to Delete this{" "}
                                <span className="fw-bold">
                                  {intName}
                                </span>{" "}
                                ? Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                color="danger"
                                onClick={() => handleDelete(int?.id)}
                              >
                                YES
                              </Button>
                              <Button color="primary" onClick={closeDeleteModal}>NO</Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default SubjectIntake;
