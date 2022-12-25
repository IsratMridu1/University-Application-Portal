import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
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
  ButtonGroup
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import put from "../../../helpers/put";
import { Link } from "react-router-dom";
import ButtonForFunction from "../Components/ButtonForFunction";
import LinkButton from "../Components/LinkButton";

const SubDepartment = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [departmentLabel, setdepartmentLabel] = useState("Select Department");
  const [departmentValue, setdepartmentValue] = useState(0);

  const [departmentError, setDepartmentError] = useState(false);

  const [filterdepartmentLabel, setfilterdepartmentLabel] =
    useState("Select Department");
  const [filterdepartmentValue, setfilterdepartmentValue] = useState(0);

  const [subdepartment, setSubdepartment] = useState("");
  const [departmentList, setdepartmentList] = useState([0]);
  const [subdepartmentList, setSubDepartmentList] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [SubdepId, setSubdepId] = useState(0);
  const [SubdepName, setSubdepName] = useState("");

  const [description, setDescription] = useState("");

  useEffect(() => {
    const returnValue = get(`DepartmentDD/Index`).then((action) => {
      setdepartmentList(action);
    });
  }, []);

  useEffect(() => {
    const returnValue = get(
      `SubDepartment/Index?id=${filterdepartmentValue}`
    ).then((action) => {
      setSubDepartmentList(action);
    });
  }, [success, filterdepartmentValue]);

  const departmentName = departmentList?.map((depart) => ({
    label: depart.name,
    value: depart.id,
  }));

  const selectDepartmentName = (label, value) => {
    setdepartmentLabel(label);
    setdepartmentValue(value);
    setDepartmentError(false);
  };

  const selectDepartmentNamefilder = (label, value) => {
    setfilterdepartmentLabel(label);
    setfilterdepartmentValue(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // const subdata = {
    //   name: subdepartment,
    //   departmentId: departmentValue,
    //   description:description

    // }
    const subdata = new FormData(e.target);
    for (let val of subdata.values()) {
    }

    if (departmentValue === 0) {
      setDepartmentError(true);
    } else {
      post(`SubDepartment/Create`, subdata).then((action) => {
        setSuccess(!success);
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setdepartmentLabel("Select Country");
        setdepartmentValue(0);
      });
    }
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };
  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };
  const toggleDanger = (name, id) => {
    setSubdepName(name);
    setSubdepId(id);
    setDeleteModal(true);
  };
  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSubdepName("");
    setSubdepId(0);
  };

  const handleDeleteSubDep = (id) => {
    const returnValue = remove(`SubDepartment/Delete/${id}`).then((action) => {
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });

      //  localStorage.removeItem('depName')
      setSubdepName("");
      setSubdepId(0);
    });
  };

  // update submit
  // const handleUpdateSubmit = () => {

  //   const id = localStorage.getItem('updateSupdep');

  //   const subData = {
  //     id: id,
  //     name: subdepartment,
  //     departmentId: departmentValue,
  //     description:description
  //   }

  //  const returnvalue = put(`SubDepartment/Update`,subData).then((action)=> {
  //     setSuccess(!success);
  //     setModalOpen(false)
  //     addToast(action, {
  //       appearance: action == 'SubDepartment updated successfully.' ? 'success': 'error',
  //       autoDismiss: true,
  //     })
  //     setdepartmentLabel('Select Department');
  //     setdepartmentValue(0);
  //    localStorage.removeItem('updateSupdep')
  //   })
  // }

  const AddModalOpen = () => {
    setModalOpen(true);
    setSubdepartment("");
    setdepartmentLabel("Select Department");
    setdepartmentValue(0);
    setDescription("");
    // localStorage.removeItem('updateSupdep')
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
    }
  };
  // search handler
  const handleSearch = () => {};

  // on clear
  const handleClearSearch = () => {
    setfilterdepartmentLabel("Select Department");
    setfilterdepartmentValue(0);
  };

  const redirectToEditSubDepartment = subDepListId => {
    history.push(`/editSubDepartment/${subDepListId}`);
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Sub Department List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <Row>
            <Col lg="12" md="4">
              <Select
                options={departmentName}
                value={{
                  label: filterdepartmentLabel,
                  value: filterdepartmentValue,
                }}
                onChange={(opt) =>
                  selectDepartmentNamefilder(opt.label, opt.value)
                }
                name="departmentId"
                id="departmentId"
              />
            </Col>

            {/* <Col lg="4" md="4">
            <Input
              style={{ height: "2.7rem" }}
              type="text"
              name="search"
              value={searchStr}
              id="search"
              placeholder="Sub Department Name"
              onChange={(e) => setSearchStr(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            </Col> */}

            {/* <Col lg="4" md="4">
              <div style={{display: 'flex', justifyContent: "space-between"}}>

              <div className="uapp-Search-div">
                <i onClick={handleSearch} className="fas fa-search"></i>
              </div>

              <div className="mt-2">
                <span onClick={handleClearSearch} className="btn btn-danger">Clear</span>
                <span className="btn btn-danger">Clear</span>
              </div>

              </div>
              
            </Col> */}

            {/* <Col lg="3" md="3" sm="6" xs="6">
              <div className="uapp-Search-div">
                <span>Reset</span>
            
              </div>
            </Col> */}
          </Row>
          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >
                  {/* <Icon.X  className='text-danger' />*/}
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div>

                {/* <div className="mt-2 mx-1">
                <span className="btn btn-primary">Export</span>
              </div> */}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div>
        <Card>
          <CardHeader>
            <ButtonForFunction
              className={"btn btn-uapp-add"}
              func={AddModalOpen}
              icon={<i className="fas fa-plus"></i>}
              name={" Add New Sub Department"}
              permission={6}
            />

            <div>
              {" "}
              <b>
                {" "}
                Total{" "}
                <span className="badge badge-primary">
                  {" "}
                  {subdepartmentList?.length}{" "}
                </span>{" "}
                Sub Department Found{" "}
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
                <ModalHeader>Add Sub Department</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="text"
                          required
                          name="name"
                          id="name"
                          placeholder="Create Sub Department Name"
                          onChange={(e) => setSubdepartment(e.target.value)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Department <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={departmentName}
                          value={{
                            label: departmentLabel,
                            value: departmentValue,
                          }}
                          onChange={(opt) =>
                            selectDepartmentName(opt.label, opt.value)
                          }
                          name="departmentId"
                          id="departmentId"
                        />

                        {departmentError ? (
                          <span className="text-danger">
                            Department is required.
                          </span>
                        ) : null}
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
                          name="description"
                          id="description"
                          rows="3"
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        color="danger"
                        className="mr-1 mt-3"
                        onClick={closeModal}
                      >
                        Close
                      </Button>
                      {/* {
        localStorage.getItem("updateSupdep") ?
          <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit} >Update</Button> : */}
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
            </div>

            <div className="table-responsive">
              <Table className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    <th>SL/NO</th>
                    <th> Name</th>
                    <th className="text-center">Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subdepartmentList?.map((subDeplist, i) => (
                    <tr key={subDeplist.id} style={{ textAlign: "center" }}>
                      <th scope="row">{i + 1}</th>
                      <td>{subDeplist?.name}</td>
                      <td>{subDeplist?.departmentinfo?.name}</td>
                      <td>
                        {/* <Button className="mx-1 btn-sm" onClick={() => toggleDanger(subDeplist.name, subDeplist.id)} color="danger"><i className="fas fa-trash-alt"></i></Button> */}
                       <ButtonGroup variant="text">

                        <ButtonForFunction
                          func={() =>
                            toggleDanger(subDeplist.name, subDeplist.id)
                          }
                          className={"mx-1 btn-sm"}
                          color={"danger"}
                          icon={<i className="fas fa-trash-alt"></i>}
                          permission={6}
                        />

                        {/* <Link to={`editSubDepartment/${subDeplist?.id}`}>
                      <Button className="mx-1 btn-sm" color="warning"><i className="fas fa-edit"></i></Button>
                    </Link> */}

                        {/* <LinkButton
                          url={`editSubDepartment/${subDeplist?.id}`}
                          className={"mx-1 btn-sm"}
                          color={"warning"}
                          icon={<i className="fas fa-edit"></i>}
                          permission={6}
                        /> */}

                        <ButtonForFunction
                          func={() =>
                            redirectToEditSubDepartment(subDeplist?.id)
                          }
                          className={"mx-1 btn-sm"}
                          color={"warning"}
                          icon={<i className="fas fa-edit"></i>}
                          permission={6}
                        />

                        </ButtonGroup>

                        <Modal
                          isOpen={deleteModal}
                          toggle={closeDeleteModal}
                          className="uapp-modal"
                        >
                          <ModalBody>
                            <p>
                              Are You Sure to Delete this <b>{SubdepName}</b> ?
                              Once Deleted it can't be Undone!
                            </p>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              color="danger"
                              onClick={() => handleDeleteSubDep(SubdepId)}
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  alldepartmentList: state.departmentDataReducer.departmentList,
});
export default connect(mapStateToProps)(SubDepartment);
