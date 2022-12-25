import React, { useEffect } from "react";
import Designation from "../utils/designation";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/core/designation/designation";

import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
const initialFieldValues = new Designation();

function DesignationCreate({ ...props }) {
  const { addToast } = useToasts();
  const validate = () => {
    return true;
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  const colourOptions = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) {
  
        props.createDesignation(values, onSuccess);
      } else {
       
        props.updateDesignation(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.designationList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <h2>Create Designation</h2>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Designation</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="basicInput">Enter Branch Name</Label>
              <Input
                id="basicInput"
                placeholder="Branch Name"
          type="text"
                name="name"
          value={values.name}
          onChange={handleInputChange}
          className="form-control"
        />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Select Department</Label>
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={colourOptions[2]}
                name="loading"
                options={colourOptions}
                isLoading={true}
              />
            </FormGroup>
          </CardBody>
        </Card>
        {/* <button
          style={{ marginTop: "3px" }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button> */}
        <Button.Ripple type="submit" color="primary">
          Submit
        </Button.Ripple>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  designationList: state.designation.list,
});

const mapActionToProps = {
  createDesignation: actions.create,
  updateDesignation: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(DesignationCreate);
