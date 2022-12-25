import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Modal,
  Form,
  Col,
  Input,
} from "reactstrap";
import get from "../../../helpers/get";
import put from "../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import { permissionList } from "../../../constants/AuthorizationConstant";

const EditDepartment = () => {
  const history = useHistory();
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const { addToast } = useToasts();
  const [department, setdepartment] = useState("");
  const [description, setDescription] = useState("");

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Department/Get/${id}`).then((res) => {
     
      setInfo(res);
      setdepartment(res.name);
      setDescription(res.description);
    });
  }, [id]);

  const backToDashboard = () => {
    history.push("/department");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const subData = new FormData(e.target);
    const subData = {
      id: info?.id,
      name: department,
      description: description,
    };
   
    put(`Department/Update`, subData).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/department");
    });
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Update Department </h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Department
              List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <div>
            <Form onSubmit={handleSubmit}>
              <input type="hidden" name="id" id="id" value={info.id} />

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Department Name <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="text"
                    required
                    name="name"
                    id="name"
                    defaultValue={department}
                    onChange={(e) => setdepartment(e.target.value)}
                    placeholder="Create Department"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Description <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="textarea"
                    required
                    rows="4"
                    name="description"
                    id="description"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add Description"
                  />
                </Col>
              </FormGroup>

              <FormGroup
                row
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <Col md="5">
                  {permissions?.includes(permissionList?.Update_department) ? (
                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"mr-0 mt-3"}
                      name={"Submit"}
                    />
                  ) : null}
                </Col>
              </FormGroup>
            </Form>

            <div></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditDepartment;
