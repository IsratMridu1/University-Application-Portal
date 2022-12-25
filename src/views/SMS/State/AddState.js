import React, { useEffect, useState } from "react";
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
import { connect, useDispatch } from "react-redux";
import Select from "react-select";
import { useHistory } from "react-router";

import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import put from "../../../helpers/put";
import ButtonForFunction from "../Components/ButtonForFunction";
import { permissionList } from "../../../constants/AuthorizationConstant";
import Loader from "../Search/Loader/Loader";

const AddState = () => {
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [delUniStateId, setDelUniStateId] = useState(0);
  const [delUniStateName, setDelUniStateName] = useState("");

  const [updateUniState, setUpdateUniState] = useState(undefined);
  const [loading,setLoading] = useState(true);

  const { addToast } = useToasts();
  const [buttonStatus,setButtonStatus] = useState(false);

  const permissions = JSON.parse(localStorage.getItem('permissions'));

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const returnValue = get(`State/GetAll`).then((action) => {
      setStateList(action);
      setLoading(false);
      console.log("stateList", action);
    });
  }, [success]);

  useEffect(() => {
    const returnValue = get(`CountryDD/Index`).then((action) => {
      setCountryList(action);
    });
  }, []);

  const selectCountryName = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subdata = {
      name: state,
      countryId: countryValue,
      code: codeValue,
    };

    if(state === ""){
        setStateError(true);
    }
    else if(codeValue === ""){
        setCodeError(true);
    }
    else if(countryValue === 0){
        setCountryError(true);
    }
    else{
      setButtonStatus(true);
        const returnValue = post(`State/Create`, subdata).then((action) => {
          setButtonStatus(false);
            setSuccess(!success);
            setModalOpen(false);
            addToast(action?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setCountryLabel("Select Country");
            setCountryValue(0);
            setState("");
            setCodeValue("");
          });
    }
    
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setCountryLabel("Select Country");
    setCountryValue(0);
    setState("");
    setCodeValue("");
    setCountryError(false);
    setStateError(false);
    setCodeError(false);
    setUpdateUniState(undefined);
  };

  // delete button click
  const toggleDanger = (state) => {
    console.log(state);
    setDelUniStateName(state?.name);
    setDelUniStateId(state?.id);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelUniStateId(0);
    setDelUniStateName("");
  };

  // confirm delete
  const handleDeleteUniState = (id) => {
    setButtonStatus(true);
    const returnValue = remove(`State/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelUniStateId(0);
      setDelUniStateName("");
    });
  };

  // update state
  const handleUpdate = (state) => {
    console.log(state);
    setModalOpen(true);
    setState(state?.name);
    setCodeValue(state?.code);
    setCountryLabel(state?.country?.name);
    setCountryValue(state?.country?.id);
    setUpdateUniState(state?.id);
  };

  // update submit
  const handleUpdateSubmit = () => {
    const id = updateUniState;

    const subData = {
      id: id,
      name: state,
      countryId: countryValue,
      code: codeValue,
    };
     setButtonStatus(true);
    const returnvalue = put(`State/Update`, subData).then((action) => {
      setButtonStatus(false);
      setSuccess(!success);
      setModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setState("");
      setCodeValue("");
      setCountryLabel("Select Country");
      setCountryValue(0);
      setUpdateUniState(undefined);
    });
  };

  const countryName = countryList?.map((country) => ({
    label: country.name,
    value: country.id,
  }));

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
     {
      loading?
      <Loader/>
      :
      <div>
         <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">State List</h3>
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
          {
            permissions?.includes(permissionList?.Add_State) ?
            <ButtonForFunction
            className={"btn btn-uapp-add"}
            func={() => setModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
            name={" Add New State"}
            
          />
          :
          null
          }

          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary">
                {" "}
                {stateList?.length}{" "}
              </span>{" "}
              State Found{" "}
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
              <ModalHeader> State</ModalHeader>

              <ModalBody>
                <Form>
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        State <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={state}
                        placeholder="Write State Name"
                        onChange={(e) => {setState(e.target.value);
                        setStateError(false)}}
                      />
                      {
                        stateError ? <span className="text-danger">State is required</span>
                        :
                        null
                      }
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Code <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={codeValue}
                        placeholder="Write State Code"
                        onChange={(e) => {setCodeValue(e.target.value);
                        setCodeError(false)}}
                      />
                      {
                        codeError ? <span className="text-danger">State code is required</span>
                        :
                        null
                      }
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Country <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Select
                        options={countryName}
                        value={{ label: countryLabel, value: countryValue }}
                        onChange={(opt) =>
                          selectCountryName(opt.label, opt.value)
                        }
                        name="country"
                        id="country"
                      />
                      {
                        countryError ? <span className="text-danger">Country is required</span>
                        :
                        null
                      }
                    </Col>
                  </FormGroup>

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Button
                      color="danger"
                      className="mr-2 mt-3"
                      onClick={closeModal}
                    >
                      Close
                    </Button>

                    {updateUniState != undefined ? (
                      <Button
                        color="primary"
                        className="mr-0 mt-3"
                        onClick={handleUpdateSubmit}
                        disabled={buttonStatus}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                        onClick={(e) => handleSubmit(e)}
                        disabled={buttonStatus}
                      >
                        Submit
                      </Button>
                    )}
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
                  <th>State</th>
                  <th className="text-center">Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stateList?.map((state, i) => (
                  <tr key={state?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{state?.name}</td>
                    <td>{state?.country?.name}</td>
                    <td>
                      <ButtonGroup>
                 

                      <ButtonForFunction
                        func={() => handleUpdate(state)}
                        className={"mx-1 btn-sm"}
                        color={"warning"}
                        icon={<i className="fas fa-edit"></i>}
                        permission={6}
                      />

{
                      permissions?.includes(permissionList?.Delete_State)?
                      <ButtonForFunction
                      func={() => toggleDanger(state)}
                      className={"mx-1 btn-sm"}
                      color={"danger"}
                      icon={<i className="fas fa-trash-alt"></i>}
                      
                    />
                    :
                    null
                     }
                      </ButtonGroup>

                      <Modal
                        isOpen={deleteModal}
                        toggle={closeDeleteModal}
                        className="uapp-modal2"
                      >
                        <ModalBody>
                          <p>
                            Are You Sure to Delete this{" "}
                            <b>{delUniStateName}</b> ? Once
                            Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          
                          <Button onClick={closeDeleteModal}>NO</Button>
                          <Button
                            color="danger"
                            onClick={() =>
                              handleDeleteUniState(delUniStateId)
                              }
                              disabled={buttonStatus}
                          >
                            YES
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

export default AddState;
