import React, { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,


  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import CompanyInformation from "../utils/companyInformation";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/company/companyInformation/companyInformation";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

const initialFieldValues = new CompanyInformation();

function CompanyInformationCreate({ ...props }) {
  const { addToast } = useToasts();
  const validate = () => {
    return true;
  };
  const { values, setValues,  setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  // const countries = () => {
  //   return axios.get("api/county/get").then(function (response) {
  //     return response.data;
  //   });
  // };
 

  // const states = () => {
  //   return axios.get("api/state/get").then(function (response) {
  //     return response.data;
  //   });
  // };


  // const cities = () => {
  //   return axios.get("api/city/get").then(function (response) {
  //     return response.data;
  //   });
  // };

  // let cityOptions = cities.map(
  //   (props.cities = () => {
  //     cities.name;
  //   })
  // );



  //test data
  // const colourOptions = [
  //   { value: "ocean", label: "Ocean" },
  //   { value: "blue", label: "Blue" },
  //   { value: "purple", label: "Purple" },
  //   { value: "red", label: "Red" },
  //   { value: "orange", label: "Orange" },
  // ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId === 0) {
       
        props.createCompanyInformation(values, onSuccess);
      } else {
     
        props.updateCompanyInformation(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.companyInformationList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId, props.companyInformationList, setErrors,  setValues]);
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Company Branch</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="basicInput">Enter Branch Name</Label>
              <Input
                id="basicInput"
                placeholder="Branch Name"
                type="text"
                name="name"
                value={values.companyName}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Enter Branch Name</Label>
              <Input
                id="basicInput"
                placeholder="Branch Name"
                type="text"
                name="name"
                value={values.companyEmail}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Enter Address</Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Branch Address"
                name="address"
                value={values.registrationNumber}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Enter Post Code</Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Post Code"
                name="postCode"
                value={values.logoId}
                onChange={handleInputChange}
                className="form-control"
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
  companyInformationList: state.companyInformation.list,
});

const mapActionToProps = {
  createCompanyInformation: actions.create,
  updateCompanyInformation: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(CompanyInformationCreate);
