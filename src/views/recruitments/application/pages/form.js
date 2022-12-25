import React, { useEffect } from "react";
import Application from "../utils/application";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/recruitments/application/application";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const initialFieldValues = new Application();

function ApplicationCreate({ ...props }) {
  const { addToast } = useToasts();
  const validate = () => {
    return true;
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) {
    
        props.createApplication(values, onSuccess);
      } else {
      
        props.updateApplication(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.applicationList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <h2>Create Application</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="helperText"
          placeholder="Full Name"
          name="candidateFullName"
          type="text"
          value={values.candidateFullName}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <br />

        <input
          id="helperText"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />

        <input
          id="helperText"
          placeholder="Short Description"
          name="shortDescription"
          type="text"
          value={values.shortDescription}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />
        <button
          style={{ marginTop: "3px" }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  applicationList: state.application.list,
});

const mapActionToProps = {
  createApplication: actions.create,
  updateApplication: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(ApplicationCreate);
