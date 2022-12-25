import React, { useEffect } from "react";
import Department from "../utils/department";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/core/department/actions/department";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const initialFieldValues = new Department();

function DepartmentCreate({ ...props }) {
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
     
        props.createDepartment(values, onSuccess);
      } else {
      
        props.updateDepartment(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.departmentList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <h2>Create Department</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="helperText"
          placeholder="Name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleInputChange}
          className="form-control"
        />
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
  departmentList: state.department.list,
});

const mapActionToProps = {
  createDepartment: actions.create,
  updateDepartment: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(DepartmentCreate);
