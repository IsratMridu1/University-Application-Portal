import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
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
  ButtonGroup,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import {
  CreateDepartment,
  DeleteDepartment,
  GetDepartments,
  UpdateDepartment,
} from "../../../redux/actions/SMS/UniversitySubject/DepartmentAction";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { Link } from "react-router-dom";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import LinkButton from "../Components/LinkButton";
import Loader from "../Search/Loader/Loader";

const Department = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [department, setdepartment] = useState("");
  const [description, setDescription] = useState("");
  const [departmentInfo, setDepartmentInfo] = useState([]);
  const [depId, setDepId] = useState(0);
  const [depName, setDepName] = useState("");
  const [loading,setLoading] = useState(true);

  const [id, setId] = useState("");

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  useEffect(() => {
    get(`Department/index`).then((res) => {
       
      setDepartmentInfo(res);
      setLoading(false);
    });
  }, [success]);

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    // localStorage.removeItem("depId");
    setdepartment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subdata = {
      name: department,
      description: description,
    };
    post(`Department/Create`, subdata).then((res) => {
      setSuccess(!success);
      setModalOpen(false);
       
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      get(`Department/index`).then((res) => {
         
        setDepartmentInfo(res);
      });
      setdepartment("");
    });
  };

  const toggleDanger = (name, id) => {
    setDepName(name);
    setDepId(id);
    setDeleteModal(true);
  };
  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDepName("");
    setDepId(0);
  };

  const handleDelete = (id) => {
    remove(`Department/Delete/${id}`).then((res) => {
      setDeleteModal(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      const newState = departmentInfo.filter((data) => data.id != id);
      setDepartmentInfo(newState);
      setDepName("");
      setDepId(0);
    });
  };

  // const handleUpdateSubmit = () => {
  //   const id = localStorage.getItem('updatedep');
  //   const subData = {
  //     id: id,
  //     name: department
  //   }
  //  const returnvalue = update(`${rootUrl}/Department/Update`,subData).then((action)=> {
  //     setSuccess(!success);
  //     setModalOpen(false)
  //     addToast(action, {
  //       appearance: action =='Department updated successfully.' ? 'success': 'error',
  //       autoDismiss: true,
  //     })
  //     setdepartment('');
  //    localStorage.removeItem('depName')

  //   })

  //   dispatch(UpdateDepartment(subData, (action) => {
  //     setSuccess(!success);
  //     setModalOpen(false)
  //     addToast(action, {
  //       appearance: action =='Department updated successfully.' ? 'success': 'error',
  //       autoDismiss: true,
  //     })
  //     setdepartment('');
  //    localStorage.removeItem('depName')
  //   }))
  // }

  const AddModalOpen = () => {
    setModalOpen(true);
    setdepartment("");
    // localStorage.removeItem('updatedep')
  };

  const redirectToEditDepartment = deptId => {
    history.push(`/editDepartment/${deptId}`)
  }

  return (
    <div>
      {
        loading?
        <Loader/>
        :
        <div>
          <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Department List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <ButtonForFunction
            func={AddModalOpen}
            className={"btn btn-uapp-add"}
            icon={<i className="fas fa-plus"></i>}
            name={" Add New Department"}
            permission={6}
          />

          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary">
                {" "}
                {departmentInfo.length}
              </span>{" "}
              Department Found{" "}
            </b>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal"
            >
              <ModalHeader>Add Department </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Department Name <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        required
                        onChange={(e) => setdepartment(e.target.value)}
                        placeholder="Create Department"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Description <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="textarea"
                        required
                        rows="4"
                        name="description"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add Description"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      color="danger"
                      className="mr-1 mt-3"
                      onClick={closeModal}
                    >
                      Close
                    </Button>

                    {/* {
        localStorage.getItem("updatedep") ?
          <Button color="warning" onClick={handleUpdateSubmit}  className="mr-1 mt-3">Update</Button> : */}
                    <Button.Ripple
                      color="primary"
                      type="submit"
                      className="mr-1 mt-3"
                    >
                      Submit
                    </Button.Ripple>

                    {/* } */}
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            <div></div>
          </div>

          <div className="table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {departmentInfo.map((dept, index) => (
                  <tr key={index} dept={dept} style={{ textAlign: "center" }}>
                    <th scope="row">{index + 1}</th>
                    <td>{dept?.name}</td>
                    <td>{dept?.description}</td>
                    <td>
                      <ButtonGroup variant="text">
                        {/* <Button  color="danger" onClick={()=>handleDelete(dept?.id)}   className="mr-2 btn-sm"><i className="fas fa-trash-alt"></i></Button> */}

                        {/* <Button className="btn-sm mx-2" onClick={() => toggleDanger(dept.name, dept.id)} color="danger"><i className="fas fa-trash-alt"></i></Button> */}

                        <ButtonForFunction
                          func={() => toggleDanger(dept.name, dept.id)}
                          className={"btn-sm mx-2"}
                          color={"danger"}
                          icon={<i className="fas fa-trash-alt"></i>}
                          permission={6}
                        />

                        {/* <Link to={`editDepartment/${dept?.id}`}>
                         <Button color="warning" className=" btn-sm"> <i className="fas fa-edit"></i> </Button>
                         </Link> */}

                        {/* <LinkButton
                          url={`editDepartment/${dept?.id}`}
                          color={"warning"}
                          className={"btn-sm"}
                          icon={<i className="fas fa-edit"></i>}
                          permission={6}
                        /> */}

                        <ButtonForFunction
                          func={() => redirectToEditDepartment(dept?.id)}
                          className={"btn-sm"}
                          color={"warning"}
                          icon={<i className="fas fa-edit"></i>}
                          permission={6}
                        />

                      </ButtonGroup>

                      {/* modal for delete */}
                      <Modal
                        isOpen={deleteModal}
                        toggle={closeDeleteModal}
                        className="uapp-modal"
                      >
                        <ModalBody>
                          <p>
                            Are You Sure to Delete this <b>{depName}</b> ? Once
                            Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() => handleDelete(depId)}
                          >
                            YES
                          </Button>
                          <Button color="primary" onClick={closeDeleteModal}>
                            NO
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
        </div>
      }
    </div>
  );
};

export default Department;
