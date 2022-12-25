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
import Select from "react-select";
import CompanyContactInformation from "../utils/companyContactInformation";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/company/companyContactInformation/companyContactInformation";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

const initialFieldValues = new CompanyContactInformation();

function CompanyContactInformationCreate({ ...props }) {
  const { addToast } = useToasts();
  const validate = () => {
    return true;
  };
  const { values, setValues, setErrors, handleInputChange, resetForm } =
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
      if (props.currentId === 0) {
    
        props.createCompanyContactInformation(values, onSuccess);
      } else {
     
        props.updateCompanyContactInformation(
          props.currentId,
          values,
          onSuccess
        );
      }
    }
  };
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.companyContactInformationList.find(
          (x) => x.id === props.currentId
        ),
      });
      setErrors({});
    }
  }, [props.currentId, props.companyContactInformationList, setErrors,  setValues]);
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Company Contact Information</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="basicInput">Enter Email</Label>
              <Input
                id="basicInput"
                placeholder="Branch Name"
                type="text"
                name="name"
                value={values.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Enter Website</Label>
              <Input
                id="basicInput"
                placeholder="Branch Name"
                type="text"
                name="name"
                value={values.website}
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
                value={values.address}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Select Country</Label>
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={colourOptions[2]}
                name="loading"
                options={colourOptions}
                isLoading={true}
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Select State</Label>
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={colourOptions[2]}
                name="loading"
                options={colourOptions}
                isLoading={true}
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Select City</Label>
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={colourOptions[2]}
                name="loading"
                options={colourOptions}
                isLoading={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="basicInput">Enter Phone Number</Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Label for="basicInput">Enter Telephone Number</Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Telephone Number"
                name="telephoneNumber"
                value={values.telephoneNumber}
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
                value={values.postCode}
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
  companyContactInformationList: state.companyContactInformation.list,
});

const mapActionToProps = {
  createCompanyContactInformation: actions.create,
  updateCompanyContactInformation: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(CompanyContactInformationCreate);
