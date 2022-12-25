import React, { useEffect, useState } from "react";
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
  ButtonGroup,
} from "reactstrap";
import Axios from "axios";
import { rootUrl } from "../../../constants/constants";
import { useHistory, useParams, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../Components/ButtonForFunction";
import get from "../../../helpers/get";
import remove from "../../../helpers/remove";

const AddSubjectDeliveryPattern = () => {
  const [activetab, setActivetab] = useState("3");
  const [deliveryDD, setDeliveryDD] = useState([]);
  const [deliveryLabel, setDeliveryLabel] = useState("Select Delivery Pattern");
  const [deliveryValue, setDeliveryValue] = useState(0);
  const [deliveryError, setDeliveryError] = useState(false);
  const [patternList, setPatternList] = useState([]);
  const [update, setUpdate] = useState(0);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delPatternId, setDelPatternId] = useState(0);
  const [delPatternName, setDelPatternName] = useState('');

  const [buttonStatus,setButtonStatus] = useState(false);
  const [buttonStatus1,setButtonStatus1] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    get("DeliveryPatternDD/index").then((res) => {
      console.log(res, "response");
      setDeliveryDD(res);
    });

    get(`SubjectDeliveryPattern/GetBySubject/${id}`).then((res) => {
      console.log("dsdsdsdds", res);
      setPatternList(res);
    });
  }, [id, success]);

  const deliveryMenu = deliveryDD.map((delivery) => ({
    label: delivery?.name,
    value: delivery?.id,
  }));

  //   const financeMenu = financeDD.map((finance) => ({
  //     label: finance?.name,
  //     value: finance?.id,
  //   }));

  const selectDelivery = (label, value) => {
    setDeliveryError(false);
    setDeliveryLabel(label);
    setDeliveryValue(value);
  };

  const history = useHistory();
  const { addToast } = useToasts();

  // redirect to SubjecList
  const backToSubjecList = () => {
    if(location.subjectId != undefined){
      history.push(`/subjectProfile/${location.subjectId}`);
    }
    else{
      history.push("/subjectList");
    }
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push({
        pathname: `/addSubject/${id}`,
        subjectId: location.subjectId
      });
    }
    if (tab == "2") {
      history.push({
        pathname: `/addSubjectFee/${id}`,
        subjectId: location.subjectId
      });
    }
    if (tab == "4") {
      history.push({
        pathname: `/addSubjectRequirements/${id}`,
        subjectId: location.subjectId
      });
    }
    if (tab == "5") {
      history.push({
        pathname: `/addSubjectDocumentRequirement/${id}`,
        subjectId: location.subjectId
      });
    }
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (var value of subdata) {
      console.log("values", value);
    }

    if (deliveryValue === 0) {
      setDeliveryError(true);
    } else {
      if (update != 0) {
        setButtonStatus(true);
        Axios.put(`${rootUrl}SubjectDeliveryPattern/Update`, subdata, {
          headers: {
            "Content-Type": "application/json",
            'authorization': AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setDeliveryLabel("Select Delivery Pattern");
            setDeliveryValue(0);
            setSuccess(!success);
            setUpdate(0);
            // history.push({
            //   pathname: `/addSubjectRequirements/${id}`,
            // });
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setDeliveryLabel("Select Delivery Pattern");
            setDeliveryValue(0);
            setUpdate(0);
          }
        });
      } else {
        setButtonStatus(true);
        Axios.post(`${rootUrl}SubjectDeliveryPattern/Create`, subdata, {
          headers: {
            "Content-Type": "application/json",
            'authorization': AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setDeliveryLabel("Select Delivery Pattern");
            setDeliveryValue(0);
            setSuccess(!success);
            setUpdate(0);
            // history.push({
            //   pathname: `/addSubjectRequirements/${id}`,
            // });
          } else {
            setDeliveryLabel("Select Delivery Pattern");
            setDeliveryValue(0);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const handleUpdate = (pattern) => {
    console.log(pattern);
    setUpdate(pattern?.id);
    setDeliveryLabel(pattern?.deliveryPattern?.name);
    setDeliveryValue(pattern?.deliveryPattern?.id);
  };

  const redirectToNextPage = () => {
    history.push({
      pathname: `/addSubjectRequirements/${id}`,
      subjectId: location.subjectId
    });
  };

  const toggleDanger = (pattern) => {
    setDelPatternName(pattern?.deliveryPattern?.name);
    setDelPatternId(pattern?.id);
    setDeleteModal(true);
   }

      // on Close Delete Modal
const closeDeleteModal = () => {
  setDeleteModal(false);
  setDelPatternName('');
  setDelPatternId(0);
}

const handleDeleteDeliveryPattern = (id) => {
  setButtonStatus1(true);
  const returnValue = remove(`SubjectDeliveryPattern/Delete/${id}`).then((action)=> {
    setButtonStatus1(true);
    setDeleteModal(false);
    setSuccess(!success);
    // console.log(action);
     addToast(action, {
       appearance: 'error',
       autoDismiss: true,
     })
     setDelPatternName('');
     setDelPatternId(0);
  })
}

// redirect to Next Page
// const onNextPage = () => {
//   const uniID = universityId;
//   history.push({
//     pathname: `/addUniversityFinancial/${univerId}`,
//     id: uniID,
//   });
// };

const onPreviousPage = () => {
  history.push({
    pathname: `/addSubjectFee/${id}`,
    subjectId: location.subjectId
  });
}

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Subject Delivery Pattern</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToSubjecList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {
                location.subjectId != undefined ?
                "Back to Subject Profile"
                :
                "Back to Subject List"
              }
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                
                active={activetab === "1"}
                onClick={() => toggle("1")}
              >
                Subject Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                
                active={activetab === "2"}
                onClick={() => toggle("2")}
              >
                Subject Fee Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Delivery Pattern
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                
                active={activetab === "4"}
                onClick={() => toggle("4")}
              >
                Requirement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                
                active={activetab === "5"}
                onClick={() => toggle("5")}
              >
                Document Requirement
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <div className="row mt-5">
                <div className="col-md-6 col-sm-12">
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Add Delivery Pattern</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>
                  <Form onSubmit={handleSubmit} className="mt-0">
                    {update != 0 ? (
                      <Input type="hidden" id="id" name="id" value={update} />
                    ) : null}

                    <Input
                      type="hidden"
                      id="subjectId"
                      name="subjectId"
                      value={id}
                    />

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Delivery Pattern{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={deliveryMenu}
                          value={{ label: deliveryLabel, value: deliveryValue }}
                          onChange={(opt) =>
                            selectDelivery(opt.label, opt.value)
                          }
                          name="deliveryPatternId"
                          id="deliveryPatternId"
                        />

                        {deliveryError && (
                          <span className="text-danger">
                            Delivery pattern is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    ></FormGroup>
                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <ButtonForFunction
                        type={"submit"}
                        className={"mr-0 mt-3 badge-primary"}
                        name={"Save"}
                        permission={6}
                        disable={buttonStatus}
                      />
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Delivery Pattern List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <Table className="table-sm table-bordered">
                      <thead className="thead-uapp-bg">
                        <tr style={{ textAlign: "center" }}>
                          <th>SL/NO</th>
                          <th>Delivery Pattern</th>
                          {/* <th className="text-center">Application Type</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patternList?.map((pattern, i) => (
                          <tr key={pattern.id} style={{ textAlign: "center" }}>
                            <th scope="row">{i + 1}</th>
                            <td>{pattern?.deliveryPattern?.name}</td>

                            <td>
                              <ButtonGroup>
                                <ButtonForFunction
                                  func={() => handleUpdate(pattern)}
                                  className={"mx-1 btn-sm"}
                                  color={"warning"}
                                  icon={<i className="fas fa-edit"></i>}
                                  permission={6}
                                />

                                <ButtonForFunction
                                  className={"mx-1 btn-sm"}
                                  func={() => toggleDanger(pattern)}
                                  color={"danger"}
                                  icon={<i className="fas fa-trash-alt"></i>}
                                  permission={6}
                                 /> 
                              </ButtonGroup>

                              <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="uapp-modal">

                      <ModalBody>
                        <p>Are You Sure to Delete this <b>{delPatternName}</b> ? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button disabled={buttonStatus1} color="danger" onClick={() => handleDeleteDeliveryPattern(delPatternId)}>YES</Button>
                        <Button  onClick={closeDeleteModal}>NO</Button>
                      </ModalFooter>

                    </Modal>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* <FormGroup
                className="has-icon-left position-relative"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                />
                <ButtonForFunction
                  func={onNextPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
              </FormGroup> */}

            </TabPane>
          </TabContent>
          <FormGroup
            className="has-icon-left position-relative mt-5"
            style={{ display: "flex", justifyContent: "space-between" }}
          >

                <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                />

                <Button onClick={redirectToNextPage} color="warning">
                  Next Page
                </Button>
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddSubjectDeliveryPattern;
