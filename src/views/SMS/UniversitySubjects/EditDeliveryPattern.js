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
} from "reactstrap";
import Axios from "axios";
import { rootUrl } from "../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../Components/ButtonForFunction";
import get from "../../../helpers/get";

const EditDeliveryPattern = () => {
  const [activetab, setActivetab] = useState("3");
  const [deliveryDD, setDeliveryDD] = useState([]);
  const [deliveryLabel, setDeliveryLabel] = useState("Select Delivery Pattern");
  const [deliveryValue, setDeliveryValue] = useState(0);
  const [deliveryError, setDeliveryError] = useState(false);
  const [patternList, setPatternList] = useState([]);
  const [update, setUpdate] = useState(0);
  const [success, setSuccess] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    get("DeliveryPatternDD/index").then((res) => {
     
      setDeliveryDD(res);
    });

    get(`SubjectDeliveryPattern/GetBySubject/${id}`).then((res) => {
     
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
    history.push("/subjectList");
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/editSubject/${id}`);
    }
    if (tab == "2") {
      history.push(`/editSubjectFee/${id}`);
    }
    if (tab == "4") {
      history.push(`/editSubjectRequirements/${id}`);
    }
    if (tab == "5") {
      history.push(`/editSubjectDocumentRequirement/${id}`);
    }
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (var value of subdata) {
     
    }

    if (deliveryValue === 0) {
      setDeliveryError(true);
    } else {
      if(update != 0){
        Axios.put(`${rootUrl}SubjectDeliveryPattern/Update`, subdata, {
          headers: {
            "Content-Type": "application/json",
            'authorization': AuthStr,
          },
        }).then((res) => {
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
            //   pathname: `/editSubjectRequirements/${id}`,
            // });
          }
          else{
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setDeliveryLabel("Select Delivery Pattern");
            setDeliveryValue(0);
            setUpdate(0);
          }
        });
      }
      else{
        Axios.post(`${rootUrl}SubjectDeliveryPattern/Create`, subdata, {
          headers: {
            "Content-Type": "application/json",
            'authorization': AuthStr,
          },
        }).then((res) => {
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
          }
          else{
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

  const handleUpdate = pattern =>{
   
    setUpdate(pattern?.id);
    setDeliveryLabel(pattern?.deliveryPattern?.name);
    setDeliveryValue(pattern?.deliveryPattern?.id);
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Add Subject Delivery Pattern</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToSubjecList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Subject List
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
                          name={"Submit"}
                          permission={6}
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
                              <ButtonForFunction
                                func={() => handleUpdate(pattern)}
                                className={"mx-1 btn-sm"}
                                color={"warning"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditDeliveryPattern;
